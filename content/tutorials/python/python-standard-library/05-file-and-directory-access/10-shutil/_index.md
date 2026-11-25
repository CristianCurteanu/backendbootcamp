---
title: 'High-level file operations'
description: 'Copy, move, delete and archive files and folders with shutil, and find programs on the PATH with shutil.which.'
linkTitle: 'High-level file operations'
weight: 10
---

{{< part "concept" "Why shutil" >}}

`pathlib` can read and write, but it cannot copy a whole folder. **shutil** (shell utilities) handles high-level jobs: copy, move, delete trees, create archives, and find commands.

{{< part "code" "Copy, move, archive and delete" >}}

```python {output=auto}
import shutil
from pathlib import Path
from tempfile import TemporaryDirectory

with TemporaryDirectory() as tmp:
    root = Path(tmp)
    src = root / "project"
    (src / "docs").mkdir(parents=True)
    (src / "docs" / "guide.txt").write_text("hello", encoding="utf-8")

    shutil.copytree(src, root / "backup")
    shutil.copy2(src / "docs" / "guide.txt", root / "copy.txt")
    archive = shutil.make_archive(str(root / "release"), "zip", root_dir=src)
    print(Path(archive).name, Path(archive).stat().st_size > 0)

    shutil.move(root / "copy.txt", root / "moved.txt")
    shutil.rmtree(root / "backup")
    print(sorted(p.name for p in root.iterdir()))

print(shutil.which("python3") is not None)
```

```text {filename="Output"}
release.zip True
['moved.txt', 'project', 'release.zip']
True
```

- `copy2` keeps file times. `copytree` copies a folder with its content.
- `make_archive` creates `zip` or `tar` files.
- `shutil.which("git")` returns the full path of a command, or `None`.

{{< part "ops" "Pitfalls and checks" >}}

- `rmtree` deletes **without asking** and cannot be undone. Print the path first. Never pass a path built from user input.
- `move` across disks is copy then delete. If the copy fails halfway, you can have partial data.
- `copytree` fails if the target exists. Use `dirs_exist_ok=True` when you want to merge.

{{< callout type="danger" >}}
Run `shutil.rmtree` only on paths you created yourself, like a temp folder. A wrong variable can delete real data.
{{< /callout >}}

{{< part "impact" "What you can do now" >}}

- Copy and move whole folders in code.
- Create a zip release with one call.
- Find a program before you run it.

{{< quiz id="sh1" q="Which function copies a whole folder?" options="shutil.copy|shutil.copytree|shutil.move" answer="2" explain="`copytree` copies a directory and its contents." >}}
