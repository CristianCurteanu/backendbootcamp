---
title: 'Generate secure random numbers for managing secrets'
description: 'Generate secure tokens, passwords and random choices with secrets, the right module for anything an attacker must not guess.'
linkTitle: 'Generate secure random numbers for managing secrets'
weight: 3
---

{{< part "concept" "Why secrets" >}}

The `random` module is predictable. If an attacker sees some output, they can calculate the next numbers. The **secrets** module uses the operating system's secure random source. Use it for **password reset tokens, API keys, session IDs and one-time codes**.

{{< part "code" "Tokens and passwords" >}}

```python {output=auto}
import secrets
import string

token = secrets.token_urlsafe(32)
print(len(token) >= 43)
print(len(secrets.token_hex(16)))

alphabet = string.ascii_letters + string.digits
password = "".join(secrets.choice(alphabet) for _ in range(16))
print(len(password))

code = f"{secrets.randbelow(10**6):06d}"
print(len(code), code.isdigit())
```

- `token_urlsafe(n)` returns text that is safe in URLs, from `n` random bytes.
- `token_hex(n)` returns `2 * n` hexadecimal characters.
- `secrets.choice` and `randbelow` are secure versions of `random.choice` and `randint`.

{{< part "ops" "Pitfalls and checks" >}}

- Use at least **16 bytes** (128 bits) for tokens. 32 bytes is a common choice.
- Store only a **hash** of a reset token in your database, not the token itself.
- Compare tokens with `secrets.compare_digest(a, b)`.
- Never print or log tokens.

```python {output=auto}
import secrets

a = secrets.token_hex(8)
print(secrets.compare_digest(a, a), secrets.compare_digest(a, secrets.token_hex(8)))
```

{{< part "impact" "What you can do now" >}}

- Create unguessable tokens and one-time codes.
- Pick `secrets` over `random` for anything secret.
- Compare tokens in constant time.

{{< quiz id="sec1" q="How many bytes is a safe minimum for a token?" options="4|16|1" answer="2" explain="Use at least 16 random bytes (128 bits)." >}}
