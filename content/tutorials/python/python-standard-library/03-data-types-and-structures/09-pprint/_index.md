---
title: 'Data pretty printer'
description: 'Print nested dictionaries and lists in a readable way with pprint, and control width, depth and key order.'
linkTitle: 'Data pretty printer'
weight: 9
---

{{< part "concept" "Why pretty print" >}}

`print()` puts a big nested dict on one long line. **pprint** breaks it into lines with indentation, so you can read API responses, configs and test data.

Use it for debugging and logs on your machine. For machine-readable output, use `json.dumps(indent=2)`.

{{< part "code" "Print nested data" >}}

```python {output=auto}
from pprint import pformat, pprint

data = {
    "user": {"id": 7, "name": "Ana", "roles": ["admin", "dev"]},
    "active": True,
    "tags": ["backend", "python", "tutorial", "free", "online", "course"],
}
pprint(data, width=50, sort_dicts=False)
text = pformat(data["user"], compact=True)
print(len(text) > 0)
```

```text {filename="Output"}
{'user': {'id': 7,
          'name': 'Ana',
          'roles': ['admin', 'dev']},
 'active': True,
 'tags': ['backend',
          'python',
          'tutorial',
          'free',
          'online',
          'course']}
True
```

- `width` sets the maximum line length.
- `sort_dicts=False` keeps the original key order. The default sorts keys.
- `depth=2` hides deeper levels with `...`.
- `pformat` returns a string instead of printing. Use it with `logging`.

{{< part "ops" "Pitfalls and checks" >}}

- `pprint` output is Python syntax, not JSON. `True` is not `true`.
- Very large objects can make huge output. Set `depth` and test on small data.
- Do not log secrets. `pprint` prints everything it receives.

```python {output=auto}
from pprint import pprint

pprint({"a": {"b": {"c": {"d": 1}}}}, depth=2)
```

```text {filename="Output"}
{'a': {'b': {...}}}
```

{{< part "impact" "What you can do now" >}}

- Read big nested data quickly.
- Keep key order or sort it, as you need.
- Send readable data to logs with `pformat`.

{{< quiz id="pp1" q="Which function gives you the pretty text as a string?" options="pprint.pprint|pprint.pformat|print" answer="2" explain="`pformat` returns a string. `pprint` prints it." >}}
