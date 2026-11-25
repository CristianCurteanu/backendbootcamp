---
title: "Idempotency keys: the cheapest reliability win"
description: Retries are inevitable. Duplicate charges are not. One header and one table make writes safe to repeat.
date: 2026-11-18
lastmod: 2026-11-18
categories: [Techniques]
tags: [apis, reliability, postgres]
banner:
  - text: "POST /charges  Idempotency-Key: 7f3a"
  - text: "same key, same result"
    dark: true
faq:
  - q: What is an idempotency key?
    a: An idempotency key is a unique value a client sends with a write request. The server stores the result under that key, so a retry with the same key returns the stored result instead of repeating the work.
  - q: How long should I keep idempotency keys?
    a: Keep them longer than your longest realistic retry window. A day is common for payment-style APIs. Expire them with a scheduled delete so the table does not grow forever.
---

A client sends a payment request and the connection drops before the response arrives. The client cannot know whether the charge happened, so it retries. Without protection, the customer is charged twice.

## What an idempotency key does

The client generates a unique value, such as a UUID, and sends it in a header with the request. The server records the key together with the result. If the same key arrives again, the server returns the recorded result and does no new work.

```http
POST /charges
Idempotency-Key: 7f3a9c2e-4b1d-4e0a-9d55-2f6c1b8a7e10
Content-Type: application/json

{"amount": 4200, "currency": "usd"}
```

## One table is enough

```sql
CREATE TABLE idempotency_keys (
    key         text PRIMARY KEY,
    request_sha text NOT NULL,
    response    jsonb,
    created_at  timestamptz NOT NULL DEFAULT now()
);
```

The primary key does the heavy lifting. Two concurrent requests with the same key cannot both insert it, so exactly one of them does the work.

## The handler

```python {filename="charges.py"}
def create_charge(key, payload):
    digest = sha256(canonical_json(payload))
    try:
        db.insert("idempotency_keys", key=key, request_sha=digest)
    except UniqueViolation:
        row = db.get("idempotency_keys", key=key)
        if row.request_sha != digest:
            raise Conflict("Idempotency key reused with a different request")
        return row.response or in_progress()
    response = charge_card(payload)
    db.update("idempotency_keys", key=key, response=response)
    return response
```

Three details matter:

- **Compare the request.** Reusing a key with a different body is a client bug. Reject it instead of returning a result that does not match.
- **Handle in-flight requests.** If the first request has not finished, return a retryable status such as `409` or `425`.
- **Expire old keys.** Delete rows older than your longest retry window.

## What to measure

Count requests that arrive with a key you have already seen. That number is your duplicate rate, and it shows how often retries were protecting you.
