---
title: 'Variable Scope'
linkTitle: 'Variable Scope'
weight: 19
---


Variable scope refers to the region of a program where a variable is visible and can be accessed. Understanding variable scope is crucial for writing correct and maintainable Python code. Python has specific rules that determine where variables can be accessed and how long they exist during program execution.

## Local Scope

Variables defined inside a function have a local scope, meaning they are only accessible within that function:

```python
def my_function():
    # x is a local variable
    x = 10
    print(f"Inside the function: x = {x}")

my_function()  # Output: Inside the function: x = 10

# This will cause an error because x is not defined in this scope
try:
    print(f"Outside the function: x = {x}")
except NameError as e:
    print(f"Error: {e}")  # Output: Error: name 'x' is not defined
```

Local variables are created when the function is called and destroyed when the function exits. This means local variables don't retain their values between function calls:

```python
def counter():
    count = 0  # Local variable initialized to 0 each time the function is called
    count += 1
    return count

print(counter())  # Output: 1
print(counter())  # Output: 1 (not 2, because count is re-initialized each time)
```

## Global Scope

Variables defined outside of any function have a global scope, meaning they can be accessed from anywhere in the program:

```python
# y is a global variable
y = 20

def print_global():
    print(f"Inside the function: y = {y}")

print_global()  # Output: Inside the function: y = 20
print(f"Outside the function: y = {y}")  # Output: Outside the function: y = 20
```

While you can access global variables from within a function, you cannot modify them without explicitly declaring them as global:

```python
z = 30

def modify_without_global():
    # This creates a new local variable z, it doesn't modify the global z
    z = 40
    print(f"Inside function without global: z = {z}")

def modify_with_global():
    global z  # This tells Python we want to use the global variable z
    z = 50
    print(f"Inside function with global: z = {z}")

modify_without_global()  # Output: Inside function without global: z = 40
print(f"After first function: z = {z}")  # Output: After first function: z = 30

modify_with_global()  # Output: Inside function with global: z = 50
print(f"After second function: z = {z}")  # Output: After second function: z = 50
```

**Important:**
It's generally considered bad practice to rely heavily on global variables, especially in larger programs. They make code harder to understand, debug, and test because any part of the program can modify them.

## Enclosing (Nonlocal) Scope

Python allows you to define functions inside other functions, creating nested functions. This introduces another scope level called the enclosing scope:

```python
def outer_function():
    outer_var = "I'm in the outer function"
    
    def inner_function():
        print(outer_var)  # Can access variables from the enclosing scope
    
    inner_function()

outer_function()  # Output: I'm in the outer function
```

Similar to global variables, you need a special keyword to modify variables in the enclosing scope from within a nested function:

```python
def counter_function():
    count = 0
    
    def increment():
        nonlocal count  # This tells Python we want to use the count from the enclosing scope
        count += 1
        return count
    
    return increment  # Return the inner function

counter = counter_function()
print(counter())  # Output: 1
print(counter())  # Output: 2
print(counter())  # Output: 3
```

This pattern is quite powerful and is the basis for closures in Python, which allow functions to remember values from their enclosing scope even after the outer function has finished execution.

## Built-in Scope

The broadest scope in Python is the built-in scope, which contains all the built-in functions and variables that are always available (like `print()`, `len()`, `range()`, etc.).

## The LEGB Rule

Python follows the LEGB rule to determine the order in which it looks up variable names:

1. **L**ocal: Variables defined within the current function
2. **E**nclosing: Variables defined in the enclosing functions (if any)
3. **G**lobal: Variables defined at the top level of the module or declared global
4. **B**uilt-in: Names that are pre-defined in Python

```python
x = "global"  # Global scope

def outer():
    x = "enclosing"  # Enclosing scope
    
    def inner():
        x = "local"  # Local scope
        print(f"inner: {x}")
    
    inner()
    print(f"outer: {x}")

outer()
print(f"global: {x}")

# Output:
# inner: local
# outer: enclosing
# global: global
```

## Variable Lifetime vs. Scope

It's important to distinguish between variable scope and variable lifetime:

- **Scope** refers to where in the code a variable can be accessed.
- **Lifetime** refers to how long the variable exists in memory during program execution.

```python
def create_counter():
    count = 0  # Local variable
    
    def increment():
        nonlocal count
        count += 1
        return count
    
    return increment

counter1 = create_counter()
counter2 = create_counter()

print(counter1())  # Output: 1
print(counter1())  # Output: 2
print(counter2())  # Output: 1 (separate count variable)
```

In this example, even though `count` is a local variable in `create_counter()`, it continues to exist as long as the returned `increment` function exists because `increment` maintains a reference to it. This is called a "closure."

## Modifying Global and Nonlocal Variables

Here's a comprehensive example of how to modify variables in different scopes:

```python
global_var = "global"

def demonstrate_scopes():
    enclosing_var = "enclosing"
    
    def modify_all():
        global global_var
        nonlocal enclosing_var
        local_var = "local"
        
        # Modify all variables
        global_var = "modified global"
        enclosing_var = "modified enclosing"
        local_var = "modified local"
        
        print(f"Inside nested function:")
        print(f"global_var: {global_var}")
        print(f"enclosing_var: {enclosing_var}")
        print(f"local_var: {local_var}")
    
    print(f"Before calling nested function:")
    print(f"global_var: {global_var}")
    print(f"enclosing_var: {enclosing_var}")
    
    modify_all()
    
    print(f"After calling nested function:")
    print(f"global_var: {global_var}")
    print(f"enclosing_var: {enclosing_var}")

demonstrate_scopes()

print(f"In global scope:")
print(f"global_var: {global_var}")

# Output:
# Before calling nested function:
# global_var: global
# enclosing_var: enclosing
# Inside nested function:
# global_var: modified global
# enclosing_var: modified enclosing
# local_var: modified local
# After calling nested function:
# global_var: modified global
# enclosing_var: modified enclosing
# In global scope:
# global_var: modified global
```

## Global Constants

While modifying global variables is generally discouraged, using global constants (values that don't change) is perfectly acceptable:

```python
# Global constants (conventionally written in ALL_CAPS)
PI = 3.14159
MAX_USERS = 100
DATABASE_URL = "postgresql://user:password@localhost/dbname"

def calculate_circle_area(radius):
    return PI * (radius ** 2)

def check_user_limit(current_users):
    return current_users < MAX_USERS
```

## Function Arguments and Scope

Function arguments behave like local variables inside the function:

```python
def greet(name):  # name is a local variable within the greet function
    message = f"Hello, {name}!"  # message is also a local variable
    print(message)

greet("Alice")  # Output: Hello, Alice!
# print(name)  # This would cause a NameError
```

## Default Arguments and Variable Scope

Default arguments are evaluated when the function is defined, not when it's called. This can lead to surprising behavior if you use mutable objects as default values:

```python
def add_to_list(item, my_list=[]):
    my_list.append(item)
    return my_list

print(add_to_list("apple"))  # Output: ['apple']
print(add_to_list("banana"))  # Output: ['apple', 'banana'] - not a new list!
```

The correct way to handle this is:

```python
def add_to_list(item, my_list=None):
    if my_list is None:
        my_list = []
    my_list.append(item)
    return my_list

print(add_to_list("apple"))  # Output: ['apple']
print(add_to_list("banana"))  # Output: ['banana'] - a new list
```

## Classes and Variable Scope

When working with classes in Python, you'll encounter additional scope considerations:

```python
class MyClass:
    class_variable = "I'm shared among all instances"  # Class variable
    
    def __init__(self, instance_var):
        self.instance_variable = instance_var  # Instance variable
    
    def print_variables(self):
        print(f"Class variable: {self.class_variable}")
        print(f"Instance variable: {self.instance_variable}")
        
        local_var = "I'm local to this method"  # Method-local variable
        print(f"Local variable: {local_var}")

obj1 = MyClass("instance 1")
obj2 = MyClass("instance 2")

obj1.print_variables()
# Output:
# Class variable: I'm shared among all instances
# Instance variable: instance 1
# Local variable: I'm local to this method

obj2.print_variables()
# Output:
# Class variable: I'm shared among all instances
# Instance variable: instance 2
# Local variable: I'm local to this method
```

We'll cover classes in much more detail in a later section.

## Practical Examples

### Example 1: Counter with Enclosing Scope

```python
def create_counter(start=0):
    """Create a counter function that remembers its state."""
    count = start
    
    def increment(step=1):
        nonlocal count
        count += step
        return count
    
    return increment

# Create counters
counter_a = create_counter()
counter_b = create_counter(10)

# Use counters
print(counter_a())  # 1
print(counter_a())  # 2
print(counter_b())  # 11
print(counter_b())  # 12
print(counter_a())  # 3 (counter_a maintained its own state)
```

### Example 2: Configuration Manager

```python
def create_config_manager():
    """Create a configuration manager with get and set functions."""
    # Private configuration dictionary
    config = {}
    
    def get_config(key, default=None):
        """Get a configuration value."""
        return config.get(key, default)
    
    def set_config(key, value):
        """Set a configuration value."""
        config[key] = value
    
    def clear_config():
        """Clear all configuration values."""
        config.clear()
    
    # Return a dictionary of functions
    return {
        "get": get_config,
        "set": set_config,
        "clear": clear_config
    }

# Create a configuration manager
config_manager = create_config_manager()
get_config = config_manager["get"]
set_config = config_manager["set"]
clear_config = config_manager["clear"]

# Use the configuration manager
set_config("theme", "dark")
set_config("font_size", 14)
print(get_config("theme"))  # dark
print(get_config("font_size"))  # 14
print(get_config("missing", "default"))  # default

# Clear the configuration
clear_config()
print(get_config("theme"))  # None
```

### Example 3: Memoization with Closure

Memoization is a technique to cache function results to avoid redundant calculations:

```python
def memoize(func):
    """
    Create a function that remembers the results of previous calls.
    
    Args:
        func: The function to memoize
    
    Returns:
        A memoized version of the function
    """
    cache = {}
    
    def memoized_func(*args):
        if args in cache:
            return cache[args]
        
        result = func(*args)
        cache[args] = result
        return result
    
    return memoized_func

# Example function to memoize
def fibonacci(n):
    """Calculate the nth Fibonacci number recursively."""
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Create a memoized version of fibonacci
memoized_fibonacci = memoize(fibonacci)

# Compare performance
import time

print("Without memoization:")
start = time.time()
result = fibonacci(35)  # This will take a while
end = time.time()
print(f"Result: {result}, Time: {end - start:.2f} seconds")

print("\nWith memoization:")
start = time.time()
result = memoized_fibonacci(35)  # This will be much faster
end = time.time()
print(f"Result: {result}, Time: {end - start:.2f} seconds")
```

## Common Pitfalls with Variable Scope

### 1. Forgetting to Use `global` or `nonlocal`

```python
count = 0

def increment():
    # This creates a new local variable instead of modifying the global one
    count += 1  # UnboundLocalError: local variable 'count' referenced before assignment

# Correct version
def increment_correct():
    global count
    count += 1
```

### 2. Shadowing Built-in Functions

```python
# This shadows the built-in sum function
sum = 10

# Later, trying to use the built-in function will fail
# numbers = [1, 2, 3]
# total = sum(numbers)  # TypeError: 'int' object is not callable

# To fix, delete the variable or rename it
del sum
# or
total_sum = 10
```

### 3. Unexpected Behavior with Mutable Default Arguments

```python
def append_to(element, to=[]):
    to.append(element)
    return to

print(append_to(1))  # [1]
print(append_to(2))  # [1, 2] - Might be unexpected!

# The solution is to use None as the default and create a new list in the function
def append_to_fixed(element, to=None):
    if to is None:
        to = []
    to.append(element)
    return to

print(append_to_fixed(1))  # [1]
print(append_to_fixed(2))  # [2] - Each call gets a new list
```

### 4. Trying to Access Variables Before They Are Defined

```python
def example():
    # This will raise an UnboundLocalError
    print(x)  # Error: local variable 'x' referenced before assignment
    x = 10

# Variable needs to be defined before use
def fixed_example():
    x = 10
    print(x)  # Works fine
```

### 5. Confusing Local and Global Variables with the Same Name

```python
name = "Global"

def print_name():
    # This creates a new local variable, it doesn't use the global one
    name = "Local"
    print(f"Inside function: {name}")

print_name()  # Inside function: Local
print(f"Outside function: {name}")  # Outside function: Global
```

## Best Practices for Variable Scope

1. **Limit the use of global variables**
   - Pass data to functions through parameters
   - Return data from functions using return values

2. **Keep functions small and focused**
   - Functions should ideally do one thing well
   - This naturally minimizes scope complexity

3. **Choose descriptive variable names**
   - Especially important when scopes overlap
   - Helps prevent confusion and bugs

4. **Use constants for values that don't change**
   - Define them at the module level
   - Use ALL_CAPS naming convention

5. **Be explicit about scope with annotations**
   - Use `global` and `nonlocal` when needed
   - Consider adding comments for clarity

6. **Be careful with mutable default arguments**
   - Use `None` as default and create the mutable object inside the function

7. **Consider using classes for complex state management**
   - Class attributes and instance attributes provide a cleaner way to manage state
   - Methods automatically have access to instance attributes via `self`

## Exercises

**Exercise 1:** Write a function called `create_multiplier` that takes a number `x` and returns a function that multiplies its input by `x`. For example:

```python
double = create_multiplier(2)
triple = create_multiplier(3)
print(double(5))  # Should print 10
print(triple(5))  # Should print 15
```

**Exercise 2:** Create a function that counts how many times it has been called, using enclosing scope to maintain the count:

```python
# Your implementation here
call_counter()  # Should return 1
call_counter()  # Should return 2
call_counter()  # Should return 3
```

**Exercise 3:** Fix the following code so that it correctly modifies the global variable `messages`:

```python
messages = []

def add_message(message):
    # This doesn't modify the global variable as intended
    messages.append(message)

def clear_messages():
    # This doesn't modify the global variable as intended
    messages = []

add_message("Hello")
print(messages)  # Should be ["Hello"]
add_message("World")
print(messages)  # Should be ["Hello", "World"]
clear_messages()
print(messages)  # Should be []
```

**Hint for Exercise 1:** Use a closure to capture the multiplier value in the enclosing scope of the returned function.

```python
def create_multiplier(x):
    def multiplier(y):
        return x * y
    return multiplier
```

In the next section, we'll explore lambda functions, which are small anonymous functions defined with a more concise syntax than regular function definitions.