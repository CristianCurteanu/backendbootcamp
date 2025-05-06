---
title: 'Creating Your Own Modules'
linkTitle: 'Creating Your Own Modules'
weight: 22
---

While Python comes with a rich standard library, and there are thousands of third-party packages available, you'll often need to create your own modules to organize and reuse your code. In this section, we'll learn how to create, structure, and use custom modules effectively.

## What is a Module?

In Python, a module is simply a file containing Python code. The filename is the module name with the `.py` extension. For example, a file named `calculator.py` would be a module named `calculator`.

Modules allow you to:
- Organize related code into separate files
- Reuse code across different programs
- Control the namespace (avoid naming conflicts)
- Make your code more maintainable

## Creating a Basic Module

Let's start by creating a simple module to understand the basics:

1. Create a new file named `my_math.py` with the following code:

```python
# my_math.py

# Define some constants
PI = 3.14159

# Define some functions
def add(x, y):
    """Add two numbers and return the result."""
    return x + y

def subtract(x, y):
    """Subtract y from x and return the result."""
    return x - y

def multiply(x, y):
    """Multiply two numbers and return the result."""
    return x * y

def divide(x, y):
    """Divide x by y and return the result."""
    if y == 0:
        raise ValueError("Cannot divide by zero")
    return x / y

def square(x):
    """Return the square of a number."""
    return x * x

def sqrt(x):
    """Return the square root of a number."""
    if x < 0:
        raise ValueError("Cannot calculate square root of a negative number")
    return x ** 0.5
```

2. Create another file named `main.py` in the same directory to use this module:

```python
# main.py

# Import the module
import my_math

# Use the module's functions and variables
radius = 5
area = my_math.PI * my_math.square(radius)

print(f"The area of a circle with radius {radius} is: {area}")
print(f"5 + 3 = {my_math.add(5, 3)}")
print(f"10 - 4 = {my_math.subtract(10, 4)}")
print(f"6 * 7 = {my_math.multiply(6, 7)}")
print(f"8 / 2 = {my_math.divide(8, 2)}")
print(f"Square root of 16 = {my_math.sqrt(16)}")
```

3. Run `main.py`:

```
The area of a circle with radius 5 is: 78.53975
5 + 3 = 8
10 - 4 = 6
6 * 7 = 42
8 / 2 = 4.0
Square root of 16 = 4.0
```

**Important:**
When you import a module, Python executes all the code in that module. This happens only once per Python session, even if you import the module multiple times, as Python caches imported modules.

## Different Ways to Import Modules

Python provides several ways to import modules:

1. **Import the entire module**:
   ```python
   import my_math
   result = my_math.add(5, 3)  # Use the module name as a prefix
   ```

2. **Import specific items from a module**:
   ```python
   from my_math import add, subtract
   result = add(5, 3)  # Call directly without the module name prefix
   ```

3. **Import everything from a module** (generally not recommended due to namespace pollution):
   ```python
   from my_math import *
   result = add(5, 3)  # Call directly without the module name prefix
   ```

4. **Import with an alias**:
   ```python
   import my_math as mm
   result = mm.add(5, 3)  # Use the alias as a prefix
   ```

**Note:**
Option 3 (importing everything with `*`) can lead to unexpected behavior if the imported module has functions or variables with the same names as those in your current namespace. It's generally better to be explicit about what you're importing.

## Module Variables and the `__name__` Variable

Every Python module has a built-in variable called `__name__`. When you run a module directly, `__name__` is set to `"__main__"`. When you import a module, `__name__` is set to the module's name.

This allows you to include code that only runs when the module is executed directly, not when it's imported:

```python
# my_math.py

# ... (previous functions and constants)

# Code that runs only when this module is executed directly
if __name__ == "__main__":
    print("Testing the my_math module...")
    print(f"PI = {PI}")
    print(f"2 + 3 = {add(2, 3)}")
    print(f"5 - 2 = {subtract(5, 2)}")
    print(f"4 * 6 = {multiply(4, 6)}")
    print(f"8 / 4 = {divide(8, 4)}")
```

Now if you run `my_math.py` directly, you'll see the test output. But if you import it in another file, the test code won't run.

This pattern is useful for including test code or example usage in your modules.

## Organizing Modules

As your project grows, you'll need to organize your modules effectively. Here are some strategies:

### Module Documentation

Good documentation is crucial for reusable modules. Use docstrings to document your modules, functions, and classes:

```python
"""
my_math module

This module provides basic mathematical functions and constants.
It is designed for educational purposes to demonstrate module creation.

Functions:
    add(x, y): Return the sum of x and y
    subtract(x, y): Return x minus y
    multiply(x, y): Return the product of x and y
    divide(x, y): Return x divided by y
    square(x): Return x squared
    sqrt(x): Return the square root of x

Constants:
    PI: The mathematical constant π (pi), approximately 3.14159
"""

# ... (rest of the module code)
```

### Separating Implementation Details

Sometimes you want to hide implementation details from users of your module. While Python doesn't have a formal way to make things private, there's a convention to prefix "private" variables and functions with an underscore:

```python
# calculator.py

# Public function
def calculate_area(radius):
    """Calculate the area of a circle."""
    return _PI * _square(radius)

# "Private" function (implementation detail)
def _square(x):
    """Square a number (internal function)."""
    return x * x

# "Private" constant
_PI = 3.14159
```

Users of your module should only use the public functions and variables:

```python
import calculator

# Good - using public function
area = calculator.calculate_area(5)

# Bad - using "private" function and constant
area = calculator._PI * calculator._square(5)
```

**Note:**
The underscore prefix is just a convention. Python doesn't actually prevent access to these items, but it signals to other developers that these are implementation details that might change.

## Creating a Module with Multiple Files (Creating a Package)

For larger projects, a single module file might not be enough. Python allows you to create packages, which are directories containing multiple module files.

Let's create a simple package for geometry calculations:

1. Create a directory structure:
   ```
   geometry/
   ├── __init__.py
   ├── circles.py
   ├── rectangles.py
   └── triangles.py
   ```

2. Create the module files:

   `__init__.py`:
   ```python
   """
   Geometry Package
   
   This package provides functions for calculating properties of geometric shapes.
   """
   
   # You can import specific functions to make them available directly from the package
   from .circles import calculate_circle_area, calculate_circle_circumference
   from .rectangles import calculate_rectangle_area, calculate_rectangle_perimeter
   from .triangles import calculate_triangle_area
   
   # Define what gets imported with `from geometry import *`
   __all__ = ['calculate_circle_area', 'calculate_circle_circumference',
              'calculate_rectangle_area', 'calculate_rectangle_perimeter',
              'calculate_triangle_area']
   ```

   `circles.py`:
   ```python
   """Functions for circle calculations."""
   import math
   
   def calculate_circle_area(radius):
       """Calculate the area of a circle."""
       return math.pi * radius ** 2
       
   def calculate_circle_circumference(radius):
       """Calculate the circumference of a circle."""
       return 2 * math.pi * radius
   ```

   `rectangles.py`:
   ```python
   """Functions for rectangle calculations."""
   
   def calculate_rectangle_area(length, width):
       """Calculate the area of a rectangle."""
       return length * width
       
   def calculate_rectangle_perimeter(length, width):
       """Calculate the perimeter of a rectangle."""
       return 2 * (length + width)
   ```

   `triangles.py`:
   ```python
   """Functions for triangle calculations."""
   import math
   
   def calculate_triangle_area(base, height):
       """Calculate the area of a triangle using base and height."""
       return 0.5 * base * height
       
   def calculate_triangle_area_sides(a, b, c):
       """Calculate the area of a triangle using the three sides (Heron's formula)."""
       # Semi-perimeter
       s = (a + b + c) / 2
       # Heron's formula
       area = math.sqrt(s * (s - a) * (s - b) * (s - c))
       return area
   ```

3. Use the package in another file:

   ```python
   # Import the entire package
   import geometry
   
   # Use functions made available through __init__.py
   circle_area = geometry.calculate_circle_area(5)
   print(f"Circle area: {circle_area}")
   
   # Import a specific module from the package
   from geometry import triangles
   
   # Use functions from that module
   triangle_area = triangles.calculate_triangle_area_sides(3, 4, 5)
   print(f"Triangle area: {triangle_area}")
   
   # Import specific functions
   from geometry.rectangles import calculate_rectangle_area, calculate_rectangle_perimeter
   
   rect_area = calculate_rectangle_area(4, 5)
   rect_perimeter = calculate_rectangle_perimeter(4, 5)
   print(f"Rectangle area: {rect_area}")
   print(f"Rectangle perimeter: {rect_perimeter}")
   ```

**Important:**
The `__init__.py` file is necessary to make Python treat the directory as a package. In Python 3.3+, directories without an `__init__.py` file can still be imported as "namespace packages," but it's good practice to include an `__init__.py` file for compatibility and to define package-level behavior.

## Absolute vs. Relative Imports

When working with packages, you need to understand how to import modules from the same package:

1. **Absolute imports** use the full path from the project root:
   ```python
   # In geometry/triangles.py
   import geometry.circles
   from geometry.rectangles import calculate_rectangle_area
   ```

2. **Relative imports** use dots to indicate the relationship:
   ```python
   # In geometry/triangles.py
   from . import circles  # Import circles.py from the same package
   from .circles import calculate_circle_area  # Import a specific function
   from .. import other_package  # Import from a parent package
   ```

Relative imports can be useful in packages that might be renamed or moved, but they can't be used in top-level scripts (files you run directly).

## Module Search Path

When you import a module, Python searches for it in several locations:

1. The directory containing the script being executed
2. The directories in the `PYTHONPATH` environment variable
3. The standard library directories
4. The site-packages directories where packages installed by pip are located

You can see the complete search path by checking the `sys.path` list:

```python
import sys
print(sys.path)
```

To add a new directory to the search path, you can modify `sys.path`:

```python
import sys
sys.path.append('/path/to/your/modules')
```

**Note:**
Modifying `sys.path` in your code is generally not recommended for production applications. It's better to install your package properly or use virtual environments.

## Making Your Module Installable

For more complex projects, you can make your package installable using `setuptools`. This allows users to install your package with pip.

1. Create a `setup.py` file in the root of your project:
   ```python
   from setuptools import setup, find_packages
   
   setup(
       name="geometry",
       version="0.1",
       packages=find_packages(),
       description="A package for geometric calculations",
       author="Your Name",
       author_email="your.email@example.com",
   )
   ```

2. Install the package in development mode:
   ```
   pip install -e .
   ```

This allows you to import your package from anywhere on your system, and changes to the source files will be immediately available without reinstalling.

## Practical Example: Building a Utility Module

Let's create a practical utility module that handles various string operations:

1. Create a file named `string_utils.py`:

```python
"""
String Utility Module

This module provides various utility functions for string manipulation.
"""

def reverse_string(text):
    """
    Reverse a string.
    
    Args:
        text (str): The string to reverse
    
    Returns:
        str: The reversed string
        
    Examples:
        >>> reverse_string("hello")
        'olleh'
    """
    return text[::-1]

def count_vowels(text):
    """
    Count the number of vowels in a string.
    
    Args:
        text (str): The string to check
    
    Returns:
        int: The number of vowels
        
    Examples:
        >>> count_vowels("hello")
        2
    """
    vowels = "aeiouAEIOU"
    count = 0
    for char in text:
        if char in vowels:
            count += 1
    return count

def is_palindrome(text):
    """
    Check if a string is a palindrome (reads the same forwards and backwards).
    Ignores case and non-alphanumeric characters.
    
    Args:
        text (str): The string to check
    
    Returns:
        bool: True if the string is a palindrome, False otherwise
        
    Examples:
        >>> is_palindrome("racecar")
        True
        >>> is_palindrome("A man, a plan, a canal, Panama")
        True
    """
    # Remove non-alphanumeric characters and convert to lowercase
    cleaned = ''.join(char.lower() for char in text if char.isalnum())
    return cleaned == cleaned[::-1]

def word_count(text):
    """
    Count the number of words in a string.
    
    Args:
        text (str): The string to check
    
    Returns:
        int: The number of words
        
    Examples:
        >>> word_count("Hello world")
        2
    """
    # Split by whitespace and count non-empty words
    return len([word for word in text.split() if word])

def truncate(text, length, suffix="..."):
    """
    Truncate a string to a specified length and add a suffix if truncated.
    
    Args:
        text (str): The string to truncate
        length (int): The maximum length
        suffix (str, optional): The suffix to add if truncated. Defaults to "...".
    
    Returns:
        str: The truncated string
        
    Examples:
        >>> truncate("Hello world", 7)
        'Hello...'
    """
    if len(text) <= length:
        return text
    return text[:length - len(suffix)] + suffix

if __name__ == "__main__":
    # Test the functions
    test_string = "A man, a plan, a canal, Panama"
    
    print(f"Original string: '{test_string}'")
    print(f"Reversed: '{reverse_string(test_string)}'")
    print(f"Vowel count: {count_vowels(test_string)}")
    print(f"Is palindrome? {is_palindrome(test_string)}")
    print(f"Word count: {word_count(test_string)}")
    print(f"Truncated to 15 chars: '{truncate(test_string, 15)}'")
```

2. Create a file to use the module:

```python
# use_string_utils.py
import string_utils

user_input = input("Enter a string: ")

print(f"Reversed: {string_utils.reverse_string(user_input)}")
print(f"Vowel count: {string_utils.count_vowels(user_input)}")
print(f"Is palindrome? {string_utils.is_palindrome(user_input)}")
print(f"Word count: {string_utils.word_count(user_input)}")
print(f"Truncated to 10 chars: {string_utils.truncate(user_input, 10)}")
```

3. Run the module directly for testing:

```bash
python string_utils.py
```

4. Run the usage example:

```bash
python use_string_utils.py
```

## Best Practices for Module Design

When creating your own modules, consider these best practices:

1. **Keep modules focused**: Each module should have a clear purpose and handle one aspect of your program.

2. **Use meaningful names**: Module names should be short, lowercase, and descriptive of their contents.

3. **Document your code**: Include docstrings at the module, class, and function levels.

4. **Follow PEP 8**: Adhere to Python's style guide for consistent, readable code.

5. **Test your modules**: Include tests to ensure your code works as expected. You can use the `unittest` module or a framework like pytest.

6. **Handle errors gracefully**: Use appropriate error handling and raise specific exceptions with informative messages.

7. **Be mindful of circular imports**: Avoid having modules that import each other, as this can lead to complications.

8. **Use relative imports within packages**: When referring to modules in the same package, use relative imports.

9. **Provide examples**: Include example usage in docstrings or in a separate examples directory.

10. **Version your modules**: Use semantic versioning to indicate changes in your modules' APIs.

## Exercises

**Exercise 1:** Create a module named `math_utils.py` that includes functions for calculating the factorial of a number, checking if a number is prime, and finding the greatest common divisor (GCD) of two numbers. Include appropriate docstrings and example usage.

**Exercise 2:** Create a package named `text_analysis` with separate modules for:
- `basic_stats.py`: Functions for counting characters, words, and sentences
- `sentiment.py`: A simple function that counts positive and negative words in a text
- `readability.py`: Functions to calculate readability scores (e.g., Flesch reading ease)
Make sure to create an `__init__.py` file that exposes the main functions.

**Exercise 3:** Extend the `string_utils.py` module to include additional features:
- A function to convert snake_case to camelCase
- A function to capitalize the first letter of each sentence
- A function to remove duplicate words from a text

**Hint for Exercise 1:** For the factorial function, remember that the factorial of 0 is 1, and factorials are only defined for non-negative integers.

```python
# math_utils.py (Exercise 1 hint)
def factorial(n):
    """
    Calculate the factorial of a number.
    
    Args:
        n (int): A non-negative integer
        
    Returns:
        int: The factorial of n
        
    Raises:
        ValueError: If n is negative
    """
    if not isinstance(n, int):
        raise TypeError("Input must be an integer")
    if n < 0:
        raise ValueError("Factorial is not defined for negative numbers")
    if n == 0:
        return 1
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result
```

In the next section, we'll explore the standard library in Python, which provides a wealth of pre-built modules for common tasks.