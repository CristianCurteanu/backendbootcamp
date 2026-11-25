---
title: 'Helpers for computing deltas'
description: 'Compare texts with difflib. Show line changes, measure how similar two strings are, and suggest the closest match.'
linkTitle: 'Helpers for computing deltas'
weight: 3
---

{{< part "concept" "Why compare text" >}}

**difflib** finds the differences between two texts. Backend uses: show what changed in a config file, test that output is close to what you expect, or suggest a fix for a typo ("Did you mean...?").

It compares text only. It does not understand meaning. For very large files, use a tool such as `git diff`.

{{< part "code" "Diff lines and find close matches" >}}

```python {output=auto}
import difflib

old = ["port = 80", "debug = true"]
new = ["port = 8080", "debug = true", "workers = 4"]

for line in difflib.unified_diff(old, new, "old.conf", "new.conf", lineterm=""):
    print(line)
```

```text {filename="Output"}
--- old.conf
+++ new.conf
@@ -1,2 +1,3 @@
-port = 80
+port = 8080
 debug = true
+workers = 4
```

```python {output=auto}
import difflib

print(round(difflib.SequenceMatcher(None, "backend", "backed").ratio(), 2))
print(difflib.get_close_matches("pyton", ["python", "pytest", "ruby"], n=1))
```

```text {filename="Output"}
0.92
['python']
```

- `unified_diff` prints lines with `-` (removed) and `+` (added), like `git diff`.
- `SequenceMatcher(...).ratio()` gives a number from `0.0` to `1.0`. Higher means more similar.
- `get_close_matches` returns the best guesses. `cutoff` (default `0.6`) sets how strict it is.

{{< part "ops" "Pitfalls and checks" >}}

- The first two arguments of `SequenceMatcher` are `None` (no junk filter) and the two texts. Order matters for the result.
- Split text into lines first: use `text.splitlines()`.
- A ratio is a hint, not proof. Set your own cutoff by testing real data.

| Symptom | Likely cause | First action |
|---|---|---|
| Diff shows every line changed | Different line endings (`\r\n` vs `\n`) | Use `splitlines()` on both texts |
| No close match found | `cutoff` too high | Lower `cutoff`, for example `0.5` |

{{< part "impact" "What you can do now" >}}

- Print a readable diff between two versions of a file.
- Measure the similarity of two strings.
- Add "Did you mean...?" help to a command-line tool.

{{< quiz id="diff1" q="What does a line starting with `+` mean in `unified_diff`?" options="It was removed|It was added|It is unchanged" answer="2" explain="A `+` line exists only in the new text." >}}
