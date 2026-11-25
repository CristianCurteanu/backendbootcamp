---
title: 'Read and write tar archive files'
description: 'Read and write tar archives, including .tar.gz, with tarfile. Use extraction filters to stay safe with untrusted archives.'
linkTitle: 'Read and write tar archive files'
weight: 6
---

{{< part "concept" "Why tarfile" >}}

**tar** is the standard archive format on Linux and macOS. It keeps file names, folders, permissions and times. With compression you get `.tar.gz` or `.tar.xz`. Docker images and source releases use it.

{{< part "code" "Create and read a .tar.gz" >}}

```python {output=auto}
import io
import tarfile
from pathlib import Path
from tempfile import TemporaryDirectory

with TemporaryDirectory() as tmp:
    src = Path(tmp, "src")
    src.mkdir()
    (src / "app.py").write_text("print('hi')", encoding="utf-8")
    archive = Path(tmp, "release.tar.gz")

    with tarfile.open(archive, "w:gz") as tar:
        tar.add(src, arcname="release")

    with tarfile.open(archive, "r:gz") as tar:
        print(tar.getnames())
        tar.extractall(Path(tmp, "out"), filter="data")
    print((Path(tmp, "out", "release", "app.py")).read_text(encoding="utf-8"))
```

```text {filename="Output"}
['release', 'release/app.py']
print('hi')
```

- Modes: `"w:gz"` write gzip, `"r:gz"` read gzip, `"w:xz"` write xz. Use `"r:*"` to detect automatically.
- `arcname` sets the name inside the archive.
- `filter="data"` makes extraction safer.

{{< part "ops" "Pitfalls and checks" >}}

{{< callout type="danger" title="Security" >}}
A tar file can contain links and names that point outside your folder. Always pass `filter="data"` when you extract archives you did not make. It blocks absolute paths, `..`, special files and dangerous links.
{{< /callout >}}

- In Python 3.12 and 3.13, extraction without a filter shows a warning. Python 3.14 uses `filter="data"` by default.
- Tar stores owner and permissions. The `data` filter removes risky ones.
- Wrong mode (for example `"r:gz"` on a plain tar) raises `tarfile.ReadError`.

{{< part "impact" "What you can do now" >}}

- Create `.tar.gz` backups and releases.
- Extract archives with the safe `data` filter.
- Choose between zip and tar for your platform.

{{< quiz id="tar1" q="Which argument makes tar extraction safer?" options="filter='data'|mode='safe'|check=True" answer="1" explain="The `data` filter blocks unsafe paths, links and special files." >}}
