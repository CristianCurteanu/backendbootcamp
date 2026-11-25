---
title: 'C-style parser for command line options'
description: 'Parse command-line options in C style with getopt, see when it is enough, and why argparse is the better choice for new code.'
linkTitle: 'C-style parser for command line options'
weight: 5
---

{{< part "concept" "Why you may meet getopt" >}}

**getopt** copies the C function with the same name. It is small and simple, but it gives no help text, no type checks and no subcommands. It exists for old scripts and for people who know the C style.

For new tools, use `argparse`. Learn `getopt` to read old code.

{{< part "code" "Parse short and long options" >}}

```python {output=auto}
import getopt

argv = ["-v", "--port=9000", "-o", "out.txt", "input.csv"]
options, rest = getopt.getopt(argv, "vo:", ["port=", "help"])

for name, value in options:
    print(name, repr(value))
print("files:", rest)
```

```text {filename="Output"}
-v ''
--port '9000'
-o 'out.txt'
files: ['input.csv']
```

- The second argument lists **short** options. A colon, like `o:`, means "needs a value".
- The third argument lists **long** options. `port=` means "needs a value".
- It returns `(options, remaining_arguments)`.
- Values are always **strings**.

{{< part "ops" "Pitfalls and checks" >}}

- An unknown option raises `getopt.GetoptError`. Catch it and print a usage message.
- Parsing stops at the first non-option argument. Use `gnu_getopt` to allow mixed order.
- You must write usage and help text by hand.

```python {output=auto}
import getopt

try:
    getopt.getopt(["--unknown"], "v", ["help"])
except getopt.GetoptError as error:
    print("Error:", error)
```

```text {filename="Output"}
Error: option --unknown not recognized
```

| Feature | `getopt` | `argparse` |
|---|---|---|
| Help text | no | yes |
| Types and choices | no | yes |
| Subcommands | no | yes |

{{< part "impact" "What you can do now" >}}

- Read and fix old scripts that use `getopt`.
- Catch `GetoptError` and show usage.
- Move such scripts to `argparse`.

{{< quiz id="go1" q="What does 'o:' mean in a short-option string?" options="Option o needs a value|Option o is a flag|Option o is hidden" answer="1" explain="A colon after the letter means the option takes a value." >}}
