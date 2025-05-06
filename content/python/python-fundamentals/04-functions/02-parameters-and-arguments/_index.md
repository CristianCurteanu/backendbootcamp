---
title: 'Parameters and Arguments'
linkTitle: 'Parameters and Arguments'
weight: 17
---


In functions, parameters and arguments allow you to pass information into a function to make it more flexible and reusable. While the terms "parameter" and "argument" are often used interchangeably, there is a technical distinction:

- **Parameters** are the variables listed in the function definition.
- **Arguments** are the actual values passed to the function when it is called.

Let's explore the different ways Python handles parameters and arguments.

## Basic Parameter Passing

In its simplest form, a function can accept parameters that you define in the function header:

```python
def greet(name):  # 'name' is a parameter
    """Greet a person by name."""
    print(f"Hello, {name}!")

# Calling the function
greet("Alice")  # "Alice" is an argument
greet("Bob")    # "Bob" is an argument
```

In this example, `name` is a parameter of the `greet` function, and `"Alice"` and `"Bob"` are arguments passed to that parameter when the function is called.

## Multiple Parameters

Functions can accept multiple parameters, separated by commas:

```python
def describe_person(name, age, profession):
    """Describe a person using their details."""
    print(f"{name} is {age} years old and works as a {profession}.")

# Calling the function with positional arguments
describe_person("Alice", 30, "software engineer")
describe_person("Bob", 25, "teacher")
```

When calling a function with multiple parameters, the order of the arguments matters. The first argument is assigned to the first parameter, the second argument to the second parameter, and so on.

## Default Parameter Values

You can assign default values to parameters, which are used when an argument is not provided:

```python
def greet(name, greeting="Hello"):
    """Greet a person with an optional custom greeting."""
    print(f"{greeting}, {name}!")

# Calling the function
greet("Alice")               # Uses default greeting
greet("Bob", "Good morning") # Uses custom greeting
```

In this example, if `greeting` is not provided, it defaults to `"Hello"`. Parameters with default values must come after parameters without default values in the function definition.

**Important:**
Default values are evaluated only once, at function definition time. This can lead to unexpected behavior if you use a mutable object (like a list or dictionary) as a default value:

```python
def add_item(item, items=[]):  # Problematic default value
    items.append(item)
    return items

print(add_item("apple"))  # ['apple']
print(add_item("banana")) # ['apple', 'banana'] - Not a new empty list!
```

To avoid this issue, use `None` as the default and create the mutable object inside the function:

```python
def add_item(item, items=None):  # Better approach
    if items is None:
        items = []  # Create a new list each time
    items.append(item)
    return items

print(add_item("apple"))  # ['apple']
print(add_item("banana")) # ['banana'] - A new empty list
```

## Keyword Arguments

Keyword arguments allow you to specify which parameter each argument corresponds to by name, regardless of their order:

```python
def describe_person(name, age, profession):
    """Describe a person using their details."""
    print(f"{name} is {age} years old and works as a {profession}.")

# Using keyword arguments
describe_person(name="Alice", age=30, profession="software engineer")
describe_person(profession="teacher", name="Bob", age=25)  # Different order
```

Keyword arguments make your function calls more readable, especially when a function has many parameters or when the purpose of an argument isn't obvious from its value alone.

You can mix positional and keyword arguments, but positional arguments must come before any keyword arguments:

```python
# Mixing positional and keyword arguments
describe_person("Charlie", profession="doctor", age=35)  # Valid

# This would cause an error:
# describe_person(name="David", 40, "lawyer")  # SyntaxError: positional argument follows keyword argument
```

## Variable-Length Arguments: `*args` and `**kwargs`

Python provides two special parameters that allow functions to accept a variable number of arguments:

### `*args` (Variable Positional Arguments)

The `*args` parameter collects any additional positional arguments into a tuple:

```python
def sum_all(*args):
    """Sum all the numbers provided as arguments."""
    total = 0
    for num in args:
        total += num
    return total

# Calling the function with different numbers of arguments
print(sum_all(1, 2))          # 3
print(sum_all(1, 2, 3, 4, 5)) # 15
print(sum_all())              # 0
```

You can use any name instead of `args`, but the asterisk (`*`) is required:

```python
def print_all(*values):
    for value in values:
        print(value)
```

You can also use `*args` in combination with regular parameters, but `*args` must come after all regular positional parameters:

```python
def greet_multiple(greeting, *names):
    """Greet multiple people with the same greeting."""
    for name in names:
        print(f"{greeting}, {name}!")

greet_multiple("Hello", "Alice", "Bob", "Charlie")
# Hello, Alice!
# Hello, Bob!
# Hello, Charlie!
```

### `**kwargs` (Variable Keyword Arguments)

The `**kwargs` parameter collects any additional keyword arguments into a dictionary:

```python
def create_profile(**kwargs):
    """Create a user profile with provided attributes."""
    print("Profile created with these attributes:")
    for key, value in kwargs.items():
        print(f"  {key}: {value}")

# Calling the function with keyword arguments
create_profile(name="Alice", age=30, email="alice@example.com", country="USA")
# Profile created with these attributes:
#   name: Alice
#   age: 30
#   email: alice@example.com
#   country: USA
```

As with `*args`, you can use any name instead of `kwargs`, but the double asterisk (`**`) is required.

You can combine regular parameters, `*args`, and `**kwargs` in a single function, but they must appear in that specific order:

```python
def example_function(a, b, *args, **kwargs):
    print(f"a: {a}")
    print(f"b: {b}")
    print(f"args: {args}")
    print(f"kwargs: {kwargs}")

example_function(1, 2, 3, 4, 5, x=10, y=20)
# a: 1
# b: 2
# args: (3, 4, 5)
# kwargs: {'x': 10, 'y': 20}
```

## Unpacking Arguments

You can also unpack collections into individual arguments:

### Unpacking a List/Tuple into Positional Arguments

Use the `*` operator to unpack a list or tuple into positional arguments:

```python
def add(a, b, c):
    return a + b + c

numbers = [1, 2, 3]
print(add(*numbers))  # Equivalent to add(1, 2, 3)
```

### Unpacking a Dictionary into Keyword Arguments

Use the `**` operator to unpack a dictionary into keyword arguments:

```python
def describe_person(name, age, profession):
    print(f"{name} is {age} years old and works as a {profession}.")

person = {
    "name": "Alice",
    "age": 30,
    "profession": "software engineer"
}

describe_person(**person)  # Equivalent to describe_person(name="Alice", age=30, profession="software engineer")
```

## Keyword-Only and Positional-Only Parameters (Python 3.8+)

Python 3.8 introduced explicit syntax for specifying positional-only and keyword-only parameters:

### Keyword-Only Parameters

Use an asterisk (`*`) in the parameter list to indicate that subsequent parameters must be specified by keyword:

```python
def process_data(data_id, *, format="json", encoding="utf-8"):
    """
    Process data with the given ID.
    
    Parameters after * must be provided as keyword arguments.
    """
    print(f"Processing data {data_id} in {format} format with {encoding} encoding")

# Valid calls
process_data(42, format="xml")
process_data(42, encoding="ascii")

# Invalid call - would raise a TypeError
# process_data(42, "xml")  # format must be a keyword argument
```

### Positional-Only Parameters

Use a slash (`/`) in the parameter list to indicate that preceding parameters can only be specified positionally:

```python
def divide(a, b, /, c=1):
    """
    Divide a by b and then by c.
    
    Parameters before / must be provided positionally.
    """
    return (a / b) / c

# Valid calls
divide(10, 2)        # a=10, b=2, c=1 (default)
divide(10, 2, c=2)   # a=10, b=2, c=2

# Invalid calls - would raise a TypeError
# divide(a=10, b=2)  # a and b must be positional
# divide(10, b=2)    # b must be positional
```

## Parameter Type Annotations

Python supports type annotations to indicate the expected types of parameters and return values (though these are not enforced at runtime):

```python
def greet(name: str, age: int) -> str:
    """
    Greet a person by name and mention their age.
    
    Parameters:
        name (str): The person's name
        age (int): The person's age
        
    Returns:
        str: A greeting message
    """
    return f"Hello, {name}! You are {age} years old."

message = greet("Alice", 30)
print(message)  # "Hello, Alice! You are 30 years old."
```

Type annotations provide documentation and can be used by static type checkers like mypy, but Python itself does not enforce these types at runtime.

## Practical Examples

### Example 1: Flexible Formatting Function

```python
def format_name(first, last, middle=None, title=None):
    """
    Format a person's name with optional middle name and title.
    
    Args:
        first (str): First name
        last (str): Last name
        middle (str, optional): Middle name or initial
        title (str, optional): Title (e.g., "Dr.", "Mr.", "Ms.")
    
    Returns:
        str: Formatted full name
    """
    parts = []
    
    if title:
        parts.append(title)
    
    parts.append(first)
    
    if middle:
        parts.append(middle)
    
    parts.append(last)
    
    return " ".join(parts)

# Example usage
print(format_name("John", "Smith"))                      # "John Smith"
print(format_name("Jane", "Doe", "Marie"))               # "Jane Marie Doe"
print(format_name("James", "Brown", title="Dr."))        # "Dr. James Brown"
print(format_name("Emily", "Johnson", "A.", "Prof."))    # "Prof. Emily A. Johnson"
```

### Example 2: Flexible Data Processor

```python
def process_data(data, *operations, **config):
    """
    Process data with multiple operations and configuration options.
    
    Args:
        data: The data to process
        *operations: Functions to apply to the data in sequence
        **config: Configuration options for processing
    
    Returns:
        The processed data
    """
    result = data
    
    # Apply each operation in sequence
    for operation in operations:
        result = operation(result)
    
    # Apply configuration-specific processing
    if config.get("uppercase", False) and isinstance(result, str):
        result = result.upper()
    
    if config.get("round_digits") is not None and isinstance(result, float):
        result = round(result, config["round_digits"])
    
    return result

# Example usage
def double(x):
    return x * 2

def add_10(x):
    return x + 10

def square(x):
    return x ** 2

# Process a number with multiple operations
result1 = process_data(5, double, add_10, square)
print(result1)  # (5*2+10)^2 = 400

# Process with configuration
result2 = process_data(3.14159, round_digits=2)
print(result2)  # 3.14

# Process a string
result3 = process_data("hello", uppercase=True)
print(result3)  # "HELLO"
```

### Example 3: Command-Line Argument Parser

```python
def parse_command(command, *args, **kwargs):
    """
    Parse a command with various arguments and options.
    
    Args:
        command (str): The command to execute
        *args: Positional arguments for the command
        **kwargs: Named options for the command
    
    Returns:
        str: A description of the command to be executed
    """
    # Start building the command description
    command_str = f"Executing command '{command}'"
    
    # Add positional arguments
    if args:
        args_str = " ".join(str(arg) for arg in args)
        command_str += f" with arguments: {args_str}"
    
    # Add named options
    if kwargs:
        options = []
        for key, value in kwargs.items():
            options.append(f"--{key}={value}")
        
        options_str = " ".join(options)
        command_str += f" with options: {options_str}"
    
    return command_str

# Example usage
print(parse_command("copy", "file1.txt", "file2.txt"))
# "Executing command 'copy' with arguments: file1.txt file2.txt"

print(parse_command("search", "pattern", recursive=True, ignore_case=True))
# "Executing command 'search' with arguments: pattern with options: --recursive=True --ignore_case=True"
```

## Common Mistakes and Best Practices

### 1. Mutable Default Arguments

As mentioned earlier, using mutable objects as default values can lead to unexpected behavior:

```python
# Problematic
def append_to(element, target=[]):
    target.append(element)
    return target

# Better
def append_to(element, target=None):
    if target is None:
        target = []
    target.append(element)
    return target
```

### 2. Too Many Parameters

Functions with many parameters can be hard to use correctly:

```python
# Hard to use correctly
def create_user(name, email, password, age, country, city, address, phone, role):
    # Function body...

# Better: Use a dictionary or a class
def create_user(user_data):
    # Access user_data["name"], user_data["email"], etc.
```

### 3. Mixing Positional and Keyword Arguments

Positional arguments must come before keyword arguments:

```python
# This will cause a syntax error
# func(a=1, 2, 3)

# Correct
func(2, 3, a=1)
```

### 4. Unclear Parameter Names

Choose clear, descriptive parameter names:

```python
# Unclear
def process(x, y, z):
    # Function body...

# Clearer
def calculate_total(price, quantity, tax_rate):
    # Function body...
```

### 5. Missing Documentation

Always document your function's parameters, especially when they have special meanings or constraints:

```python
def divide(a, b):
    """
    Divide a by b.
    
    Args:
        a (float): The dividend
        b (float): The divisor, must not be zero
        
    Returns:
        float: The result of the division
        
    Raises:
        ZeroDivisionError: If b is zero
    """
    return a / b
```

### 6. Not Using Keyword Arguments for Clarity

When a function has many parameters, use keyword arguments for clarity:

```python
# Hard to understand at a glance
plot_data(data, True, False, 3, 'r', 2.0)

# Much clearer
plot_data(
    data=data,
    show_grid=True,
    include_legend=False,
    line_width=3,
    color='r',
    marker_size=2.0
)
```

## Exercises

**Exercise 1:** Write a function called `calculate_total` that takes a base price and an optional tax rate (default to 0.1 or 10%). The function should return the total price including tax.

**Exercise 2:** Create a function `print_info` that takes a name parameter and any number of additional keyword arguments. The function should print the name and then all the additional information provided.

**Exercise 3:** Implement a function `filter_numbers` that takes a list of numbers and any number of filtering functions. The function should return a new list containing only numbers that pass all the filtering functions. For example, filtering functions might check if a number is even, positive, or a multiple of 3.

**Exercise 4:** Create a function `create_html_element` that generates an HTML tag. It should take the tag name, content, and any number of attributes as keyword arguments. For example, `create_html_element("a", "Click me", href="https://example.com", class="button")` should return `<a href="https://example.com" class="button">Click me</a>`.

**Hint for Exercise 1:**
```python
def calculate_total(base_price, tax_rate=0.1):
    """
    Calculate the total price including tax.
    
    Args:
        base_price (float): The price before tax
        tax_rate (float, optional): The tax rate as a decimal. Defaults to 0.1 (10%).
    
    Returns:
        float: The total price including tax
    """
    return base_price * (1 + tax_rate)
```

In the next section, we'll explore return statements in Python functions, including how to return multiple values and how to handle early returns for better control flow.