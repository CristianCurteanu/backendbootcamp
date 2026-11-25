---
title: 'Mathematical functions for complex numbers'
description: 'Calculate with complex numbers using cmath: square roots of negative numbers, polar form, phase and magnitude.'
linkTitle: 'Mathematical functions for complex numbers'
weight: 2
---

{{< part "concept" "Why cmath" >}}

A **complex number** has a real part and an imaginary part, like `3 + 4j`. Python supports them natively. The `math` module rejects them, so **cmath** provides the same functions for complex values.

Most backend work never needs this. It appears in signal processing, graphics and some scientific code.

{{< part "code" "Complex numbers in Python" >}}

```python {output=auto}
import cmath

z = 3 + 4j
print(abs(z))
print(z.real, z.imag, z.conjugate())
print(cmath.sqrt(-1))

radius, angle = cmath.polar(z)
print(round(radius, 2), round(angle, 3))
print(cmath.rect(1, cmath.pi / 2))
```

```text {filename="Output"}
5.0
3.0 4.0 (3-4j)
1j
5.0 0.927
(6.123233995736766e-17+1j)
```

- Python writes the imaginary unit as `j`, not `i`.
- `abs(z)` is the distance from zero (the magnitude).
- `polar` converts to radius and angle. `rect` converts back.

{{< part "ops" "Pitfalls and checks" >}}

- Complex numbers cannot be ordered: `3+4j < 5` raises `TypeError`.
- Rounding errors appear, as with floats. Compare with `cmath.isclose`.
- If you need arrays of complex numbers, use NumPy.

```python {expect=error}
print((3 + 4j) < 5)
```

```text {filename="Output"}
TypeError: '<' not supported between instances of 'complex' and 'int'
```

{{< part "impact" "What you can do now" >}}

- Take the square root of a negative number without an error.
- Convert between rectangular and polar forms.
- Know when you need `cmath` instead of `math`.

{{< quiz id="cm1" q="How does Python write the imaginary unit?" options="i|j|im" answer="2" explain="Python uses `j`, for example `2j`." >}}
