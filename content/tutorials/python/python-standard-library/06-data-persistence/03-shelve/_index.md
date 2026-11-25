---
title: 'Python object persistence'
description: 'Store Python objects in a file as if it were a dictionary using shelve. Good for small persistent caches and settings.'
linkTitle: 'Python object persistence'
weight: 3
---

{{< part "concept" "Why shelve" >}}

A **shelf** looks like a dictionary, but it saves to disk. Keys are strings. Values can be almost any Python object (it uses `pickle` inside). It is a simple way to keep small data between program runs, without a database.

For data that many programs write at the same time, use a real database such as SQLite.

{{< part "code" "A persistent dictionary" >}}

```python {output=auto}
import shelve
from pathlib import Path
from tempfile import TemporaryDirectory

with TemporaryDirectory() as tmp:
    path = str(Path(tmp, "cache"))

    with shelve.open(path) as db:
        db["user:1"] = {"name": "Ana", "visits": 1}
        db["settings"] = ["dark", "en"]

    with shelve.open(path) as db:
        print(sorted(db.keys()))
        print(db["user:1"]["name"])
        print(db.get("missing", "default"))
```

```text {filename="Output"}
['settings', 'user:1']
Ana
default
```

- Use `with shelve.open(...)` so the file is closed and saved.
- Keys must be `str`. Values are pickled.
- The shelf has `get`, `keys`, `del`, and `in` just like a dictionary.

{{< part "ops" "Pitfalls and checks" >}}

- A shelf is **not safe for many writers**. Two programs writing at once can corrupt it.
- Changing a value **inside** a stored object does not save it:

```python {output=auto}
import shelve
from pathlib import Path
from tempfile import TemporaryDirectory

with TemporaryDirectory() as tmp:
    path = str(Path(tmp, "d"))
    with shelve.open(path) as db:
        db["list"] = [1]
        db["list"].append(2)
        print(db["list"])
        items = db["list"]
        items.append(2)
        db["list"] = items
        print(db["list"])
```

```text {filename="Output"}
[1]
[1, 2]
```

- Read, change, then **assign again**. Or open with `writeback=True` (uses more memory).
- Pickle security rules apply. Never open a shelf from an unknown source.

{{< part "impact" "What you can do now" >}}

- Keep small data between runs with dictionary syntax.
- Avoid the "changed but not saved" bug.
- Know when to move to SQLite.

{{< quiz id="shv1" q="What type must shelve keys be?" options="int|str|any object" answer="2" explain="Shelve keys must be strings." >}}
