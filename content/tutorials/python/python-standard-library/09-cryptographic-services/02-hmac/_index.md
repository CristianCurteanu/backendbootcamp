---
title: 'Keyed-Hashing for Message Authentication'
description: 'Sign and verify messages with hmac and a shared secret key. Verify webhook signatures and compare them in constant time.'
linkTitle: 'Keyed-Hashing for Message Authentication'
weight: 2
---

{{< part "concept" "Why HMAC" >}}

A plain hash proves that data did not change only if you can trust the hash itself. **HMAC** mixes a **secret key** into the hash. Only someone who knows the key can create a valid signature.

Backend uses: **webhook signatures** (GitHub, Stripe), signed cookies and API request signing.

{{< part "code" "Sign and verify a webhook" >}}

```python {output=auto}
import hashlib
import hmac

SECRET = b"shared-secret"
body = b'{"event": "paid", "id": 42}'

signature = hmac.new(SECRET, body, hashlib.sha256).hexdigest()
print(signature)

def verify(body: bytes, received: str) -> bool:
    expected = hmac.new(SECRET, body, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, received)

print(verify(body, signature))
print(verify(body + b" ", signature))
```

- `hmac.new(key, message, digestmod)` creates the signature.
- The sender computes it and sends it in a header. The receiver computes it again and compares.
- `compare_digest` takes the same time whatever the input.

{{< part "ops" "Pitfalls and checks" >}}

- Do **not** compare with `==`. It stops at the first different character, so an attacker can learn the signature step by step (a **timing attack**).
- Sign the **raw bytes** you received, not JSON that you parsed and printed again.
- Add a timestamp to the signed data and reject old messages. This stops **replay** attacks.
- Keep the secret in an environment variable or a secrets manager. Never in Git.

```python {output=auto}
import hmac

print(hmac.compare_digest("abc", "abc"), hmac.compare_digest(b"abc", b"abd"))
```

{{< part "impact" "What you can do now" >}}

- Verify webhook signatures safely.
- Explain timing attacks and replay attacks.
- Sign messages between your own services.

{{< quiz id="hm1" q="Which function should compare two signatures?" options="==|hmac.compare_digest|is" answer="2" explain="`compare_digest` runs in constant time." >}}
