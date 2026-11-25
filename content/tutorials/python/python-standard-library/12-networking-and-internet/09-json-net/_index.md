---
title: 'JSON encoder and decoder'
description: 'This page repeats the JSON lesson. Read the main json lesson for dumps, loads, custom types and error handling.'
linkTitle: 'JSON encoder and decoder'
weight: 9
canonical: '/python/python-standard-library/08-file-formats/06-json/'
---

{{< part "concept" "This topic has one main lesson" >}}

This page is listed in the **Networking** section because JSON is the usual format for web APIs. The full lesson is in **File Formats**. It covers everything you need:

- [JSON encoder and decoder](/python/python-standard-library/08-file-formats/06-json/): `dumps`, `loads`, `indent`, custom types and errors.

{{< part "code" "The minimum for an API" >}}

```python {output=auto}
import json

request_body = json.dumps({"user": "ana", "active": True})
print(request_body)

response_text = '{"status": "ok", "items": [1, 2, 3]}'
data = json.loads(response_text)
print(data["status"], sum(data["items"]))
```

```text {filename="Output"}
{"user": "ana", "active": true}
ok 6
```

- Send with `json.dumps(...)`, then `.encode("utf-8")` for bytes.
- Receive with `json.loads(text)`.

{{< part "ops" "Pitfalls for web APIs" >}}

- Set the header `Content-Type: application/json`.
- Catch `json.JSONDecodeError`. A server error page is HTML, not JSON.
- Check the HTTP status code **before** you parse the body.

| Symptom | Likely cause | First action |
|---|---|---|
| `JSONDecodeError: Expecting value` | Body is empty or HTML | Print `response.text[:200]` |

{{< part "impact" "What you can do now" >}}

- Send and read JSON in API calls.
- Find the full lesson when you need more.

{{< quiz id="jn1" q="What should you check before parsing a response as JSON?" options="The HTTP status code|The file name|The port" answer="1" explain="An error status often comes with a body that is not JSON." >}}
