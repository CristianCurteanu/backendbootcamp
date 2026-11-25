---
title: 'Standard errno system symbols'
description: 'Read error numbers from failed system calls with errno. Match OSError causes like missing files or permission denied by name, not by text.'
linkTitle: 'Standard errno system symbols'
weight: 8
---

{{< part "concept" "Why errno" >}}

When a file or network call fails, Python raises `OSError` (or a subclass). The error has a number, `errno`, from the operating system. The **errno** module gives these numbers **names**, like `ENOENT` (no such file), so your code can choose the right reaction.

{{< part "code" "Find out why it failed" >}}

```python {output=auto}
import errno
import os

print(errno.ENOENT, errno.errorcode[errno.ENOENT])
print(os.strerror(errno.EACCES))

try:
    open("/definitely/missing/file.txt", encoding="utf-8")
except OSError as error:
    print(error.errno == errno.ENOENT, type(error).__name__)

try:
    os.mkdir("/")
except OSError as error:
    print(error.errno in (errno.EEXIST, errno.EACCES, errno.EPERM))
```

```text {filename="Output"}
2 ENOENT
Permission denied
True FileNotFoundError
True
```

- `errno.ENOENT` = file not found. `EACCES` = permission denied. `EEXIST` = already exists.
- `errno.errorcode[n]` turns a number into its name. `os.strerror(n)` gives a text message.
- Python maps the common ones to subclasses: `FileNotFoundError`, `PermissionError`, `FileExistsError`.

{{< part "ops" "Pitfalls and checks" >}}

- Catch the **specific subclass** first (`FileNotFoundError`). Use `errno` for the rest.
- Numbers differ between systems. Always compare with the `errno.NAME` constant, never a number like `2`.
- Never match on message text. It changes with language and system.

```python {output=auto}
try:
    open("/root/secret.txt", encoding="utf-8")
except FileNotFoundError:
    print("missing")
except PermissionError:
    print("not allowed")
except OSError as error:
    print("other:", error.errno)
```

```text {filename="Output"}
not allowed
```

{{< part "impact" "What you can do now" >}}

- React differently to missing files, permission errors and full disks.
- Use named constants, not numbers.
- Catch subclasses before generic `OSError`.

{{< quiz id="en1" q="What does ENOENT mean?" options="No such file or directory|Permission denied|Disk full" answer="1" explain="ENOENT is error, no entry." >}}
