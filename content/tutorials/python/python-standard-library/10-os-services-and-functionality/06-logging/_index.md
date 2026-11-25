---
title: 'Logging facility for Python'
description: 'Record what your program does with logging. Use levels, loggers, formatters and handlers, and log errors with full tracebacks.'
linkTitle: 'Logging facility for Python'
weight: 6
---

{{< part "concept" "Why logging" >}}

`print()` is fine for scripts. A running service needs **logs**: messages with a **level**, a time and a source, that you can send to files or tools and filter. The **logging** module is the standard way, and every library uses it.

Levels, from least to most serious: `DEBUG`, `INFO`, `WARNING`, `ERROR`, `CRITICAL`.

{{< part "code" "A logger with a format" >}}

```python {output=auto}
import logging
import sys

logging.basicConfig(
    stream=sys.stdout,
    level=logging.INFO,
    format="%(levelname)s %(name)s: %(message)s",
)
log = logging.getLogger("billing")

log.debug("not shown, level is INFO")
log.info("invoice %s created for %s", 42, "Ana")
log.warning("retry %d of %d", 2, 3)
log.error("payment failed for invoice %s", 42)
```

```text {filename="Output"}
INFO billing: invoice 42 created for Ana
WARNING billing: retry 2 of 3
ERROR billing: payment failed for invoice 42
```

- `getLogger(__name__)` gives each module its own logger name.
- Use `%s` placeholders and pass values as arguments. Python builds the text only if the level is enabled.
- `basicConfig` sets up logging once, at program start.

Inside an `except` block, use `log.exception(...)`. It logs the message **and the full traceback**:

```python {norun=true}
try:
    1 / 0
except ZeroDivisionError:
    log.exception("calculation failed")
```

```text {filename="Output"}
ERROR billing: calculation failed
Traceback (most recent call last):
  File "app.py", line 3, in <module>
    1 / 0
ZeroDivisionError: division by zero
```

{{< part "ops" "Pitfalls and checks" >}}

- Configure logging **once**, in your main program. Libraries should only create loggers, not configure them.
- Do **not** log passwords, tokens or personal data.
- In production, log to standard output and let the platform (Docker, Kubernetes) collect it. Use JSON format for log tools.
- Set the level from an environment variable so you can turn on `DEBUG` without a release.

```python {output=auto}
import logging
import os
import sys

level = os.environ.get("LOG_LEVEL", "INFO").upper()
logging.basicConfig(stream=sys.stdout, level=level, format="%(levelname)s %(message)s", force=True)
logging.getLogger("app").info("started with level %s", level)
```

```text {filename="Output"}
INFO started with level INFO
```

{{< part "impact" "What you can do now" >}}

- Log with levels and clear formats.
- Capture full tracebacks with `exception`.
- Change log detail without changing code.

{{< quiz id="log1" q="Which call logs a message with the traceback?" options="log.info|log.exception|log.debug" answer="2" explain="`log.exception` is for use inside `except` blocks." >}}
