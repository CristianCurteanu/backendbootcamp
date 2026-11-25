---
title: 'Unix filename pattern matching'
description: 'Match names against shell-style patterns with fnmatch. Filter lists of names and build ignore rules without touching the disk.'
linkTitle: 'Unix filename pattern matching'
weight: 8
---

{{< part "concept" "Why fnmatch" >}}

`glob` looks at files on disk. **fnmatch** only compares **text** with a pattern. Use it when you already have names, for example from an archive, a list of URLs, or an "ignore" setting.

{{< part "code" "Match and filter names" >}}

```python {output=auto}
import fnmatch

names = ["app.py", "test_app.py", "README.md", "data.csv"]

print(fnmatch.fnmatch("app.py", "*.py"))
print(fnmatch.filter(names, "test_*.py"))

ignore = ["*.csv", "*.md"]
keep = [n for n in names if not any(fnmatch.fnmatch(n, pat) for pat in ignore)]
print(keep)
print(fnmatch.fnmatchcase("APP.PY", "*.py"))
```

```text {filename="Output"}
True
['test_app.py']
['app.py', 'test_app.py']
False
```

- `fnmatch` may ignore case on Windows. `fnmatchcase` is always case-sensitive.
- `fnmatch.filter(names, pattern)` returns the names that match.
- Patterns: `*`, `?`, `[seq]`, `[!seq]`.

{{< part "ops" "Pitfalls and checks" >}}

- `*` also matches `/`. `fnmatch` treats a path as plain text, so `"a/b/c.py"` matches `"*.py"`.
- For `.gitignore` rules, `fnmatch` is only an approximation. Use a dedicated package if exact behavior matters.
- Use `fnmatchcase` when your program must behave the same on every system.

```python {output=auto}
import fnmatch

print(fnmatch.fnmatch("src/deep/mod.py", "*.py"))
```

```text {filename="Output"}
True
```

{{< part "impact" "What you can do now" >}}

- Filter lists of names with patterns.
- Build simple include and ignore rules.
- Pick `fnmatchcase` for the same behavior everywhere.

{{< quiz id="fn1" q="What does fnmatch compare?" options="Files on disk|Text with a pattern|File contents" answer="2" explain="fnmatch does not touch the disk. It only tests text." >}}
