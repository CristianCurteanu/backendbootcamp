---
title: 'Unix style pathname pattern expansion'
description: 'Find files by pattern with glob. Use wildcards, search subfolders recursively and sort results for stable output.'
linkTitle: 'Unix style pathname pattern expansion'
weight: 7
---

{{< part "concept" "Why glob" >}}

You often need "all CSV files in this folder" or "every `.py` file in the project". **glob** finds file names that match a pattern with wildcards, like the shell does.

{{< part "code" "Wildcards and recursion" >}}

```python {output=auto}
import glob
import os
from pathlib import Path
from tempfile import TemporaryDirectory

with TemporaryDirectory() as tmp:
    for name in ["a.csv", "b.csv", "notes.txt", "sub/c.csv"]:
        p = Path(tmp, name)
        p.parent.mkdir(exist_ok=True)
        p.write_text("x", encoding="utf-8")

    top = sorted(os.path.relpath(p, tmp) for p in glob.glob(os.path.join(tmp, "*.csv")))
    deep = sorted(os.path.relpath(p, tmp) for p in glob.glob(os.path.join(tmp, "**", "*.csv"), recursive=True))
    print(top)
    print(deep)
```

```text {filename="Output"}
['a.csv', 'b.csv']
['a.csv', 'b.csv', 'sub/c.csv']
```

- `*` matches any text in one name. `?` matches one character. `[ab]` matches `a` or `b`.
- `**` with `recursive=True` goes into all subfolders.
- `Path.glob()` and `Path.rglob()` do the same job with `pathlib`.

{{< part "ops" "Pitfalls and checks" >}}

- The order of results is **not guaranteed**. Use `sorted()`.
- Hidden files (names starting with `.`) are not matched by `*`.
- Escape special characters in user input with `glob.escape()`. A name with `[` can change the meaning of the pattern.
- `glob` returns a list. For a huge tree, use `glob.iglob` to get one result at a time.

```python {output=auto}
import glob

print(glob.escape("report[1].csv"))
```

```text {filename="Output"}
report[[]1].csv
```

{{< part "impact" "What you can do now" >}}

- Find files by pattern, in one folder or in a whole tree.
- Get stable results with `sorted`.
- Protect patterns built from user text.

{{< quiz id="glob1" q="Which pattern finds .py files in all subfolders?" options="*.py|**/*.py with recursive=True|?.py" answer="2" explain="`**` plus `recursive=True` searches every level." >}}
