---
title: 'Process-based parallelism'
description: 'Use several CPU cores with multiprocessing. Start processes, use a Pool for CPU-heavy work and share data safely between processes.'
linkTitle: 'Process-based parallelism'
weight: 2
---

{{< part "concept" "Why processes" >}}

Each **process** has its own Python interpreter and its own GIL. So several processes can use several CPU cores at the same time. This is how you speed up **CPU-bound** work in Python.

The cost: processes do not share memory. Data must be **copied** (pickled) between them. It is slower to start than a thread.

{{< part "code" "A pool of workers" >}}

```python {output=auto}
import multiprocessing as mp

def square(n: int) -> int:
    return n * n

def report(n: int) -> None:
    print("child got", n)

def main() -> None:
    with mp.Pool(processes=2) as pool:
        print(pool.map(square, range(8)))

    child = mp.Process(target=report, args=(5,))
    child.start()
    child.join()
    print("exit code", child.exitcode)

if __name__ == "__main__":
    main()
```

```text {filename="Output"}
[0, 1, 4, 9, 16, 25, 36, 49]
child got 5
exit code 0
```

- `Pool.map(func, items)` splits the items between workers and returns results in order.
- The function must be defined at the **top level** of a module so it can be pickled.
- **Always** protect the start with `if __name__ == "__main__":`. Without it, new processes can start more processes without end.

{{< part "ops" "Pitfalls and checks" >}}

- Arguments and results must be **picklable**. Lambdas and open files are not.
- Start method: Linux uses `fork`, macOS and Windows use `spawn` (slower, stricter). Test on your target system.
- Do not use more processes than CPU cores for CPU work. Check `os.cpu_count()`.
- For simple cases use `concurrent.futures.ProcessPoolExecutor`, which has a cleaner API.

```python {output=auto}
import multiprocessing as mp

def main() -> None:
    with mp.Pool(1) as pool:
        try:
            pool.map(lambda x: x, [1])
        except Exception as error:
            print(type(error).__name__)

if __name__ == "__main__":
    main()
```

```text {filename="Output"}
AttributeError
```

{{< part "impact" "What you can do now" >}}

- Speed up CPU-heavy work across cores.
- Avoid the `__main__` guard and pickling errors.
- Choose between threads and processes.

{{< quiz id="mp1" q="Why use processes instead of threads for heavy math?" options="Each process has its own GIL|They share memory|They start faster" answer="1" explain="Separate processes can use separate CPU cores." >}}
