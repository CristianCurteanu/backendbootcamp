---
title: 'Work with ZIP archives'
description: 'Create, read and extract ZIP archives with zipfile, list contents, and extract safely to avoid path traversal attacks.'
linkTitle: 'Work with ZIP archives'
weight: 5
---

{{< part "concept" "Why zipfile" >}}

A **ZIP** file stores many files in one, each compressed. It is the format for downloads, Office files, Python wheels and many uploads. The **zipfile** module reads and writes it.

{{< part "code" "Create, list, read and extract" >}}

```python {output=auto}
import zipfile
from pathlib import Path
from tempfile import TemporaryDirectory

with TemporaryDirectory() as tmp:
    archive = Path(tmp, "report.zip")
    with zipfile.ZipFile(archive, "w", compression=zipfile.ZIP_DEFLATED) as zf:
        zf.writestr("data/a.txt", "alpha")
        zf.writestr("data/b.txt", "bravo")

    with zipfile.ZipFile(archive) as zf:
        print(zf.namelist())
        print(zf.read("data/a.txt").decode())
        info = zf.getinfo("data/b.txt")
        print(info.file_size, info.compress_size)
        zf.extractall(Path(tmp, "out"))
    print(sorted(p.name for p in Path(tmp, "out", "data").iterdir()))
```

```text {filename="Output"}
['data/a.txt', 'data/b.txt']
alpha
5 7
['a.txt', 'b.txt']
```

- `ZIP_DEFLATED` turns on compression. The default `ZIP_STORED` does not compress.
- `namelist()` lists names. `read(name)` returns bytes.
- `extractall(folder)` writes everything into a folder.

{{< part "ops" "Pitfalls and checks" >}}

{{< callout type="danger" title="Security" >}}
Never extract a ZIP from a user without checking names and sizes. A name like `../../app.py` can write outside your folder (**zip slip**). A small file can also expand to gigabytes (**zip bomb**).
{{< /callout >}}

```python {output=auto}
import zipfile
from pathlib import Path

def is_safe(name: str, target: Path) -> bool:
    return (target / name).resolve().is_relative_to(target.resolve())

target = Path("/srv/out")
print(is_safe("data/a.txt", target), is_safe("../../etc/passwd", target))
```

```text {filename="Output"}
True False
```

- Check `info.file_size` against a limit before you extract.
- `zipfile.BadZipFile` means the file is not a valid ZIP.

{{< part "impact" "What you can do now" >}}

- Create and read ZIP files in code.
- Extract with name and size checks.
- Explain zip slip and zip bomb.

{{< quiz id="zip1" q="What is a zip slip attack?" options="A slow unzip|A name like ../x that escapes the folder|A weak password" answer="2" explain="Bad names can write files outside the target folder." >}}
