---
title: 'Conditional Statements'
linkTitle: 'Conditional Statements'
weight: 7
---


Conditional statements allow your program to make decisions based on certain conditions. They are fundamental building blocks in programming that enable your code to take different paths depending on whether specific conditions are true or false.

## The `if` Statement

The basic form of a conditional statement in Python is the `if` statement:

```python
if condition:
    # Code to execute if condition is True
```

When Python encounters an `if` statement, it evaluates the condition. If the condition is `True`, the indented code block beneath it executes. If the condition is `False`, the indented code block is skipped.

```python
age = 18

if age >= 18:
    print("You are an adult.")
    print("You can vote.")

print("This line always executes regardless of the condition.")
```

In this example, if the variable `age` is 18 or greater, both lines inside the `if` block will execute. The final print statement is outside the `if` block, so it always executes.

## The `else` Statement

The `else` statement provides an alternative code block to execute when the `if` condition is `False`:

```python
if condition:
    # Code to execute if condition is True
else:
    # Code to execute if condition is False
```

```python
age = 15

if age >= 18:
    print("You are an adult.")
    print("You can vote.")
else:
    print("You are not yet an adult.")
    print("You cannot vote yet.")

print("This line always executes regardless of the condition.")
```

In this example, since `age` is 15 (less than 18), the `else` block executes instead of the `if` block.

## The `elif` Statement

The `elif` (short for "else if") statement allows you to check multiple conditions in sequence:

```python
if condition1:
    # Code to execute if condition1 is True
elif condition2:
    # Code to execute if condition1 is False and condition2 is True
elif condition3:
    # Code to execute if condition1 and condition2 are False and condition3 is True
else:
    # Code to execute if all conditions are False
```

```python
score = 85

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"

print(f"Your grade is: {grade}")
```

In this grading example, Python checks each condition in order until it finds one that is `True`. In this case, `score` is 85, so the second condition (`score >= 80`) is the first one that evaluates to `True`. Therefore, `grade` is set to "B".

**Important:**
Python checks conditions in the order they appear. Once it finds a condition that is `True`, it executes that block and then skips all the remaining conditions in that `if`-`elif`-`else` chain.

## Nested Conditional Statements

You can place conditional statements inside other conditional statements, creating nested structures:

```python
age = 25
income = 50000

if age >= 18:
    print("You are an adult.")
    
    if income >= 30000:
        print("You earn above the minimum income threshold.")
        if income >= 100000:
            print("You are in the high-income bracket.")
        else:
            print("You are in the middle-income bracket.")
    else:
        print("Your income is below the minimum threshold.")
else:
    print("You are not yet an adult.")
```

Nested conditionals allow for more complex decision-making but can become difficult to read if too deeply nested. It's often better to keep your code as flat as possible.

## Conditional Expressions (Ternary Operator)

Python offers a concise way to write simple if-else statements using conditional expressions, sometimes called the ternary operator:

```python
# Standard if-else
if condition:
    x = value1
else:
    x = value2

# Equivalent conditional expression
x = value1 if condition else value2
```

```python
age = 20
status = "adult" if age >= 18 else "minor"
print(status)  # Output: "adult"

# Price calculation with ternary operator
is_member = True
price = 50.0 * (0.9 if is_member else 1.0)  # 10% discount for members
print(price)  # Output: 45.0
```

Conditional expressions are ideal for simple assignments based on conditions, making the code more compact and readable in these cases.

## Truthy and Falsy Values

In Python, conditions don't have to be explicit boolean expressions. Any value can be interpreted as a boolean in an `if` statement:

- **Falsy values** (interpreted as `False`):
  - `False`
  - `None`
  - Zero of any numeric type (`0`, `0.0`, `0j`)
  - Empty sequences and collections (`''`, `()`, `[]`, `{}`, `set()`)
  - Objects that define `__bool__()` to return `False` or `__len__()` to return `0`

- **Truthy values** (interpreted as `True`):
  - Everything else

```python
# Examples of truthy and falsy values
name = ""
numbers = [1, 2, 3]
zero = 0

if name:
    print("Name is not empty")  # This won't execute because name is an empty string (falsy)

if numbers:
    print("List is not empty")  # This will execute because numbers is a non-empty list (truthy)

if zero:
    print("Zero is truthy")  # This won't execute because 0 is falsy
else:
    print("Zero is falsy")  # This will execute
```

This behavior allows for concise code to check if a variable has a meaningful value:

```python
user_input = input("Enter your name: ")

if user_input:
    print(f"Hello, {user_input}!")
else:
    print("You didn't enter a name.")
```

## Comparison Operators in Conditions

Conditions often use comparison operators to compare values:

| Operator | Description | Example |
|----------|-------------|---------|
| `==` | Equal to | `x == y` |
| `!=` | Not equal to | `x != y` |
| `>` | Greater than | `x > y` |
| `<` | Less than | `x < y` |
| `>=` | Greater than or equal to | `x >= y` |
| `<=` | Less than or equal to | `x <= y` |

```python
x = 10
y = 20

if x == y:
    print("x equals y")
elif x > y:
    print("x is greater than y")
else:
    print("x is less than y")  # This will execute
```

## Logical Operators for Combining Conditions

You can combine multiple conditions using logical operators:

| Operator | Description | Example |
|----------|-------------|---------|
| `and` | True if both conditions are true | `x > 0 and x < 10` |
| `or` | True if at least one condition is true | `x < 0 or x > 10` |
| `not` | Inverts the result, True becomes False and vice versa | `not x == y` |

```python
age = 25
income = 50000

if age >= 18 and income >= 30000:
    print("You qualify for the loan.")

temperature = 15
if temperature < 0 or temperature > 30:
    print("Extreme temperature warning.")

is_weekend = True
if not is_weekend:
    print("It's a weekday.")
else:
    print("It's the weekend.")  # This will execute
```

When combining conditions with logical operators, understanding the order of evaluation is important:
1. Parentheses
2. `not`
3. `and`
4. `or`

```python
# This condition is more complex but follows the rules of precedence
if (age >= 18 and income >= 30000) or (has_guarantor and has_collateral):
    print("Loan application accepted")
```

## The `is` and `in` Operators in Conditions

The `is` operator checks if two variables refer to the same object in memory:

```python
a = [1, 2, 3]
b = [1, 2, 3]
c = a

if a is c:
    print("a and c reference the same object")  # This will execute

if a is b:
    print("a and b reference the same object")  # This won't execute
else:
    print("a and b are different objects with the same content")  # This will execute
```

The `in` operator checks if a value exists in a sequence:

```python
fruits = ["apple", "banana", "cherry"]
if "banana" in fruits:
    print("Banana is in the list")  # This will execute

name = "John"
if "o" in name:
    print("The letter 'o' is in the name")  # This will execute
```

**Note:**
Don't confuse `==` (equality of values) with `is` (identity of objects). For most comparisons, you should use `==`. The `is` operator is primarily used to check if a variable is `None` or to verify object identity.

# Practical Examples

## Age Group Classifier

```python
def classify_age(age):
    """
    Classify a person into an age group based on their age.
    
    Args:
        age (int): The person's age in years
        
    Returns:
        str: The age group classification
    """
    if not isinstance(age, (int, float)):
        return "Invalid age. Please provide a number."
    
    if age < 0:
        return "Invalid age. Age cannot be negative."
    elif age < 2:
        return "Infant"
    elif age < 13:
        return "Child"
    elif age < 18:
        return "Teenager"
    elif age < 65:
        return "Adult"
    else:
        return "Senior"

# Test the function with different ages
print(classify_age(1))    # Infant
print(classify_age(10))   # Child
print(classify_age(16))   # Teenager
print(classify_age(35))   # Adult
print(classify_age(70))   # Senior
print(classify_age(-5))   # Invalid age
print(classify_age("20")) # Invalid age
```

## Simple Calculator

```python
def simple_calculator():
    """A simple calculator that performs basic arithmetic operations."""
    print("Simple Calculator")
    print("=================")
    print("Operations:")
    print("1. Addition (+)")
    print("2. Subtraction (-)")
    print("3. Multiplication (*)")
    print("4. Division (/)")
    
    try:
        num1 = float(input("Enter first number: "))
        num2 = float(input("Enter second number: "))
        operation = input("Enter operation (1-4): ")
        
        if operation == "1":
            result = num1 + num2
            print(f"{num1} + {num2} = {result}")
        elif operation == "2":
            result = num1 - num2
            print(f"{num1} - {num2} = {result}")
        elif operation == "3":
            result = num1 * num2
            print(f"{num1} * {num2} = {result}")
        elif operation == "4":
            if num2 == 0:
                print("Error: Division by zero is not allowed.")
            else:
                result = num1 / num2
                print(f"{num1} / {num2} = {result}")
        else:
            print("Invalid operation. Please enter a number between 1 and 4.")
            
    except ValueError:
        print("Invalid input. Please enter numeric values.")

# Run the calculator
simple_calculator()
```

## Password Strength Checker

```python
def check_password_strength(password):
    """
    Check the strength of a password based on various criteria.
    
    Args:
        password (str): The password to check
        
    Returns:
        str: A description of the password strength
    """
    if not isinstance(password, str):
        return "Invalid password. Password must be a string."
    
    # Check password length
    if len(password) < 8:
        return "Weak: Password should be at least 8 characters long."
    
    # Initialize strength checks
    has_uppercase = False
    has_lowercase = False
    has_digit = False
    has_special = False
    
    # Define special characters
    special_chars = "!@#$%^&*()-_=+[]{}|;:'\",.<>/?"
    
    # Check each character in the password
    for char in password:
        if char.isupper():
            has_uppercase = True
        elif char.islower():
            has_lowercase = True
        elif char.isdigit():
            has_digit = True
        elif char in special_chars:
            has_special = True
    
    # Determine strength based on criteria met
    if has_uppercase and has_lowercase and has_digit and has_special:
        if len(password) >= 12:
            return "Very Strong: Excellent password!"
        else:
            return "Strong: Good password, but could be longer."
    elif (has_uppercase and has_lowercase and has_digit) or \
         (has_uppercase and has_lowercase and has_special) or \
         (has_uppercase and has_digit and has_special) or \
         (has_lowercase and has_digit and has_special):
        return "Moderate: Password meets some criteria but not all."
    else:
        return "Weak: Password should contain uppercase letters, lowercase letters, digits, and special characters."

# Test the function with different passwords
print(check_password_strength("password"))                # Weak (length is good but missing criteria)
print(check_password_strength("Password123"))             # Moderate (missing special chars)
print(check_password_strength("Pas$word123"))             # Strong
print(check_password_strength("Str0ng&SecurePa$$word"))   # Very Strong
```

## Common Pitfalls and Best Practices

### 1. Using `=` instead of `==` in conditions

A common mistake is using the assignment operator `=` instead of the equality operator `==` in conditions:

```python
# Incorrect - this assigns 10 to x and always evaluates to True
if x = 10:
    print("x is 10")

# Correct - this checks if x equals 10
if x == 10:
    print("x is 10")
```

### 2. Forgetting the colon `:` after conditions

```python
# Incorrect - missing colon
if x > 10
    print("x is greater than 10")

# Correct
if x > 10:
    print("x is greater than 10")
```

### 3. Incorrect indentation

```python
# Incorrect - inconsistent indentation
if x > 10:
    print("x is greater than 10")
  print("This will cause an IndentationError")

# Correct
if x > 10:
    print("x is greater than 10")
    print("This has the same indentation level")
```

### 4. Using `is` when `==` is appropriate

```python
# Incorrect for value comparison
if x is 10:  # Works for some simple values due to implementation details but unreliable
    print("x is 10")

# Correct
if x == 10:
    print("x is 10")

# `is` is appropriate for checking against None
if x is None:
    print("x is None")
```

### 5. Unnecessary `else` after `return`

```python
# Unnecessarily verbose
def is_adult(age):
    if age >= 18:
        return True
    else:  # This else is unnecessary
        return False

# More concise
def is_adult(age):
    if age >= 18:
        return True
    return False

# Even more concise - directly return the condition result
def is_adult(age):
    return age >= 18
```

### 6. Complex nested conditions

```python
# Hard to read with deep nesting
if condition1:
    if condition2:
        if condition3:
            do_something()
        else:
            do_something_else()
    else:
        do_yet_another_thing()

# More readable with combined conditions
if condition1 and condition2 and condition3:
    do_something()
elif condition1 and condition2:
    do_something_else()
elif condition1:
    do_yet_another_thing()
```

### 7. Early returns for cleaner code

```python
# Unnecessarily nested
def process_data(data):
    if data:
        if validate(data):
            result = transform(data)
            if result:
                return result
    return None

# Cleaner with early returns
def process_data(data):
    if not data:
        return None
    
    if not validate(data):
        return None
    
    result = transform(data)
    if not result:
        return None
    
    return result
```

## Exercises

**Exercise 1:** Write a program that asks for a user's age and determines if they are eligible to vote (18 or older). The program should handle invalid inputs (like negative ages or non-numeric values) gracefully.

**Exercise 2:** Create a function that takes a temperature and a scale ('C' for Celsius or 'F' for Fahrenheit) and returns a description of the weather (e.g., "Cold", "Moderate", "Hot"). Define your own temperature ranges for each category.

**Exercise 3:** Write a program that simulates a simple ATM. It should ask for a PIN, check if it's correct (use a hardcoded PIN for this exercise), and then allow the user to check their balance, deposit money, or withdraw money. Use nested if statements or a combination of if-elif-else statements.

**Hint for Exercise 1:** Use a try-except block to handle non-numeric inputs, and an if statement to check for negative ages.

```python
# Exercise 1 solution outline
try:
    age = int(input("Enter your age: "))
    if age < 0:
        print("Age cannot be negative.")
    elif age >= 18:
        print("You are eligible to vote.")
    else:
        print("You are not eligible to vote yet.")
except ValueError:
    print("Invalid input. Please enter a numeric age.")
```

In the next section, we'll explore loops in Python, including `for` and `while` loops, which allow you to repeat code execution.