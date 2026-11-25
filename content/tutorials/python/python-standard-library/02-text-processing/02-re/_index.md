---
title: 'Regular expression operations'
description: 'Find, check and replace text patterns with the re module. Learn search, groups, named groups, sub and safe habits.'
linkTitle: 'Regular expression operations'
weight: 2
---

{{< part "concept" "Why regular expressions" >}}

A **regular expression** (regex) is a short pattern that describes text. Use it when plain `in` or `split` is not enough, for example to find all e-mail addresses or dates in a log.

Do **not** use regex for HTML, JSON or nested data. Use a real parser for those. Keep patterns short, and add a comment when they are hard to read.

{{< part "code" "Search, groups and replace" >}}

```python {output=auto}
import re

log = "2026-11-25 ERROR user=alice code=500"

match = re.search(r"(?P<date>\d{4}-\d{2}-\d{2}) (?P<level>[A-Z]+)", log)
if match:
    print(match["date"], match["level"])

print(re.findall(r"\w+=\w+", log))
print(re.sub(r"\d", "#", "Card 1234"))
print(re.split(r"[,;]\s*", "a, b;c"))
```

```text {filename="Output"}
2026-11-25 ERROR
['user=alice', 'code=500']
Card ####
['a', 'b', 'c']
```

- `re.search` finds the first match anywhere. `re.match` checks only the start. `re.fullmatch` checks the whole text.
- `(?P<name>...)` makes a **named group**. Read it with `match["name"]`.
- `re.compile(pattern)` prepares a pattern once. Use it when you run the same pattern many times.
- Always write patterns as **raw strings**: `r"\d+"`.

```python {output=auto}
import re

EMAIL = re.compile(r"[\w.+-]+@[\w-]+\.[\w.]+")
print(bool(EMAIL.fullmatch("dev@example.com")), bool(EMAIL.fullmatch("not an email")))
```

```text {filename="Output"}
True False
```

{{< part "ops" "Safety and debugging" >}}

- **Slow patterns:** nested repeats such as `(a+)+` can take minutes on bad input. This is called catastrophic backtracking. Never run a user-supplied pattern.
- **Test patterns** with small examples first. Use `re.VERBOSE` to add comments inside a pattern.
- Check for `None` before you use a match. `re.search` returns `None` when nothing is found.

```python {output=auto}
import re

PHONE = re.compile(
    r"""
    (\d{3})   # area code
    -
    (\d{4})   # number
    """,
    re.VERBOSE,
)
print(PHONE.search("call 555-1234 now").groups())
print(re.search(r"\d+", "no digits here"))
```

```text {filename="Output"}
('555', '1234')
None
```

{{< part "impact" "What you can do now" >}}

- Extract fields from log lines with named groups.
- Validate simple formats with `fullmatch`.
- Rewrite text with `re.sub`, and avoid slow patterns.

{{< quiz id="re1" q="Which function checks that the WHOLE text matches a pattern?" options="re.search|re.fullmatch|re.findall" answer="2" explain="`fullmatch` succeeds only if the pattern matches the entire string." >}}
