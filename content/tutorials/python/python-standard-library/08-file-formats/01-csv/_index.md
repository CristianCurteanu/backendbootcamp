---
title: 'CSV File Reading and Writing'
description: 'Read and write CSV files correctly with csv. Handle quotes, commas inside text, headers, and the newline setting.'
linkTitle: 'CSV File Reading and Writing'
weight: 1
---

{{< part "concept" "Why use the csv module" >}}

CSV looks easy, but real files have commas inside text, quotes and line breaks. Splitting with `line.split(",")` breaks on them. The **csv** module follows the rules for you.

{{< part "code" "Read and write rows" >}}

```python {output=auto}
import csv
import io

rows = [
    {"id": 1, "name": "Ana", "note": "likes tea, no sugar"},
    {"id": 2, "name": "Bob", "note": 'said "hi"'},
]

buffer = io.StringIO()
writer = csv.DictWriter(buffer, fieldnames=["id", "name", "note"])
writer.writeheader()
writer.writerows(rows)
text = buffer.getvalue()
print(text)

for row in csv.DictReader(io.StringIO(text)):
    print(row["id"], row["name"], "|", row["note"])
```

- `DictWriter` and `DictReader` use column names. They are easier to read than index numbers.
- The writer adds quotes when needed. The reader removes them.
- With real files, open them with `newline=""` and an `encoding`.

{{< part "ops" "Pitfalls and checks" >}}

- Open files like this: `open(path, newline="", encoding="utf-8")`. Without `newline=""`, you can get blank lines on Windows.
- Every value from `csv` is a **string**. Convert numbers yourself: `int(row["id"])`.
- Excel often saves CSV in another encoding. If you see `Ã©`, try `encoding="utf-8-sig"`.
- Spreadsheet programs run values that start with `=`. Clean user text before you export it.

```python {output=auto}
import csv
import io

row = next(csv.DictReader(io.StringIO("id,age\n7,31\n")))
print(row, type(row["age"]).__name__, int(row["age"]) + 1)
```

{{< part "impact" "What you can do now" >}}

- Read and write CSV with correct quoting.
- Use column names instead of numbers.
- Avoid the encoding and newline problems.

{{< quiz id="csv1" q="What type are values read from csv?" options="int|str|auto-detected" answer="2" explain="The csv module returns strings. Convert them yourself." >}}
