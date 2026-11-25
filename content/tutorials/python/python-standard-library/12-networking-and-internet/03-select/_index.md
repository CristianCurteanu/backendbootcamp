---
title: 'Waiting for I/O completion'
description: 'Wait for many sockets at once with select. See which are ready to read or write, and learn why selectors is the better modern API.'
linkTitle: 'Waiting for I/O completion'
weight: 3
---

{{< part "concept" "Why select" >}}

A server may have hundreds of connections. If you call `recv()` on each, one quiet connection blocks the rest. **select** asks the operating system: "Which of these sockets is ready now?" Then you only touch ready ones.

This is the idea behind event loops. `select` is old and limited, so for new code use `selectors` (next lesson) or `asyncio`.

{{< part "code" "Wait for ready sockets" >}}

```python {output=auto}
import select
import socket

a, b = socket.socketpair()

ready, _, _ = select.select([b], [], [], 0)
print("before send:", len(ready))

a.sendall(b"ping")
ready, _, _ = select.select([b], [], [], 1.0)
print("after send:", len(ready), ready[0].recv(10))

a.close()
b.close()
```

```text {filename="Output"}
before send: 0
after send: 1 b'ping'
```

- `select.select(read_list, write_list, error_list, timeout)` returns the ready sockets.
- A timeout of `0` checks and returns at once. `None` waits forever.
- `socketpair()` makes two connected sockets, handy for tests.

{{< part "ops" "Pitfalls and checks" >}}

- `select` is limited to about **1024** file descriptors on many systems.
- It checks every socket each time, so it is slow with many connections.
- On Windows, `select` works only with sockets, not with other files.
- Always handle a closed connection: `recv()` returns `b""`.

| Need | Use |
|---|---|
| Simple wait on a few sockets | `select` |
| Many sockets, any platform | `selectors` |
| Application code | `asyncio` |

{{< part "impact" "What you can do now" >}}

- Explain how one thread can watch many sockets.
- Use `select` with a timeout.
- Know why to prefer `selectors` or `asyncio`.

{{< quiz id="sel1" q="What does select with timeout 0 do?" options="Waits forever|Checks and returns at once|Raises an error" answer="2" explain="A zero timeout makes it a quick check." >}}
