---
title: 'Rational numbers'
description: 'Calculate with exact fractions using the Fraction class, simplify results and convert floats to simple ratios.'
linkTitle: 'Rational numbers'
weight: 4
---

{{< part "concept" "Why fractions" >}}

A **Fraction** keeps a number as `numerator / denominator`, so results stay exact: one third is really `1/3`, not `0.3333...`. It also simplifies automatically.

Use it for recipes, ratios, music rhythm or any rule that must stay exact.

{{< part "code" "Exact ratios" >}}

```python {output=auto}
from fractions import Fraction

a = Fraction(1, 3)
b = Fraction(1, 6)
print(a + b, a * 3, float(a))
print(Fraction("0.75"), Fraction(6, 8))
print(Fraction(0.333333).limit_denominator(100))
```

```text {filename="Output"}
1/2 1 0.3333333333333333
3/4 3/4
1/3
```

- `Fraction(6, 8)` becomes `3/4` at once.
- Create from a string for exact decimals: `Fraction("0.75")`.
- `limit_denominator(n)` finds the closest simple fraction.

{{< part "ops" "Pitfalls and checks" >}}

- `Fraction(0.1)` is not `1/10`, because the float is not exact. Use `Fraction("0.1")`.
- Denominators can grow very large in long calculations. This makes code slow.
- Zero in the denominator raises `ZeroDivisionError`.

```python {output=auto}
from fractions import Fraction

print(Fraction(0.1))
print(Fraction("0.1"))
```

```text {filename="Output"}
3602879701896397/36028797018963968
1/10
```

{{< part "impact" "What you can do now" >}}

- Keep ratios exact in calculations.
- Turn a float into a simple fraction.
- Choose between `float`, `Decimal` and `Fraction`.

{{< quiz id="fr1" q="What is Fraction(6, 8) shown as?" options="6/8|3/4|0.75" answer="2" explain="`Fraction` always reduces to the simplest form." >}}
