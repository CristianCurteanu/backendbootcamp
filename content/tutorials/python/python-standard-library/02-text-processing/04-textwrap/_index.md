---
title: 'Text wrapping and filling'
description: 'Wrap long text, remove common indentation, shorten previews and indent blocks with the textwrap module.'
linkTitle: 'Text wrapping and filling'
weight: 4
---

{{< part "concept" "Why wrap text" >}}

Terminal tools, e-mails and logs look better when lines have a fixed width. **textwrap** breaks long text at spaces so that each line fits a width you choose.

It works on plain text. It does not know about fonts, so it is not for web page layout.

{{< part "code" "Wrap, shorten, dedent and indent" >}}

```python {output=auto}
import textwrap

text = "Backend engineers build the parts of an application that users never see."

print(textwrap.fill(text, width=30))
print(textwrap.shorten(text, width=40, placeholder="..."))
```

```text {filename="Output"}
Backend engineers build the
parts of an application that
users never see.
Backend engineers build the parts of...
```

```python {output=auto}
import textwrap

help_text = """
    Usage: tool [options]
      -h  show help
"""
print(textwrap.dedent(help_text).strip())
print(textwrap.indent("line one\nline two", "> "))
```

```text {filename="Output"}
Usage: tool [options]
  -h  show help
> line one
> line two
```

- `fill` returns one string. `wrap` returns a list of lines.
- `shorten` cuts at a word and adds the placeholder. It is good for previews.
- `dedent` removes the spaces that all lines share. Use it for text inside triple quotes.

{{< part "ops" "Pitfalls and checks" >}}

- A very long word without spaces is **broken** in the middle by default. Set `break_long_words=False` to keep URLs whole.
- `shorten` collapses all white space into single spaces.
- Count width in characters, not screen width. East Asian characters can look wider.

```python {output=auto}
import textwrap

url = "https://example.com/a/very/long/path/that/has/no/spaces"
print(textwrap.wrap(url, width=20, break_long_words=False))
```

```text {filename="Output"}
['https://example.com/a/very/long/path/that/has/no/spaces']
```

{{< part "impact" "What you can do now" >}}

- Print help messages that fit the terminal.
- Create short previews of long text.
- Keep triple-quoted text clean with `dedent`.

{{< quiz id="wrap1" q="Which function returns a LIST of lines?" options="textwrap.fill|textwrap.wrap|textwrap.shorten" answer="2" explain="`wrap` returns a list. `fill` joins the lines into one string." >}}
