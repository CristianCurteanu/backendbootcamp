---
title: 'Internal Python object serialization'
description: 'Understand marshal, Python''s internal serializer used for .pyc files, and why you should not use it for your own data.'
linkTitle: 'Internal Python object serialization'
weight: 4
---

{{< part "concept" "Why you should know marshal" >}}

**marshal** is the format Python uses inside `.pyc` files. It is fast and small, but it is made for Python's own needs. Its format **can change between Python versions**, and it is not safe for data from others.

You will see it in tools that inspect bytecode. For your own data, use `json`, `pickle` or a database.

{{< part "code" "Dump and load simple values" >}}

```python {output=auto}
import marshal

data = {"id": 7, "tags": ["a", "b"], "ok": True}
blob = marshal.dumps(data)
print(type(blob).__name__)
print(marshal.loads(blob) == data)

code = compile("1 + 2", "<demo>", "eval")
print(eval(marshal.loads(marshal.dumps(code))))
```

```text {filename="Output"}
bytes
True
3
```

- It supports simple types: numbers, strings, lists, dicts, tuples, sets and code objects.
- It cannot save your own classes.
- `marshal.dumps(code)` is how bytecode is stored in `.pyc` files.

{{< part "ops" "Pitfalls and checks" >}}

- The format can change in any Python release. Never store marshal data for the long term.
- Do **not** load marshal data from outside your control. A bad file can crash the interpreter.
- It does not check for loops or damaged input like a full parser does.

| Need | Use |
|---|---|
| Share data with other languages | `json` |
| Save Python objects (trusted) | `pickle` |
| Store records | `sqlite3` |

{{< part "impact" "What you can do now" >}}

- Explain what a `.pyc` file contains.
- Choose a better format for your own data.
- Recognize marshal in bytecode tools.

{{< quiz id="mar1" q="What is marshal mainly used for?" options="Sharing data over the web|Python's own .pyc files|Encrypting data" answer="2" explain="Python uses marshal to store compiled bytecode." >}}
