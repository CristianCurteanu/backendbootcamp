---
title: 'Set handlers for asynchronous events'
description: 'Handle signals such as Ctrl+C and SIGTERM with signal. Shut down a service cleanly and use timers with care.'
linkTitle: 'Set handlers for asynchronous events'
weight: 7
---

{{< part "concept" "Why signals" >}}

A **signal** is a short message from the operating system to your process: "stop" (`SIGTERM`), "Ctrl+C was pressed" (`SIGINT`), "reload" (`SIGHUP`). Services must handle `SIGTERM` to **shut down cleanly**: finish requests, close connections, save data. Docker and Kubernetes send `SIGTERM` before they kill a container.

{{< part "code" "A clean shutdown handler" >}}

```python {output=auto}
import signal

stopping = False

def handle_term(signum: int, frame) -> None:
    global stopping
    stopping = True
    print("got", signal.Signals(signum).name)

signal.signal(signal.SIGTERM, handle_term)
signal.raise_signal(signal.SIGTERM)       # simulate the system sending it

print("stopping:", stopping)
```

```text {filename="Output"}
got SIGTERM
stopping: True
```

- `signal.signal(sig, handler)` registers a function. The handler gets the signal number and the current frame.
- `signal.raise_signal(sig)` sends a signal to your own process. It is useful in tests.
- In a real service, the main loop checks `stopping` and exits after finishing work.

{{< part "ops" "Pitfalls and checks" >}}

- Handlers run in the **main thread** only. You can register them only from the main thread.
- Keep handlers tiny: set a flag or an `Event`. Do not do slow work inside.
- `SIGKILL` and `SIGSTOP` **cannot** be caught.
- Windows supports only a few signals (`SIGINT`, `SIGTERM`, `SIGBREAK`).
- With `asyncio`, use `loop.add_signal_handler` on Linux and macOS.

```python {output=auto}
import signal

try:
    signal.signal(signal.SIGKILL, lambda *_: None)
except OSError as error:
    print("cannot catch SIGKILL:", type(error).__name__)
```

```text {filename="Output"}
cannot catch SIGKILL: OSError
```

{{< part "impact" "What you can do now" >}}

- Handle `SIGTERM` and `SIGINT` for a clean exit.
- Test handlers with `raise_signal`.
- Know which signals cannot be caught.

{{< quiz id="sig1" q="Which signal can NOT be caught?" options="SIGTERM|SIGKILL|SIGINT" answer="2" explain="SIGKILL always ends the process." >}}
