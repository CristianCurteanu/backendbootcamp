---
title: 'Generate temporary files and directories'
description: 'Create temporary files and folders safely with tempfile, and make sure they are deleted automatically after use.'
linkTitle: 'Generate temporary files and directories'
weight: 6
---

{{< part "concept" "Why tempfile" >}}

Programs need scratch space: a download in progress, a test folder, a converted image. If you invent a name like `/tmp/data.txt`, two programs can use the same name, and another user can guess it. **tempfile** creates a **unique and safe** name and cleans up for you.

{{< part "code" "Temporary files and folders" >}}

```python {output=auto}
import tempfile
from pathlib import Path

with tempfile.TemporaryDirectory() as folder:
    work = Path(folder, "work.txt")
    work.write_text("temporary", encoding="utf-8")
    print(work.exists())
print(Path(folder).exists())

with tempfile.NamedTemporaryFile("w+", suffix=".csv", encoding="utf-8") as f:
    f.write("id,name\n1,Ana\n")
    f.seek(0)
    print(f.read().splitlines()[0], f.name.endswith(".csv"))
```

```text {filename="Output"}
True
False
id,name True
```

- `TemporaryDirectory()` removes the folder and everything inside at the end of the `with` block.
- `NamedTemporaryFile` has a real name, so other code can open it. It is deleted when closed.
- `mkstemp()` returns a low-level handle and a path. You must delete the file yourself.

{{< part "ops" "Pitfalls and checks" >}}

- **Never** use `tempfile.mktemp()`. It only returns a name, and attackers can create the file first.
- Put the folder on the same disk as the final file if you plan to rename it. Use `dir=` to choose.
- On Windows, you cannot open a `NamedTemporaryFile` a second time while it is open. Use `delete=False` and remove it yourself.

```python {output=auto}
import tempfile

print(tempfile.gettempdir() != "")
print(tempfile.mkdtemp.__name__)
```

```text {filename="Output"}
True
mkdtemp
```

{{< part "impact" "What you can do now" >}}

- Create scratch files that cannot collide.
- Clean up automatically with `with`.
- Avoid the unsafe `mktemp`.

{{< quiz id="tmp1" q="Which tempfile function is NOT safe to use?" options="TemporaryDirectory|mktemp|mkstemp" answer="2" explain="`mktemp` returns only a name and has a race condition." >}}
