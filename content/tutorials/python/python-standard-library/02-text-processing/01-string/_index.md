---
title: 'Common string operations'
description: 'Clean, split, join and format text with built-in string methods, plus the string module and Template for safe placeholders.'
linkTitle: 'Common string operations'
weight: 1
---

{{< part "concept" "Why text tools come first" >}}

Most backend data is text: names, log lines, URLs, JSON. Python strings have many methods, so you rarely need a package to clean text.

A string is **immutable**. This means a method never changes the original. It returns a **new** string.

{{< part "code" "Clean, split, join and format" >}}

```python {output=auto}
raw = "  Alice, bob ,CAROL  "

names = [part.strip().title() for part in raw.split(",")]
print(names)
print(" | ".join(names))
print("hello world".replace("world", "Python"))
print("report.csv".endswith(".csv"), "report.csv".removesuffix(".csv"))

name, score = "Alice", 91.456
print(f"{name:>8} scored {score:.1f}")
```

```text {filename="Output"}
['Alice', 'Bob', 'Carol']
Alice | Bob | Carol
hello Python
True report
   Alice scored 91.5
```

- `strip()` removes spaces at both ends. `split(",")` cuts text into a list.
- `" | ".join(list)` is the reverse of `split`. Call it on the separator.
- `f"{score:.1f}"` formats a number with one decimal place.

The `string` module has constants and `Template`. A `Template` is safer than `str.format` when the **template text itself** comes from a user, because `$name` placeholders cannot read attributes or call code.

```python {output=auto}
import string
from string import Template

print(string.ascii_lowercase[:5], string.digits)
greeting = Template("Hello, $user! You have $count messages.")
print(greeting.substitute(user="Maria", count=3))
print(greeting.safe_substitute(user="Maria"))
```

```text {filename="Output"}
abcde 0123456789
Hello, Maria! You have 3 messages.
Hello, Maria! You have $count messages.
```

{{< part "ops" "Pitfalls and checks" >}}

- **Do not build text in a loop with `+=`** for big data. Collect parts in a list and call `"".join(parts)`.
- `split()` with no argument splits on any whitespace and removes empty parts. `split(" ")` does not.
- Compare text from users with `casefold()`, not `lower()`, when languages can differ.

```python {output=auto}
print("a  b".split(" "))
print("a  b".split())
print("straße".lower() == "STRASSE".lower(), "straße".casefold() == "STRASSE".casefold())
```

```text {filename="Output"}
['a', '', 'b']
['a', 'b']
False True
```

{{< callout type="mistake" >}}
`text.strip("abc")` removes any of the letters `a`, `b`, `c` from the ends. It does **not** remove the word `abc`. Use `removeprefix` or `removesuffix` for whole words.
{{< /callout >}}

{{< part "impact" "What you can do now" >}}

- Clean user input in one line with `strip`, `split` and `join`.
- Format output with `f-strings` and format specs like `:>8` and `:.1f`.
- Fill templates safely with `string.Template`.

{{< quiz id="str1" q="What does `'a,b'.split(',')` return?" options="the text a b|a list: ['a', 'b']|a tuple: ('a', 'b')" answer="2" explain="`split` returns a list of the parts." >}}
