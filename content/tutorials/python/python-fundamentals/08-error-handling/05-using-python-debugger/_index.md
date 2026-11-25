---
title: 'How to use Python debugger'
linkTitle: 'How to use Python debugger'
weight: 5
---

Debugging is an essential skill for all programmers. No matter how careful you are, you'll inevitably encounter bugs in your code. The Python debugger (`pdb`) provides powerful tools to help you find and fix these issues efficiently.

## Introduction to the Python Debugger (pdb)

Python comes with a built-in debugger module called `pdb` (Python Debugger). This interactive debugger allows you to:

- Pause program execution at specific points (breakpoints)
- Step through your code line by line
- Inspect variable values at any point
- Evaluate expressions in the current context
- Modify variables during runtime

## Starting the Debugger

There are several ways to start the Python debugger:

### 1. Using `pdb.set_trace()`

The simplest way to use the debugger is to insert `pdb.set_trace()` at the point where you want to start debugging:

```python
import pdb

def calculate_average(numbers):
    total = 0
    for num in numbers:
        total += num
    pdb.set_trace()  # Debugger will start here
    average = total / len(numbers)
    return average

result = calculate_average([1, 2, 3, 4, 5])
print(f"The average is {result}")
```

When this code runs, the program will pause at the `pdb.set_trace()` line and drop you into the debugger console.

**Note:**
In Python 3.7+, you can use the built-in `breakpoint()` function instead of importing `pdb`:

```python
def calculate_average(numbers):
    total = 0
    for num in numbers:
        total += num
    breakpoint()  # Equivalent to pdb.set_trace()
    average = total / len(numbers)
    return average
```

### 2. Running a Script with pdb

You can run an entire script under the debugger from the command line:

```bash
python -m pdb my_script.py
```

This starts the debugger at the beginning of the script. The program will pause before the first line executes.

### 3. Post-Mortem Debugging

You can also start the debugger after an exception has occurred:

```python
import pdb

try:
    # Some code that might raise an exception
    result = 10 / 0
except:
    pdb.post_mortem()  # Start the debugger at the point of the exception
```

## Basic Debugging Commands

Once the debugger is running, you can use various commands to control execution and examine the program state:

| Command | Description |
|---------|-------------|
| `h` or `help` | Show list of available commands |
| `q` or `quit` | Exit the debugger |
| `c` or `continue` | Continue execution until next breakpoint |
| `n` or `next` | Execute the current line and move to the next line (doesn't enter functions) |
| `s` or `step` | Step into a function call |
| `r` or `return` | Continue execution until the current function returns |
| `l` or `list` | Show the current position in the code |
| `p expression` | Print the value of an expression |
| `pp expression` | Pretty-print the value of an expression |
| `w` or `where` | Show the current call stack |
| `b` or `break` | Set a breakpoint |
| `clear` | Clear breakpoints |
| `u` or `up` | Move up one level in the call stack |
| `d` or `down` | Move down one level in the call stack |

Here's a sample debugging session:

```
> my_script.py(7)calculate_average()
-> average = total / len(numbers)
(Pdb) p total
15
(Pdb) p len(numbers)
5
(Pdb) p numbers
[1, 2, 3, 4, 5]
(Pdb) n
> my_script.py(8)calculate_average()
-> return average
(Pdb) p average
3.0
(Pdb) c
The average is 3.0
```

## Practical Debugging Techniques

### Setting Conditional Breakpoints

You can set breakpoints that only trigger when certain conditions are met:

```python
import pdb

def process_items(items):
    results = []
    for i, item in enumerate(items):
        processed = item * 2
        if i == 3:
            pdb.set_trace()  # Only break at the 4th item (index 3)
        results.append(processed)
    return results

process_items([5, 10, 15, 20, 25, 30])
```

Alternatively, using the debugger console:

```
(Pdb) b my_script.py:7, i > 10
Breakpoint 1 at my_script.py:7
(Pdb) c  # Continue until the condition is met
```

### Examining Variables and Call Stack

When your program behaves unexpectedly, it's often because variables don't contain what you think they do. The debugger lets you examine them:

```
(Pdb) p locals()  # Print all local variables
{'items': [5, 10, 15, 20, 25, 30], 'results': [10, 20, 30], 'i': 3, 'item': 20, 'processed': 40}
(Pdb) pp locals()  # Pretty-print for better formatting
{'i': 3,
 'item': 20,
 'items': [5, 10, 15, 20, 25, 30],
 'processed': 40,
 'results': [10, 20, 30]}
```

To see how you got to the current point, examine the call stack:

```
(Pdb) w
  my_script.py(11)<module>()
-> process_items([5, 10, 15, 20, 25, 30])
> my_script.py(7)process_items()
-> pdb.set_trace()
```

### Modifying Variables During Debugging

One powerful feature of the debugger is the ability to modify variables on the fly:

```
(Pdb) p item
20
(Pdb) item = 100
(Pdb) p processed
40
(Pdb) processed = 200
(Pdb) c  # Continue execution with modified values
```

This allows you to test fixes without restarting the program.

## Using Python Debugger in Different Environments

### Debugging in Interactive Mode (REPL)

You can use the debugger in the Python interactive shell:

```python
>>> import pdb
>>> def buggy_function():
...     x = 1
...     y = 0
...     pdb.set_trace()
...     return x / y
...
>>> buggy_function()
> <stdin>(5)buggy_function()
-> return x / y
(Pdb)
```

### Debugging in Jupyter Notebooks

For Jupyter notebooks, you can use `%debug` magic command after an exception occurs:

```python
# Run this cell first
def divide(a, b):
    return a / b

# Then run this cell
result = divide(10, 0)  # This will raise a ZeroDivisionError

# Now run this cell to debug
%debug
```

Or use `%pdb on` to automatically start the debugger on any exception:

```python
%pdb on
result = divide(10, 0)  # Will automatically drop into debugger
```

### IDE Debugging Support

Most Python IDEs offer integrated debugging with graphical interfaces, including:

- **PyCharm**: Offers visual debugging with breakpoints, variable inspection, and a graphical call stack
- **Visual Studio Code**: Provides debugging through the Python extension
- **Spyder**: Includes debugging features similar to MATLAB's debugger

## Advanced Debugging Techniques

### Using `pdb.run()`

You can execute a string of Python code under the debugger:

```python
import pdb
pdb.run('calculate_average([1, 2, 3, 4, 0])')
```

### Debugging Multi-Threaded Programs

Standard `pdb` can be challenging for multi-threaded programs. Consider specialized tools:

```python
# Example using threading-specific debugging
import threading
import multiprocessing
import pdb

# For thread debugging, you might need to use thread-specific tools
# or synchronization mechanisms
```

### Remote Debugging

For debugging applications running on a remote server or in a different process:

```python
# On the server side
from remote_pdb import RemotePdb
RemotePdb('0.0.0.0', 4444).set_trace()

# Connect from your local machine using telnet
# $ telnet server_ip 4444
```

## Automated Debugging Tools

Besides manual debugging, Python offers automated tools to help identify issues:

### Using the `logging` Module

Logging is a non-intrusive way to track program execution:

```python
import logging

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

def calculate_average(numbers):
    logging.debug(f"Starting with numbers: {numbers}")
    
    if not numbers:
        logging.warning("Empty list provided!")
        return 0
    
    total = sum(numbers)
    logging.debug(f"Sum calculated: {total}")
    
    average = total / len(numbers)
    logging.debug(f"Average calculated: {average}")
    
    return average

# Test the function
result = calculate_average([1, 2, 3, 4, 5])
print(f"The average is {result}")
```

### Code Profiling

When debugging performance issues, profiling tools can help:

```python
import cProfile

def slow_function():
    result = 0
    for i in range(1000000):
        result += i
    return result

# Profile the function
cProfile.run('slow_function()')
```

### Memory Profiling

For memory-related issues, you can use memory profilers:

```python
# First install: pip install memory_profiler
from memory_profiler import profile

@profile
def memory_heavy_function():
    big_list = [i for i in range(10000000)]
    return len(big_list)

memory_heavy_function()
```

## Debugging Workflow: A Practical Example

Let's walk through debugging a function that's supposed to find the median of a list:

```python
def find_median(numbers):
    # Sort the list
    sorted_numbers = numbers.sort()
    
    # Find the middle position
    n = len(sorted_numbers)
    middle = n // 2
    
    # Return the median
    if n % 2 == 0:
        # Even number of elements
        return (sorted_numbers[middle - 1] + sorted_numbers[middle]) / 2
    else:
        # Odd number of elements
        return sorted_numbers[middle]

# Test the function
test_list = [5, 2, 9, 1, 7]
median = find_median(test_list)
print(f"The median is: {median}")
```

Running this will produce an error. Let's debug it:

```python
import pdb

def find_median(numbers):
    # Add a breakpoint
    pdb.set_trace()
    
    # Sort the list
    sorted_numbers = numbers.sort()
    
    # Find the middle position
    n = len(sorted_numbers)
    middle = n // 2
    
    # Return the median
    if n % 2 == 0:
        # Even number of elements
        return (sorted_numbers[middle - 1] + sorted_numbers[middle]) / 2
    else:
        # Odd number of elements
        return sorted_numbers[middle]

# Test the function
test_list = [5, 2, 9, 1, 7]
median = find_median(test_list)
print(f"The median is: {median}")
```

Debugging session:

```
> script.py(6)find_median()
-> sorted_numbers = numbers.sort()
(Pdb) p numbers
[5, 2, 9, 1, 7]
(Pdb) n
> script.py(9)find_median()
-> n = len(sorted_numbers)
(Pdb) p sorted_numbers
None
```

We've found the first issue! `list.sort()` sorts the list in-place and returns `None`. Let's fix this:

```
(Pdb) numbers.sort()
(Pdb) p numbers
[1, 2, 5, 7, 9]
(Pdb) sorted_numbers = numbers
(Pdb) c
```

We'll still get an error. Let's restart with the fixed code:

```python
def find_median(numbers):
    # Make a copy to avoid modifying the original
    numbers_copy = numbers.copy()
    
    # Sort the list
    numbers_copy.sort()  # sorts in-place
    
    # Find the middle position
    n = len(numbers_copy)
    middle = n // 2
    
    # Return the median
    if n % 2 == 0:
        # Even number of elements
        return (numbers_copy[middle - 1] + numbers_copy[middle]) / 2
    else:
        # Odd number of elements
        return numbers_copy[middle]

# Test with odd number of elements
test_list_odd = [5, 2, 9, 1, 7]
median_odd = find_median(test_list_odd)
print(f"Median of {test_list_odd}: {median_odd}")  # Should be 5

# Test with even number of elements
test_list_even = [5, 2, 9, 1, 7, 6]
median_even = find_median(test_list_even)
print(f"Median of {test_list_even}: {median_even}")  # Should be 5.5
```

## Common Debugging Patterns and Challenges

### Pattern: "It works on my machine"

This often indicates environmental differences:

```python
import sys
import platform
import os

def debug_environment():
    """Print information about the execution environment."""
    print(f"Python version: {sys.version}")
    print(f"Platform: {platform.platform()}")
    print(f"Current working directory: {os.getcwd()}")
    print(f"Environment variables: {dict(os.environ)}")

# Call at the beginning of scripts that might be environment-sensitive
debug_environment()
```

### Pattern: "It sometimes fails"

Random failures often indicate race conditions or undefined behavior:

```python
import random
import time

def occasionally_fails():
    """Function that randomly fails."""
    if random.random() < 0.3:  # 30% chance of failure
        raise ValueError("Random failure!")
    return "Success"

# Debug by forcing reproducibility
random.seed(42)  # Set a fixed seed for reproducible randomness
```

### Challenge: Debugging Long-Running Processes

For processes that take hours to reach the bug:

```python
def long_running_process(iterations):
    state = {"count": 0, "checkpoints": []}
    
    try:
        for i in range(iterations):
            # Save checkpoint every 1000 iterations
            if i % 1000 == 0:
                state["count"] = i
                state["checkpoints"].append(f"Checkpoint at {i}")
                
                # Save checkpoint to disk
                import json
                with open("checkpoint.json", "w") as f:
                    json.dump(state, f)
            
            # Actual processing here
            process_item(i)
            
    except Exception as e:
        print(f"Error at iteration {i}: {e}")
        # Analyze the last saved checkpoint
        with open("checkpoint.json", "r") as f:
            last_state = json.load(f)
        print(f"Last successful state: {last_state}")
        raise
```

## Debugging Best Practices

1. **Isolate the Problem**: Try to narrow down where the issue is occurring.
   ```python
   # Divide and conquer approach
   def complex_function():
       part1 = step1()
       print("Step 1 completed successfully")
       part2 = step2()
       print("Step 2 completed successfully")
       return combine(part1, part2)
   ```

2. **Use Assertions**: Add assertions to verify your assumptions.
   ```python
   def calculate_discount(price, discount_percentage):
       assert 0 <= discount_percentage <= 100, f"Invalid discount: {discount_percentage}"
       discount = price * (discount_percentage / 100)
       final_price = price - discount
       assert final_price <= price, f"Discounted price {final_price} higher than original {price}"
       return final_price
   ```

3. **Add Strategic Print Statements**: When a debugger isn't practical.
   ```python
   def process_data(data):
       print(f"Starting with data: {data[:5]}... (length: {len(data)})")
       processed = []
       for i, item in enumerate(data):
           if i % 1000 == 0:
               print(f"Processing item {i}/{len(data)}")
           processed.append(transform(item))
       print(f"Finished processing. Result length: {len(processed)}")
       return processed
   ```

4. **Keep a Debugging Log**: Document what you've tried and what you've learned.

5. **Use Version Control**: Make small, testable changes and commit them.

6. **Write Tests**: Automated tests can prevent bugs and help debug them.
   ```python
   import unittest
   
   class TestMedianFunction(unittest.TestCase):
       def test_odd_length_list(self):
           result = find_median([5, 2, 9, 1, 7])
           self.assertEqual(result, 5)
       
       def test_even_length_list(self):
           result = find_median([5, 2, 9, 1, 7, 6])
           self.assertEqual(result, 5.5)
       
       def test_empty_list(self):
           with self.assertRaises(ValueError):
               find_median([])
   
   if __name__ == "__main__":
       unittest.main()
   ```

## Exercises

**Exercise 1:** The following function is supposed to count the frequency of each character in a string, but it has a bug. Use the debugger to find and fix the issue:

```python
def count_characters(text):
    frequencies = {}
    for char in text:
        if char in frequencies:
            frequencies[char] += 1
        else:
            frequencies[char] = 1
    return frequencies

# Test the function
result = count_characters("hello world")
print(result)  # Expected: {'h': 1, 'e': 1, 'l': 3, 'o': 2, ' ': 1, 'w': 1, 'r': 1, 'd': 1}
```

**Exercise 2:** The following recursive function is supposed to calculate the sum of digits in a number, but it has a bug that causes it to enter an infinite recursion. Use the debugger to find and fix the issue:

```python
def sum_of_digits(n):
    if n < 10:
        return n
    else:
        last_digit = n % 10
        remaining_digits = n / 10  # Bug is here
        return last_digit + sum_of_digits(remaining_digits)

# Test the function
print(sum_of_digits(123))  # Expected: 6 (1+2+3)
```

**Exercise 3:** Create a function that finds the two numbers in a list that add up to a target value. The function should use the debugger to step through the process and validate its logic:

```python
def find_two_sum(numbers, target):
    # Add debugging to this function
    import pdb; pdb.set_trace()
    
    # Your solution here
    for i in range(len(numbers)):
        for j in range(i+1, len(numbers)):
            if numbers[i] + numbers[j] == target:
                return (numbers[i], numbers[j])
    
    return None

# Test the function
print(find_two_sum([2, 7, 11, 15], 9))  # Expected: (2, 7)
```

**Hint for Exercise 1:** The function logic seems correct. Use the debugger to step through the execution with a test case and examine the `frequencies` dictionary at each step.

In the next section, we'll explore how to work with files in Python, including reading from and writing to different file formats.