---
title: Why your cache is lying to you
description: Stale reads are rarely a cache bug. They are a missing decision about who owns the truth, and a time-to-live is not that decision.
date: 2026-11-04
lastmod: 2026-11-04
categories: [Principles]
tags: [redis, caching, consistency]
banner:
  - text: "db: email = new@example.com"
  - text: "cache: email = old@example.com"
    dark: true
faq:
  - q: Is a short TTL enough to keep a cache correct?
    a: No. A TTL only bounds how stale a value can get. It does not say whether that much staleness is acceptable for the value, so decide the acceptable staleness in seconds first and choose the TTL from that.
  - q: Should I update the cache or delete the key on write?
    a: Delete the key. Updating the cache on write duplicates your read logic and races with concurrent readers. Deleting costs one extra read and is the safer default.
---

A user changes their email address. The profile page still shows the old one. You check the database and the new value is right there. The cache is serving a read that was correct five minutes ago.

## A time-to-live is a guess, not a guarantee

Most caching bugs start with the same sentence: it will expire eventually. A TTL bounds how stale a value can get. It says nothing about whether that much staleness is acceptable for this particular value.

Here is the usual read path. It is called cache-aside, and it is correct as far as it goes.

```python {filename="users.py"}
def get_user(user_id):
    key = f"user:{user_id}"
    cached = redis.get(key)
    if cached is not None:
        return json.loads(cached)
    user = db.fetch_user(user_id)
    redis.set(key, json.dumps(user), ex=300)
    return user
```

The trouble is the write path. `update_user` changes the database and tells the cache nothing, so every reader keeps the old value for up to 300 seconds. Nobody wrote a bug. Nobody made a decision either.

## Decide who owns the truth

Every cached value has an owner. You can pick one of three, as long as you pick on purpose.

1. **The database owns it.** Delete the cache key after every write and accept one extra read. This is the right default.
2. **The cache owns it, briefly.** Use this for values where stale is fine, like view counts or a trending list.
3. **Nobody owns it, so version it.** Put a version or `updated_at` in the key. Old values then become unreachable instead of wrong.

> A cache does not make data wrong. It makes an old decision visible.

## Delete on write, then handle the race

```python {filename="users.py"}
def update_user(user_id, fields):
    db.update_user(user_id, fields)
    redis.delete(f"user:{user_id}")
```

One race remains. A reader fetches the old row, the writer updates and deletes the key, and then the reader stores the old row back. Two defenses help. Keep a short TTL as a safety net, and version the key so an old value can never be read as a new one.

## A checklist before you add a cache

- Name the owner of the truth.
- Write down the staleness you can accept, in seconds.
- Delete or version on every write path, not just the obvious one.
- Alert on hit ratio, not only on errors.

A cache is a promise about freshness. Make the promise out loud, and the bug reports about stale data stop being mysteries.
