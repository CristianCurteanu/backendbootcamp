---
title: 'Python Syntax Fundamentals'
linkTitle: 'Syntax Fundamentals'
weight: 3
---

Python's syntax is designed to be readable and straightforward, making it an excellent language for beginners. Understanding the fundamental syntax rules is your first step toward writing effective Python code.

## Indentation

Unlike many programming languages that use braces `{}` to define blocks of code, Python uses indentation. This enforces clean, readable code but requires consistency.

```python
# Correct indentation
if True:
    print("This is indented correctly")
    if True:
        print("This is a nested block")

# Incorrect indentation will cause errors
if True:
print("This will cause an error")  # IndentationError
```

**Important:**
Python is strict about indentation. The standard practice is to use 4 spaces for each indentation level. Do not mix tabs and spaces, as this can lead to unexpected errors that are difficult to debug.

## Statements and Lines

In Python, a statement is typically written on a single line:

```python
print("Hello, World!")
x = 5
```

You can place multiple statements on one line using semicolons, though this is not recommended for readability:

```python
print("Hello"); print("World")  # Valid but not recommended
```

For long statements, you can spread them across multiple lines using the line continuation character `\` or implicit line continuation within parentheses, brackets, or braces:

```python
# Using line continuation character
total = 1 + 2 + 3 + \
        4 + 5 + 6

# Implicit line continuation (preferred)
total = (1 + 2 + 3 +
         4 + 5 + 6)

colors = ['red',
          'blue',
          'green']
```

## Comments

Comments in Python start with the `#` character and extend to the end of the line:

```python
# This is a comment
print("Hello")  # This is an inline comment
```

Python also supports multi-line comments using triple quotes, which are technically multi-line strings but commonly used as comments:

```python
"""
This is a multi-line comment.
It spans multiple lines.
Python technically treats this as a string that isn't assigned to anything.
"""
```

## Case Sensitivity

Python is case-sensitive, meaning that variables, function names, and all identifiers are sensitive to capitalization:

```python
name = "John"
Name = "Jane"

print(name)  # Outputs: John
print(Name)  # Outputs: Jane

# Case sensitivity applies to everything
print(len("hello"))  # Works
print(Len("hello"))  # NameError: name 'Len' is not defined
```

## Keywords

Python has a set of reserved keywords that cannot be used as variable names or identifiers:

```
False    await     else      import    pass
None     break     except    in        raise
True     class     finally   is        return
and      continue  for       lambda    try
as       def       from      nonlocal  while
assert   del       global    not       with
async    elif      if        or        yield
```

**Note:**
To check if a word is a Python keyword, you can use the `keyword` module:

```python
import keyword
print(keyword.iskeyword("if"))  # True
print(keyword.iskeyword("name"))  # False
```

## Naming Conventions

While not strictly syntax rules, Python has widely accepted naming conventions:

- Variable and function names should be lowercase, with words separated by underscores (snake_case): `my_variable`, `calculate_total`
- Class names should use CamelCase (start with a capital letter): `MyClass`, `PersonData`
- Constants are typically all uppercase: `MAX_VALUE`, `PI`
- Module names should be short, lowercase: `math`, `sys`, `os`
- Package names should be lowercase, preferably short: `numpy`, `pandas`

```python
# Variable names
first_name = "John"
last_name = "Doe"

# Function name
def calculate_area(radius):
    return 3.14 * radius ** 2

# Class name
class Person:
    pass

# Constant
MAX_ATTEMPTS = 3
```

## Python Code Blocks

Python uses code blocks for structures like functions, loops, and conditional statements. A code block starts with a colon `:` and includes all indented lines that follow:

```python
# Function definition block
def greet(name):
    print("Hello,", name)
    print("Welcome to Python")

# If statement block
age = 18
if age >= 18:
    print("You are an adult")
    print("You can vote")
else:
    print("You are a minor")
    print("You cannot vote")
```

## Python Statement Termination

Unlike languages like C++ or Java, Python uses newlines to terminate statements, not semicolons:

```python
x = 10
y = 20
z = x + y
```

This contributes to Python's clean and readable syntax.

# Python Syntax in Practice

Let's look at a complete example that demonstrates the syntax elements we've covered:

```python
# This program demonstrates Python syntax fundamentals

# Import a module
import math

# Define a constant
PI = 3.14159

# Define a function
def calculate_circle_area(radius):
    """
    Calculate the area of a circle given its radius.
    This is a multi-line comment (docstring) that describes the function.
    """
    return PI * radius ** 2

# Main program block
if __name__ == "__main__":
    # Get user input
    radius_input = input("Enter the radius of the circle: ")
    
    # Convert string input to float
    radius = float(radius_input)
    
    # Conditional statement
    if radius <= 0:
        print("Error: Radius must be positive")
    else:
        # Calculate area using our function
        area = calculate_circle_area(radius)
        
        # Print results with formatted output
        print(f"Area with our PI: {area:.2f}")
        
        # Use the math module for a more accurate calculation
        accurate_area = math.pi * radius ** 2
        print(f"Area with math.pi: {accurate_area:.2f}")
        
        # Demonstrate indentation in a nested block
        if area > 100:
            print("That's a big circle!")
            if area > 1000:
                print("That's a VERY big circle!")
```

**Expected Output** (for input radius of 10):
```
Enter the radius of the circle: 10
Area with our PI: 314.16
Area with math.pi: 314.16
That's a big circle!
That's a VERY big circle!
```

## Common Syntax Errors for Beginners

1. **Indentation Errors**
   - Mixing tabs and spaces
   - Inconsistent indentation levels

2. **Missing Colons**
   - Forgetting the colon at the end of statements like `if`, `for`, `def`, etc.

3. **Incorrect Variable Names**
   - Using Python keywords as variable names
   - Starting variable names with numbers

4. **String Quote Mismatches**
   - Starting a string with one type of quote and ending with another

5. **Parentheses/Bracket Mismatches**
   - Not closing parentheses, brackets, or braces

**Example of common errors and fixes:**

```python
# Error: Missing colon
if x > 5
    print("x is greater than 5")

# Fix:
if x > 5:
    print("x is greater than 5")

# Error: Incorrect indentation
if x > 5:
print("x is greater than 5")

# Fix:
if x > 5:
    print("x is greater than 5")

# Error: Invalid variable name
1st_name = "John"

# Fix:
first_name = "John"
```

## Checking Your Python Syntax

Python offers several ways to check your syntax before executing code:

1. **Python Interpreter Checks**
   - Python checks syntax when you run a program and reports errors

2. **IDE Tools**
   - Most IDEs like PyCharm and VS Code highlight syntax errors as you type

3. **Linters**
   - Tools like flake8, pylint, or pycodestyle check not only syntax but also style

```python
# Run the following in your terminal to check syntax without executing:
python -m py_compile your_script.py
```

## Exercises

**Exercise 1:** Fix the syntax errors in the following code:

```python
if x = 10
    print(x is equal to 10)

def calculate_sum(a b):
    return a+b
```

**Exercise 2:** Write a program that asks for a user's name and age, then prints a message saying how old they will be in 10 years. Follow Python naming conventions and proper indentation.

**Exercise 3:** Create a function that converts temperature from Celsius to Fahrenheit. The formula is: F = C * 9/5 + 32. Make sure to include proper comments and docstrings.

**Hint for Exercise 1:** Look for missing colons, incorrect operators, and missing commas in function parameters.

In the next lesson, we'll explore Python variables and data types in more detail, building on the syntax fundamentals we've covered here.