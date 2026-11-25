---
title: 'Generate pseudo-random numbers'
description: 'Generate random numbers, choices and shuffles with random, make results repeatable with a seed, and know when to use secrets.'
linkTitle: 'Generate pseudo-random numbers'
weight: 5
---

{{< part "concept" "Why random" >}}

Programs use random numbers for tests, sampling, games and simulations. The **random** module creates **pseudo-random** numbers. They look random, but they come from a formula and a **seed**. The same seed gives the same numbers.

Do **not** use `random` for passwords, tokens or anything secret. Use `secrets` (a later lesson).

{{< part "code" "Numbers, choices and samples" >}}

```python {output=auto}
import random

random.seed(42)
print(random.randint(1, 6))
print(random.choice(["red", "green", "blue"]))
print(random.sample(range(1, 50), 5))

cards = ["A", "K", "Q", "J"]
random.shuffle(cards)
print(cards, round(random.random(), 3))
```

```text {filename="Output"}
6
red
[2, 48, 18, 16, 15]
['J', 'A', 'Q', 'K'] 0.677
```

- `seed(42)` makes the next numbers repeatable. This is very useful in tests.
- `randint(a, b)` includes both ends. `choice` picks one item. `sample` picks several **without** repeats.
- `shuffle` changes the list in place and returns `None`.

{{< part "ops" "Pitfalls and checks" >}}

- Use a fixed seed in tests so failures can be repeated.
- Use `random.Random(seed)` to make a separate generator. Then other code cannot change your sequence.
- The results can differ between Python versions. Do not store expected numbers for years.

```python {output=auto}
import random

rng = random.Random(7)
print([rng.randint(1, 10) for _ in range(5)])
```

```text {filename="Output"}
[6, 3, 7, 1, 2]
```

{{< part "impact" "What you can do now" >}}

- Write tests with repeatable random data.
- Pick random items and samples.
- Know that `random` is not safe for secrets.

{{< quiz id="rand1" q="Which module should you use for a password reset token?" options="random|secrets|math" answer="2" explain="`secrets` uses a secure source. `random` is predictable." >}}
