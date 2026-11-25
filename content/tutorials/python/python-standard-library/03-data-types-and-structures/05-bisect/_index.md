---
title: 'Array bisection algorithm'
description: 'Search sorted lists fast and insert items in order with bisect. Learn binary search for lookups such as grade tables.'
linkTitle: 'Array bisection algorithm'
weight: 5
---

{{< part "concept" "Why bisect" >}}

**Binary search** finds a place in a sorted list by cutting the search area in half each time. For a million items it needs about 20 steps. The `bisect` module does this for you.

Use it only on lists that are already **sorted**.

{{< part "code" "Find a position and insert in order" >}}

```python {output=auto}
import bisect

scores = [10, 20, 30, 40]
print(bisect.bisect_left(scores, 30), bisect.bisect_right(scores, 30))

bisect.insort(scores, 25)
print(scores)

def grade(score: int) -> str:
    cutoffs = [60, 70, 80, 90]
    letters = "FDCBA"
    return letters[bisect.bisect(cutoffs, score)]

print([grade(s) for s in (55, 60, 85, 95)])
```

```text {filename="Output"}
2 3
[10, 20, 25, 30, 40]
['F', 'D', 'B', 'A']
```

- `bisect_left` returns the first position where the value can go. `bisect_right` returns the position after equal values.
- `insort` inserts and keeps the list sorted.
- A table of cut-off values plus `bisect` replaces a long `if/elif` chain.

{{< part "ops" "Pitfalls and checks" >}}

- On an unsorted list the result is wrong, and Python gives **no error**. Sort first.
- `insort` still moves items, so it is O(n). For many inserts, consider `heapq` or a database.
- Use `key=` (Python 3.10+) to search lists of records.

```python {output=auto}
import bisect

users = [{"age": 20}, {"age": 30}, {"age": 40}]
print(bisect.bisect_left(users, 30, key=lambda u: u["age"]))
```

```text {filename="Output"}
1
```

{{< part "impact" "What you can do now" >}}

- Look up ranges (grades, price tiers) with one call.
- Keep a list sorted while adding items.
- Search records with `key=`.

{{< quiz id="bis1" q="What must be true about the list for bisect to work?" options="It has no duplicates|It is sorted|It has numbers only" answer="2" explain="bisect assumes the list is sorted and does not check." >}}
