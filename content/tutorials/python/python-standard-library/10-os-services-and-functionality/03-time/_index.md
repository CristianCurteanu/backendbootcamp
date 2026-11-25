---
title: 'Time access and conversions'
description: 'Measure and handle time with the time module. Use monotonic clocks for durations, perf_counter for timing code, and sleep with care.'
linkTitle: 'Time access and conversions'
weight: 3
---

{{< part "concept" "Why the time module" >}}

The **time** module gives low-level access to clocks. The most important lesson: there are **different clocks for different jobs**. Wall-clock time can jump when someone changes the date. A **monotonic** clock only goes forward, so it is right for measuring durations.

{{< part "code" "Clocks and timing" >}}

```python {output=auto}
import time

start = time.perf_counter()
time.sleep(0.05)
elapsed = time.perf_counter() - start
print(0.04 < elapsed < 0.5)

print(time.strftime("%Y-%m-%d %H:%M:%S", time.gmtime(0)))
print(time.time() > 1_700_000_000)
deadline = time.monotonic() + 0.1
while time.monotonic() < deadline:
    pass
print("deadline reached")
```

```text {filename="Output"}
True
1970-01-01 00:00:00
True
deadline reached
```

| Function | Use |
|---|---|
| `time.time()` | Seconds since 1970 (UTC). Can jump. |
| `time.monotonic()` | Time-outs and deadlines. Never goes back. |
| `time.perf_counter()` | Timing small pieces of code. |
| `time.sleep(s)` | Pause the current thread. |

{{< part "ops" "Pitfalls and checks" >}}

- Use `monotonic` or `perf_counter` to measure duration. Never subtract two `time.time()` values for time-outs.
- `sleep` blocks the whole thread. In `asyncio`, use `await asyncio.sleep()`.
- For dates, time zones and formatting for users, use `datetime`.
- A busy loop like the example uses 100% of a CPU. Use `sleep` between checks in real code.

```python {output=auto}
import time

def timed(label: str, fn) -> None:
    t0 = time.perf_counter()
    fn()
    print(label, "took", "under 1s" if time.perf_counter() - t0 < 1 else "over 1s")

timed("sum", lambda: sum(range(100_000)))
```

```text {filename="Output"}
sum took under 1s
```

{{< part "impact" "What you can do now" >}}

- Pick the right clock for each job.
- Measure how long code takes.
- Avoid blocking sleeps in async code.

{{< quiz id="tm1" q="Which clock is best for a time-out?" options="time.time|time.monotonic|time.ctime" answer="2" explain="`monotonic` never goes backward." >}}
