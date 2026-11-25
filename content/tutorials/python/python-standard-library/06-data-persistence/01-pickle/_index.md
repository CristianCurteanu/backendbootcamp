---
title: 'Python object serialization'
description: 'Save Python objects to bytes with pickle and load them back, and learn why you must never unpickle data from untrusted sources.'
linkTitle: 'Python object serialization'
weight: 1
---

{{< part "concept" "Why pickle" >}}

**Serialization** turns an object into bytes so you can save it or send it. **pickle** can serialize almost any Python object: custom classes, sets, nested data.

But pickle is **only for data you trust**. Loading a pickle can run any code. For data that you share, use `json`.

{{< part "code" "Save and load an object" >}}

```python {output=auto}
import pickle
from dataclasses import dataclass

@dataclass
class Job:
    id: int
    tags: set[str]

job = Job(7, {"urgent", "billing"})
data = pickle.dumps(job)
print(type(data).__name__, len(data) > 0)

restored = pickle.loads(data)
print(restored == job, restored)
```

```text {filename="Output"}
bytes True
True Job(id=7, tags={'billing', 'urgent'})
```

- `dumps` returns bytes. `dump(obj, file)` writes to a file opened with `"wb"`.
- `loads` and `load` read it back. The class must be importable when you load.
- JSON cannot store a `set`. Pickle can.

{{< part "ops" "Pitfalls and checks" >}}

{{< callout type="danger" title="Security" >}}
`pickle.loads()` on data from a user, a network or a cache that others can write is **remote code execution**. Never do it.
{{< /callout >}}

- Pickles can break when you rename a class or move it to another module.
- A pickle made by a new Python version may not open on an old one. Set `protocol=` if you need compatibility.
- Use `json`, `msgpack` or a database for long-term storage and for other languages.

```python {output=auto}
import json

print(json.dumps({"id": 7, "tags": sorted({"urgent", "billing"})}))
```

```text {filename="Output"}
{"id": 7, "tags": ["billing", "urgent"]}
```

{{< part "impact" "What you can do now" >}}

- Save and restore Python objects for caches and quick scripts.
- Explain the security risk of pickle.
- Choose JSON when data crosses a trust boundary.

{{< quiz id="pk1" q="Is it safe to unpickle data sent by a user?" options="Yes|No, it can run code|Only on Linux" answer="2" explain="Unpickling can execute arbitrary code. Trust the source first." >}}
