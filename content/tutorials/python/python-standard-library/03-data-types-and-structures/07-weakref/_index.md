---
title: 'Weak references'
description: 'Reference objects without keeping them alive using weakref. Build caches that clean themselves when memory is freed.'
linkTitle: 'Weak references'
weight: 7
---

{{< part "concept" "Why weak references" >}}

Normally, a reference keeps an object alive. A **weak reference** does not. When no normal references remain, Python frees the object and the weak reference becomes empty.

This is useful for **caches** and for "observer" lists, where you do not want your cache to stop an object from being freed.

{{< part "code" "A self-cleaning cache" >}}

```python {output=auto}
import gc
import weakref

class Image:
    def __init__(self, name: str) -> None:
        self.name = name

img = Image("logo.png")
ref = weakref.ref(img)
print(ref().name)

cache: weakref.WeakValueDictionary[str, Image] = weakref.WeakValueDictionary()
cache["logo"] = img
print(len(cache))

del img
gc.collect()
print(ref(), len(cache))
```

```text {filename="Output"}
logo.png
1
None 0
```

- `weakref.ref(obj)` makes a weak reference. Call it, `ref()`, to get the object or `None`.
- `WeakValueDictionary` removes an entry when its value is freed.
- `gc.collect()` is used here only to make the example clear. Normally CPython frees the object at once.

{{< part "ops" "Pitfalls and checks" >}}

- Always check for `None` after `ref()`. The object may be gone.
- Built-in `int`, `str`, `list` and `dict` instances cannot be weakly referenced. Your own classes can.
- Do not rely on **when** an object is freed. Other Python implementations act differently.

```python {expect=error}
import weakref

weakref.ref([1, 2, 3])
```

```text {filename="Output"}
TypeError: cannot create weak reference to 'list' object
```

{{< part "impact" "What you can do now" >}}

- Build a cache that does not leak memory.
- Know why a weak reference returns `None`.
- Avoid reference cycles in observer code.

{{< quiz id="weak1" q="What does ref() return after the object was freed?" options="An error|None|The old value" answer="2" explain="A dead weak reference returns `None`." >}}
