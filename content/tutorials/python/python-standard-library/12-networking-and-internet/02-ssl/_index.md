---
title: 'TLS/SSL wrapper for socket objects'
description: 'Secure sockets with TLS using ssl. Create a safe default context, verify certificates and host names, and avoid disabling checks.'
linkTitle: 'TLS/SSL wrapper for socket objects'
weight: 2
---

{{< part "concept" "Why TLS" >}}

**TLS** (often called SSL) encrypts a connection and proves **who** you talk to, using certificates. HTTPS, secure e-mail and database connections all use it. The **ssl** module wraps a socket in TLS.

The most important rule: **keep certificate and host name verification on**.

{{< part "code" "A safe client context" >}}

```python {output=auto}
import ssl

context = ssl.create_default_context()
print(context.verify_mode == ssl.CERT_REQUIRED)
print(context.check_hostname)
print(context.minimum_version >= ssl.TLSVersion.TLSv1_2)
```

```text {filename="Output"}
True
True
False
```

Connect with it (needs internet, so it is not run here):

```python {norun=true}
import socket
import ssl

host = "example.com"
context = ssl.create_default_context()
with socket.create_connection((host, 443), timeout=5) as raw:
    with context.wrap_socket(raw, server_hostname=host) as tls:
        print(tls.version())          # for example TLSv1.3
        print(tls.getpeercert()["subject"])
```

- `create_default_context()` loads trusted certificate authorities and turns on all checks.
- `server_hostname` is required. It is used to check the certificate name.
- For your own server, use `ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)` and `load_cert_chain`.

{{< part "ops" "Pitfalls and checks" >}}

{{< callout type="danger" title="Security" >}}
Never "fix" an error with `verify_mode = ssl.CERT_NONE` or `check_hostname = False`. The connection is then open to attackers. Fix the real cause: a missing company CA, a wrong host name, or an expired certificate.
{{< /callout >}}

| Error | Likely cause | First action |
|---|---|---|
| `CERTIFICATE_VERIFY_FAILED` | Unknown CA or self-signed certificate | Load the right CA with `cafile=` |
| `hostname doesn't match` | Wrong host name in the URL | Use the name in the certificate |
| `certificate has expired` | Server certificate expired | Renew it, and check your system clock |

{{< part "impact" "What you can do now" >}}

- Create a TLS context that verifies certificates.
- Read the common TLS errors.
- Refuse to turn off verification.

{{< quiz id="ssl1" q="What should you do on CERTIFICATE_VERIFY_FAILED?" options="Set CERT_NONE|Find and fix the real cause|Ignore it" answer="2" explain="Disabling checks removes the protection of TLS." >}}
