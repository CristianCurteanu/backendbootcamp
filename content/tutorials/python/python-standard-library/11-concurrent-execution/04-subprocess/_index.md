---
title: 'Subprocess management'
description: 'Run other programs from Python with subprocess. Capture output, check exit codes, set timeouts, and avoid shell injection.'
linkTitle: 'Subprocess management'
weight: 4
---

{{< part "concept" "Why subprocess" >}}

Sometimes the best tool is another program: `git`, `ffmpeg`, `pg_dump`. **subprocess** starts a program, sends input, and reads its output and exit code.

Rule one: pass the command as a **list**, not as a single string with `shell=True`.

{{< part "code" "Run a command and read the result" >}}

```python {output=auto}
import subprocess
import sys

result = subprocess.run(
    [sys.executable, "-c", "print('hello from child')"],
    capture_output=True,
    text=True,
    check=True,
    timeout=10,
)
print(result.stdout.strip(), result.returncode)

failed = subprocess.run([sys.executable, "-c", "raise SystemExit(3)"])
print(failed.returncode)

try:
    subprocess.run([sys.executable, "-c", "raise SystemExit(1)"], check=True)
except subprocess.CalledProcessError as error:
    print("exit code", error.returncode)
```

```text {filename="Output"}
hello from child 0
3
exit code 1
```

- `capture_output=True` collects output. `text=True` decodes bytes to text.
- `check=True` raises `CalledProcessError` when the exit code is not `0`.
- `timeout=` kills the program if it takes too long and raises `TimeoutExpired`.

{{< part "ops" "Pitfalls and checks" >}}

{{< callout type="danger" title="Security" >}}
Never build a command with user text and `shell=True`. A value like `file.txt; rm -rf /` runs a second command. Use a list: `["tool", user_value]`.
{{< /callout >}}

- Use the full path or `shutil.which("tool")` to check that a program exists. A missing program raises `FileNotFoundError`.
- Always set a `timeout` for programs you do not control.
- Read **stderr** too. Errors are usually there.

```python {output=auto}
import shutil
import subprocess
import sys

filename = "a.txt; echo INJECTED"
out = subprocess.run([sys.executable, "-c", "import sys; print(sys.argv[1])", filename], capture_output=True, text=True)
print(out.stdout.strip())
print(shutil.which("definitely-not-a-program"))
```

```text {filename="Output"}
a.txt; echo INJECTED
None
```

{{< part "impact" "What you can do now" >}}

- Run external tools and check their results.
- Stop slow programs with a time-out.
- Avoid shell injection with list arguments.

{{< quiz id="sp1" q="How should you pass a user value to a command?" options="In a shell string|As an item in a list|With os.system" answer="2" explain="A list passes each value as one argument, with no shell." >}}
