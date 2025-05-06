---
title: 'Return Statements'
linkTitle: 'Return Statements'
weight: 18
---


The `return` statement is a fundamental part of functions in Python. It allows a function to send a value back to the code that called it, making functions truly useful for computation and data processing.

## Basic Return Statement

A `return` statement consists of the keyword `return` followed by an optional expression:

```python
def add(a, b):
    """Add two numbers and return the result."""
    result = a + b
    return result

# Call the function and store the returned value
sum_result = add(5, 3)
print(sum_result)  # Output: 8
```

In this example, the `add` function computes the sum of two numbers and returns it. The caller (the code that calls the function) can then use this returned value.

## Returning Multiple Values

Python allows functions to return multiple values by separating them with commas:

```python
def calculate_statistics(numbers):
    """Calculate the sum, average, and maximum value from a list of numbers."""
    total = sum(numbers)
    average = total / len(numbers)
    maximum = max(numbers)
    
    return total, average, maximum

# Call the function and unpack the returned values
data = [10, 15, 20, 25, 30]
sum_result, avg_result, max_result = calculate_statistics(data)

print(f"Sum: {sum_result}")        # Output: Sum: 100
print(f"Average: {avg_result}")    # Output: Average: 20.0
print(f"Maximum: {max_result}")    # Output: Maximum: 30
```

Behind the scenes, Python packs multiple return values into a tuple. You can also capture the returned values as a single tuple:

```python
stats = calculate_statistics(data)
print(stats)  # Output: (100, 20.0, 30)
print(f"Sum: {stats[0]}")  # Accessing tuple elements
```

## Early Returns

A function can have multiple `return` statements. When a `return` statement is executed, the function immediately exits, regardless of any remaining code:

```python
def check_even_odd(number):
    """Check if a number is even or odd."""
    if number % 2 == 0:
        return "Even"
    return "Odd"

print(check_even_odd(4))  # Output: Even
print(check_even_odd(7))  # Output: Odd
```

Early returns are useful for handling special cases or for making code more readable by avoiding deep nesting:

```python
def divide_safely(a, b):
    """Divide a by b, handling division by zero."""
    # Early return for the special case
    if b == 0:
        return "Cannot divide by zero"
    
    # Regular case
    return a / b

print(divide_safely(10, 2))  # Output: 5.0
print(divide_safely(10, 0))  # Output: Cannot divide by zero
```

## Returning None

If a function doesn't explicitly return a value (or uses `return` without an expression), it implicitly returns `None`:

```python
def greet(name):
    """Greet a person without returning a value."""
    print(f"Hello, {name}!")
    # No return statement

result = greet("Alice")  # Output: Hello, Alice!
print(result)  # Output: None
```

You can also explicitly return `None` to make your intention clear:

```python
def process_data(data):
    """Process data if it's valid."""
    if not data:
        return None  # Explicitly return None for invalid data
    
    # Process the data and return a result
    return data.upper()

print(process_data("hello"))  # Output: HELLO
print(process_data(""))       # Output: None
```

**Note:**
It's a common practice to return `None` to indicate that a function couldn't produce a meaningful result due to invalid inputs or error conditions.

## Returning Functions

In Python, functions are first-class objects, which means you can return a function from another function:

```python
def get_operation(operation_name):
    """Return a mathematical function based on the operation name."""
    def add(a, b):
        return a + b
    
    def subtract(a, b):
        return a - b
    
    def multiply(a, b):
        return a * b
    
    def divide(a, b):
        return a / b if b != 0 else "Cannot divide by zero"
    
    # Return the appropriate function
    if operation_name == "add":
        return add
    elif operation_name == "subtract":
        return subtract
    elif operation_name == "multiply":
        return multiply
    elif operation_name == "divide":
        return divide
    else:
        return None

# Get a function and call it
operation_func = get_operation("multiply")
if operation_func:
    result = operation_func(6, 7)
    print(result)  # Output: 42
```

This is an example of a higher-order function (a function that returns another function) and is a powerful technique in functional programming.

## Return Type Annotations

Python supports optional type annotations that indicate what type of value a function returns:

```python
def add(a: int, b: int) -> int:
    """Add two integers and return the result."""
    return a + b

def get_full_name(first: str, last: str) -> str:
    """Return the full name by combining first and last names."""
    return f"{first} {last}"

def is_adult(age: int) -> bool:
    """Check if the age corresponds to an adult (18 or older)."""
    return age >= 18
```

Type annotations don't affect the execution of the code but provide hints for developers and static analysis tools.

## Best Practices for Return Statements

### 1. Be Consistent with Return Types

Try to ensure that a function returns the same type of value for all execution paths:

```python
# Inconsistent returns (not recommended)
def process_number(num):
    if num > 0:
        return num * 2
    elif num < 0:
        return str(num) + " is negative"  # Returns a string!
    else:
        return 0

# Consistent returns (better)
def process_number(num):
    if num > 0:
        return num * 2
    elif num < 0:
        return -1  # Consistent numeric return with a special value
    else:
        return 0
```

### 2. Document Return Values

Always document what your function returns, especially if it's not obvious:

```python
def calculate_score(answers, correct_answers):
    """
    Calculate a test score based on answers.
    
    Args:
        answers (list): The user's answers
        correct_answers (list): The correct answers
    
    Returns:
        float: A score from 0.0 to 100.0 representing the percentage of correct answers
    """
    # Implementation
```

### 3. Use Early Returns for Readability

Early returns can make your code cleaner by handling edge cases first:

```python
# Without early returns (more nested)
def process_order(order):
    if order is not None:
        if "items" in order:
            if len(order["items"]) > 0:
                # Process the order
                return True
            else:
                return False
        else:
            return False
    else:
        return False

# With early returns (cleaner)
def process_order(order):
    if order is None:
        return False
    if "items" not in order:
        return False
    if len(order["items"]) == 0:
        return False
    
    # Process the order
    return True
```

### 4. Avoid Returning Excessive Values

Return only what is necessary. If a function returns too many values, consider restructuring it or using a class or a data structure:

```python
# Too many return values (not recommended)
def analyze_text(text):
    return word_count, char_count, line_count, sentence_count, uppercase_count, lowercase_count

# Better approach using a data structure
def analyze_text(text):
    analysis = {
        "word_count": count_words(text),
        "char_count": len(text),
        "line_count": text.count('\n') + 1,
        "sentence_count": count_sentences(text),
        "uppercase_count": sum(1 for c in text if c.isupper()),
        "lowercase_count": sum(1 for c in text if c.islower())
    }
    return analysis
```

## Practical Examples

### Example 1: Finding Prime Numbers

```python
def is_prime(number):
    """
    Check if a number is prime.
    
    Args:
        number (int): The number to check
    
    Returns:
        bool: True if the number is prime, False otherwise
    """
    # Handle special cases
    if number <= 1:
        return False
    if number <= 3:
        return True
    if number % 2 == 0 or number % 3 == 0:
        return False
    
    # Check divisibility by numbers of the form 6k±1
    i = 5
    while i * i <= number:
        if number % i == 0 or number % (i + 2) == 0:
            return False
        i += 6
    
    return True

def find_primes_in_range(start, end):
    """
    Find all prime numbers in a given range.
    
    Args:
        start (int): The start of the range
        end (int): The end of the range
    
    Returns:
        list: A list of all prime numbers in the range [start, end]
    """
    primes = []
    for number in range(max(2, start), end + 1):
        if is_prime(number):
            primes.append(number)
    return primes

# Find primes between 10 and 50
prime_list = find_primes_in_range(10, 50)
print(f"Prime numbers between 10 and 50: {prime_list}")
```

### Example 2: Temperature Converter

```python
def celsius_to_fahrenheit(celsius):
    """
    Convert temperature from Celsius to Fahrenheit.
    
    Args:
        celsius (float): Temperature in Celsius
    
    Returns:
        float: Temperature in Fahrenheit
    """
    return (celsius * 9/5) + 32

def fahrenheit_to_celsius(fahrenheit):
    """
    Convert temperature from Fahrenheit to Celsius.
    
    Args:
        fahrenheit (float): Temperature in Fahrenheit
    
    Returns:
        float: Temperature in Celsius
    """
    return (fahrenheit - 32) * 5/9

def convert_temperature(temp, source_unit):
    """
    Convert temperature between Celsius and Fahrenheit.
    
    Args:
        temp (float): The temperature value to convert
        source_unit (str): The source unit ('C' for Celsius, 'F' for Fahrenheit)
    
    Returns:
        tuple: A tuple containing:
            - float: The converted temperature value
            - str: The target unit ('F' for Fahrenheit, 'C' for Celsius)
    """
    if source_unit.upper() == 'C':
        return celsius_to_fahrenheit(temp), 'F'
    elif source_unit.upper() == 'F':
        return fahrenheit_to_celsius(temp), 'C'
    else:
        return None, None

# Test the converter
temp_c = 25
converted_temp, target_unit = convert_temperature(temp_c, 'C')
print(f"{temp_c}°C = {converted_temp:.1f}°{target_unit}")  # Output: 25°C = 77.0°F

temp_f = 98.6
converted_temp, target_unit = convert_temperature(temp_f, 'F')
print(f"{temp_f}°F = {converted_temp:.1f}°{target_unit}")  # Output: 98.6°F = 37.0°C
```

### Example 3: Password Validator

```python
def validate_password(password):
    """
    Validate a password based on several criteria.
    
    Password criteria:
    - At least 8 characters long
    - Contains at least one uppercase letter
    - Contains at least one lowercase letter
    - Contains at least one digit
    - Contains at least one special character
    
    Args:
        password (str): The password to validate
    
    Returns:
        dict: A dictionary containing:
            - bool: 'valid' - True if the password meets all criteria, False otherwise
            - list: 'errors' - List of error messages for failed criteria
    """
    errors = []
    
    # Check length
    if len(password) < 8:
        errors.append("Password must be at least 8 characters long")
    
    # Check for uppercase letter
    if not any(char.isupper() for char in password):
        errors.append("Password must contain at least one uppercase letter")
    
    # Check for lowercase letter
    if not any(char.islower() for char in password):
        errors.append("Password must contain at least one lowercase letter")
    
    # Check for digit
    if not any(char.isdigit() for char in password):
        errors.append("Password must contain at least one digit")
    
    # Check for special character
    special_chars = "!@#$%^&*()-_=+[]{}|;:'\",.<>/?"
    if not any(char in special_chars for char in password):
        errors.append("Password must contain at least one special character")
    
    # Determine if the password is valid
    is_valid = len(errors) == 0
    
    # Return the validation result
    return {
        "valid": is_valid,
        "errors": errors
    }

# Test the password validator
passwords = [
    "password",  # Too simple
    "Password1",  # Missing special character
    "Abc123!",    # Too short
    "SecurePass1!",  # Should be valid
]

for pwd in passwords:
    result = validate_password(pwd)
    print(f"Password: {pwd}")
    if result["valid"]:
        print("Valid! This password meets all criteria.")
    else:
        print("Invalid! Errors:")
        for error in result["errors"]:
            print(f"- {error}")
    print()
```

### Example 4: Recursive Factorial Function

```python
def factorial(n):
    """
    Calculate the factorial of a number using recursion.
    
    Args:
        n (int): The number to calculate factorial for
    
    Returns:
        int: The factorial of n (n!), or None for invalid inputs
    """
    # Check for invalid input
    if not isinstance(n, int) or n < 0:
        return None
    
    # Base case: 0! = 1
    if n == 0:
        return 1
    
    # Recursive case: n! = n * (n-1)!
    return n * factorial(n - 1)

# Test the factorial function
for i in range(6):
    print(f"{i}! = {factorial(i)}")

# Output:
# 0! = 1
# 1! = 1
# 2! = 2
# 3! = 6
# 4! = 24
# 5! = 120
```

## Common Mistakes with Return Statements

### 1. Forgetting to Return a Value

```python
# Function doesn't return anything explicitly
def calculate_area(radius):
    area = 3.14159 * radius ** 2
    # No return statement!

# The caller gets None
result = calculate_area(5)
print(result)  # Output: None
```

### 2. Unreachable Code After Return

```python
def process_data(data):
    if data:
        return data.upper()
        print("Data processed!")  # This line never executes!
    return None

result = process_data("hello")
# "Data processed!" is never printed
```

### 3. Confusing Return and Print

```python
# This function prints but doesn't return a value
def add_numbers(a, b):
    print(a + b)  # This prints but doesn't return

# This function returns but doesn't print
def multiply_numbers(a, b):
    return a * b  # This returns but doesn't print

# Using the functions
result1 = add_numbers(3, 4)      # Prints: 7
print(result1)                   # Prints: None (function doesn't return anything)

result2 = multiply_numbers(3, 4)  # Doesn't print anything
print(result2)                   # Prints: 12 (value returned by the function)
```

### 4. Inconsistent Return Types

```python
def get_age_category(age):
    if age < 18:
        return "minor"
    elif age < 65:
        return "adult"
    else:
        # Inconsistent return type! Returns a number instead of a string
        return 65  # Should be "senior" to be consistent
```

### 5. Missing Return in Some Execution Paths

```python
def divide(a, b):
    if b != 0:
        return a / b
    # Missing return for the b == 0 case!
    # This function implicitly returns None when b is 0

# Better version
def divide(a, b):
    if b != 0:
        return a / b
    else:
        return None  # Explicit return for all paths
```

## Exercises

**Exercise 1:** Write a function called `calculate_bmi` that takes a person's weight (in kilograms) and height (in meters) as input and returns their Body Mass Index (BMI). The formula for BMI is: weight / (height * height).

**Exercise 2:** Create a function called `get_grade` that takes a student's score as input (0-100) and returns their letter grade according to the following scale:
- 90-100: "A"
- 80-89: "B"
- 70-79: "C"
- 60-69: "D"
- Below 60: "F"

**Exercise 3:** Write a function called `find_common_elements` that takes two lists as input and returns a new list containing only the elements that appear in both lists.

**Exercise 4:** Create a function called `is_palindrome` that takes a string as input and returns `True` if the string is a palindrome (reads the same forward and backward), and `False` otherwise. Ignore case and non-alphanumeric characters in your comparison.

**Hint for Exercise 1:** Make sure to handle potential errors, such as if the height is zero or negative.

```python
def calculate_bmi(weight, height):
    # Input validation
    if weight <= 0 or height <= 0:
        return None  # Invalid input
    
    # Calculate BMI
    bmi = weight / (height ** 2)
    return bmi
```

In the next section, we'll explore variable scope in Python, which determines where variables are accessible within your program.