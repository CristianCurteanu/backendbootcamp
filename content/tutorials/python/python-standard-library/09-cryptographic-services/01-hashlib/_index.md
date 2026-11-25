---
title: 'Secure hashes and message digests'
description: 'Create hashes with hashlib: SHA-256 for data integrity, chunked file hashing, and scrypt or pbkdf2 for password storage.'
linkTitle: 'Secure hashes and message digests'
weight: 1
---

{{< part "concept" "Why hashing" >}}

A **hash** turns any data into a short fixed-size fingerprint. The same input always gives the same hash. You cannot go backwards. Uses: check file integrity, detect duplicates, and store passwords.

Use **SHA-256** or newer. **MD5** and **SHA-1** are broken for security.

{{< part "code" "Hash data, files and passwords" >}}

```python {output=auto}
import hashlib
import os

print(hashlib.sha256(b"hello").hexdigest())

def file_sha256(chunks: list[bytes]) -> str:
    h = hashlib.sha256()
    for chunk in chunks:
        h.update(chunk)
    return h.hexdigest()

print(file_sha256([b"hel", b"lo"]) == hashlib.sha256(b"hello").hexdigest())

salt = os.urandom(16)
key = hashlib.scrypt(b"my password", salt=salt, n=2**14, r=8, p=1)
print(len(salt), len(key))
```

- `hexdigest()` gives text. `digest()` gives bytes.
- `update()` lets you hash big files piece by piece (read in chunks of 64 KB).
- For **passwords**, use a slow hash with a random **salt**: `scrypt`, `pbkdf2_hmac`, or a library such as `argon2`.

{{< part "ops" "Pitfalls and checks" >}}

{{< callout type="danger" title="Security" >}}
Never store passwords with plain `sha256`. It is fast, so attackers can test billions of guesses. Use `scrypt`, `argon2` or `bcrypt` with a random salt.
{{< /callout >}}

- Compare hashes with `hmac.compare_digest`, not `==`.
- Different text encodings give different hashes. Always `.encode("utf-8")` text first.
- Hashing is **not encryption**. You cannot get the data back.

| Need | Use |
|---|---|
| File integrity | `sha256` |
| Password storage | `scrypt` / `argon2` |
| Message signature | `hmac` |

{{< part "impact" "What you can do now" >}}

- Check a download against a published SHA-256.
- Hash large files with constant memory.
- Store passwords with a salt and a slow hash.

{{< quiz id="hl1" q="Which is the right way to store passwords?" options="MD5|scrypt with a random salt|plain sha256" answer="2" explain="Password hashes must be slow and salted." >}}
