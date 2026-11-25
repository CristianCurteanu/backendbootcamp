---
title: 'Encode and decode XDR data'
description: 'xdrlib was removed in Python 3.13. Use struct and json to encode binary data, with a short guide to the replacement.'
linkTitle: 'Encode and decode XDR data'
weight: 4
---

{{< part "concept" "Removed in Python 3.13" >}}

{{< callout type="warning" title="Removed module" >}}
`xdrlib` was **removed in Python 3.13**. It read and wrote **XDR**, an old binary format from Sun RPC and NFS. On Python 3.13 and newer, `import xdrlib` raises `ModuleNotFoundError`.
{{< /callout >}}

Few new projects need XDR. For binary data in Python now, use `struct`. For data between systems, use `json`, Protocol Buffers or MessagePack.

{{< part "code" "Replace it with struct" >}}

XDR stores numbers in **big-endian** order. `struct` can do the same with `>`.

```python {output=auto}
import struct

packed = struct.pack(">iI", -5, 7)
print(packed.hex(), len(packed))
print(struct.unpack(">iI", packed))

name = "Ana".encode()
record = struct.pack(">I", len(name)) + name
size = struct.unpack(">I", record[:4])[0]
print(record[4:4 + size].decode())
```

- `>` means big-endian. `i` is a signed 4-byte integer. `I` is unsigned.
- XDR strings have a length first. You can build the same with `struct.pack(">I", length)`.
- You must handle XDR **padding** (4-byte alignment) yourself.

{{< part "ops" "Pitfalls and checks" >}}

- Need real XDR? Install a third-party package such as `xdrlib3`. Pin its version.
- Always check lengths before you read. A wrong length in input data can cause errors or huge reads.
- Write tests with known bytes from the other system.

| Need | Use instead |
|---|---|
| Fixed binary layout | `struct` |
| Web or API data | `json` |
| Typed messages, many languages | Protocol Buffers |

{{< part "impact" "What you can do now" >}}

- Know that `xdrlib` is gone in Python 3.13.
- Pack and unpack big-endian numbers with `struct`.
- Choose a better format for new projects.

{{< quiz id="xdr1" q="Which module can pack big-endian integers now?" options="xdrlib|struct|json" answer="2" explain="`struct.pack('>i', value)` writes a big-endian integer." >}}
