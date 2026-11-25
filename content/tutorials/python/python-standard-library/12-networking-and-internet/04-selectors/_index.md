---
title: 'High-level I/O multiplexing'
description: 'Build an event loop with selectors, a high-level wrapper over epoll and kqueue that scales to many connections.'
linkTitle: 'High-level I/O multiplexing'
weight: 4
---

{{< part "concept" "Why selectors" >}}

**selectors** picks the best tool your system has (`epoll` on Linux, `kqueue` on macOS and BSD, `select` as a fallback) behind one API. You **register** sockets with a callback or data, then call `select()` to get the ready ones. This is the core of every event loop, including `asyncio`.

{{< part "code" "A small event loop" >}}

```python {output=auto}
import selectors
import socket

selector = selectors.DefaultSelector()
a, b = socket.socketpair()
b.setblocking(False)

def on_readable(sock: socket.socket) -> None:
    print("received:", sock.recv(100))

selector.register(b, selectors.EVENT_READ, data=on_readable)

a.sendall(b"event one")
for key, _events in selector.select(timeout=1):
    key.data(key.fileobj)

selector.unregister(b)
selector.close()
a.close()
b.close()
```

```text {filename="Output"}
received: b'event one'
```

- `register(sock, events, data)` stores any object in `data`. A function works well as a callback.
- `select(timeout)` returns `(key, events)` pairs. `key.fileobj` is the socket and `key.data` is your object.
- Use non-blocking sockets: `setblocking(False)`.

{{< part "ops" "Pitfalls and checks" >}}

- Unregister and close sockets that you stop using. Leaks hit a limit of open files.
- With non-blocking sockets, `recv` can raise `BlockingIOError`. This means "no data yet".
- Never do slow work inside a callback. It delays every other connection.
- Writing your own event loop is rare. Use `asyncio` for applications.

{{< part "impact" "What you can do now" >}}

- Explain how event loops work.
- Register sockets with callbacks.
- Know when to use `asyncio` instead.

{{< quiz id="sels1" q="What does DefaultSelector choose?" options="The best method for your system|Always select|Always epoll" answer="1" explain="It picks epoll, kqueue or select depending on the OS." >}}
