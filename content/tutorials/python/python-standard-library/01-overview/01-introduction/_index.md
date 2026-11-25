---
title: 'Introduction'
description: 'Learn what the Python standard library is, how to find a module, and how each lesson in this tutorial is built.'
linkTitle: 'Introduction'
weight: 1
---

{{< part "concept" "Why the standard library matters" >}}

The **standard library** is the group of modules that come with Python. You do not install them. You only write `import`.

Use it first, before you look for a package on the internet. Standard modules are tested, safe to depend on, and work the same on every computer.

Do **not** use it when a package is much better for your job. For example, `urllib` can call a web API, but many teams choose `httpx` because it is easier. Know both options.

{{< part "code" "Find and import a module" >}}

Every lesson in this tutorial teaches one module. You always start with `import`.

```python {output=auto}
import sys
import json

print("json is in the standard library:", "json" in sys.stdlib_module_names)
print("requests is in the standard library:", "requests" in sys.stdlib_module_names)
print(json.dumps({"course": "backend", "free": True}))
```

```text {filename="Output"}
json is in the standard library: True
requests is in the standard library: False
{"course": "backend", "free": true}
```

- `sys.stdlib_module_names` is a set of all standard module names (Python 3.10 and newer).
- A module that is **not** in this set must be installed with `pip`.
- Use `help(json)` in the Python shell to read the official help for a module.

{{< callout type="tip" title="How to read a lesson" >}}
Each lesson has four parts: **Concept** (why), **Code** (how), **Operations** (run it safely) and **Impact** (what you can do now). Read them in order. Run every example yourself.
{{< /callout >}}

{{< part "ops" "Check your Python version" >}}

Examples in this tutorial are tested with Python 3.12. Most also work on 3.11. A few modules were **removed** in new versions. Those lessons say so at the top and show the modern replacement.

```python {output=auto}
import sys

major, minor = sys.version_info[:2]
print("Python", major, minor, "is new enough:", (major, minor) >= (3, 11))
```

```text {filename="Output"}
Python 3 12 is new enough: True
```

| Problem | Likely cause | First action |
|---|---|---|
| `ModuleNotFoundError` | The module name is wrong, or it was removed | Check the spelling and the lesson note |
| `ImportError: cannot import name` | You named your own file like a standard module, for example `json.py` | Rename your file |
| Different result on another computer | Different Python version | Print `sys.version` |

{{< part "impact" "What you can do now" >}}

- You know the standard library is installed with Python and needs no `pip`.
- You can check if a name is a standard module with `sys.stdlib_module_names`.
- You know the four parts of every lesson.

{{< quiz id="intro1" q="Which command do you need to use the `json` module?" options="pip install json|import json|download json" answer="2" explain="Standard modules need only an import. No installation is needed." >}}
