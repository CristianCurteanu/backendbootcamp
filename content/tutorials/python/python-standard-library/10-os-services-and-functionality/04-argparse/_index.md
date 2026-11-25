---
title: 'Parser for command-line options, arguments'
description: 'Build command-line tools with argparse. Add arguments, options, choices, subcommands, defaults and automatic help messages.'
linkTitle: 'Parser for command-line options, arguments'
weight: 4
---

{{< part "concept" "Why argparse" >}}

A command-line tool needs to read arguments like `tool --port 8080 start`. **argparse** parses them, checks types, shows `--help`, and prints clear errors. You write the rules once.

{{< part "code" "Arguments, options and subcommands" >}}

```python {output=auto}
import argparse

def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(prog="deploy", description="Deploy a service.")
    parser.add_argument("service", help="service name")
    parser.add_argument("--port", type=int, default=8000, help="port number")
    parser.add_argument("--env", choices=["dev", "prod"], default="dev")
    parser.add_argument("-v", "--verbose", action="store_true")
    return parser

parser = build_parser()
args = parser.parse_args(["api", "--port", "9000", "-v"])
print(args.service, args.port, args.env, args.verbose)
print(parser.format_usage().strip())
```

```text {filename="Output"}
api 9000 dev True
usage: deploy [-h] [--port PORT] [--env {dev,prod}] [-v] service
```

- A name without dashes is **positional** (required). `--name` is an **option**.
- `type=int` converts and checks the value. `choices` limits the values.
- `action="store_true"` makes a yes/no flag.
- Pass a list to `parse_args([...])` in tests. With no argument it reads `sys.argv`.

Subcommands, like `git commit`:

```python {output=auto}
import argparse

parser = argparse.ArgumentParser(prog="tool")
sub = parser.add_subparsers(dest="command", required=True)
sub.add_parser("start")
stop = sub.add_parser("stop")
stop.add_argument("--force", action="store_true")

print(parser.parse_args(["stop", "--force"]))
```

```text {filename="Output"}
Namespace(command='stop', force=True)
```

{{< part "ops" "Pitfalls and checks" >}}

- On a bad value, argparse prints an error and **exits** with code `2`. In tests, catch `SystemExit`.
- Do not use `type=bool`: any non-empty text is `True`. Use `store_true` instead.
- Write a clear `help=` for every argument. Users read it first.
- Return a non-zero exit code from your program when it fails.

```python {expect=error}
import argparse

parser = argparse.ArgumentParser(prog="tool")
parser.add_argument("--port", type=int)
parser.parse_args(["--port", "abc"])
```

```text {filename="Output"}
tool: error: argument --port: invalid int value: 'abc'
```

{{< part "impact" "What you can do now" >}}

- Build a tool with options, flags and subcommands.
- Get `--help` and good error messages for free.
- Test your parser with a list of arguments.

{{< quiz id="arg1" q="Which action makes a yes/no flag?" options="store|store_true|append" answer="2" explain="`store_true` sets the value to `True` when the flag is present." >}}
