---
title: 'Efficient arrays of numeric values'
description: 'Store large amounts of numbers compactly with the array module and compare its memory use with a normal list.'
linkTitle: 'Efficient arrays of numeric values'
weight: 6
---

{{< part "concept" "Why array" >}}

A Python list stores a pointer to a full object for every number. An **array** stores raw numbers of one type, side by side. This uses much less memory. It is useful for big sensor data, audio samples or binary files.

If you do heavy math on numbers, NumPy is better. Use `array` when you want no extra packages.

{{< part "code" "Create and use an array" >}}

```python {output=auto}
from array import array
import sys

numbers = array("i", [1, 2, 3, 4])
numbers.append(5)
print(numbers, numbers[0], len(numbers))
print(numbers.tobytes()[:8])

big_list = list(range(10_000))
big_array = array("i", range(10_000))
print(sys.getsizeof(big_list), sys.getsizeof(big_array))
```

```text {filename="Output"}
array('i', [1, 2, 3, 4, 5]) 1 5
b'\x01\x00\x00\x00\x02\x00\x00\x00'
80056 40420
```

- The first argument is a **type code**: `"i"` signed int, `"d"` float, `"B"` unsigned byte.
- An array has most list methods: `append`, `extend`, `pop`, slicing.
- `tobytes()` and `frombytes()` convert to and from raw bytes.

`getsizeof` shows the container size, not the integer objects stored by the list. The real saving for the list is larger than shown.

{{< part "ops" "Pitfalls and checks" >}}

- Every item must match the type code. `array("i", [1.5])` raises `TypeError`.
- Type `"i"` is usually 4 bytes. Check `numbers.itemsize`.
- Byte order of `tobytes()` depends on the computer. Use `byteswap()` when you exchange files between systems.

```python {expect=error}
from array import array

array("i", [1.5])
```

```text {filename="Output"}
TypeError: 'float' object cannot be interpreted as an integer
```

{{< part "impact" "What you can do now" >}}

- Store millions of numbers in less memory.
- Convert numbers to bytes and back.
- Choose between `list`, `array` and NumPy.

{{< quiz id="arr1" q="What does the type code 'd' mean?" options="integer|float (double)|text" answer="2" explain="`d` stores a double-precision float." >}}
