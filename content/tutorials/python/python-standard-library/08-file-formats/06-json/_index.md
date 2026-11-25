---
title: 'JSON encoder and decoder'
description: 'Convert Python data to JSON and back with json. Handle dates and custom types, pretty-print, and catch invalid JSON errors.'
linkTitle: 'JSON encoder and decoder'
weight: 6
---

{{< part "concept" "Why JSON" >}}

**JSON** is the standard text format for APIs, config and logs. Almost every language reads it. Python's **json** module turns `dict`, `list`, `str`, numbers, `True`, `False` and `None` into JSON text and back.

{{< part "code" "Dump, load and custom types" >}}

```python {output=auto}
import json
from dataclasses import asdict, dataclass
from datetime import datetime, timezone

@dataclass
class Order:
    id: int
    total: float
    created: datetime

order = Order(7, 19.9, datetime(2026, 11, 25, tzinfo=timezone.utc))

def encode(value: object) -> str:
    if isinstance(value, datetime):
        return value.isoformat()
    raise TypeError(f"Cannot encode {type(value).__name__}")

text = json.dumps(asdict(order), default=encode, indent=2, sort_keys=True)
print(text)
print(json.loads(text)["id"])
```

- `dumps` returns text. `dump(obj, file)` writes to a file. `loads` and `load` read.
- `indent=2` makes it readable. `sort_keys=True` makes the output stable.
- `default=` is called for types JSON does not know.
- `ensure_ascii=False` keeps non-English letters readable.

{{< part "ops" "Pitfalls and checks" >}}

- Python `True` becomes `true`, `None` becomes `null`. Dictionary keys always become strings.
- Bad input raises `json.JSONDecodeError`, which tells you the line and column.
- JSON has no date type. Store dates as ISO text.
- Very large numbers and `NaN` can break other systems. Avoid `NaN`.

```python {output=auto}
import json

try:
    json.loads('{"id": 1,}')
except json.JSONDecodeError as error:
    print(error.msg, "line", error.lineno, "col", error.colno)

print(json.dumps({1: "a", "ok": None}))
```

{{< part "impact" "What you can do now" >}}

- Send and receive JSON in APIs.
- Encode dates and your own classes.
- Read clear errors from invalid JSON.

{{< quiz id="js1" q="What does Python None become in JSON?" options="none|null|0" answer="2" explain="`None` becomes `null`." >}}
