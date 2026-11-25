---
title: 'Heap queue algorithm'
description: 'Build priority queues and get the smallest or largest items fast with heapq, the heap queue module.'
linkTitle: 'Heap queue algorithm'
weight: 4
---

{{< part "concept" "Why a heap" >}}

A **heap** keeps the smallest item easy to reach. It is the base of a **priority queue**: always take the most urgent job first. This is useful for task schedulers, "top N" results and shortest-path code.

`heapq` works on a normal list. The smallest item is always at index `0`.

{{< part "code" "Priority queue and top N" >}}

```python {output=auto}
import heapq

jobs: list[tuple[int, str]] = []
heapq.heappush(jobs, (2, "send email"))
heapq.heappush(jobs, (1, "charge card"))
heapq.heappush(jobs, (3, "clean cache"))

while jobs:
    priority, name = heapq.heappop(jobs)
    print(priority, name)

scores = [50, 91, 77, 64, 88]
print(heapq.nlargest(2, scores), heapq.nsmallest(2, scores))
```

```text {filename="Output"}
1 charge card
2 send email
3 clean cache
[91, 88] [50, 64]
```

- `heappush` adds an item. `heappop` removes and returns the **smallest**.
- Use tuples `(priority, item)`. Python compares the first value first.
- For a max-heap, push the negative number: `-score`.

{{< part "ops" "Pitfalls and checks" >}}

- Do not sort or change the list by hand. Use only `heapq` functions, or the heap rule breaks.
- If two priorities are equal, Python compares the next tuple item. If those cannot be compared, you get `TypeError`. Add a counter as a tie-breaker.
- Only index `0` is guaranteed to be the smallest. The rest of the list is not sorted.

```python {output=auto}
import heapq
from itertools import count

tie = count()
q: list[tuple[int, int, dict]] = []
heapq.heappush(q, (1, next(tie), {"id": "a"}))
heapq.heappush(q, (1, next(tie), {"id": "b"}))
print(heapq.heappop(q)[2])
```

```text {filename="Output"}
{'id': 'a'}
```

{{< part "impact" "What you can do now" >}}

- Build a priority queue for background jobs.
- Get the top N items without sorting everything.
- Avoid the dict-comparison error with a tie-breaker.

{{< quiz id="heap1" q="Which item does heappop return?" options="The largest|The smallest|The newest" answer="2" explain="A heap in Python always returns the smallest item first." >}}
