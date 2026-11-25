---
title: 'Support for bzip2 compression'
description: 'Compress data with bz2 for smaller files than gzip at the cost of speed, and compare sizes with zlib on your own data.'
linkTitle: 'Support for bzip2 compression'
weight: 3
---

{{< part "concept" "Why bz2" >}}

**bz2** (bzip2) usually makes files smaller than `gzip`, but it is slower. Use it for archives that you write once and read rarely, such as downloads and backups.

The API is almost the same as `gzip`, so it is easy to switch and compare.

{{< part "code" "Compress and compare" >}}

```python {output=auto}
import bz2
import random
import zlib

rng = random.Random(2)
data = "".join(f"user=u{rng.randint(1, 300)} action=login ip=10.0.{rng.randint(0, 9)}.{rng.randint(1, 250)}\n" for _ in range(2000)).encode()
print("original", len(data))
print("zlib    ", len(zlib.compress(data, 9)))
print("bz2     ", len(bz2.compress(data, 9)))
print(bz2.decompress(bz2.compress(data)) == data)
```

```text {filename="Output"}
original 72411
zlib     9329
bz2      5965
True
```

- `bz2.compress(data, compresslevel=9)` takes level `1` to `9`.
- `bz2.open(path, "rt")` reads and writes files like `gzip.open`.
- Sizes depend on your data. Always test your own files.

{{< part "ops" "Pitfalls and checks" >}}

- bz2 uses more CPU and memory than gzip. Test the time before you choose it for a web request.
- Use `bz2.BZ2Decompressor` with `max_length` for untrusted data.
- Damaged input raises `OSError` ("Invalid data stream").

```python {output=auto}
import bz2

try:
    bz2.decompress(b"nope")
except OSError as error:
    print("OSError:", error)
```

```text {filename="Output"}
OSError: Invalid data stream
```

{{< part "impact" "What you can do now" >}}

- Choose between gzip, bz2 and lzma using real size measurements.
- Read and write `.bz2` files.
- Handle bad input safely.

{{< quiz id="bz1" q="What is the usual trade-off of bz2 versus gzip?" options="Smaller files, slower|Larger files, faster|No difference" answer="1" explain="bz2 compresses better but uses more time." >}}
