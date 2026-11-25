---
title: 'Iterate over lines from multiple input streams'
description: 'Read lines from many files or from standard input as one stream with fileinput, and edit files in place safely.'
linkTitle: 'Iterate over lines from multiple input streams'
weight: 3
---

{{< part "concept" "Why fileinput" >}}

Sometimes you want to treat many files as one list of lines, like the `cat` command. **fileinput** does this. It can also read from standard input, so one script works with a pipe or with file names.

{{< part "code" "Read several files as one stream" >}}

```python {output=auto}
import fileinput
from pathlib import Path
from tempfile import TemporaryDirectory

with TemporaryDirectory() as tmp:
    a = Path(tmp, "a.log")
    b = Path(tmp, "b.log")
    a.write_text("ok\nERROR disk\n", encoding="utf-8")
    b.write_text("ok\nERROR network\n", encoding="utf-8")

    with fileinput.input(files=[a, b], encoding="utf-8") as stream:
        for line in stream:
            if "ERROR" in line:
                print(Path(stream.filename()).name, stream.filelineno(), line.strip())
```

```text {filename="Output"}
a.log 2 ERROR disk
b.log 2 ERROR network
```

- `fileinput.input(files=...)` gives one line at a time. It does not load all files into memory.
- `filename()` and `filelineno()` tell you where the line came from.
- With no `files`, it reads the file names from the command line, or standard input.

{{< part "ops" "Pitfalls and checks" >}}

- `inplace=True` rewrites a file. Everything you `print` goes **into the file**, not to the screen. Use a backup: `backup=".bak"`.
- Only one `fileinput` loop can run at a time.
- Set `encoding` yourself, as with all file code.

```python {output=auto}
import fileinput
from pathlib import Path
from tempfile import TemporaryDirectory

with TemporaryDirectory() as tmp:
    f = Path(tmp, "conf.txt")
    f.write_text("mode=dev\n", encoding="utf-8")
    for line in fileinput.input(files=[f], inplace=True, backup=".bak", encoding="utf-8"):
        print(line.replace("dev", "prod"), end="")
    print(f.read_text(encoding="utf-8").strip(), sorted(p.name for p in Path(tmp).iterdir()))
```

```text {filename="Output"}
mode=prod ['conf.txt', 'conf.txt.bak']
```

{{< part "impact" "What you can do now" >}}

- Search many log files with a few lines of code.
- Write command-line tools that accept files or a pipe.
- Edit a file in place with a backup.

{{< quiz id="fi1" q="What happens to print() when inplace=True?" options="It prints to the screen|It writes into the file|It is ignored" answer="2" explain="With `inplace=True`, standard output goes to the file being edited." >}}
