---
title: 'Support for gzip files'
description: 'Read and write .gz files with gzip, in text or binary mode, and compress bytes in memory for HTTP responses and backups.'
linkTitle: 'Support for gzip files'
weight: 2
---

{{< part "concept" "Why gzip" >}}

**gzip** is the most common compression format on the web and on servers: `.gz` log files, HTTP `Content-Encoding: gzip`, and `.tar.gz` backups. The `gzip` module reads and writes these files like normal files.

{{< part "code" "Write and read a .gz file" >}}

```python {output=auto}
import gzip
from pathlib import Path
from tempfile import TemporaryDirectory

with TemporaryDirectory() as tmp:
    path = Path(tmp, "app.log.gz")
    with gzip.open(path, "wt", encoding="utf-8") as f:
        for i in range(1000):
            f.write(f"INFO request {i}\n")

    print(path.stat().st_size < 3000)
    with gzip.open(path, "rt", encoding="utf-8") as f:
        print(next(f).strip(), sum(1 for _ in f) + 1)

blob = gzip.compress(b"hello " * 100)
print(len(blob), gzip.decompress(blob)[:11])
```

```text {filename="Output"}
True
INFO request 0 1000
32 b'hello hello'
```

- Mode `"wt"` and `"rt"` mean text. `"wb"` and `"rb"` mean bytes.
- You can loop over lines: only a small part is in memory at once.
- `gzip.compress` and `gzip.decompress` work on bytes.

{{< part "ops" "Pitfalls and checks" >}}

- Always set `encoding` in text mode.
- Appending to a `.gz` file (`"ab"`) works, but each append adds a new member. Many tools read it fine.
- `gzip.BadGzipFile` means the file is not gzip or is damaged.

```python {output=auto}
import gzip

try:
    gzip.decompress(b"not gzip data")
except gzip.BadGzipFile as error:
    print(type(error).__name__)
```

```text {filename="Output"}
BadGzipFile
```

{{< part "impact" "What you can do now" >}}

- Read and write compressed logs line by line.
- Compress an HTTP response body.
- Handle damaged files with a clear error.

{{< quiz id="gz1" q="Which mode reads a .gz file as text?" options="rb|rt|r+" answer="2" explain="mode rt reads and decodes text." >}}
