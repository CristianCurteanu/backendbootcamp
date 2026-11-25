---
title: 'Asynchronous socket handler'
description: 'asyncore was removed in Python 3.12. See what it did and how to write the same server with asyncio streams.'
linkTitle: 'Asynchronous socket handler'
weight: 5
---

{{< part "concept" "Removed in Python 3.12" >}}

{{< callout type="warning" title="Removed module" >}}
`asyncore` was **deprecated in Python 3.6 and removed in Python 3.12**. `import asyncore` raises `ModuleNotFoundError` on new versions. Use `asyncio`.
{{< /callout >}}

`asyncore` used callbacks and class inheritance to handle many sockets in one thread. `asyncio` does the same job with `async` and `await`, and it is the standard now.

{{< part "code" "The same echo server with asyncio" >}}

```python {output=auto}
import asyncio

async def handle(reader: asyncio.StreamReader, writer: asyncio.StreamWriter) -> None:
    data = await reader.readline()
    writer.write(data.upper())
    await writer.drain()
    writer.close()
    await writer.wait_closed()

async def main() -> None:
    server = await asyncio.start_server(handle, "127.0.0.1", 0)
    port = server.sockets[0].getsockname()[1]
    async with server:
        reader, writer = await asyncio.open_connection("127.0.0.1", port)
        writer.write(b"hello asyncio\n")
        await writer.drain()
        print(await reader.readline())
        writer.close()
        await writer.wait_closed()

asyncio.run(main())
```

```text {filename="Output"}
b'HELLO ASYNCIO\n'
```

- `start_server` replaces the `asyncore.dispatcher` class.
- `reader.readline()` and `writer.write()` replace the `handle_read` and `handle_write` methods.
- No inheritance and no global loop function (`asyncore.loop()`) are needed.

{{< part "ops" "Pitfalls and checks" >}}

- Old code that imports `asyncore` also often imports `asynchat` and `smtpd`. All three were removed in 3.12.
- If you must keep old code, pin Python 3.11, or use the community package `pyasyncore`. Plan the move to `asyncio`.
- Always `await writer.drain()` after `write` to respect flow control.

| Old (`asyncore`) | New (`asyncio`) |
|---|---|
| `dispatcher` subclass | `async def` handler |
| `handle_read` | `await reader.read()` |
| `asyncore.loop()` | `asyncio.run(main())` |

{{< part "impact" "What you can do now" >}}

- Recognize and replace `asyncore` code.
- Write an asyncio echo server and client.
- Plan a migration for old projects.

{{< quiz id="ac1" q="Which module replaces asyncore?" options="selectors only|asyncio|threading" answer="2" explain="asyncio is the standard for asynchronous network code." >}}
