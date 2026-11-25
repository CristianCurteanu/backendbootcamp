---
title: 'DB-API 2.0 interface for SQLite databases'
description: 'Use SQLite from Python with sqlite3. Create tables, insert and query rows with safe parameters, and commit transactions.'
linkTitle: 'DB-API 2.0 interface for SQLite databases'
weight: 6
---

{{< part "concept" "Why SQLite" >}}

**SQLite** is a complete SQL database in a single file. There is no server to install. Python includes it as **sqlite3**. It is excellent for tools, tests, small apps and local caches.

For many users writing at the same time, or for data on several servers, use PostgreSQL or MySQL.

{{< part "code" "Create, insert and query" >}}

```python {output=auto}
import sqlite3

conn = sqlite3.connect(":memory:")
conn.row_factory = sqlite3.Row

conn.execute("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT NOT NULL, age INTEGER)")
with conn:
    conn.executemany(
        "INSERT INTO users (name, age) VALUES (?, ?)",
        [("Ana", 31), ("Bob", 25), ("Cora", 40)],
    )

for row in conn.execute("SELECT id, name FROM users WHERE age > ? ORDER BY age", (26,)):
    print(row["id"], row["name"])

print(conn.execute("SELECT COUNT(*) FROM users").fetchone()[0])
conn.close()
```

```text {filename="Output"}
1 Ana
3 Cora
3
```

- `":memory:"` makes a temporary database. Use a file name like `"app.db"` to save data.
- `?` marks a **parameter**. Python fills it safely.
- `with conn:` commits if the block succeeds, and rolls back on an error.
- `row_factory = sqlite3.Row` lets you read columns by name.

{{< part "ops" "Pitfalls and checks" >}}

{{< callout type="danger" title="Security" >}}
Never build SQL with f-strings or `+`. User text can change your query (SQL injection). Always use `?` parameters.
{{< /callout >}}

```python {output=auto}
import sqlite3

conn = sqlite3.connect(":memory:")
conn.execute("CREATE TABLE t (name TEXT)")
evil = "x'); DROP TABLE t; --"
conn.execute("INSERT INTO t VALUES (?)", (evil,))
print(conn.execute("SELECT name FROM t").fetchone()[0])
```

```text {filename="Output"}
x'); DROP TABLE t; --
```

- A connection can be used only in the thread that made it, by default.
- Close the connection when you finish. Use `contextlib.closing` for a `with` block.
- Add `PRAGMA foreign_keys = ON` if you use foreign keys. SQLite has them off by default.

{{< part "impact" "What you can do now" >}}

- Create a small database with no setup.
- Query safely with parameters.
- Use `with conn:` to commit or roll back correctly.

{{< quiz id="sql1" q="How do you pass user text safely to SQL?" options="f-string|? parameters|string +" answer="2" explain="Parameters keep data separate from the SQL command." >}}
