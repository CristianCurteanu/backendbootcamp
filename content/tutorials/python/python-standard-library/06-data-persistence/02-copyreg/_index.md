---
title: 'Register pickle support functions'
description: 'Teach pickle how to save objects it cannot handle by default. Register a reducer function with copyreg for classes you cannot edit.'
linkTitle: 'Register pickle support functions'
weight: 2
---

{{< part "concept" "Why copyreg" >}}

Some objects cannot be pickled directly: open sockets, locks, database handles. If you own the class, add `__reduce__`. If you **cannot edit the class** (it is from a library), register a **reducer** function with **copyreg**.

A reducer tells pickle: "To rebuild this object, call this function with these arguments."

{{< part "code" "Register a reducer" >}}

```python {output=auto}
import copyreg
import pickle

class Connection:
    def __init__(self, url: str) -> None:
        self.url = url
        self.handle = object()   # cannot be pickled in real life

def reduce_connection(conn: Connection) -> tuple:
    return Connection, (conn.url,)

copyreg.pickle(Connection, reduce_connection)

restored = pickle.loads(pickle.dumps(Connection("db://main")))
print(restored.url, restored.handle is not None)
```

```text {filename="Output"}
db://main True
```

- A reducer returns `(callable, args)`. On loading, pickle calls `callable(*args)`.
- Here only the `url` is saved. The new object makes its own `handle`.
- `copy.copy()` and `copy.deepcopy()` also use registered reducers.

{{< part "ops" "Pitfalls and checks" >}}

- Register the reducer **before** you pickle, in every process that pickles or unpickles.
- The `callable` must be importable by name when loading.
- Keep the saved arguments simple (strings, numbers). Never save secrets in a pickle that others can read.

```python {output=auto}
import pickle

class Lock:
    def __init__(self) -> None:
        self.fn = lambda: None

try:
    pickle.dumps(Lock())
except (pickle.PicklingError, AttributeError) as error:
    print(type(error).__name__)
```

```text {filename="Output"}
AttributeError
```

{{< part "impact" "What you can do now" >}}

- Make unpicklable objects picklable without changing their class.
- Save only the data needed to rebuild an object.
- Know that `copy` uses the same registry.

{{< quiz id="cr1" q="What does a reducer function return?" options="A string|A (callable, args) tuple|A dict" answer="2" explain="Pickle calls `callable(*args)` to rebuild the object." >}}
