---
title: 'Convenient Web-browser controller'
description: 'Open web pages in the user''s browser from a Python script with webbrowser, and know where it works and where it does not.'
linkTitle: 'Convenient Web-browser controller'
weight: 10
---

{{< part "concept" "Why webbrowser" >}}

The **webbrowser** module opens a URL in the user's default browser. It is useful for **local developer tools and command-line programs**: open the docs, show a report, or finish an OAuth login.

It does nothing on a server without a screen. Do not use it in backend services.

{{< part "code" "Open a page" >}}

```python {norun=true}
import webbrowser

webbrowser.open("https://docs.python.org/3/library/webbrowser.html")
webbrowser.open_new_tab("https://backendbootcamp.online")
```

Check what is available without opening anything:

```python {output=auto}
import webbrowser

try:
    browser = webbrowser.get()
    print("browser found:", bool(browser.name))
except webbrowser.Error:
    print("no browser available")
```

```text {filename="Output"}
no browser available
```

- `open(url)` returns `True` if it could start a browser.
- `open_new_tab(url)` asks for a new tab.
- `webbrowser.get("firefox")` selects a specific browser.

{{< part "ops" "Pitfalls and checks" >}}

- On servers, containers and CI, there is usually **no browser**. The call returns `False`. Print the URL instead.
- Validate URLs that come from users. Allow only `https://` links. A `file://` or `javascript:` link can be dangerous.
- The `BROWSER` environment variable can change the choice.

```python {output=auto}
from urllib.parse import urlparse

def safe(url: str) -> bool:
    return urlparse(url).scheme in {"http", "https"}

print(safe("https://example.com"), safe("file:///etc/passwd"))
```

```text {filename="Output"}
True False
```

{{< part "impact" "What you can do now" >}}

- Open links from developer tools.
- Handle environments without a browser.
- Allow only safe URL schemes.

{{< quiz id="wb1" q="When does webbrowser.open return False?" options="When no browser can be started|Always|Never" answer="1" explain="On headless systems there is no browser to start." >}}
