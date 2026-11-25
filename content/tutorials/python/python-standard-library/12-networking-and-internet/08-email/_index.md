---
title: 'An email and MIME handling package'
description: 'Build, read and attach files to email messages with the email package. Create EmailMessage objects, set headers and parse raw text.'
linkTitle: 'An email and MIME handling package'
weight: 8
---

{{< part "concept" "Why the email package" >}}

An email is text with **headers** (From, To, Subject) and a **body**, sometimes with attachments (MIME). The **email** package builds and parses this format. It does **not send** mail: sending is done by `smtplib` (a later lesson).

{{< part "code" "Build and parse a message" >}}

```python {output=auto}
from email import message_from_string, policy
from email.message import EmailMessage

msg = EmailMessage()
msg["From"] = "bot@example.com"
msg["To"] = "ana@example.com"
msg["Subject"] = "Your report"
msg.set_content("Hello Ana,\nYour report is attached.")
msg.add_attachment(b"id,total\n1,10\n", maintype="text", subtype="csv", filename="report.csv")

print(msg["Subject"], msg.is_multipart())
print([part.get_content_type() for part in msg.walk()])

raw = msg.as_string()
parsed = message_from_string(raw, policy=policy.default)
print(parsed["To"], parsed.get_body(preferencelist=("plain",)).get_content().splitlines()[0])
print([a.get_filename() for a in parsed.iter_attachments()])
```

```text {filename="Output"}
Your report True
['multipart/mixed', 'text/plain', 'text/csv']
ana@example.com Hello Ana,
['report.csv']
```

- Always use `EmailMessage` (modern API). `set_content` sets the text body.
- `add_attachment(bytes, maintype=, subtype=, filename=)` adds a file.
- Parse with `policy=policy.default` to get the modern API back.
- `msg.walk()` goes through every part.

{{< part "ops" "Pitfalls and checks" >}}

- **Header injection:** never put user text with line breaks into a header. `EmailMessage` raises `ValueError` for that. Do not catch and ignore it.
- Add both a **plain text** body and optionally an HTML body (`add_alternative`) for clients that need it.
- Non-English text is handled for you with UTF-8. Do not encode it manually.

```python {output=auto}
from email.message import EmailMessage

msg = EmailMessage()
try:
    msg["Subject"] = "Hi\nBcc: attacker@example.com"
except ValueError as error:
    print("blocked:", type(error).__name__)
```

```text {filename="Output"}
blocked: ValueError
```

{{< part "impact" "What you can do now" >}}

- Create messages with text and attachments.
- Parse raw email text.
- Block header injection.

{{< quiz id="em1" q="Which class should you use to create a new email?" options="Message|EmailMessage|MIMEText only" answer="2" explain="`EmailMessage` is the modern, recommended API." >}}
