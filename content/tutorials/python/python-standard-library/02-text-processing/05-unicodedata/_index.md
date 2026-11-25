---
title: 'Unicode Database'
description: 'Handle accents and symbols safely with unicodedata. Learn normalization, character names and categories for reliable text comparison.'
linkTitle: 'Unicode Database'
weight: 5
---

{{< part "concept" "Why Unicode matters" >}}

**Unicode** is the standard that gives every character a number. The same visible text can have different internal forms. For example, `é` can be one character, or `e` plus an accent mark. Two such strings look equal but compare as different.

**unicodedata** helps you normalize text so that comparison, search and storage work for every language.

{{< part "code" "Normalize and inspect characters" >}}

```python {output=auto}
import unicodedata

one = "café"          # é as one character
two = "café"         # e + combining accent
print(one == two)
print(unicodedata.normalize("NFC", one) == unicodedata.normalize("NFC", two))

print(unicodedata.name("é"), unicodedata.category("é"))
```

```text {filename="Output"}
False
True
LATIN SMALL LETTER E WITH ACUTE Ll
```

```python {output=auto}
import unicodedata

def remove_accents(text: str) -> str:
    decomposed = unicodedata.normalize("NFD", text)
    return "".join(c for c in decomposed if not unicodedata.combining(c))

print(remove_accents("Zürich café Señor"))
```

```text {filename="Output"}
Zurich cafe Senor
```

- `NFC` joins characters (best for storage). `NFD` splits them (useful to remove accents).
- `unicodedata.name()` gives the official name. `category()` gives a short code such as `Ll` (lowercase letter).

{{< part "ops" "Pitfalls and checks" >}}

- **Normalize before you compare or hash** user names, file names and search terms.
- Use `casefold()` for caseless matching, after normalizing.
- Removing accents changes meaning in some languages. Use it only for search keys, never for stored data.

| Symptom | Likely cause | First action |
|---|---|---|
| Duplicate users with the "same" name | Different Unicode forms | Store the `NFC` form |
| Search misses accented words | Text not normalized | Normalize both query and data |

{{< part "impact" "What you can do now" >}}

- Compare text from any language reliably.
- Build accent-free search keys.
- Find out what an unknown character is with `name()`.

{{< quiz id="uni1" q="Which form is the best default for storing text?" options="NFD|NFC|ASCII" answer="2" explain="`NFC` gives one stable, compact form for most text." >}}
