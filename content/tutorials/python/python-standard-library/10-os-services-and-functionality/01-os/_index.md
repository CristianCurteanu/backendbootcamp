---
title: 'Miscellaneous operating system interfaces'
description: 'Use the os module for environment variables, folders, process info and walking directory trees in portable Python code.'
linkTitle: 'Miscellaneous operating system interfaces'
weight: 1
---

{{< part "concept" "Why the os module" >}}

The **os** module is Python's door to the operating system: environment variables, folders, process IDs and more. It works on Windows, macOS and Linux. For paths, prefer `pathlib`; for everything else, `os` is the base.

{{< part "code" "Environment, folders and walking" >}}

```python {output=auto}
import os
from pathlib import Path
from tempfile import TemporaryDirectory

os.environ["APP_MODE"] = "demo"
print(os.environ.get("APP_MODE"), os.getenv("MISSING", "default"))

with TemporaryDirectory() as tmp:
    os.makedirs(os.path.join(tmp, "a", "b"), exist_ok=True)
    Path(tmp, "a", "b", "x.txt").write_text("1", encoding="utf-8")
    for folder, dirs, files in os.walk(tmp):
        for name in files:
            print(os.path.relpath(os.path.join(folder, name), tmp))
    print(sorted(os.listdir(tmp)))

print(isinstance(os.getpid(), int), len(os.urandom(8)), os.sep == "/" or os.sep == "\\")
```

```text {filename="Output"}
demo default
a/b/x.txt
['a']
True 8 True
```

- `os.environ` is a dictionary of environment variables. Use `.get()` for a safe default.
- `os.walk` visits every folder below a start path.
- `os.makedirs(..., exist_ok=True)` creates all missing levels.

{{< part "ops" "Pitfalls and checks" >}}

- Environment values are always **strings**: `int(os.environ.get("PORT", "8000"))`.
- `os.environ["X"]` raises `KeyError` if missing. Use `get` or fail early with a clear message.
- Changing `os.environ` changes this process and the programs it starts. It does not change your shell.
- Never run shell commands with `os.system` and user input. Use `subprocess` with a list.

```python {output=auto}
import os

port = int(os.environ.get("PORT", "8000"))
print(port + 1)
```

```text {filename="Output"}
8001
```

{{< part "impact" "What you can do now" >}}

- Read configuration from environment variables.
- Walk a directory tree.
- Know when to use `os`, `pathlib` or `subprocess`.

{{< quiz id="os1" q="What type are environment variable values?" options="int|str|bool" answer="2" explain="Environment values are always text." >}}
