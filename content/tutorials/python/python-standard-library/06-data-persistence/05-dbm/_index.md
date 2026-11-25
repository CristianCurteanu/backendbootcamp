---
title: 'Interfaces to Unix databases'
description: 'Store key-value bytes on disk with the dbm module, a very simple and fast persistent dictionary.'
linkTitle: 'Interfaces to Unix databases'
weight: 5
---

{{< part "concept" "Why dbm" >}}

**dbm** is the simplest persistent store: keys and values are **bytes**, saved in a file. It is like `shelve` without pickle. Use it for a tiny cache or counters when a full database is too much.

{{< part "code" "Open, write and read" >}}

```python {output=auto}
import dbm
from pathlib import Path
from tempfile import TemporaryDirectory

with TemporaryDirectory() as tmp:
    path = str(Path(tmp, "counters"))

    with dbm.open(path, "c") as db:
        db["visits"] = "10"
        db[b"errors"] = b"0"

    with dbm.open(path, "r") as db:
        print(db["visits"], db.get("errors"))
        print(sorted(k.decode() for k in db.keys()))
```

```text {filename="Output"}
b'10' b'0'
['errors', 'visits']
```

- Modes: `"r"` read only, `"w"` read and write, `"c"` create if missing, `"n"` always new.
- Strings are saved as bytes. What you read back is `bytes`.
- `keys()`, `get()`, `del` and `in` work like a dictionary.

{{< part "ops" "Pitfalls and checks" >}}

- Values come back as **bytes**. Use `.decode()` to get text, and `int()` for numbers.
- The file format depends on which backend is installed. Do not copy a dbm file to another system and expect it to open.
- No locking: do not write from two programs at once.

```python {output=auto}
import dbm
from pathlib import Path
from tempfile import TemporaryDirectory

with TemporaryDirectory() as tmp:
    with dbm.open(str(Path(tmp, "c")), "c") as db:
        db["n"] = "5"
        print(db["n"], int(db["n"]) + 1)
```

```text {filename="Output"}
b'5' 6
```

{{< part "impact" "What you can do now" >}}

- Keep tiny key-value data on disk.
- Convert stored bytes back to text and numbers.
- Choose between `dbm`, `shelve` and `sqlite3`.

{{< quiz id="dbm1" q="What type are values when read back from dbm?" options="str|bytes|int" answer="2" explain="dbm stores and returns bytes." >}}
