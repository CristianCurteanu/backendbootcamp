---
title: 'Mathematical functions'
description: 'Use the math module for roots, rounding, powers, combinations and safe float comparison, and learn why 0.1 + 0.2 is not 0.3.'
linkTitle: 'Mathematical functions'
weight: 1
---

{{< part "concept" "Why the math module" >}}

Python has basic math built in: `+`, `-`, `*`, `**`. The **math** module adds the rest: square roots, rounding up or down, factorials, logarithms and more.

Computers store decimals as binary floats. Many decimals are not exact, so you must compare floats with care.

{{< part "code" "Common functions" >}}

```python {output=auto}
import math

print(math.sqrt(16), math.ceil(2.1), math.floor(2.9))
print(math.gcd(12, 18), math.comb(5, 2), math.factorial(5))
print(round(math.pi, 4), math.log10(1000))
print(0.1 + 0.2 == 0.3, math.isclose(0.1 + 0.2, 0.3))
print(math.fsum([0.1] * 10))
```

```text {filename="Output"}
4.0 3 2
6 10 120
3.1416 3.0
False True
1.0
```

- `ceil` rounds up. `floor` rounds down. `round()` is a built-in and rounds to the nearest.
- `math.isclose(a, b)` is the right way to compare floats.
- `math.fsum` adds floats with less error than `sum`.
- `math.comb(n, k)` counts ways to choose `k` from `n`.

{{< part "ops" "Pitfalls and checks" >}}

- Never use `==` on floats from calculations.
- For **money**, do not use float. Use `decimal` (next lessons).
- `math.sqrt(-1)` raises `ValueError`. Use `cmath` for complex numbers.

```python {output=auto}
import math

try:
    math.sqrt(-1)
except ValueError as error:
    print("Error:", error)
```

```text {filename="Output"}
Error: math domain error
```

{{< part "impact" "What you can do now" >}}

- Round up for page counts: `math.ceil(total / per_page)`.
- Compare floats safely with `isclose`.
- Choose between `math`, `decimal` and NumPy.

{{< quiz id="math1" q="How should you compare two floats?" options="With ==|With math.isclose|With is" answer="2" explain="Float results have tiny errors, so test if they are close." >}}
