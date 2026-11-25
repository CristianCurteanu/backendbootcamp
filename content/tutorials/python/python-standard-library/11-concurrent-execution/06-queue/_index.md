---
title: 'A synchronized queue class'
description: 'Pass work safely between threads with queue.Queue. Build a producer-consumer pipeline with a limit on size and a clean stop signal.'
linkTitle: 'A synchronized queue class'
weight: 6
---

{{< part "concept" "Why queue" >}}

Threads that share a list need locks. A **Queue** has the locks built in. One thread **puts** work in, another **gets** it out. This is the **producer-consumer** pattern, the base of many background workers.

A queue with a maximum size also gives **backpressure**: when the queue is full, producers wait, and memory stays under control.

{{< part "code" "Producer and consumer" >}}

```python {output=auto}
import queue
import threading

jobs: queue.Queue[int | None] = queue.Queue(maxsize=3)
results: list[int] = []

def consumer() -> None:
    while True:
        item = jobs.get()
        if item is None:           # stop signal
            jobs.task_done()
            break
        results.append(item * 10)
        jobs.task_done()

worker = threading.Thread(target=consumer)
worker.start()

for n in range(1, 6):
    jobs.put(n)                    # waits if the queue is full
jobs.put(None)
jobs.join()
worker.join()
print(results)
```

```text {filename="Output"}
[10, 20, 30, 40, 50]
```

- `put(item)` adds. `get()` removes and **waits** if the queue is empty.
- `task_done()` tells the queue that an item is finished. `join()` waits until all items are done.
- `None` is a common **sentinel** to tell the worker to stop.

{{< part "ops" "Pitfalls and checks" >}}

- Without `maxsize`, a fast producer can fill all memory.
- `get()` waits forever by default. Use `get(timeout=1)` and catch `queue.Empty` if you need to check for shutdown.
- Forgetting `task_done()` makes `join()` wait forever.
- `queue.Queue` is for **threads**. Use `multiprocessing.Queue` for processes, and `asyncio.Queue` for async code.

```python {output=auto}
import queue

q: queue.Queue[str] = queue.Queue()
try:
    q.get(timeout=0.05)
except queue.Empty:
    print("nothing to do")
```

```text {filename="Output"}
nothing to do
```

{{< part "impact" "What you can do now" >}}

- Build a safe worker thread.
- Limit memory with `maxsize`.
- Stop workers with a sentinel.

{{< quiz id="qu1" q="What does get() do on an empty queue by default?" options="Returns None|Waits|Raises an error at once" answer="2" explain="It blocks until an item arrives." >}}
