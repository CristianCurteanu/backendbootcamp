---
title: 'Compression compatible with gzip'
description: 'Compress and decompress bytes with zlib, check data with checksums, and stream large data in chunks without loading it all.'
linkTitle: 'Compression compatible with gzip'
weight: 1
---

{{< part "concept" "Why compression" >}}

Compression makes data smaller. Smaller data is faster to send and cheaper to store. **zlib** is the base library behind `gzip` and `zip`. It works on **bytes** in memory.

Text and JSON compress very well. Data that is already compressed (JPEG, MP4, zip) does not.

{{< part "code" "Compress, decompress and checksum" >}}

```python {output=auto}
import zlib

text = ("backend " * 500).encode()
packed = zlib.compress(text, level=9)
print(len(text), "->", len(packed), "bytes")
print(zlib.decompress(packed) == text)
print(hex(zlib.crc32(text)))

stream = zlib.compressobj()
chunks = [stream.compress(b"row-%d\n" % i) for i in range(3)] + [stream.flush()]
print(zlib.decompress(b"".join(chunks)).decode().split())
```

```text {filename="Output"}
4000 -> 40 bytes
True
0xd98e2b66
['row-0', 'row-1', 'row-2']
```

- `level` goes from `0` (no compression) to `9` (smallest, slowest). The default `6` is a good balance.
- `crc32` is a quick **checksum** to find damaged data. It is not secure against attackers.
- `compressobj` lets you compress data piece by piece.

{{< part "ops" "Pitfalls and checks" >}}

- Decompressing data from users can create a **zip bomb**: a tiny input that expands to gigabytes. Limit the output size.
- A damaged input raises `zlib.error`.
- Compression uses CPU. For hot paths, measure before you add it.

```python {output=auto}
import zlib

d = zlib.decompressobj()
bomb = zlib.compress(b"0" * 1_000_000)
part = d.decompress(bomb, max_length=1000)
print(len(bomb), len(part), "limited")
```

```text {filename="Output"}
992 1000 limited
```

{{< part "impact" "What you can do now" >}}

- Reduce text data by a large factor in one call.
- Stream large data without extra memory.
- Protect against decompression bombs with `max_length`.

{{< quiz id="zl1" q="What does crc32 help you find?" options="Secret keys|Damaged data|Slow code" answer="2" explain="A checksum changes when data is damaged. It is not a security tool." >}}
