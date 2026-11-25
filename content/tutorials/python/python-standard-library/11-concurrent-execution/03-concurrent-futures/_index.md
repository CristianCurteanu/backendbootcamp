---
title: 'Launching parallel tasks'
description: 'Run tasks in thread or process pools with concurrent.futures. Submit work, collect results as they finish, and handle errors cleanly.'
linkTitle: 'Launching parallel tasks'
weight: 3
---

{{< part "concept" "Why concurrent.futures" >}}

Managing threads and processes by hand is easy to get wrong. **concurrent.futures** gives one simple API for both: send work to a **pool**, and get a **future**, an object that will hold the result later.

`ThreadPoolExecutor` is for I/O waits. `ProcessPoolExecutor` is for CPU work.

{{< part "code" "Submit work and collect results" >}}

```python {output=auto}
from concurrent.futures import ThreadPoolExecutor, as_completed
import time

def fetch(n: int) -> str:
    time.sleep(0.05 * (4 - n))      # later tasks finish first
    if n == 3:
        raise ValueError("bad item 3")
    return f"item {n}"

with ThreadPoolExecutor(max_workers=4) as pool:
    futures = {pool.submit(fetch, n): n for n in range(1, 5)}
    for future in as_completed(futures):
        n = futures[future]
        try:
            print(n, future.result())
        except ValueError as error:
            print(n, "failed:", error)

with ThreadPoolExecutor(max_workers=2) as pool:
    print(list(pool.map(str.upper, ["a", "b", "c"])))
```

```text {filename="Output"}
4 item 4
3 failed: bad item 3
2 item 2
1 item 1
['A', 'B', 'C']
```

- `submit(func, *args)` returns a future. `future.result()` waits and returns the value, or **raises the error** from the worker.
- `as_completed` gives futures in the order they finish.
- `pool.map` returns results in input order.
- The `with` block waits for all tasks and closes the pool.

{{< part "ops" "Pitfalls and checks" >}}

- An error in a task appears **only** when you call `result()`. If you never call it, you never see the error.
- Set `timeout=` in `result(timeout=5)` to avoid waiting forever.
- Choose `max_workers` on purpose. Too many threads can overload a server you call.
- For `ProcessPoolExecutor`, the same rules as `multiprocessing` apply: top-level functions and the `__main__` guard.

```python {output=auto}
from concurrent.futures import ThreadPoolExecutor

def risky() -> None:
    raise RuntimeError("boom")

with ThreadPoolExecutor(1) as pool:
    f = pool.submit(risky)
    print(f.exception())
```

```text {filename="Output"}
boom
```

{{< part "impact" "What you can do now" >}}

- Run many tasks together with a few lines.
- Handle each task's error separately.
- Switch from threads to processes by changing one class name.

{{< quiz id="cf1" q="When do you see an exception from a worker task?" options="At once, printed|When you call future.result()|Never" answer="2" explain="The error is stored in the future and raised by `result()`." >}}
