---
title: 'URL handling modules'
description: 'Work with URLs and simple HTTP requests using urllib. Parse and build URLs, encode query strings, and make requests with time-outs.'
linkTitle: 'URL handling modules'
weight: 11
---

{{< part "concept" "Why urllib" >}}

**urllib** has two parts you use all the time. `urllib.parse` splits, builds and encodes **URLs**. `urllib.request` makes simple **HTTP requests** with no extra package.

For serious API clients, many people choose `httpx` or `requests`. But `urllib.parse` is used everywhere, and `urllib.request` is enough for small scripts.

{{< part "code" "Parse, build and request" >}}

```python {output=auto}
from urllib.parse import parse_qs, quote, urlencode, urljoin, urlparse

url = "https://api.example.com/v1/search?q=python+tips&page=2#top"
parts = urlparse(url)
print(parts.scheme, parts.netloc, parts.path, parts.fragment)
print(parse_qs(parts.query))

print(urlencode({"q": "café & tea", "page": 1}))
print(quote("a b/c"), urljoin("https://example.com/docs/", "../api"))
```

```text {filename="Output"}
https api.example.com /v1/search top
{'q': ['python tips'], 'page': ['2']}
q=caf%C3%A9+%26+tea&page=1
a%20b/c https://example.com/api
```

A request with a time-out and an error check (needs internet, so it is not run here):

```python {norun=true}
import json
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

request = Request("https://api.github.com/zen", headers={"User-Agent": "bootcamp-demo"})
try:
    with urlopen(request, timeout=5) as response:
        print(response.status, response.read().decode("utf-8"))
except HTTPError as error:
    print("server error", error.code)
except URLError as error:
    print("network error", error.reason)
```

- `urlparse` splits a URL. `parse_qs` turns a query string into a dictionary of lists.
- `urlencode` builds a safe query string. It escapes spaces and special characters.
- `urljoin` resolves relative links.

{{< part "ops" "Pitfalls and checks" >}}

- **Always set `timeout`**. The default is to wait forever.
- Build query strings with `urlencode`. Never join user text with `+`.
- Allow only `http` and `https` in `urlopen`. It also opens `file://` URLs, which is dangerous with user input (**SSRF**, local file reads).
- `HTTPError` is a subclass of `URLError`. Catch `HTTPError` first.

```python {output=auto}
from urllib.parse import urlparse

def allowed(url: str) -> bool:
    return urlparse(url).scheme in {"http", "https"}

print(allowed("https://example.com"), allowed("file:///etc/passwd"))
```

```text {filename="Output"}
True False
```

{{< part "impact" "What you can do now" >}}

- Split, build and encode URLs correctly.
- Make a simple request with a time-out and error handling.
- Block dangerous URL schemes.

{{< quiz id="ul1" q="Which function builds a safe query string from a dict?" options="urlparse|urlencode|urljoin" answer="2" explain="`urlencode` escapes keys and values for you." >}}
