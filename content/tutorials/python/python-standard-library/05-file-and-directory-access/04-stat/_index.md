---
title: 'Interpreting stat() results'
description: 'Read file size, type, permissions and modification time with os.stat and the stat module, and print permissions like ls -l.'
linkTitle: 'Interpreting stat() results'
weight: 4
---

{{< part "concept" "Why stat" >}}

Every file has **metadata**: size, type, permissions, owner and times. The system call `stat` returns it. The **stat** module helps you read the numbers in a clear way.

Backend uses: check upload size, find old files to delete, confirm that a secret file is not readable by everyone.

{{< part "code" "Read file information" >}}

```python {output=auto}
import stat
from datetime import datetime, timezone
from pathlib import Path
from tempfile import TemporaryDirectory

with TemporaryDirectory() as tmp:
    f = Path(tmp, "secret.key")
    f.write_text("abc", encoding="utf-8")
    f.chmod(0o640)

    info = f.stat()
    print(info.st_size, "bytes")
    print(stat.filemode(info.st_mode))
    print(stat.S_ISREG(info.st_mode), stat.S_ISDIR(info.st_mode))
    modified = datetime.fromtimestamp(info.st_mtime, tz=timezone.utc)
    print(modified.year >= 2026)
```

```text {filename="Output"}
3 bytes
-rw-r-----
True False
True
```

- `st_size` is the size in bytes. `st_mtime` is the last change time (seconds since 1970).
- `stat.filemode(mode)` gives text like `-rw-r-----`.
- `S_ISREG` and `S_ISDIR` test the file type. For simple checks use `Path.is_file()`.

{{< part "ops" "Pitfalls and checks" >}}

- Permission bits work on Linux and macOS. On Windows, only some are meaningful.
- Check permissions on key files: no "other" access means the last three characters are `---`.
- A file can change between your `stat` and your next step (a race). Open it and use `os.fstat(fd)` when this matters.

| Symptom | Likely cause | First action |
|---|---|---|
| `PermissionError` | File mode or owner blocks you | Print `stat.filemode(...)` |
| Wrong modified time | Used local time by mistake | Convert with `tz=timezone.utc` |

{{< part "impact" "What you can do now" >}}

- Read size, type and permissions of any file.
- Show permissions in `ls -l` style.
- Find files by age using `st_mtime`.

{{< quiz id="stat1" q="What does st_size give?" options="Size in bytes|Number of lines|Free disk space" answer="1" explain="`st_size` is the file size in bytes." >}}
