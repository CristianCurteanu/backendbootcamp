---
title: 'Operators and Expressions'
linkTitle: 'Operators and Expressions'
weight: 5
---

In Python, operators are special symbols that perform operations on variables and values. An expression is a combination of values, variables, and operators that evaluates to a result.

## Arithmetic Operators

Arithmetic operators perform mathematical operations on numeric values:

| Operator | Name | Example | Result |
|----------|------|---------|--------|
| `+` | Addition | `5 + 3` | `8` |
| `-` | Subtraction | `5 - 3` | `2` |
| `*` | Multiplication | `5 * 3` | `15` |
| `/` | Division | `5 / 3` | `1.6666667` |
| `%` | Modulus (remainder) | `5 % 3` | `2` |
| `**` | Exponentiation | `5 ** 3` | `125` |
| `//` | Floor Division | `5 // 3` | `1` |

```python
# Arithmetic operators in action
a = 10
b = 3

addition = a + b        # 13
subtraction = a - b     # 7
multiplication = a * b  # 30
division = a / b        # 3.3333333333333335
modulus = a % b         # 1
exponent = a ** b       # 1000
floor_div = a // b      # 3

print(f"Addition: {addition}")
print(f"Subtraction: {subtraction}")
print(f"Multiplication: {multiplication}")
print(f"Division: {division}")
print(f"Modulus: {modulus}")
print(f"Exponentiation: {exponent}")
print(f"Floor Division: {floor_div}")
```

**Important:**
Division (`/`) always returns a float, while floor division (`//`) returns an integer by truncating the decimal part.

## Assignment Operators

Assignment operators are used to assign values to variables:

| Operator | Example | Equivalent to |
|----------|---------|---------------|
| `=` | `x = 5` | `x = 5` |
| `+=` | `x += 5` | `x = x + 5` |
| `-=` | `x -= 5` | `x = x - 5` |
| `*=` | `x *= 5` | `x = x * 5` |
| `/=` | `x /= 5` | `x = x / 5` |
| `%=` | `x %= 5` | `x = x % 5` |
| `**=` | `x **= 5` | `x = x ** 5` |
| `//=` | `x //= 5` | `x = x // 5` |

```python
# Assignment operators in action
x = 10
print(f"Initial value: {x}")  # 10

x += 5
print(f"After x += 5: {x}")  # 15

x -= 3
print(f"After x -= 3: {x}")  # 12

x *= 2
print(f"After x *= 2: {x}")  # 24

x /= 6
print(f"After x /= 6: {x}")  # 4.0

x %= 3
print(f"After x %= 3: {x}")  # 1.0

y = 2
y **= 3
print(f"After y **= 3: {y}")  # 8

y //= 3
print(f"After y //= 3: {y}")  # 2
```

## Comparison Operators

Comparison operators compare values and return Boolean results:

| Operator | Description | Example |
|----------|-------------|---------|
| `==` | Equal to | `5 == 5` (True) |
| `!=` | Not equal to | `5 != 3` (True) |
| `>` | Greater than | `5 > 3` (True) |
| `<` | Less than | `5 < 3` (False) |
| `>=` | Greater than or equal to | `5 >= 5` (True) |
| `<=` | Less than or equal to | `5 <= 3` (False) |

```python
# Comparison operators in action
a = 10
b = 5
c = 10

print(f"a == b: {a == b}")  # False
print(f"a != b: {a != b}")  # True
print(f"a > b: {a > b}")    # True
print(f"a < b: {a < b}")    # False
print(f"a >= c: {a >= c}")  # True
print(f"a <= c: {a <= c}")  # True
```

**Note:**
Don't confuse the assignment operator (`=`) with the equality comparison operator (`==`). A common error is using `=` when you mean `==` in conditional statements.

## Logical Operators

Logical operators combine conditional statements:

| Operator | Description | Example |
|----------|-------------|---------|
| `and` | Returns True if both statements are true | `x < 5 and x < 10` |
| `or` | Returns True if one of the statements is true | `x < 5 or x < 4` |
| `not` | Reverses the result, returns False if the result is true | `not(x < 5 and x < 10)` |

```python
# Logical operators in action
x = 7

print(f"x > 5 and x < 10: {x > 5 and x < 10}")  # True
print(f"x > 5 and x > 10: {x > 5 and x > 10}")  # False
print(f"x > 5 or x > 10: {x > 5 or x > 10}")    # True
print(f"not(x > 5): {not(x > 5)}")              # False
```

**Important:**
Python evaluates expressions from left to right. With `and`, if the first expression is False, Python doesn't evaluate the second expression. With `or`, if the first expression is True, Python doesn't evaluate the second expression. This is called short-circuit evaluation.

## Identity Operators

Identity operators compare object identities:

| Operator | Description | Example |
|----------|-------------|---------|
| `is` | Returns True if both variables reference the same object | `x is y` |
| `is not` | Returns True if both variables do not reference the same object | `x is not y` |

```python
# Identity operators in action
a = [1, 2, 3]
b = [1, 2, 3]
c = a

print(f"a is b: {a is b}")      # False (different objects with same content)
print(f"a is c: {a is c}")      # True (same object)
print(f"a is not b: {a is not b}")  # True
```

**Note:**
The `is` operator checks if two variables refer to the same object in memory, while `==` checks if the contents of the objects are equal.

## Membership Operators

Membership operators test if a sequence contains an object:

| Operator | Description | Example |
|----------|-------------|---------|
| `in` | Returns True if a value exists in the sequence | `x in y` |
| `not in` | Returns True if a value does not exist in the sequence | `x not in y` |

```python
# Membership operators in action
fruits = ["apple", "banana", "cherry"]
text = "Hello, World!"

print(f"'apple' in fruits: {'apple' in fruits}")           # True
print(f"'orange' in fruits: {'orange' in fruits}")         # False
print(f"'orange' not in fruits: {'orange' not in fruits}") # True
print(f"'H' in text: {'H' in text}")                       # True
print(f"'hello' in text: {'hello' in text}")               # False (case sensitive)
```

## Bitwise Operators

Bitwise operators act on operands as if they were strings of binary digits:

| Operator | Description | Example |
|----------|-------------|---------|
| `&` | Bitwise AND | `5 & 3` (1) |
| `\|` | Bitwise OR | `5 \| 3` (7) |
| `^` | Bitwise XOR | `5 ^ 3` (6) |
| `~` | Bitwise NOT | `~5` (-6) |
| `<<` | Left shift | `5 << 1` (10) |
| `>>` | Right shift | `5 >> 1` (2) |

```python
# Bitwise operators in action
a = 5  # 101 in binary
b = 3  # 011 in binary

print(f"a & b: {a & b}")    # 1 (001 in binary)
print(f"a | b: {a | b}")    # 7 (111 in binary)
print(f"a ^ b: {a ^ b}")    # 6 (110 in binary)
print(f"~a: {~a}")          # -6 (due to two's complement)
print(f"a << 1: {a << 1}")  # 10 (1010 in binary)
print(f"a >> 1: {a >> 1}")  # 2 (10 in binary)
```

**Note:**
Bitwise operators are less commonly used in everyday Python programming but are essential for certain types of low-level operations, especially in fields like cryptography, network programming, and embedded systems.

# Operator Precedence

Operators have a precedence that determines the order of evaluation in expressions with multiple operators:

| Precedence | Operator(s) | Description |
|------------|-------------|-------------|
| 1 | `()` | Parentheses |
| 2 | `**` | Exponentiation |
| 3 | `+x`, `-x`, `~x` | Unary plus, minus, and bitwise NOT |
| 4 | `*`, `/`, `//`, `%` | Multiplication, division, floor division, modulus |
| 5 | `+`, `-` | Addition, subtraction |
| 6 | `<<`, `>>` | Bitwise shifts |
| 7 | `&` | Bitwise AND |
| 8 | `^` | Bitwise XOR |
| 9 | `\|` | Bitwise OR |
| 10 | `==`, `!=`, `>`, `>=`, `<`, `<=`, `is`, `is not`, `in`, `not in` | Comparisons, identity, membership |
| 11 | `not` | Logical NOT |
| 12 | `and` | Logical AND |
| 13 | `or` | Logical OR |

```python
# Operator precedence in action
x = 2 + 3 * 4     # 14, not 20 because * has higher precedence than +
print(f"2 + 3 * 4 = {x}")

y = (2 + 3) * 4   # 20, parentheses have highest precedence
print(f"(2 + 3) * 4 = {y}")

z = 2 ** 3 * 2    # 16, ** has higher precedence than *
print(f"2 ** 3 * 2 = {z}")

w = 5 + 4 > 3 + 2  # True, arithmetic operations before comparison
print(f"5 + 4 > 3 + 2: {w}")

v = not 1 + 2 == 3  # False, arithmetic and comparison before logical
print(f"not 1 + 2 == 3: {v}")
```

**Important:**
When in doubt about operator precedence, use parentheses to explicitly specify the order of operations. This makes your code more readable and less prone to errors.

# Expressions in Python

An expression is a combination of values, variables, operators, and function calls that evaluates to a value. Python has several types of expressions:

## Arithmetic Expressions

```python
result = 10 + 5 * 2 - 3 / 2
print(f"10 + 5 * 2 - 3 / 2 = {result}")  # 18.5
```

## Comparison Expressions

```python
is_valid = (age >= 18) and (country in ["USA", "Canada", "Mexico"])
```

## Boolean Expressions

```python
has_permission = is_admin or (is_editor and document_owner)
```

## String Expressions

```python
greeting = "Hello, " + name + "! Welcome to " + platform
formatted_greeting = f"Hello, {name}! Welcome to {platform}"
```

## Practical Example: Temperature Converter

The following example demonstrates the use of operators and expressions in a practical temperature converter:

```python
def convert_temperature():
    """
    A function to convert temperatures between Celsius and Fahrenheit.
    Demonstrates operators and expressions in Python.
    """
    print("Temperature Converter")
    print("=====================")
    print("1. Celsius to Fahrenheit")
    print("2. Fahrenheit to Celsius")
    
    choice = int(input("Enter your choice (1/2): "))
    
    if choice == 1:
        # Celsius to Fahrenheit conversion
        celsius = float(input("Enter temperature in Celsius: "))
        
        # The conversion formula: F = (C × 9/5) + 32
        fahrenheit = (celsius * 9/5) + 32
        
        print(f"{celsius}°C is equal to {fahrenheit:.2f}°F")
        
        # Additional information using comparison operators
        if celsius < 0:
            print("That's below freezing!")
        elif celsius == 0:
            print("That's the freezing point of water.")
        elif celsius == 100:
            print("That's the boiling point of water at sea level.")
        elif celsius > 38:
            print("That's extremely hot!")
            
    elif choice == 2:
        # Fahrenheit to Celsius conversion
        fahrenheit = float(input("Enter temperature in Fahrenheit: "))
        
        # The conversion formula: C = (F - 32) × 5/9
        celsius = (fahrenheit - 32) * 5/9
        
        print(f"{fahrenheit}°F is equal to {celsius:.2f}°C")
        
        # Additional information using logical operators
        if fahrenheit < 32:
            print("That's below freezing!")
        elif fahrenheit == 32:
            print("That's the freezing point of water.")
        elif fahrenheit == 212:
            print("That's the boiling point of water at sea level.")
        elif fahrenheit > 100 and celsius < 38:
            print("That's hot but not extremely hot in Celsius.")
        elif celsius >= 38:
            print("That's extremely hot!")
            
    else:
        print("Invalid choice. Please enter 1 or 2.")

# Call the function to run the temperature converter
convert_temperature()
```

**Expected Output** (for input choice 1 and temperature 25):
```
Temperature Converter
=====================
1. Celsius to Fahrenheit
2. Fahrenheit to Celsius
Enter your choice (1/2): 1
Enter temperature in Celsius: 25
25°C is equal to 77.00°F
```

## Common Mistakes with Operators

1. **Using assignment (`=`) instead of equality comparison (`==`)**:
   ```python
   # Incorrect
   if x = 5:  # SyntaxError
       print("x is 5")
   
   # Correct
   if x == 5:
       print("x is 5")
   ```

2. **Incorrect operator precedence assumptions**:
   ```python
   # Might be expecting 9, but result is 7
   result = 1 + 2 * 3
   
   # Using parentheses for clarity
   result = (1 + 2) * 3  # 9
   ```

3. **Floating-point precision issues**:
   ```python
   # Might expect True, but often False due to floating-point precision
   0.1 + 0.2 == 0.3  
   
   # Better approach
   import math
   math.isclose(0.1 + 0.2, 0.3)
   ```

4. **Using `is` when you should use `==`**:
   ```python
   # Incorrect for value comparison
   if a is 5:  # Works sometimes due to Python's optimization, but unreliable
       print("a equals 5")
   
   # Correct
   if a == 5:
       print("a equals 5")
   ```

## Exercises

**Exercise 1:** Write a program that calculates the area and perimeter of a rectangle. Ask the user for the length and width, and use appropriate operators to perform the calculations.

**Exercise 2:** Create a program that takes a user's age as input and determines which category they fall into: child (0-12), teenager (13-19), adult (20-64), or senior (65+). Use logical operators for the conditions.

**Exercise 3:** Write a program that asks for three numbers and outputs them in ascending order (smallest to largest). Use comparison operators and conditional statements.

**Hint for Exercise 1:** The area of a rectangle is length × width, and the perimeter is 2 × (length + width).

In the next section, we'll explore comments and documentation in Python, learning how to make your code more understandable and maintainable.