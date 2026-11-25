---
title: 'Generate and parse Mac OS X .plist files'
description: 'Read and write Apple property list (.plist) files with plistlib, in XML or binary format, for macOS and iOS tooling.'
linkTitle: 'Generate and parse Mac OS X .plist files'
weight: 5
---

{{< part "concept" "Why plistlib" >}}

A **property list** (`.plist`) is Apple's format for settings: app info, launch agents, and iOS and macOS projects. If your scripts build or inspect Apple apps, **plistlib** reads and writes these files with plain Python types.

{{< part "code" "Write and read a plist" >}}

```python {output=auto}
import plistlib
from datetime import datetime

data = {
    "CFBundleName": "Demo",
    "Version": 3,
    "Debug": False,
    "Tags": ["a", "b"],
    "Built": datetime(2026, 11, 25),
}

xml_bytes = plistlib.dumps(data, fmt=plistlib.FMT_XML)
print(xml_bytes.decode().splitlines()[3])
print(plistlib.loads(xml_bytes)["Version"])

binary = plistlib.dumps(data, fmt=plistlib.FMT_BINARY)
print(plistlib.loads(binary)["Tags"])
```

- `dumps` and `loads` work on bytes. `dump` and `load` work on binary files.
- Supported types: `dict`, `list`, `str`, `int`, `float`, `bool`, `bytes`, `datetime`.
- `loads` detects XML or binary format by itself.

{{< part "ops" "Pitfalls and checks" >}}

- Open plist files in **binary mode** (`"rb"`, `"wb"`).
- `None` is not supported in the default settings. Use `skipkeys` or remove empty values first.
- Dictionary keys must be strings.
- Dates are stored as UTC. The binary format accepts only **naive** datetimes, so convert first: `dt.astimezone(timezone.utc).replace(tzinfo=None)`.

```python {expect=error}
import plistlib

plistlib.dumps({"empty": None})
```

{{< part "impact" "What you can do now" >}}

- Read app settings from `Info.plist`.
- Write plist data in XML or binary format.
- Avoid the `None` and binary-mode errors.

{{< quiz id="pl1" q="In which mode do you open a plist file?" options="text|binary|append only" answer="2" explain="plistlib reads and writes bytes, so use `rb` and `wb`." >}}
