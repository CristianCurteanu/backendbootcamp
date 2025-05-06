---
title: 'Debugging Techniques in Python'
linkTitle: 'Debugging Techniques in Python'
weight: 3
---

# Python Programming for Beginners

## Error Handling and Debugging

### Debugging Techniques

Debugging is a critical skill for every programmer. Even the most experienced developers write code with bugs, but what sets them apart is their ability to efficiently identify and fix these issues. In this section, we'll explore various debugging techniques and tools available in Python.

#### Understanding Common Error Types

Before diving into debugging techniques, it's helpful to understand the common types of errors you might encounter:

1. **Syntax Errors**: Occur when the Python parser is unable to understand your code due to violations of the language's syntax rules.
2. **Runtime Errors (Exceptions)**: Occur during the execution of a program, even if the syntax is correct.
3. **Logical Errors**: The code runs without raising exceptions, but produces incorrect results due to flaws in the logic.

#### Print Debugging

The simplest debugging technique is to add `print()` statements to your code to inspect variable values and program flow:

```python
def calculate_average(numbers):
    print(f"Input: {numbers}")  # Debug print
    
    total = 0
    for num in numbers:
        total += num
        print(f"Added {num}, total is now {total}")  # Debug print
    
    average = total / len(numbers)
    print(f"Calculated average: {average}")  # Debug print
    
    return average

# Test the function
result = calculate_average([10, 20, 30, 40, 50])
print(f"Final result: {result}")
```

**Advantages of Print Debugging:**
- Simple and requires no special tools
- Works in any environment
- Easy to understand

**Disadvantages of Print Debugging:**
- Can clutter the code and output
- Must be manually added and removed
- Not interactive
- Inefficient for complex issues

**Best Practices for Print Debugging:**
- Use descriptive messages: `print(f"User data after processing: {user_data}")`
- Format output for readability: `print(f"Status: {'Success' if status else 'Failure'}")`
- Use temporary variables for complex expressions:
  ```python
  result = complex_calculation(x, y, z)
  print(f"Result of calculation: {result}")
  ```

#### Using the `logging` Module

A more sophisticated alternative to `print()` statements is the built-in `logging` module:

```python
import logging

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(levelname)s - %(message)s',
    filename='debug.log'  # Optional: log to a file instead of console
)

def calculate_average(numbers):
    logging.debug(f"Input: {numbers}")
    
    if not numbers:
        logging.error("Empty list provided")
        raise ValueError("Cannot calculate average of empty list")
    
    total = 0
    for num in numbers:
        total += num
        logging.debug(f"Added {num}, total is now {total}")
    
    average = total / len(numbers)
    logging.info(f"Calculated average: {average}")
    
    return average

# Test the function
try:
    result = calculate_average([10, 20, 30, 40, 50])
    print(f"Final result: {result}")
except Exception as e:
    logging.exception("An error occurred")
    print(f"Error: {e}")
```

**Advantages of Logging:**
- Different log levels (DEBUG, INFO, WARNING, ERROR, CRITICAL)
- Can be enabled/disabled without code changes
- Can log to files, network, email, etc.
- Includes timestamps and other metadata
- Can stay in production code

**Note:**
The logging levels help categorize the importance of log messages:
- DEBUG: Detailed information, typically for diagnosing problems
- INFO: Confirmation that things are working as expected
- WARNING: An indication that something unexpected happened, but the program is still working
- ERROR: Due to a more serious problem, the software has not been able to perform some function
- CRITICAL: A serious error, indicating that the program itself may be unable to continue running

#### Using a Debugger

Python comes with a built-in debugger called `pdb` (Python Debugger) that allows you to interactively debug your code:

```python
import pdb

def complex_function(x, y):
    result = x * 2
    pdb.set_trace()  # Start the debugger at this point
    result = result + y
    return result * 2

# Test the function
output = complex_function(5, 10)
print(output)
```

When the debugger is activated, you'll be presented with a command prompt. Here are some common commands:

| Command | Description |
|---------|-------------|
| `n` (next) | Execute the current line and move to the next one |
| `s` (step) | Step into a function call |
| `c` (continue) | Continue execution until the next breakpoint |
| `q` (quit) | Quit the debugger |
| `l` (list) | Show the current location in the code |
| `p expression` | Print the value of an expression |
| `pp expression` | Pretty-print the value of an expression |
| `w` (where) | Show the current call stack |
| `b line_number` | Set a breakpoint at a specific line |
| `h` (help) | Show help on debugger commands |

**Important:**
In Python 3.7 and later, you can use the built-in `breakpoint()` function instead of importing `pdb` and calling `pdb.set_trace()`:

```python
def complex_function(x, y):
    result = x * 2
    breakpoint()  # Start the debugger at this point
    result = result + y
    return result * 2
```

#### Debugging in IDE: Visual Studio Code

Most modern IDEs include powerful debugging tools. Let's look at how debugging works in Visual Studio Code:

1. **Set a Breakpoint**: Click in the gutter (the space to the left of the line numbers) to set a breakpoint.

2. **Start Debugging**: Press F5 or click the "Run and Debug" button in the sidebar.

3. **Use the Debug Controls**:
   - Continue (F5): Resume execution until the next breakpoint
   - Step Over (F10): Execute the current line and move to the next one
   - Step Into (F11): Step into a function call
   - Step Out (Shift+F11): Execute the rest of the current function and return to the caller
   - Restart (Ctrl+Shift+F5): Restart the debugging session
   - Stop (Shift+F5): End the debugging session

4. **Inspect Variables**: View and modify variable values in the "Variables" panel.

5. **Watch Expressions**: Add expressions to the "Watch" panel to monitor their values.

6. **View the Call Stack**: See the sequence of function calls that led to the current point.

**Note:**
Similar debugging features are available in other IDEs like PyCharm, Jupyter Notebooks, and Spyder.

#### Debugging with `assert` Statements

Assert statements provide a simple way to check that conditions are as expected:

```python
def calculate_rectangle_area(length, width):
    assert length > 0, "Length must be positive"
    assert width > 0, "Width must be positive"
    
    area = length * width
    assert area > 0, "Area calculation error"
    
    return area

# Test the function
try:
    result = calculate_rectangle_area(5, -2)
    print(f"Area: {result}")
except AssertionError as e:
    print(f"Error: {e}")  # Output: Error: Width must be positive
```

`assert` statements are particularly useful for:
- Validating function inputs and outputs
- Checking invariants (conditions that should always be true)
- Verifying that your code's assumptions are correct

**Important:**
Assert statements can be completely removed when Python is run with the `-O` (optimize) flag, so don't use them for input validation in production code. Use proper exception handling instead.

#### Exception Handling for Debugging

While exceptions are primarily for handling runtime errors, they can also be useful for debugging:

```python
def process_data(data):
    try:
        result = data['value'] * 2
        return result
    except KeyError:
        # Print debugging information
        print(f"KeyError in process_data. Available keys: {data.keys()}")
        # Re-raise the exception with more information
        raise KeyError(f"Missing 'value' key in data: {data}")
    except TypeError as e:
        print(f"TypeError in process_data: {e}")
        print(f"Data type: {type(data)}, Value type: {type(data.get('value', None))}")
        raise  # Re-raise the original exception

# Test the function
try:
    result = process_data({'other_key': 10})
    print(result)
except Exception as e:
    print(f"Error caught: {e}")
```

This approach helps diagnose issues by:
- Providing context about what was happening when the error occurred
- Logging relevant variable values
- Adding more specific error messages

#### Debugging with Tracebacks

When an exception occurs, Python provides a traceback that shows the sequence of function calls leading to the error:

```
Traceback (most recent call last):
  File "example.py", line 20, in <module>
    result = process_data({'other_key': 10})
  File "example.py", line 4, in process_data
    result = data['value'] * 2
KeyError: 'value'
```

To get the traceback as a string for logging or analysis:

```python
import traceback

try:
    # Code that might raise an exception
    result = 10 / 0
except Exception:
    # Get the traceback as a string
    trace = traceback.format_exc()
    print(f"An error occurred:\n{trace}")
    # Log the traceback for future reference
    with open("error_log.txt", "a") as f:
        f.write(f"\n--- New Error ---\n{trace}\n")
```

#### Debugging Complex Data Structures

For complex data structures, Python's pretty-printing module (`pprint`) can be invaluable:

```python
from pprint import pprint

complex_data = {
    'users': [
        {'name': 'Alice', 'age': 30, 'roles': ['admin', 'user'], 'metadata': {'joined': '2020-01-15', 'last_login': '2023-05-20'}},
        {'name': 'Bob', 'age': 25, 'roles': ['user'], 'metadata': {'joined': '2021-03-10', 'last_login': '2023-05-18'}}
    ],
    'settings': {
        'theme': 'dark',
        'notifications': {'email': True, 'sms': False, 'push': True},
        'permissions': ['read', 'write', 'delete']
    }
}

# Standard print
print("Using print():")
print(complex_data)

# Pretty print
print("\nUsing pprint():")
pprint(complex_data, width=40, depth=2)  # Control the formatting

# You can also use pprint with a depth limit for nested structures
print("\nWith depth limit:")
pprint(complex_data, depth=1)  # Only show the first level
```

#### Rubber Duck Debugging

A surprisingly effective technique is "rubber duck debugging":

1. Get a rubber duck (or any object/imaginary person)
2. Explain your code to the duck, line by line
3. Often, the act of explaining the problem helps you find the solution

This technique works because it forces you to:
- Articulate what each part of your code is supposed to do
- Compare your expectations with what's actually happening
- Consider aspects of the problem you might have overlooked

#### Time-Travel Debugging Techniques

Sometimes, bugs are intermittent or hard to reproduce. In these cases, "time-travel" debugging techniques can help:

1. **Logging with Timestamps**:
   ```python
   import time
   
   def process_transaction(transaction):
       start_time = time.time()
       log_entry = f"[{time.strftime('%H:%M:%S')}] Processing transaction {transaction['id']}\n"
       
       # Various processing steps...
       time.sleep(0.5)  # Simulate processing time
       
       log_entry += f"[{time.strftime('%H:%M:%S')}] Transaction processed in {time.time() - start_time:.2f} seconds\n"
       
       with open("transaction_log.txt", "a") as f:
           f.write(log_entry)
   ```

2. **Record and Replay**:
   Save inputs and intermediate states to reproduce issues later.

#### Debugging a Real Example

Let's walk through debugging a flawed function that calculates the median of a list of numbers:

```python
def calculate_median(numbers):
    # Sort the numbers
    sorted_numbers = sorted(numbers)
    
    # Find the middle position
    n = len(sorted_numbers)
    middle = n / 2
    
    # Return the median
    if n % 2 == 1:
        # Odd number of elements
        return sorted_numbers[middle]
    else:
        # Even number of elements
        return (sorted_numbers[middle - 1] + sorted_numbers[middle]) / 2

# Test with odd number of elements
print(calculate_median([7, 2, 5, 1, 9]))  # Should be 5

# Test with even number of elements
print(calculate_median([7, 2, 5, 1, 9, 8]))  # Should be 6
```

When we run this code, we get:

```
Traceback (most recent call last):
  File "median.py", line 16, in <module>
    print(calculate_median([7, 2, 5, 1, 9]))
  File "median.py", line 10, in calculate_median
    return sorted_numbers[middle]
TypeError: list indices must be integers or slices, not float
```

Let's debug this step by step:

1. **Identify the Error**: The error message tells us that we're trying to use a float as a list index, which isn't allowed.

2. **Locate the Problem**: The error is on line 10, where we're using `middle` as an index.

3. **Add Debug Prints**:
   ```python
   def calculate_median(numbers):
       print(f"Input: {numbers}")
       
       # Sort the numbers
       sorted_numbers = sorted(numbers)
       print(f"Sorted: {sorted_numbers}")
       
       # Find the middle position
       n = len(sorted_numbers)
       middle = n / 2
       print(f"n: {n}, middle: {middle}, type(middle): {type(middle)}")
       
       # ... rest of the function
   ```

4. **Fix the Issue**: Now we can see that `middle` is a float (5/2 = 2.5), but list indices must be integers. We need to convert `middle` to an integer:
   ```python
   # For odd number of elements
   if n % 2 == 1:
       return sorted_numbers[int(middle)]
   ```

5. **Test and Verify**: After making this change, we should test both cases again to ensure they work correctly.

Fully corrected function:

```python
def calculate_median(numbers):
    # Sort the numbers
    sorted_numbers = sorted(numbers)
    
    # Find the middle position
    n = len(sorted_numbers)
    middle = n // 2  # Use integer division
    
    # Return the median
    if n % 2 == 1:
        # Odd number of elements
        return sorted_numbers[middle]
    else:
        # Even number of elements
        return (sorted_numbers[middle - 1] + sorted_numbers[middle]) / 2

# Test with odd number of elements
print(calculate_median([7, 2, 5, 1, 9]))  # 5

# Test with even number of elements
print(calculate_median([7, 2, 5, 1, 9, 8]))  # 6.0
```

#### Unit Testing as a Debugging Tool

Unit tests can be a powerful debugging tool by verifying that specific parts of your code work as expected:

```python
import unittest

def calculate_rectangle_area(length, width):
    return length * width

class TestCalculateArea(unittest.TestCase):
    def test_positive_values(self):
        self.assertEqual(calculate_rectangle_area(5, 4), 20)
        
    def test_zero_values(self):
        self.assertEqual(calculate_rectangle_area(0, 5), 0)
        self.assertEqual(calculate_rectangle_area(5, 0), 0)
        
    def test_negative_values(self):
        # Should area be negative or should we raise an error?
        with self.assertRaises(ValueError):
            calculate_rectangle_area(-5, 4)

# Run the tests
if __name__ == "__main__":
    unittest.main()
```

This helps us:
- Verify that fixes actually solve the problem
- Prevent regression (reintroducing bugs)
- Document expected behavior

#### Debugging Checklist

When faced with a bug, follow this systematic approach:

1. **Reproduce the Bug**:
   - Create a minimal test case that consistently triggers the bug.

2. **Understand the Error Message**:
   - Read the error message carefully, noting the exception type and line number.
   - Examine the traceback to understand the sequence of function calls.

3. **Inspect Variable Values**:
   - Add print statements or use a debugger to check variable values.
   - Verify that inputs and outputs match your expectations.

4. **Check Assumptions**:
   - Are you assuming something about the data that's not true?
   - Are function arguments in the correct order?
   - Are you using the right data type?

5. **Isolate the Problem**:
   - Comment out sections of code to pinpoint where the issue lies.
   - Simplify complex expressions into multiple steps.

6. **Fix the Bug**:
   - Make one change at a time.
   - Test after each change to verify that it fixes the issue.

7. **Add Tests**:
   - Create a test that would have caught this bug.
   - Run the test to confirm your fix works.

8. **Document the Issue and Solution**:
   - Add comments explaining the bug and how you fixed it.
   - Update documentation if necessary.

### Exercises

**Exercise 1:** The following function is supposed to count the frequency of each character in a string. However, it has a bug. Use print debugging to find and fix the issue:

```python
def count_characters(text):
    counter = {}
    for char in text:
        if char in counter:
            counter[char] += 1
        else:
            counter[char] = 1
    return counter

result = count_characters("hello world")
print(result)  # Expected: {'h': 1, 'e': 1, 'l': 3, 'o': 2, ' ': 1, 'w': 1, 'r': 1, 'd': 1}
```

**Exercise 2:** The following function attempts to find the largest number in a list that is divisible by a given divisor. However, it has multiple bugs. Use the pdb debugger to find and fix them:

```python
def largest_divisible(numbers, divisor):
    largest = 0
    for num in numbers:
        if num % divisor == 0:
            if num > largest:
                largest = num
    return largest

numbers = [12, 30, 21, 8, 25, 15, 22]
result = largest_divisible(numbers, 5)
print(result)  # Expected: 30
```

**Exercise 3:** Create a function called `analyze_student_scores` that takes a list of student score dictionaries and returns statistics about the scores (min, max, average). Include error handling and debugging features like assertions and logging. Test your function with valid and invalid inputs.

```python
# Example input:
scores = [
    {'name': 'Alice', 'score': 85},
    {'name': 'Bob', 'score': 92},
    {'name': 'Charlie', 'score': 78},
    # ...possibly more students
]

# Your function should handle cases like:
# - Empty list
# - Missing 'score' key
# - Non-numeric scores
```

**Hint for Exercise 1:** Add print statements to display the value of `char` and `counter` during each iteration of the loop.

In the next section, we'll explore using the Python debugger in more detail, learning how to set breakpoints, step through code, and inspect variables to find bugs efficiently.