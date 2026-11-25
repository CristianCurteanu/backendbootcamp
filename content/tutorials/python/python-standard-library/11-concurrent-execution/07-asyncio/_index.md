---
title: 'Asynchronous I/O'
description: 'Write concurrent I/O code with asyncio. Use async def, await, gather and TaskGroup, add time-outs, and never block the event loop.'
linkTitle: 'Asynchronous I/O'
weight: 7
---

{{< part "concept" "Why asyncio" >}}

With threads, the system switches between tasks. With **asyncio**, **you** choose where a task waits, using `await`. One thread can handle thousands of waiting connections. This is how modern Python web servers and API clients scale.

Use it when you do **much I/O waiting**: HTTP calls, databases with async drivers, sockets.

{{< part "code" "Run tasks together" >}}

```python {output=auto}
import asyncio
import time

async def fetch(name: str, delay: float) -> str:
    await asyncio.sleep(delay)       # pretend network call
    return f"{name} done"

async def main() -> None:
    start = time.perf_counter()
    results = await asyncio.gather(fetch("a", 0.1), fetch("b", 0.1), fetch("c", 0.1))
    print(results, time.perf_counter() - start < 0.25)

    async with asyncio.TaskGroup() as group:
        t1 = group.create_task(fetch("x", 0.01))
        t2 = group.create_task(fetch("y", 0.02))
    print(t1.result(), t2.result())

    try:
        async with asyncio.timeout(0.05):
            await fetch("slow", 1)
    except TimeoutError:
        print("timed out")

asyncio.run(main())
```

```text {filename="Output"}
['a done', 'b done', 'c done'] True
x done y done
timed out
```

- `async def` creates a **coroutine**. `await` pauses it until the result is ready.
- `gather` runs coroutines together. `TaskGroup` (Python 3.11+) also cancels the rest if one fails.
- `asyncio.timeout(seconds)` limits how long a block can take.
- `asyncio.run(main())` starts the event loop. Call it once, at the top.

{{< part "ops" "Pitfalls and checks" >}}

- **Never block the loop.** `time.sleep()`, `requests.get()` or heavy math inside `async def` freezes **every** task. Use `await asyncio.sleep()`, an async library, or `await asyncio.to_thread(func)`.
- Forgetting `await` gives a coroutine object, and the code never runs.
- Do not mix many event loops. One `asyncio.run` per program.

```python {output=auto}
import asyncio

def blocking_read() -> str:
    return "from a thread"

async def main() -> None:
    print(await asyncio.to_thread(blocking_read))

asyncio.run(main())
```

```text {filename="Output"}
from a thread
```

| Symptom | Likely cause | First action |
|---|---|---|
| Everything is slow | A blocking call in `async def` | Use `to_thread` or an async library |
| `RuntimeWarning: coroutine ... never awaited` | Missing `await` | Add `await` |

{{< part "impact" "What you can do now" >}}

- Run many waiting tasks on one thread.
- Add time-outs and structured task groups.
- Find and fix blocking calls.

{{< quiz id="as1" q="What happens if you call time.sleep(5) inside async def?" options="Only that task waits|The whole event loop is blocked|It is ignored" answer="2" explain="A blocking call stops all tasks on the loop." >}}
