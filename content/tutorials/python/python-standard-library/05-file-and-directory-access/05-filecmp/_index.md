---
title: 'File and directory comparisons'
description: 'Compare files and folders with filecmp. Find identical, different and missing files between two directories.'
linkTitle: 'File and directory comparisons'
weight: 5
---

{{< part "concept" "Why filecmp" >}}

After a copy or a deploy you often ask: "Are these two files the same?" or "What is different between these two folders?" **filecmp** answers both without a shell tool.

{{< part "code" "Compare files and directories" >}}

```python {output=auto}
import filecmp
from pathlib import Path
from tempfile import TemporaryDirectory

with TemporaryDirectory() as tmp:
    left, right = Path(tmp, "left"), Path(tmp, "right")
    left.mkdir(); right.mkdir()
    (left / "a.txt").write_text("same", encoding="utf-8")
    (right / "a.txt").write_text("same", encoding="utf-8")
    (left / "b.txt").write_text("one", encoding="utf-8")
    (right / "b.txt").write_text("two", encoding="utf-8")
    (left / "only_left.txt").write_text("x", encoding="utf-8")

    print(filecmp.cmp(left / "a.txt", right / "a.txt", shallow=False))
    result = filecmp.dircmp(left, right)
    print("same:", result.same_files)
    print("different:", result.diff_files)
    print("only left:", result.left_only)
```

```text {filename="Output"}
True
same: ['a.txt']
different: ['b.txt']
only left: ['only_left.txt']
```

- `cmp(a, b, shallow=False)` compares **content**. The default `shallow=True` compares only size and time, which can be wrong.
- `dircmp` compares two folders. It reports `same_files`, `diff_files`, `left_only` and `right_only`.

{{< part "ops" "Pitfalls and checks" >}}

- Always use `shallow=False` when correctness matters.
- `dircmp` compares only the top level. Use `result.subdirs` or `report_full_closure()` for subfolders.
- For huge files, a hash (`hashlib`) is a good alternative, and you can store it.

{{< part "impact" "What you can do now" >}}

- Check that a backup equals the original.
- List what changed between two release folders.
- Choose between `filecmp` and hashes.

{{< quiz id="fc1" q="Which setting compares real file content?" options="shallow=True|shallow=False|deep=True" answer="2" explain="`shallow=False` reads and compares the bytes." >}}
