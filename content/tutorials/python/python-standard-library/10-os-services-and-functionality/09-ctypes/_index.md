---
title: 'A foreign function library for Python'
description: 'Call C libraries from Python with ctypes. Learn C types, structures and function signatures, and the safety rules for native code.'
linkTitle: 'A foreign function library for Python'
weight: 9
---

{{< part "concept" "Why ctypes" >}}

**ctypes** lets Python call functions in C libraries (`.so`, `.dll`, `.dylib`) without writing C. Use it to reuse a system library or talk to a driver.

It is powerful and **unsafe**: a wrong type can crash the whole program. For larger projects, prefer `cffi` or write an extension.

{{< part "code" "C types and a C library call" >}}

```python {output=auto}
import ctypes

print(ctypes.sizeof(ctypes.c_int), ctypes.sizeof(ctypes.c_double))

class Point(ctypes.Structure):
    _fields_ = [("x", ctypes.c_int), ("y", ctypes.c_int)]

p = Point(3, 4)
print(p.x + p.y, ctypes.sizeof(p))
```

```text {filename="Output"}
4 8
7 8
```

Calling a C function from the system library (Linux example):

```python {norun=true}
import ctypes

libc = ctypes.CDLL("libc.so.6")
libc.abs.argtypes = [ctypes.c_int]
libc.abs.restype = ctypes.c_int
print(libc.abs(-5))   # 5
```

- `c_int`, `c_double`, `c_char_p` are Python names for C types.
- A `Structure` describes a C `struct`.
- Library names differ: `libc.so.6` (Linux), `libc.dylib` (macOS), `msvcrt` (Windows).

{{< part "ops" "Pitfalls and checks" >}}

- **Always set `argtypes` and `restype`.** Without them ctypes guesses, and the result can be wrong or crash.
- A bad pointer can cause a **segmentation fault**. Python cannot catch it.
- You must keep Python objects alive while C uses their memory.
- Test native code on every platform you support.

| Symptom | Likely cause | First action |
|---|---|---|
| Crash with no Python error | Wrong `argtypes` or bad pointer | Set types, check sizes |
| `OSError: cannot load library` | Wrong library name or path | Check the name for this OS |

{{< part "impact" "What you can do now" >}}

- Describe C types and structures in Python.
- Call a C function with correct signatures.
- Know the risks and when to choose a safer tool.

{{< quiz id="ct1" q="What must you set before calling a C function?" options="argtypes and restype|only the name|a decorator" answer="1" explain="They tell ctypes how to pass arguments and read the result." >}}
