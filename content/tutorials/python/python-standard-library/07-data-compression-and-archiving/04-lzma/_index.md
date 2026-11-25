---
title: 'Compression using the LZMA algorithm'
description: 'Compress with lzma (.xz files) for the smallest output, choose a preset, and read and write xz archives.'
linkTitle: 'Compression using the LZMA algorithm'
weight: 4
---

{{< part "concept" "Why lzma" >}}

**lzma** produces `.xz` files. It often gives the smallest size of the standard options. Linux packages and software releases use it. Compression is slow, but decompression is fast.

{{< part "code" "Compress and compare presets" >}}

```python {output=auto}
import lzma
import random
import zlib

rng = random.Random(1)
data = "".join(f"GET /api/orders?page={i % 50} 200 {rng.randint(5, 90)}ms\n" for i in range(3000)).encode()
print("original", len(data))
print("zlib    ", len(zlib.compress(data, 9)))
for preset in (0, 6, 9):
    print(f"xz p{preset}  ", len(lzma.compress(data, preset=preset)))
print(lzma.decompress(lzma.compress(data)) == data)
```

```text {filename="Output"}
original 98234
zlib     8235
xz p0   7716
xz p6   4552
xz p9   4552
True
```

- `preset` goes from `0` (fast) to `9` (smallest). Add `| lzma.PRESET_EXTREME` for even slower, smaller output.
- `lzma.open(path, "rt")` works like `gzip.open`.
- Higher presets need much more memory when compressing.

{{< part "ops" "Pitfalls and checks" >}}

- Preset `9` can need hundreds of MB of memory. Check this before you run it on a small server.
- Use `lzma.LZMADecompressor` with `max_length` for untrusted data.
- `lzma.LZMAError` means the data is damaged.

| Need | Choice |
|---|---|
| Fast, works everywhere | `gzip` |
| Smaller, still common | `bz2` |
| Smallest, slow to write | `lzma` |

{{< part "impact" "What you can do now" >}}

- Create `.xz` data and files.
- Pick a preset based on time and memory.
- Decide between gzip, bz2 and lzma.

{{< quiz id="lz1" q="Which format is usually the smallest?" options="gzip|lzma (xz)|zlib level 1" answer="2" explain="lzma usually gives the best compression ratio." >}}
