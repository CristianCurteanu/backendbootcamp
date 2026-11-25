---
title: 'Common pathname manipulations'
description: 'Use os.path string functions to join, split and normalize file paths in older code, and learn how they map to pathlib.'
linkTitle: 'Common pathname manipulations'
weight: 2
---

{{< part "concept" "Why you still see os.path" >}}

Before `pathlib` existed, Python used **os.path** functions on strings. A large amount of existing code still uses them, so you must be able to read it.

For new code, prefer `pathlib`. Use `os.path` when a library gives you plain strings.

{{< part "code" "Common os.path functions" >}}

```python {output=auto}
import os.path

path = "/var/log/app/server.log"
print(os.path.basename(path), os.path.dirname(path))
print(os.path.splitext(path))
print(os.path.join("data", "2026", "report.csv"))
print(os.path.normpath("a/b/../c/./d.txt"))
print(os.path.isabs(path), os.path.exists("/definitely/not/here"))
```

```text {filename="Output"}
server.log /var/log/app
('/var/log/app/server', '.log')
data/2026/report.csv
a/c/d.txt
True False
```

| os.path | pathlib |
|---|---|
| `os.path.join(a, b)` | `Path(a) / b` |
| `os.path.basename(p)` | `Path(p).name` |
| `os.path.splitext(p)` | `Path(p).suffix`, `.stem` |
| `os.path.exists(p)` | `Path(p).exists()` |

- `join` uses the right separator for your system (`/` or `\`).
- `normpath` removes `..` and `.` parts.

{{< part "ops" "Pitfalls and checks" >}}

- `join` ignores earlier parts if a later part is **absolute**: `os.path.join("a", "/b")` returns `/b`.
- `splitext("archive.tar.gz")` splits only the last extension.
- Use `os.fspath(path)` to turn a `Path` into a string for old APIs.

```python {output=auto}
import os.path

print(os.path.join("uploads", "/etc/passwd"))
print(os.path.splitext("archive.tar.gz"))
```

```text {filename="Output"}
/etc/passwd
('archive.tar', '.gz')
```

{{< part "impact" "What you can do now" >}}

- Read old code that uses `os.path`.
- Translate each call to `pathlib`.
- Avoid the absolute-path trap in `join`.

{{< quiz id="osp1" q="What does os.path.join('a', '/b') return?" options="a/b|/b|a//b" answer="2" explain="An absolute part resets the path." >}}
