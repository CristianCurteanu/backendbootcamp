---
title: 'Object-oriented filesystem paths'
description: 'Handle files and folders with pathlib. Build paths with /, read and write text, list and search folders on any operating system.'
linkTitle: 'Object-oriented filesystem paths'
weight: 1
---

{{< part "concept" "Why pathlib" >}}

A file path is not just text. It has parts: folder, name, extension. **pathlib** treats a path as an **object**, so you can join, inspect, read and search without string tricks. It works the same on Windows, macOS and Linux.

Use `pathlib` for all new code. It replaces most of `os.path`.

{{< part "code" "Build paths and read files" >}}

```python {output=auto}
from pathlib import Path
from tempfile import TemporaryDirectory

with TemporaryDirectory() as tmp:
    root = Path(tmp)
    config = root / "app" / "settings.json"
    config.parent.mkdir(parents=True, exist_ok=True)
    config.write_text('{"debug": true}', encoding="utf-8")

    print(config.name, config.stem, config.suffix)
    print(config.parent.name, config.exists(), config.is_file())
    print(config.read_text(encoding="utf-8"))

    (root / "app" / "notes.txt").write_text("hi", encoding="utf-8")
    print(sorted(p.name for p in (root / "app").glob("*.txt")))
```

```text {filename="Output"}
settings.json settings .json
app True True
{"debug": true}
['notes.txt']
```

- `/` joins path parts. It is safer than `+` with slashes.
- `.name`, `.stem`, `.suffix` and `.parent` read parts of a path.
- `mkdir(parents=True, exist_ok=True)` creates all folders and does not fail if they exist.
- `glob("*.txt")` finds files by pattern. `rglob` searches all subfolders.

{{< part "ops" "Pitfalls and checks" >}}

- Always pass `encoding="utf-8"` to `read_text` and `write_text`. The default depends on the computer.
- Check `exists()` before reading, or catch `FileNotFoundError`.
- Never build a path from user input without checking it. A name like `../../etc/passwd` can escape your folder.

```python {output=auto}
from pathlib import Path

base = Path("/srv/uploads")
user_input = "../secret.txt"
target = (base / user_input).resolve()
print(target.is_relative_to(base))
```

```text {filename="Output"}
False
```

{{< part "impact" "What you can do now" >}}

- Join, split and inspect paths on every operating system.
- Read, write, list and search files with short code.
- Block path traversal with `resolve()` and `is_relative_to()`.

{{< quiz id="path1" q="Which operator joins path parts in pathlib?" options="+|/|&" answer="2" explain="Use `/`, for example `Path('a') / 'b'`." >}}
