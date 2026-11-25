---
title: 'Decimal fixed point and floating point arithmetic'
description: 'Do exact decimal arithmetic with the decimal module. Use it for money, control precision and choose a rounding rule.'
linkTitle: 'Decimal fixed point and floating point arithmetic'
weight: 3
---

{{< part "concept" "Why decimal" >}}

Floats cannot store many decimal numbers exactly, so `0.1 + 0.2` is `0.30000000000000004`. For **money** this is not acceptable. The **decimal** module stores decimal digits exactly and lets you choose the rounding rule.

{{< part "code" "Exact money math" >}}

```python {output=auto}
from decimal import ROUND_HALF_UP, Decimal

print(0.1 + 0.2)
print(Decimal("0.1") + Decimal("0.2"))

price = Decimal("19.99")
total = price * 3
tax = (total * Decimal("0.20")).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
print(total, tax, total + tax)
```

```text {filename="Output"}
0.30000000000000004
0.3
59.97 11.99 71.96
```

- Create a `Decimal` from a **string**, not a float: `Decimal("0.1")`.
- `quantize(Decimal("0.01"))` rounds to two decimal places.
- `ROUND_HALF_UP` is what most people expect. The default is `ROUND_HALF_EVEN` ("banker's rounding").

{{< part "ops" "Pitfalls and checks" >}}

- `Decimal(0.1)` copies the float error. Always use a string or an integer.
- You cannot mix `Decimal` and `float` in one calculation. Python raises `TypeError`.
- Store money in the database as a decimal type, or as integer cents. Not as float.

```python {output=auto}
from decimal import Decimal

print(Decimal(0.1))
```

```text {filename="Output"}
0.1000000000000000055511151231257827021181583404541015625
```

{{< part "impact" "What you can do now" >}}

- Calculate prices and taxes without drift.
- Round with a clear rule.
- Explain why money must not be a float.

{{< quiz id="dec1" q="How should you create Decimal for 0.1?" options="Decimal(0.1)|Decimal('0.1')|Decimal(float('0.1'))" answer="2" explain="A string keeps the exact value. A float already contains an error." >}}
