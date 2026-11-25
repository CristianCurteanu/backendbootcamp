---
title: 'Thread-based parallelism'
description: 'Run tasks at the same time with threads. Learn Thread, Lock and Event, why the GIL matters, and when threads help with I/O waits.'
linkTitle: 'Thread-based parallelism'
weight: 1
---

{{< part "concept" "Why threads" >}}

A **thread** is a path of execution inside your program. While one thread waits (for a network answer or a file), another can work. Threads are the simple tool for **I/O-bound** jobs: many web requests, many file reads.

For **CPU-bound** work (heavy math), Python threads do not run in parallel because of the **GIL** (Global Interpreter Lock). Use `multiprocessing` for that.

{{< part "code" "Threads, a lock and an event" >}}

```python {output=auto}
import threading
import time

counter = 0
lock = threading.Lock()

def work(n: int) -> None:
    global counter
    time.sleep(0.05)              # pretend to wait for I/O
    with lock:                    # protect shared data
        counter += n

threads = [threading.Thread(target=work, args=(i,)) for i in range(1, 6)]
start = time.perf_counter()
for t in threads:
    t.start()
for t in threads:
    t.join()
print(counter, time.perf_counter() - start < 0.2)

stop = threading.Event()
def worker() -> None:
    while not stop.wait(0.01):
        pass
    print("worker stopped")

t = threading.Thread(target=worker)
t.start()
stop.set()
t.join()
```

```text {filename="Output"}
15 True
worker stopped
```

- `start()` begins the thread. `join()` waits for it to finish.
- Five waits of 0.05 s ran **together**, so the total is about 0.05 s, not 0.25 s.
- A **Lock** lets only one thread change shared data at a time.
- An **Event** is a flag for telling a thread to stop.

{{< part "ops" "Pitfalls and checks" >}}

- Shared data without a lock gives **race conditions**: rare, random wrong results. Use a `Lock`, or pass data with `queue.Queue`.
- A thread that raises an error dies **silently** by default. Catch errors inside the thread and log them.
- Do not use `daemon=True` for work that must finish. Daemon threads stop when the program ends.
- Prefer `concurrent.futures.ThreadPoolExecutor` (next lessons) instead of managing threads by hand.

| Symptom | Likely cause | First action |
|---|---|---|
| Wrong totals, sometimes | Race condition | Add a `Lock` |
| Program never exits | A non-daemon thread still runs | Use an `Event` to stop it |

{{< part "impact" "What you can do now" >}}

- Run waiting tasks together and join them.
- Protect shared data with a lock.
- Stop a thread cleanly with an event.

{{< quiz id="th1" q="For which job do Python threads help most?" options="Heavy math|Waiting for I/O|Sorting a list" answer="2" explain="While one thread waits for I/O, another can run." >}}
