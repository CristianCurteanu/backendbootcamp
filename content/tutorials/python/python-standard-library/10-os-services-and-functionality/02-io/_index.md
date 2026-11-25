---
title: 'Core tools for working with streams'
description: 'Understand streams with the io module. Use StringIO and BytesIO as in-memory files and see how text and binary modes differ.'
linkTitle: 'Core tools for working with streams'
weight: 2
---

{{< part "concept" "Why the io module" >}}

A **stream** is anything you can read from or write to: a file, a network socket, memory. The **io** module defines the types behind `open()`. Two are very useful: **StringIO** (text in memory) and **BytesIO** (bytes in memory). They behave like files, so you can test code without touching the disk.

{{< part "code" "In-memory files" >}}

```python {output=auto}
import io

def count_lines(stream: io.TextIOBase) -> int:
    return sum(1 for _ in stream)

fake_file = io.StringIO("one\ntwo\nthree\n")
print(count_lines(fake_file))

out = io.StringIO()
print("report", file=out)
out.write("done")
print(repr(out.getvalue()))

raw = io.BytesIO("héllo".encode("utf-8"))
print(raw.read(2), raw.tell())
text = io.TextIOWrapper(io.BytesIO(b"caf\xc3\xa9"), encoding="utf-8")
print(text.read())
```

```text {filename="Output"}
3
'report\ndone'
b'h\xc3' 2
café
```

- Functions that accept a file object also accept `StringIO` and `BytesIO`. This makes tests simple.
- `getvalue()` returns everything written so far.
- `TextIOWrapper` adds text decoding on top of a byte stream.

{{< part "ops" "Pitfalls and checks" >}}

- Text streams use `str`. Binary streams use `bytes`. Mixing them raises `TypeError`.
- After writing, the position is at the end. Call `seek(0)` before you read the same object.
- Always set `encoding` for text files. The default depends on the system.

```python {output=auto}
import io

buf = io.StringIO()
buf.write("abc")
print(repr(buf.read()))
buf.seek(0)
print(repr(buf.read()))
```

```text {filename="Output"}
''
'abc'
```

{{< part "impact" "What you can do now" >}}

- Test file-reading code without real files.
- Build text in memory and return it.
- Convert between bytes and text streams.

{{< quiz id="io1" q="Which class is an in-memory TEXT file?" options="BytesIO|StringIO|TextFile" answer="2" explain="`StringIO` holds text. `BytesIO` holds bytes." >}}
