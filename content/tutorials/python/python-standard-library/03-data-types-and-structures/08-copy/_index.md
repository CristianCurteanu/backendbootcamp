---
title: 'Shallow and deep copy operations'
description: 'Understand shallow and deep copies with the copy module, and avoid bugs where two variables share the same list.'
linkTitle: 'Shallow and deep copy operations'
weight: 8
---

{{< part "concept" "Why copying is tricky" >}}

In Python, `b = a` does **not** copy a list. Both names point to the same object. If you change one, the other changes too.

The **copy** module makes real copies. A **shallow** copy copies the outer container only. A **deep** copy copies everything inside, too.

{{< part "code" "Shared, shallow and deep" >}}

```python {output=auto}
import copy

a = [[1, 2], [3, 4]]
same = a
shallow = copy.copy(a)
deep = copy.deepcopy(a)

a[0].append(99)
print("same   ", same)
print("shallow", shallow)
print("deep   ", deep)
```

```text {filename="Output"}
same    [[1, 2, 99], [3, 4]]
shallow [[1, 2, 99], [3, 4]]
deep    [[1, 2], [3, 4]]
```

- `same` shows the change: it is the same object.
- `shallow` shows the change: its inner lists are shared.
- `deep` is fully separate.

For a simple one-level list, `list(a)`, `a[:]` or `a.copy()` are shallow copies.

{{< part "ops" "Pitfalls and checks" >}}

- A default argument like `def f(items=[])` is shared between calls. Use `None` and create the list inside.
- `deepcopy` is slow for big data and can fail on objects like open files or locks.
- Your class can control copying with `__copy__` and `__deepcopy__`.

```python {output=auto}
def add_item(item: str, items: list[str] | None = None) -> list[str]:
    items = [] if items is None else items
    items.append(item)
    return items

print(add_item("a"), add_item("b"))
```

```text {filename="Output"}
['a'] ['b']
```

{{< part "impact" "What you can do now" >}}

- Explain why changing one list can change another.
- Pick shallow or deep copy on purpose.
- Avoid the mutable default argument bug.

{{< quiz id="copy1" q="After `b = a` for a list, how many list objects exist?" options="Two|One|Zero" answer="2" explain="Assignment copies the reference, not the list." >}}
