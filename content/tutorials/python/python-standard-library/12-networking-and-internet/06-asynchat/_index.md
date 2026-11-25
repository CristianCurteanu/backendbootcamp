---
title: 'Asynchronous socket command/response handler'
description: 'asynchat was removed in Python 3.12. Learn the replacement for command and response protocols using asyncio streams and delimiters.'
linkTitle: 'Asynchronous socket command/response handler'
weight: 6
---

{{< part "concept" "Removed in Python 3.12" >}}

{{< callout type="warning" title="Removed module" >}}
`asynchat` was **deprecated in Python 3.6 and removed in Python 3.12**, together with `asyncore`. Use `asyncio` streams.
{{< /callout >}}

`asynchat` helped you read text **commands ending with a terminator**, like `\r\n`. With `asyncio`, `StreamReader.readuntil()` and `readline()` do this.

{{< part "code" "Read commands until a terminator" >}}

```python {output=auto}
import asyncio

async def handle(reader: asyncio.StreamReader, writer: asyncio.StreamWriter) -> None:
    while True:
        line = await reader.readuntil(b"\r\n")
        command = line.strip().decode()
        if command == "QUIT":
            writer.write(b"BYE\r\n")
            break
        writer.write(f"ECHO {command}\r\n".encode())
        await writer.drain()
    await writer.drain()
    writer.close()
    await writer.wait_closed()

async def main() -> None:
    server = await asyncio.start_server(handle, "127.0.0.1", 0)
    port = server.sockets[0].getsockname()[1]
    async with server:
        reader, writer = await asyncio.open_connection("127.0.0.1", port)
        for text in (b"HELLO\r\n", b"QUIT\r\n"):
            writer.write(text)
            await writer.drain()
            print(await reader.readuntil(b"\r\n"))
        writer.close()
        await writer.wait_closed()

asyncio.run(main())
```

```text {filename="Output"}
b'ECHO HELLO\r\n'
b'BYE\r\n'
```

- `readuntil(separator)` returns data up to and including the terminator.
- `readexactly(n)` reads a fixed length. Use it for length-prefixed protocols.

{{< part "ops" "Pitfalls and checks" >}}

- `readuntil` raises `asyncio.IncompleteReadError` when the connection closes early, and `LimitOverrunError` when a line is too long. Catch both.
- Set a maximum line length (`limit=` in `start_server`) to stop memory attacks.
- Add time-outs with `asyncio.timeout()` around reads.

| Old (`asynchat`) | New (`asyncio`) |
|---|---|
| `set_terminator(b"\r\n")` | `reader.readuntil(b"\r\n")` |
| `collect_incoming_data` | the returned bytes |
| `push(data)` | `writer.write(data)` |

{{< part "impact" "What you can do now" >}}

- Replace `asynchat` protocols.
- Read delimiter-based and length-based messages.
- Protect a server against huge lines.

{{< quiz id="ach1" q="Which asyncio method reads until a terminator?" options="readuntil|readall|readfile" answer="1" explain="`readuntil(separator)` reads up to and including the separator." >}}
