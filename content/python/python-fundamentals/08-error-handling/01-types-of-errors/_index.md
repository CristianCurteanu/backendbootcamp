---
title: 'Types of Errors in Python'
linkTitle: 'Types of Errors in Python'
weight: 1
---

Understanding the different types of errors that can occur in Python is essential for effective debugging and writing robust code. Python errors are generally categorized into three main types: syntax errors, runtime errors (exceptions), and logical errors. Let's explore each type in detail.

## Syntax Errors

Syntax errors occur when the Python interpreter encounters code that doesn't follow the language's syntax rules. These errors are detected during the parsing phase, before the code begins executing. As a result, a program with syntax errors won't run at all.

Common syntax errors include:

- Missing colons after if/for/while statements
- Missing or mismatched parentheses, brackets, or quotes
- Incorrect indentation
- Using invalid variable names
- Misspelling keywords

```python
# Missing colon after if statement
if x > 5
    print("x is greater than 5")

# Output:
#   File "<stdin>", line 1
#     if x > 5
#            ^
# SyntaxError: invalid syntax
```

```python
# Indentation error
if x > 5:
print("x is greater than 5")  # This line should be indented

# Output:
#   File "<stdin>", line 2
#     print("x is greater than 5")
#     ^
# IndentationError: expected an indented block
```

When you encounter a syntax error, Python will show you the line where the error was detected and point to the approximate location with a caret (`^`) symbol. However, the actual error might be on the previous line or elsewhere, as the error is often detected only after the parser has moved past the problematic code.

**Important:**
The Python interpreter stops at the first syntax error it encounters, so fix one error at a time and then check for additional errors.

## Runtime Errors (Exceptions)

Runtime errors, also known as exceptions, occur during program execution. Unlike syntax errors, code with potential runtime errors can start running, but it will terminate when the error condition is encountered unless the exception is explicitly handled.

Python has many built-in exception types that indicate specific error conditions. Here are some common ones:

### 1. `TypeError`

Occurs when an operation or function is applied to an object of an inappropriate type:

```python
# Trying to add a string and an integer
result = "Hello" + 5

# Output:
# TypeError: can only concatenate str (not "int") to str
```

### 2. `NameError`

Occurs when a local or global name is not found:

```python
# Using a variable that hasn't been defined
print(undefined_variable)

# Output:
# NameError: name 'undefined_variable' is not defined
```

### 3. `IndexError`

Occurs when trying to access an index that is outside the bounds of a sequence:

```python
# Trying to access an index beyond the list length
my_list = [1, 2, 3]
print(my_list[5])

# Output:
# IndexError: list index out of range
```

### 4. `KeyError`

Occurs when a dictionary key is not found:

```python
# Trying to access a key that doesn't exist in a dictionary
my_dict = {"name": "Alice", "age": 25}
print(my_dict["city"])

# Output:
# KeyError: 'city'
```

### 5. `ValueError`

Occurs when a function receives an argument of the correct type but an inappropriate value:

```python
# Converting a non-numeric string to an integer
int("hello")

# Output:
# ValueError: invalid literal for int() with base 10: 'hello'
```

### 6. `ZeroDivisionError`

Occurs when dividing by zero:

```python
# Division by zero
result = 10 / 0

# Output:
# ZeroDivisionError: division by zero
```

### 7. `FileNotFoundError`

Occurs when trying to access a file that doesn't exist:

```python
# Opening a file that doesn't exist
with open("nonexistent_file.txt", "r") as file:
    content = file.read()

# Output:
# FileNotFoundError: [Errno 2] No such file or directory: 'nonexistent_file.txt'
```

### 8. `ImportError` or `ModuleNotFoundError`

Occurs when an import statement fails to find or load a module:

```python
# Importing a module that doesn't exist
import nonexistent_module

# Output:
# ModuleNotFoundError: No module named 'nonexistent_module'
```

### 9. `AttributeError`

Occurs when an attribute reference or assignment fails:

```python
# Accessing a method that doesn't exist
"hello".nonexistent_method()

# Output:
# AttributeError: 'str' object has no attribute 'nonexistent_method'
```

### 10. `IndentationError`

A specific syntax error that occurs when indentation is incorrect:

```python
def function():
print("This is not properly indented")

# Output:
# IndentationError: expected an indented block
```

**Note:**
All exceptions in Python inherit from the base `Exception` class. You can see the full hierarchy by running `help(BaseException)` in a Python interpreter.

## Logical Errors (Bugs)

Logical errors are the most challenging to identify because they don't produce error messages. The program runs without crashing, but it produces incorrect or unexpected results. These errors occur when the code logic is flawed.

Examples of logical errors include:

- Using the wrong variable in a calculation
- Implementing an algorithm incorrectly
- Off-by-one errors (iterating one too many or too few times)
- Incorrect operator precedence
- Misunderstanding function return values

```python
# Logical error: calculating average incorrectly
def calculate_average(numbers):
    total = 0
    for num in numbers:
        total += num
    return total / len(numbers) + 1  # The + 1 is incorrect

numbers = [10, 20, 30, 40]
avg = calculate_average(numbers)
print(f"Average: {avg}")  # Outputs 26.0 instead of the correct 25.0
```

Logical errors require careful debugging because there are no direct indicators of what's wrong. You need to analyze the code's behavior and compare it with the expected behavior.

## Exception Hierarchy

Python exceptions form a hierarchy, with more specific exceptions inheriting from more general ones. This is useful when handling exceptions, as catching a base exception will also catch all its derived exceptions.

Here's a simplified view of the exception hierarchy:

```
BaseException
 ├── SystemExit
 ├── KeyboardInterrupt
 ├── GeneratorExit
 └── Exception
      ├── StopIteration
      ├── ArithmeticError
      │    ├── FloatingPointError
      │    ├── OverflowError
      │    └── ZeroDivisionError
      ├── AssertionError
      ├── AttributeError
      ├── BufferError
      ├── EOFError
      ├── ImportError
      │    └── ModuleNotFoundError
      ├── LookupError
      │    ├── IndexError
      │    └── KeyError
      ├── MemoryError
      ├── NameError
      │    └── UnboundLocalError
      ├── OSError
      │    ├── BlockingIOError
      │    ├── ChildProcessError
      │    ├── ConnectionError
      │    ├── FileExistsError
      │    ├── FileNotFoundError
      │    ├── InterruptedError
      │    ├── IsADirectoryError
      │    ├── NotADirectoryError
      │    ├── PermissionError
      │    ├── ProcessLookupError
      │    └── TimeoutError
      ├── ReferenceError
      ├── RuntimeError
      │    ├── NotImplementedError
      │    └── RecursionError
      ├── SyntaxError
      │    └── IndentationError
      │         └── TabError
      ├── SystemError
      ├── TypeError
      ├── ValueError
      │    └── UnicodeError
      │         ├── UnicodeDecodeError
      │         ├── UnicodeEncodeError
      │         └── UnicodeTranslateError
      └── Warning
           ├── DeprecationWarning
           ├── PendingDeprecationWarning
           ├── RuntimeWarning
           ├── SyntaxWarning
           ├── UserWarning
           ├── FutureWarning
           ├── ImportWarning
           ├── UnicodeWarning
           ├── BytesWarning
           └── ResourceWarning
```

## Understanding Error Messages

Python error messages provide valuable information for diagnosing and fixing problems. Let's break down the components of a typical error message:

```
Traceback (most recent call last):
  File "example.py", line 5, in <module>
    result = divide(10, 0)
  File "example.py", line 2, in divide
    return a / b
ZeroDivisionError: division by zero
```

1. **Traceback**: Shows the sequence of function calls that led to the error, with the most recent call at the bottom.
2. **File and Line Information**: Indicates the file name and line number where each call occurred.
3. **Code Context**: Shows the actual line of code that caused the error.
4. **Exception Type**: Names the specific exception that was raised (e.g., `ZeroDivisionError`).
5. **Error Message**: Provides details about what went wrong (e.g., "division by zero").

Reading error messages from bottom to top can help you quickly identify the specific issue while the full traceback helps you understand the context in which the error occurred.

## Identifying and Fixing Errors

### Identifying Syntax Errors

Syntax errors are usually the easiest to fix because the interpreter points out the location and nature of the problem:

1. Look at the error message and the line number indicated
2. Check the line and the one above it for missing colons, parentheses, etc.
3. Check indentation, especially in compound statements
4. Verify that all string quotes are properly closed

```python
# Original code with syntax error
if x == 5
    print("x equals 5")

# Error message
# SyntaxError: invalid syntax

# Fixed code
if x == 5:
    print("x equals 5")
```

### Identifying Runtime Errors

For runtime errors, use the error message and traceback to pinpoint the issue:

1. Start by looking at the exception type and the specific error message
2. Examine the line where the exception occurred
3. Check the types of values involved in the operation
4. Verify that all objects and attributes exist

```python
# Original code with runtime error
numbers = [1, 2, 3]
print(numbers[3])

# Error message
# IndexError: list index out of range

# Fixed code
numbers = [1, 2, 3]
if len(numbers) > 3:
    print(numbers[3])
else:
    print("Index out of range")
```

### Identifying Logical Errors

Logical errors are more challenging to find and fix:

1. Test your code with simple, predictable inputs where you know the expected output
2. Add print statements to show intermediate values and program flow
3. Use a debugger to step through the code
4. Check your algorithm against a manual calculation
5. Review the requirements to ensure your understanding is correct

```python
# Original code with logical error
def celsius_to_fahrenheit(celsius):
    # Incorrect formula - addition before multiplication
    return celsius + 32 * 9/5

# Testing reveals the error
print(celsius_to_fahrenheit(0))  # Should be 32, but outputs 32.0
print(celsius_to_fahrenheit(100))  # Should be 212, but outputs 132.0

# Fixed code with correct formula
def celsius_to_fahrenheit(celsius):
    # Correct formula - multiplication before addition
    return celsius * 9/5 + 32

# Verify the fix
print(celsius_to_fahrenheit(0))    # 32.0
print(celsius_to_fahrenheit(100))  # 212.0
```

## Common Error Patterns and Solutions

Let's look at some common error patterns and how to solve them:

### 1. Forgetting to Initialize Variables

```python
# Error scenario
def calculate_total():
    for price in prices:
        total += price  # NameError: name 'total' is not defined
    return total

# Solution
def calculate_total():
    total = 0  # Initialize the variable
    for price in prices:
        total += price
    return total
```

### 2. Off-by-One Errors in Loops

```python
# Error scenario
def print_list_items(items):
    for i in range(1, len(items)):  # Starts at index 1, missing the first item
        print(items[i])

# Solution
def print_list_items(items):
    for i in range(len(items)):  # Start at index 0
        print(items[i])
    
    # Alternatively, iterate over the items directly
    for item in items:
        print(item)
```

### 3. Mismatched Types in Operations

```python
# Error scenario
user_input = input("Enter a number: ")
result = user_input * 2  # This will concatenate the string, not multiply the number

# Solution
user_input = input("Enter a number: ")
result = int(user_input) * 2  # Convert to integer first
```

### 4. Forgetting to Return Values from Functions

```python
# Error scenario
def add(a, b):
    result = a + b
    # No return statement; function returns None

# Solution
def add(a, b):
    result = a + b
    return result  # Add return statement
```

### 5. Using Assignment (`=`) Instead of Equality Comparison (`==`)

```python
# Error scenario
if x = 5:  # SyntaxError
    print("x is 5")

# Solution
if x == 5:  # Use == for comparison
    print("x is 5")
```

### 6. KeyError in Dictionaries

```python
# Error scenario
user = {"name": "Alice", "age": 30}
print(user["email"])  # KeyError: 'email'

# Solution
user = {"name": "Alice", "age": 30}
if "email" in user:
    print(user["email"])
else:
    print("Email not found")
    
# Alternative solution using .get() with a default value
print(user.get("email", "Email not found"))
```

### 7. Infinite Loops

```python
# Error scenario
i = 0
while i < 10:
    print(i)
    # Forgot to increment i, creating an infinite loop

# Solution
i = 0
while i < 10:
    print(i)
    i += 1  # Increment i to eventually end the loop
```

## Practical Example: Debugging a Program

Let's examine a program with multiple errors and work through fixing them:

```python
# Program with various errors

def calculate_average(numbers)
    total = 0
    for num in numbers
        total += num
    return total / length(numbers)

def main():
    grades = [85, 90, 78, 92, 88]
    average = calculate_average(grades)
    print("The average grade is: " + average)
    
    # Find students with grades above average
    above_average = []
    for i in range(1, len(grades)):
        if grade > average:
            above_average.append(grade)
    
    print("Grades above average:")
    print(above_average)

if __name__ == "__main__"
    main()
```

Let's identify and fix the errors:

1. **Syntax Error**: Missing colon after function definition
   ```python
   def calculate_average(numbers):  # Added colon
   ```

2. **Syntax Error**: Missing colon after for loop
   ```python
   for num in numbers:  # Added colon
   ```

3. **NameError**: `length()` is not a Python function (should be `len()`)
   ```python
   return total / len(numbers)  # Corrected function name
   ```

4. **TypeError**: Cannot concatenate string and number
   ```python
   print("The average grade is: " + str(average))  # Convert to string
   ```

5. **NameError**: `grade` is not defined in the loop (should use `grades[i]`)
   ```python
   if grades[i] > average:  # Use grades[i] to access the element
   ```

6. **Logic Error**: Loop starts at index 1, missing the first grade
   ```python
   for i in range(len(grades)):  # Start at index 0
   ```

7. **Syntax Error**: Missing colon after if statement
   ```python
   if __name__ == "__main__":  # Added colon
   ```

8. **Logic Error**: We're appending `grades[i]` to above_average, not `grade`
   ```python
   above_average.append(grades[i])  # Fixed to match the correct variable
   ```

Here's the corrected version of the program:

```python
# Corrected program

def calculate_average(numbers):
    total = 0
    for num in numbers:
        total += num
    return total / len(numbers)

def main():
    grades = [85, 90, 78, 92, 88]
    average = calculate_average(grades)
    print("The average grade is: " + str(average))
    
    # Find students with grades above average
    above_average = []
    for i in range(len(grades)):
        if grades[i] > average:
            above_average.append(grades[i])
    
    print("Grades above average:")
    print(above_average)

if __name__ == "__main__":
    main()
```

## Exercises

**Exercise 1:** Identify and fix the errors in the following code:

```python
def greet(name)
    print("Hello, " + name)
    print("Welcome to Python programming")

greet("Alice"
```

**Exercise 2:** The following code should calculate the factorial of a number but contains errors. Identify and fix them:

```python
def factorial(n):
    if n = 0:
        return 1
    else:
        return n * factorial(n-1)

print(factorial(-5))
```

**Exercise 3:** The following code should find the largest number in a list but has logical errors. Find and fix them:

```python
def find_largest(numbers):
    largest = 0
    for num in numbers:
        if num > largest:
            largest = num
    return largest

print(find_largest([5, 10, 3, 8, -20]))
```

**Hint for Exercise 1:** Look for missing syntax elements like colons and parentheses.

In the next section, we'll explore try-except blocks and learn how to handle exceptions gracefully in Python programs.