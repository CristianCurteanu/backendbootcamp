---
title: 'Low-level networking interface'
description: 'Learn how programs talk over the network with socket. Build a TCP server and client on localhost and handle time-outs and partial data.'
linkTitle: 'Low-level networking interface'
weight: 1
---

{{< part "concept" "Why sockets" >}}

A **socket** is one end of a network connection. HTTP, databases and message queues all use sockets underneath. The **socket** module is the low-level tool: you open a connection, send bytes, and receive bytes.

Most of the time you use a higher-level library (`http.client`, a web framework). Learn sockets to understand what those libraries do, and to debug them.

{{< part "code" "A TCP server and client" >}}

```python {output=auto}
import socket
import threading

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind(("127.0.0.1", 0))        # port 0 = the system picks a free port
server.listen()
port = server.getsockname()[1]

def serve_once() -> None:
    conn, _address = server.accept()
    with conn:
        data = conn.recv(1024)
        conn.sendall(data.upper())

thread = threading.Thread(target=serve_once)
thread.start()

with socket.create_connection(("127.0.0.1", port), timeout=2) as client:
    client.sendall(b"hello socket")
    print(client.recv(1024))

thread.join()
server.close()
```

```text {filename="Output"}
b'HELLO SOCKET'
```

- `AF_INET` means IPv4. `SOCK_STREAM` means TCP (a reliable stream of bytes).
- The server does `bind`, `listen`, `accept`. The client does `connect`.
- Sockets send **bytes**. Use `.encode()` and `.decode()` for text.

{{< part "ops" "Pitfalls and checks" >}}

- TCP is a **stream**, not messages. One `recv(1024)` can return half of a message, or two messages together. Use a length prefix or a delimiter (like `\n`).
- Always set a **timeout**. Without one, a stalled peer blocks you forever.
- Bind to `127.0.0.1` for local tests. `0.0.0.0` accepts connections from every network.
- `OSError: Address already in use` means the port is taken. Wait or choose another.

```python {output=auto}
import socket

try:
    socket.create_connection(("127.0.0.1", 1), timeout=0.5)
except OSError as error:
    print(type(error).__name__)
```

```text {filename="Output"}
ConnectionRefusedError
```

{{< part "impact" "What you can do now" >}}

- Explain what a socket and a port are.
- Write a basic TCP echo server and client.
- Avoid the "partial recv" and "no timeout" mistakes.

{{< quiz id="so1" q="What does TCP give you?" options="A stream of bytes|Separate messages|Encryption" answer="1" explain="TCP is a reliable byte stream. Message boundaries are your job." >}}
