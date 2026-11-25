---
title: 'Container datatypes'
description: 'Use Counter, defaultdict, deque, namedtuple and ChainMap from collections to write shorter and faster data code.'
linkTitle: 'Container datatypes'
weight: 3
---

{{< part "concept" "Why use collections" >}}

Lists and dicts solve most problems. The **collections** module adds special containers for common jobs: counting, grouping, queues and light records. They make code shorter and often faster.

{{< part "code" "Four containers you will use often" >}}

```python {output=auto}
from collections import Counter, defaultdict, deque, namedtuple

words = "to be or not to be".split()
print(Counter(words).most_common(2))

groups: defaultdict[str, list[str]] = defaultdict(list)
for name in ["Ann", "Bob", "Alice"]:
    groups[name[0]].append(name)
print(dict(groups))

queue = deque(maxlen=3)
for n in range(5):
    queue.append(n)
print(queue)

Point = namedtuple("Point", "x y")
p = Point(2, 3)
print(p.x, p)
```

```text {filename="Output"}
[('to', 2), ('be', 2)]
{'A': ['Ann', 'Alice'], 'B': ['Bob']}
deque([2, 3, 4], maxlen=3)
2 Point(x=2, y=3)
```

- `Counter` counts items. `most_common(n)` gives the top results.
- `defaultdict(list)` creates an empty list for a missing key. No `if key not in d` needed.
- `deque` is a fast queue. `maxlen` drops old items. Use `popleft()` to take from the front.
- `namedtuple` makes a tuple with named fields. For new code, `dataclass` is often better.

{{< part "ops" "Pitfalls and checks" >}}

- `list.pop(0)` is slow for big lists, because every item moves. Use `deque.popleft()`.
- A `defaultdict` creates a key when you only **read** it. Use `.get(key)` to avoid that.
- `Counter` returns `0` for a missing key. It does not raise an error.

```python {output=auto}
from collections import defaultdict

d = defaultdict(int)
_ = d["missing"]
print(dict(d))
```

```text {filename="Output"}
{'missing': 0}
```

{{< part "impact" "What you can do now" >}}

- Count items in one line with `Counter`.
- Group data without extra `if` checks.
- Build a fast queue or a "last N items" buffer with `deque`.

{{< quiz id="col1" q="Which container gives a fast pop from the FRONT?" options="list|deque|set" answer="2" explain="`deque.popleft()` is fast. `list.pop(0)` moves every item." >}}
