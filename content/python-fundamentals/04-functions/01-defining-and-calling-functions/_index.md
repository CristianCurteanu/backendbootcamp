---
title: 'Defining and calling functions'
linkTitle: 'Defining and calling functions'
weight: 16
---


Functions are reusable blocks of code designed to perform a specific task. They allow you to organize your code, make it more readable, and avoid repetition. In this section, we'll learn how to define and call functions in Python.

## Why Use Functions?

Before diving into the syntax, let's understand why functions are essential in programming:

1. **Code Reusability**: Write once, use many times
2. **Modularity**: Break complex problems into smaller, manageable pieces
3. **Abstraction**: Hide complex implementation details
4. **Organization**: Make code more readable and maintainable
5. **Testing**: Test individual components independently

## Basic Function Syntax

The basic syntax for defining a function in Python is:

```python
def function_name(parameters):
    """Docstring describing the function."""
    # Function body
    # Code to execute
    return value  # Optional return statement
```

Let's break down each part:

- `def` is the keyword used to declare a function
- `function_name` is the name of the function (follows variable naming rules)
- `parameters` are inputs the function can accept (optional)
- The function body is indented code block that runs when the function is called
- `return` statement specifies what value the function outputs (optional)

## Defining and Calling a Simple Function

Here's a simple function that prints a greeting:

```python
def greet():
    """Print a simple greeting message."""
    print("Hello, World!")

# Calling the function
greet()  # Output: Hello, World!
```

To call (or execute) a function, write the function name followed by parentheses.

## Functions with Parameters

Parameters allow functions to accept input values:

```python
def greet_person(name):
    """Greet a person by name."""
    print(f"Hello, {name}!")

# Calling the function with an argument
greet_person("Alice")  # Output: Hello, Alice!
greet_person("Bob")    # Output: Hello, Bob!
```

In this example, `name` is a parameter that receives the value passed when the function is called. The value passed during the function call ("Alice" or "Bob") is called an argument.

## Functions with Multiple Parameters

Functions can accept multiple parameters:

```python
def describe_person(name, age, occupation):
    """Print a description of a person."""
    print(f"{name} is {age} years old and works as a {occupation}.")

# Calling with positional arguments
describe_person("Alice", 30, "engineer")
# Output: Alice is 30 years old and works as a engineer.

# Calling with keyword arguments
describe_person(age=25, name="Bob", occupation="teacher")
# Output: Bob is 25 years old and works as a teacher.
```

As shown above, there are two ways to pass arguments to a function:

1. **Positional arguments**: Values are matched to parameters by position
2. **Keyword arguments**: Values are matched to parameters by name

## Default Parameter Values

You can provide default values for parameters, which are used when an argument is not provided:

```python
def greet_with_message(name, message="Hello"):
    """Greet a person with a customizable message."""
    print(f"{message}, {name}!")

# Using the default message
greet_with_message("Alice")  
# Output: Hello, Alice!

# Providing a custom message
greet_with_message("Bob", "Good morning")  
# Output: Good morning, Bob!
```

**Important:**
Parameters with default values must come after parameters without default values in the function definition. This is because Python matches positional arguments first.

```python
# Correct
def function(a, b, c=10, d=20):
    pass

# Incorrect - will raise a SyntaxError
def function(a, b=10, c, d=20):
    pass
```

## The `return` Statement

Functions can send values back to the caller using the `return` statement:

```python
def add_numbers(a, b):
    """Add two numbers and return the result."""
    sum_result = a + b
    return sum_result

# Calling the function and storing the result
result = add_numbers(5, 3)
print(f"The sum is: {result}")  # Output: The sum is: 8

# Using the return value directly
print(f"10 + 20 = {add_numbers(10, 20)}")  # Output: 10 + 20 = 30
```

A function without an explicit `return` statement automatically returns `None`:

```python
def no_return():
    """This function doesn't return anything explicitly."""
    print("Function executed!")

result = no_return()
print(f"Return value: {result}")
# Output:
# Function executed!
# Return value: None
```

## Returning Multiple Values

Python functions can return multiple values using tuples:

```python
def min_max(numbers):
    """Find the minimum and maximum values in a list."""
    return min(numbers), max(numbers)

# Unpacking the returned values
minimum, maximum = min_max([5, 3, 8, 1, 9, 2])
print(f"Minimum: {minimum}, Maximum: {maximum}")
# Output: Minimum: 1, Maximum: 9

# Or get the result as a tuple
result = min_max([5, 3, 8, 1, 9, 2])
print(f"Result tuple: {result}")
# Output: Result tuple: (1, 9)
```

## Variable Scope in Functions

Variables defined inside a function have a local scope, meaning they only exist within the function:

```python
def demonstrate_scope():
    """Show variable scope in a function."""
    local_variable = "I'm local to this function"
    print(local_variable)

demonstrate_scope()  # Output: I'm local to this function

# This will raise a NameError
try:
    print(local_variable)
except NameError as e:
    print(f"Error: {e}")
# Output: Error: name 'local_variable' is not defined
```

Variables defined outside functions have a global scope and can be accessed inside functions:

```python
global_variable = "I'm a global variable"

def print_global():
    """Access a global variable."""
    print(global_variable)

print_global()  # Output: I'm a global variable
```

However, trying to modify a global variable inside a function requires the `global` keyword:

```python
counter = 0

def increment_without_global():
    """Try to increment the counter without global keyword."""
    # This creates a new local variable instead of modifying the global one
    counter = counter + 1  # This will raise an UnboundLocalError

def increment_with_global():
    """Increment the counter using the global keyword."""
    global counter
    counter = counter + 1

# This will raise an error
try:
    increment_without_global()
except UnboundLocalError as e:
    print(f"Error: {e}")

# This works correctly
increment_with_global()
print(f"Counter: {counter}")  # Output: Counter: 1
```

## Docstrings

Docstrings are string literals that appear as the first statement in a function, class, or module. They document what the function does, its parameters, and return values:

```python
def calculate_area(length, width):
    """
    Calculate the area of a rectangle.
    
    Args:
        length (float): The length of the rectangle.
        width (float): The width of the rectangle.
        
    Returns:
        float: The area of the rectangle.
    """
    return length * width
```

Good docstrings make your code more maintainable and help other developers (including your future self) understand how to use your functions.

## Type Hints (Python 3.5+)

Type hints are annotations that specify the expected types of function parameters and return values:

```python
def greet(name: str, age: int) -> str:
    """
    Create a greeting based on name and age.
    
    Args:
        name: The person's name.
        age: The person's age.
        
    Returns:
        A greeting message.
    """
    return f"Hello {name}, you are {age} years old!"

# The function still works with any types
result = greet("Alice", 30)
print(result)  # Output: Hello Alice, you are 30 years old!
```

Type hints don't enforce types at runtime but serve as documentation and can be used by linters, IDEs, and type checkers like mypy to catch potential bugs.

## Passing Arguments to Functions

Let's explore the different ways to pass arguments to functions in more detail:

### 1. Positional Arguments

Arguments are matched to parameters based on their position:

```python
def power(base, exponent):
    """Calculate base raised to the exponent power."""
    return base ** exponent

# base=2, exponent=3
result1 = power(2, 3)
print(result1)  # Output: 8

# base=3, exponent=2
result2 = power(3, 2)
print(result2)  # Output: 9
```

### 2. Keyword Arguments

Arguments are matched to parameters based on their names:

```python
def create_profile(name, age, occupation):
    """Create a user profile dictionary."""
    return {
        "name": name,
        "age": age,
        "occupation": occupation
    }

# Using keyword arguments (order doesn't matter)
profile = create_profile(occupation="Developer", name="Alice", age=28)
print(profile)
# Output: {'name': 'Alice', 'age': 28, 'occupation': 'Developer'}
```

### 3. Mixing Positional and Keyword Arguments

You can mix positional and keyword arguments, but positional arguments must come before keyword arguments:

```python
def display_info(name, age, city):
    """Display a person's information."""
    print(f"{name} is {age} years old and lives in {city}.")

# Mixing: name and age are positional, city is keyword
display_info("Alice", 28, city="New York")
# Output: Alice is 28 years old and lives in New York.

# This would raise a SyntaxError (positional after keyword)
# display_info(name="Alice", 28, city="New York")
```

### 4. Variable-Length Arguments: `*args`

The `*args` parameter allows a function to accept any number of positional arguments:

```python
def sum_all(*args):
    """Sum any number of arguments."""
    total = 0
    for num in args:
        total += num
    return total

# Calling with different numbers of arguments
print(sum_all(1, 2))         # Output: 3
print(sum_all(1, 2, 3, 4))   # Output: 10
print(sum_all(5))            # Output: 5
print(sum_all())             # Output: 0
```

In the function, `args` is a tuple containing all the positional arguments.

### 5. Variable-Length Keyword Arguments: `**kwargs`

The `**kwargs` parameter allows a function to accept any number of keyword arguments:

```python
def print_person_details(**kwargs):
    """Print details about a person using keyword arguments."""
    print("Person Details:")
    for key, value in kwargs.items():
        print(f"{key}: {value}")

# Calling with different keyword arguments
print_person_details(name="Alice", age=28, occupation="Developer")
# Output:
# Person Details:
# name: Alice
# age: 28
# occupation: Developer

print_person_details(name="Bob", country="Canada")
# Output:
# Person Details:
# name: Bob
# country: Canada
```

In the function, `kwargs` is a dictionary containing all the keyword arguments.

### 6. Combined Parameter Types

You can combine all types of parameters, but they must appear in this order:
1. Standard positional parameters
2. `*args` parameter
3. Standard parameters with default values
4. `**kwargs` parameter

```python
def complex_function(a, b, *args, c=10, d=20, **kwargs):
    """Demonstrate all parameter types."""
    print(f"a: {a}")
    print(f"b: {b}")
    print(f"args: {args}")
    print(f"c: {c}")
    print(f"d: {d}")
    print(f"kwargs: {kwargs}")

# Calling the function
complex_function(1, 2, 3, 4, 5, d=40, e=50, f=60)
# Output:
# a: 1
# b: 2
# args: (3, 4, 5)
# c: 10
# d: 40
# kwargs: {'e': 50, 'f': 60}
```

## Unpacking Arguments

You can unpack a list or tuple into positional arguments using the `*` operator:

```python
def add(a, b, c):
    """Add three numbers."""
    return a + b + c

numbers = [1, 2, 3]
result = add(*numbers)  # Equivalent to add(1, 2, 3)
print(result)  # Output: 6
```

Similarly, you can unpack a dictionary into keyword arguments using the `**` operator:

```python
def create_person(name, age, occupation):
    """Create a person dictionary."""
    return f"{name} is a {age}-year-old {occupation}."

person_data = {
    "name": "Alice",
    "age": 28,
    "occupation": "developer"
}

result = create_person(**person_data)  # Equivalent to create_person(name="Alice", age=28, occupation="developer")
print(result)  # Output: Alice is a 28-year-old developer.
```

## Recursive Functions

A recursive function is one that calls itself:

```python
def factorial(n):
    """
    Calculate the factorial of a number using recursion.
    
    Args:
        n (int): A non-negative integer.
        
    Returns:
        int: The factorial of n.
    """
    # Base case
    if n == 0 or n == 1:
        return 1
    
    # Recursive case
    return n * factorial(n - 1)

# Test the function
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

Every recursive function needs at least one base case to prevent infinite recursion.

**Note:**
While recursion can lead to elegant solutions for some problems, it's often less efficient than iterative approaches in Python due to the overhead of function calls. Additionally, Python has a default recursion limit (usually 1000) to prevent stack overflow.

## Practical Examples

### Example 1: Temperature Converter

```python
def celsius_to_fahrenheit(celsius):
    """
    Convert a temperature from Celsius to Fahrenheit.
    
    Args:
        celsius (float): Temperature in degrees Celsius.
        
    Returns:
        float: Temperature in degrees Fahrenheit.
    """
    return (celsius * 9/5) + 32

def fahrenheit_to_celsius(fahrenheit):
    """
    Convert a temperature from Fahrenheit to Celsius.
    
    Args:
        fahrenheit (float): Temperature in degrees Fahrenheit.
        
    Returns:
        float: Temperature in degrees Celsius.
    """
    return (fahrenheit - 32) * 5/9

# Test the functions
celsius_temp = 25
fahrenheit_temp = celsius_to_fahrenheit(celsius_temp)
print(f"{celsius_temp}°C = {fahrenheit_temp:.1f}°F")
# Output: 25°C = 77.0°F

fahrenheit_temp = 98.6
celsius_temp = fahrenheit_to_celsius(fahrenheit_temp)
print(f"{fahrenheit_temp}°F = {celsius_temp:.1f}°C")
# Output: 98.6°F = 37.0°C
```

### Example 2: Password Validator

```python
def validate_password(password):
    """
    Validate a password based on several criteria.
    
    Args:
        password (str): The password to validate.
        
    Returns:
        tuple: (is_valid, message) where is_valid is a boolean and
               message describes why the password is invalid.
    """
    # Check length
    if len(password) < 8:
        return False, "Password must be at least 8 characters long."
    
    # Check for uppercase letter
    if not any(char.isupper() for char in password):
        return False, "Password must contain at least one uppercase letter."
    
    # Check for lowercase letter
    if not any(char.islower() for char in password):
        return False, "Password must contain at least one lowercase letter."
    
    # Check for digit
    if not any(char.isdigit() for char in password):
        return False, "Password must contain at least one digit."
    
    # Check for special character
    special_chars = "!@#$%^&*()-_=+[]{}|;:'\",.<>/?"
    if not any(char in special_chars for char in password):
        return False, "Password must contain at least one special character."
    
    # All checks passed
    return True, "Password is valid."

# Test the function
passwords = [
    "password",
    "Password",
    "Password1",
    "Password1!",
]

for pwd in passwords:
    is_valid, message = validate_password(pwd)
    print(f"Password: {pwd}")
    print(f"Valid: {is_valid}")
    print(f"Message: {message}")
    print("-" * 30)

# Output:
# Password: password
# Valid: False
# Message: Password must contain at least one uppercase letter.
# ------------------------------
# Password: Password
# Valid: False
# Message: Password must contain at least one digit.
# ------------------------------
# Password: Password1
# Valid: False
# Message: Password must contain at least one special character.
# ------------------------------
# Password: Password1!
# Valid: True
# Message: Password is valid.
# ------------------------------
```

### Example 3: Statistical Calculator

```python
def calculate_statistics(numbers):
    """
    Calculate various statistics for a list of numbers.
    
    Args:
        numbers (list): A list of numbers.
        
    Returns:
        dict: A dictionary containing various statistics.
    """
    if not numbers:
        return {
            "count": 0,
            "sum": 0,
            "mean": None,
            "median": None,
            "min": None,
            "max": None,
            "range": None,
            "variance": None,
            "std_dev": None
        }
    
    # Basic statistics
    count = len(numbers)
    total = sum(numbers)
    mean = total / count
    minimum = min(numbers)
    maximum = max(numbers)
    range_value = maximum - minimum
    
    # Calculate median
    sorted_numbers = sorted(numbers)
    if count % 2 == 0:
        # Even number of elements
        middle1 = sorted_numbers[count // 2 - 1]
        middle2 = sorted_numbers[count // 2]
        median = (middle1 + middle2) / 2
    else:
        # Odd number of elements
        median = sorted_numbers[count // 2]
    
    # Calculate variance and standard deviation
    squared_diff_sum = sum((x - mean) ** 2 for x in numbers)
    variance = squared_diff_sum / count
    std_dev = variance ** 0.5
    
    # Return all statistics as a dictionary
    return {
        "count": count,
        "sum": total,
        "mean": mean,
        "median": median,
        "min": minimum,
        "max": maximum,
        "range": range_value,
        "variance": variance,
        "std_dev": std_dev
    }

# Test the function
test_data = [4, 8, 15, 16, 23, 42]
stats = calculate_statistics(test_data)

print("Statistical Analysis")
print("-------------------")
for key, value in stats.items():
    if isinstance(value, float):
        print(f"{key}: {value:.2f}")
    else:
        print(f"{key}: {value}")

# Output:
# Statistical Analysis
# -------------------
# count: 6
# sum: 108
# mean: 18.00
# median: 15.50
# min: 4
# max: 42
# range: 38
# variance: 178.00
# std_dev: 13.34
```

## Best Practices for Functions

### 1. Follow the Single Responsibility Principle

A function should do one thing and do it well:

```python
# Bad: Function does too many things
def process_user_data(user_data):
    # Validate data
    # Save to database
    # Send confirmation email
    # Update logs
    pass

# Better: Separate functions for each responsibility
def validate_user_data(user_data):
    pass

def save_user_to_database(user_data):
    pass

def send_confirmation_email(user_email):
    pass

def log_user_creation(user_id):
    pass

def process_user_data(user_data):
    if validate_user_data(user_data):
        user_id = save_user_to_database(user_data)
        send_confirmation_email(user_data["email"])
        log_user_creation(user_id)
```

### 2. Use Descriptive Function Names

Choose function names that clearly describe what the function does:

```python
# Unclear
def process(data):
    pass

# Clear
def calculate_average_temperature(temperature_readings):
    pass
```

### 3. Keep Functions Short

Aim for functions that can fit on one screen (20-30 lines maximum):

```python
# Too long - break it down
def analyze_data(data):
    # 100 lines of code
    pass

# Better - separate into smaller functions
def clean_data(data):
    pass

def compute_statistics(data):
    pass

def generate_report(statistics):
    pass

def analyze_data(data):
    cleaned_data = clean_data(data)
    statistics = compute_statistics(cleaned_data)
    return generate_report(statistics)
```

### 4. Use Default Arguments Sparingly

Default arguments are useful, but overusing them can make function behavior unpredictable:

```python
# Too many default arguments
def create_user(name="", age=0, email="", address="", role="user",
                active=True, created_at=None, subscription=None):
    pass

# Better
def create_user(name, email, age=None, role="user"):
    pass

# For many optional parameters, use a config dictionary
def create_user(name, email, **options):
    defaults = {
        "age": None,
        "role": "user",
        "active": True
    }
    
    # Update defaults with provided options
    config = {**defaults, **options}
    
    # Use the config dictionary
    pass
```

### 5. Avoid Mutable Default Arguments

Default arguments are evaluated only once at function definition, which can cause unexpected behavior with mutable defaults:

```python
# Bad - mutable default argument
def add_to_list(item, item_list=[]):
    item_list.append(item)
    return item_list

print(add_to_list("apple"))  # ['apple']
print(add_to_list("banana"))  # ['apple', 'banana'] - unexpected!

# Good - use None as default and create a new list inside
def add_to_list(item, item_list=None):
    if item_list is None:
        item_list = []
    item_list.append(item)
    return item_list

print(add_to_list("apple"))  # ['apple']
print(add_to_list("banana"))  # ['banana'] - as expected
```

### 6. Provide Clear Documentation

Document your functions with clear docstrings:

```python
def calculate_bmi(weight_kg, height_m):
    """
    Calculate Body Mass Index (BMI).
    
    The BMI is calculated by dividing the weight in kilograms
    by the square of the height in meters.
    
    Args:
        weight_kg (float): The weight in kilograms.
        height_m (float): The height in meters.
        
    Returns:
        float: The BMI value.
        
    Raises:
        ValueError: If weight or height is negative or zero.
    """
    if weight_kg <= 0:
        raise ValueError("Weight must be positive")
    if height_m <= 0:
        raise ValueError("Height must be positive")
    
    return weight_kg / (height_m ** 2)
```

### 7. Return Early for Edge Cases

Handle edge cases early in your function to avoid deeply nested code:

```python
# Deeply nested code
def process_data(data):
    if data:
        if is_valid(data):
            if has_required_fields(data):
                # Process the data
                return result
            else:
                return None
        else:
            return None
    else:
        return None

# Better with early returns
def process_data(data):
    if not data:
        return None
    
    if not is_valid(data):
        return None
    
    if not has_required_fields(data):
        return None
    
    # Process the data
    return result
```

## Exercises

**Exercise 1:** Write a function called `is_palindrome` that takes a string as input and returns `True` if the string is a palindrome (reads the same backward as forward), and `False` otherwise. Ignore case and non-alphanumeric characters.

**Exercise 2:** Create a function called `count_words` that takes a string of text and returns a dictionary where the keys are the words and the values are the number of times each word appears in the text. Ignore case and punctuation.

**Exercise 3:** Write a function called `fibonacci` that takes a positive integer `n` and returns the nth number in the Fibonacci sequence. Implement it both recursively and iteratively, and compare their performance for larger values of `n`.

**Exercise 4:** Create a calculator function that takes two numbers and an operator (as a string: '+', '-', '*', or '/') and returns the result of the operation. The function should handle division by zero appropriately.

**Hint for Exercise 1:** You can use string methods like `lower()` to ignore case and create a helper function to remove non-alphanumeric characters. Then compare the cleaned string with its reverse (you can reverse a string with slicing: `s[::-1]`).

In the next section, we'll explore parameters and arguments in more detail, including different ways to pass arguments to functions.