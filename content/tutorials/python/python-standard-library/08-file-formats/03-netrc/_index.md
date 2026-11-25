---
title: 'netrc file processing'
description: 'Read login names and passwords for hosts from a .netrc file with netrc, as used by curl, git and pip.'
linkTitle: 'netrc file processing'
weight: 3
---

{{< part "concept" "Why netrc" >}}

A **.netrc** file stores logins for servers in your home folder. Tools like `curl`, `git` and `pip` can read it, so you do not type passwords in scripts. The **netrc** module reads the same file.

Use it for **your own scripts on a trusted machine**. In production, prefer a secrets manager or environment variables.

{{< part "code" "Read credentials for a host" >}}

```python {output=auto}
import netrc
from pathlib import Path
from tempfile import TemporaryDirectory

content = """
machine api.example.com
  login deploy-bot
  password demo-token-123

default
  login guest
  password guest
"""

with TemporaryDirectory() as tmp:
    path = Path(tmp, ".netrc")
    path.write_text(content, encoding="utf-8")
    path.chmod(0o600)

    rc = netrc.netrc(str(path))
    print(rc.authenticators("api.example.com"))
    print(rc.authenticators("other.example.org"))
    print(sorted(rc.hosts))
```

- `authenticators(host)` returns `(login, account, password)`, or the `default` entry, or `None`.
- `machine` starts an entry. `default` matches every other host.

{{< part "ops" "Pitfalls and checks" >}}

- The real `~/.netrc` must be private: `chmod 600`. If others can read it, `netrc` raises `NetrcParseError`.
- Do not print the password in logs.
- Keep `.netrc` out of Git and out of Docker images.

| Symptom | Likely cause | First action |
|---|---|---|
| `NetrcParseError: ... insecure` | File is readable by others | `chmod 600 ~/.netrc` |
| `None` returned | Host name not listed, and no `default` | Check the `machine` line |

{{< part "impact" "What you can do now" >}}

- Read host logins in a local script.
- Know the permission rule for `.netrc`.
- Choose better secret storage for production.

{{< quiz id="net1" q="What file permission should .netrc have?" options="644|600|777" answer="2" explain="Only the owner should read it: `chmod 600`." >}}
