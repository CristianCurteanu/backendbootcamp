---
title: Access to underlying platform's identifying data
description: 'Find out which operating system, CPU type and Python build your code runs on with the platform module, for diagnostics and portable code.'
linkTitle: Access to underlying platform's identifying data
weight: 7
---

{{< part "concept" "Why the platform module" >}}

Sometimes you must know where the program runs: a bug report, a download that depends on the operating system, or a diagnostic page. **platform** returns the system name, version, CPU type and Python build.

Use it for **information**. For branching code, check features instead of system names when you can.

{{< part "code" "Read platform information" >}}

```python {output=auto}
import platform
import sys

print(platform.python_implementation())
print(platform.system() in {"Linux", "Darwin", "Windows"})
print(len(platform.machine()) > 0, platform.python_version_tuple()[0])
print(sys.platform in {"linux", "darwin", "win32"})

info = {
    "python": platform.python_version(),
    "system": platform.system(),
    "machine": platform.machine(),
}
print(sorted(info))
```

```text {filename="Output"}
CPython
True
True 3
True
['machine', 'python', 'system']
```

- `platform.system()` returns `"Linux"`, `"Darwin"` (macOS) or `"Windows"`.
- `platform.machine()` returns the CPU type, such as `x86_64` or `arm64`.
- `sys.platform` is a short code: `linux`, `darwin`, `win32`.

{{< part "ops" "Pitfalls and checks" >}}

- Do not read version numbers as numbers: `"3.9" > "3.12"` is `True` for text. Compare `sys.version_info` tuples instead.
- Inside a container, `platform` shows the container's view, not the host.
- Add this information to bug reports and error logs. It saves time.

```python {output=auto}
import sys

print((3, 9) < sys.version_info[:2], "3.9" > "3.12")
```

```text {filename="Output"}
True True
```

{{< part "impact" "What you can do now" >}}

- Print a diagnostic summary of the environment.
- Compare Python versions correctly.
- Choose between `platform` and `sys.platform`.

{{< quiz id="pf1" q="What does platform.system() return on macOS?" options="macOS|Darwin|Apple" answer="2" explain="macOS reports `Darwin`." >}}
