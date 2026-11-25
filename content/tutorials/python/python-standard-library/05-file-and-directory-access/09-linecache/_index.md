---
title: 'Random access to text lines'
description: 'Read single lines from files quickly with linecache, which caches file contents. Useful for tracebacks and error context.'
linkTitle: 'Random access to text lines'
weight: 9
---

{{< part "concept" "Why linecache" >}}

Sometimes you need only line 120 of a file, for example to show the code near an error. **linecache** reads the file once, keeps it in memory, and returns any line by number. Python itself uses it to print tracebacks.

{{< part "code" "Get a line by number" >}}

```python {output=auto}
import linecache
from pathlib import Path
from tempfile import TemporaryDirectory

with TemporaryDirectory() as tmp:
    f = Path(tmp, "server.log")
    f.write_text("start\nready\nERROR db down\nstop\n", encoding="utf-8")

    print(linecache.getline(str(f), 3).strip())
    print(repr(linecache.getline(str(f), 99)))

    start = 2
    context = [linecache.getline(str(f), n).strip() for n in range(start - 1, start + 2)]
    print(context)
    linecache.clearcache()
```

```text {filename="Output"}
ERROR db down
''
['start', 'ready', 'ERROR db down']
```

- Line numbers start at `1`.
- A line that does not exist returns an empty string `''`, not an error.
- `clearcache()` frees the memory.

{{< part "ops" "Pitfalls and checks" >}}

- If the file changes on disk, call `linecache.checkcache(filename)` or you may read old lines.
- The cache holds whole files in memory. Do not use it on very large files, and call `clearcache()` when done.
- For one pass over a big log, a normal `for line in file` loop is better.

```python {output=auto}
import linecache

print(repr(linecache.getline("/no/such/file.txt", 1)))
```

```text {filename="Output"}
''
```

{{< part "impact" "What you can do now" >}}

- Show the lines around an error.
- Read one line without writing a loop.
- Know when to clear or refresh the cache.

{{< quiz id="lc1" q="What does getline return for a missing line?" options="An error|An empty string|None" answer="2" explain="`linecache.getline` returns `''` when the line does not exist." >}}
