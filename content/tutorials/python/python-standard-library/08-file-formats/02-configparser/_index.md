---
title: 'Configuration file parser'
description: 'Read INI-style configuration with configparser. Get typed values, use defaults and override settings from the environment.'
linkTitle: 'Configuration file parser'
weight: 2
---

{{< part "concept" "Why configparser" >}}

Configuration files keep settings out of your code. The **INI** format (sections with `key = value`) is simple and easy to edit. **configparser** reads it and converts values to the right types.

Never put real secrets in a file that you commit to Git.

{{< part "code" "Read settings with types" >}}

```python {output=auto}
from configparser import ConfigParser

text = """
[server]
host = 0.0.0.0
port = 8080
debug = yes

[database]
url = postgres://localhost/app
pool = 5
"""

config = ConfigParser()
config.read_string(text)

print(config.sections())
print(config["server"]["host"], config.getint("server", "port"))
print(config.getboolean("server", "debug"))
print(config.getint("database", "timeout", fallback=30))
```

- `getint`, `getfloat` and `getboolean` convert the text. `getboolean` understands `yes`, `no`, `true`, `false`, `1`, `0`.
- `fallback=` gives a default when the key is missing.
- Use `config.read("settings.ini", encoding="utf-8")` for a real file.

{{< part "ops" "Pitfalls and checks" >}}

- Section and key names: keys become **lowercase**. Values stay as text.
- `%` is special in values (interpolation). Use `ConfigParser(interpolation=None)` if your values contain `%`.
- A missing section raises `KeyError`. A bad number raises `ValueError`. Handle both at startup and stop with a clear message.

```python {output=auto}
import os
from configparser import ConfigParser

config = ConfigParser()
config.read_string("[server]\nport = 8080\n")
port = int(os.environ.get("APP_PORT", config.getint("server", "port")))
print(port)
```

{{< part "impact" "What you can do now" >}}

- Load typed settings from INI text or files.
- Provide defaults with `fallback`.
- Let an environment variable override the file.

{{< quiz id="cfg1" q="Which method turns 'yes' into True?" options="getint|getboolean|get" answer="2" explain="`getboolean` understands yes, no, true, false, 1 and 0." >}}
