---
title: 'Break and Continue Statements'
linkTitle: 'Break and Continue Statements'
weight: 9
---

The `break` and `continue` statements give you precise control over loop execution. They allow you to alter the normal flow of loops based on certain conditions.

## The `break` Statement

The `break` statement immediately terminates the current loop and transfers control to the statement following the loop.

### Breaking Out of a `for` Loop

```python
fruits = ["apple", "banana", "cherry", "date", "elderberry"]

for fruit in fruits:
    if fruit == "cherry":
        print(f"Found {fruit}! Stopping search.")
        break
    print(f"Checking: {fruit}")

print("Loop ended")
```

**Output:**
```
Checking: apple
Checking: banana
Found cherry! Stopping search.
Loop ended
```

In this example, the loop stops when it reaches "cherry" and doesn't process the remaining items.

### Breaking Out of a `while` Loop

```python
counter = 0

while True:  # This creates an infinite loop
    counter += 1
    print(f"Count: {counter}")
    
    if counter >= 5:
        print("Breaking out of the loop")
        break

print("Loop ended")
```

**Output:**
```
Count: 1
Count: 2
Count: 3
Count: 4
Count: 5
Breaking out of the loop
Loop ended
```

Here, the `break` statement is essential to exit what would otherwise be an infinite loop.

### Using `break` with Nested Loops

When using nested loops, `break` only exits the innermost loop:

```python
for i in range(3):
    print(f"Outer loop: {i}")
    
    for j in range(3):
        print(f"  Inner loop: {j}")
        if j == 1:
            print("  Breaking inner loop")
            break
            
    print("Outer loop continues")
```

**Output:**
```
Outer loop: 0
  Inner loop: 0
  Inner loop: 1
  Breaking inner loop
Outer loop continues
Outer loop: 1
  Inner loop: 0
  Inner loop: 1
  Breaking inner loop
Outer loop continues
Outer loop: 2
  Inner loop: 0
  Inner loop: 1
  Breaking inner loop
Outer loop continues
```

To break out of all loops at once, you can use a flag variable or create a function and return from it.

## The `continue` Statement

The `continue` statement skips the rest of the current iteration and jumps back to the top of the loop for the next iteration.

### Skipping Items in a `for` Loop

```python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

for number in numbers:
    if number % 2 == 0:  # Skip even numbers
        continue
    print(f"Processing odd number: {number}")
```

**Output:**
```
Processing odd number: 1
Processing odd number: 3
Processing odd number: 5
Processing odd number: 7
Processing odd number: 9
```

The `continue` statement skips the print statement for even numbers.

### Skipping Iterations in a `while` Loop

```python
counter = 0

while counter < 10:
    counter += 1
    
    if counter % 3 == 0:  # Skip multiples of 3
        continue
        
    print(f"Processing: {counter}")
```

**Output:**
```
Processing: 1
Processing: 2
Processing: 4
Processing: 5
Processing: 7
Processing: 8
Processing: 10
```

**Important:**
In a `while` loop, be careful not to put the counter increment after the `continue` statement, as it would create an infinite loop:

```python
# Infinite loop - WRONG!
counter = 0
while counter < 10:
    if counter % 3 == 0:
        continue  # Returns to the condition check without incrementing
    print(f"Processing: {counter}")
    counter += 1  # Never reached when continue executes
```

## Practical Examples

### Example 1: Input Validation Loop

This example uses `continue` to handle invalid inputs and `break` to exit when valid input is received:

```python
def get_positive_number():
    """Prompt the user until they enter a positive number."""
    while True:
        try:
            user_input = input("Enter a positive number: ")
            
            # Check if the user wants to exit
            if user_input.lower() in ['q', 'quit', 'exit']:
                print("Exiting.")
                return None
            
            number = float(user_input)
            
            # Handle negative or zero input
            if number <= 0:
                print("Please enter a positive number!")
                continue
                
            # We have a valid positive number
            return number
            
        except ValueError:
            print("That's not a valid number! Try again.")
            continue

# Test the function
result = get_positive_number()
if result is not None:
    print(f"You entered: {result}")
```

### Example 2: Processing a File with Exceptions

This example reads a file line by line, using `continue` to skip invalid lines:

```python
def process_data_file(filename):
    """Process numeric data from a file, skipping invalid lines."""
    total = 0
    valid_count = 0
    
    try:
        with open(filename, 'r') as file:
            for line_number, line in enumerate(file, 1):
                line = line.strip()
                
                # Skip empty lines
                if not line:
                    print(f"Line {line_number}: Empty line, skipping")
                    continue
                
                # Skip comment lines
                if line.startswith('#'):
                    print(f"Line {line_number}: Comment, skipping")
                    continue
                
                try:
                    value = float(line)
                    total += value
                    valid_count += 1
                    print(f"Line {line_number}: Processed value {value}")
                except ValueError:
                    print(f"Line {line_number}: Invalid number '{line}', skipping")
                    continue
    
    except FileNotFoundError:
        print(f"Error: File '{filename}' not found.")
        return None
        
    if valid_count == 0:
        return 0
    
    average = total / valid_count
    return average

# Example usage (assuming you have a file named "data.txt")
# average = process_data_file("data.txt")
# if average is not None:
#     print(f"Average of valid numbers: {average}")
```

### Example 3: Finding Primes with Early Termination

This example uses `break` to implement early termination in a primality test:

```python
def is_prime(n):
    """
    Check if a number is prime using trial division with early termination.
    """
    if n <= 1:
        return False
    if n <= 3:
        return True
    
    # Check if n is divisible by 2 or 3
    if n % 2 == 0 or n % 3 == 0:
        return False
    
    # Check divisibility by numbers of form 6k ± 1 up to sqrt(n)
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6
    
    return True

def find_primes_in_range(start, end):
    """Find all prime numbers in the given range."""
    primes = []
    
    for num in range(start, end + 1):
        if is_prime(num):
            primes.append(num)
            
    return primes

# Find primes between 10 and 30
print(find_primes_in_range(10, 30))
# Output: [11, 13, 17, 19, 23, 29]
```

## Common Pitfalls and Best Practices

### 1. Avoiding Infinite Loops

Always ensure that a `while` loop has a way to exit, especially when using `continue`:

```python
# Good practice - increment before continue
counter = 0
while counter < 5:
    counter += 1
    if counter == 3:
        continue
    print(counter)
```

### 2. Breaking Out of Nested Loops

To break out of nested loops, you can use a flag variable:

```python
found = False
for i in range(5):
    for j in range(5):
        if i * j == 6:
            print(f"Found i={i}, j={j} where i*j=6")
            found = True
            break
    if found:
        break
```

Alternatively, you can wrap the nested loops in a function and use `return`:

```python
def find_product(target):
    for i in range(5):
        for j in range(5):
            if i * j == target:
                return i, j
    return None

result = find_product(6)
if result:
    i, j = result
    print(f"Found i={i}, j={j} where i*j=6")
else:
    print("No solution found")
```

### 3. Don't Overuse `break` and `continue`

While these statements are powerful, overusing them can make code harder to understand:

```python
# Hard to follow with multiple breaks
for item in items:
    if condition1(item):
        if condition2(item):
            break
        process1(item)
    else:
        if condition3(item):
            continue
        process2(item)

# More readable with positive conditions
for item in items:
    if not condition1(item):
        if not condition3(item):
            process2(item)
        continue
    
    if condition2(item):
        break
    
    process1(item)
```

### 4. Using `else` with Loops and `break`

Remember that the `else` clause in a loop executes only if the loop completes normally (without `break`):

```python
def check_all_positive(numbers):
    for num in numbers:
        if num <= 0:
            print(f"Found non-positive number: {num}")
            break
    else:
        print("All numbers are positive")

check_all_positive([1, 2, 3, 4, 5])  # All numbers are positive
check_all_positive([1, 2, -3, 4, 5])  # Found non-positive number: -3
```

## When to Use `break` vs. `continue`

- Use `break` when:
  - You've found what you're looking for
  - An error or exceptional condition occurs that makes continuing pointless
  - You need to exit early from a potentially expensive operation

- Use `continue` when:
  - The current item shouldn't be processed, but you want to process the rest
  - You want to skip to the next iteration based on a condition
  - You need to handle invalid cases separately

## Exercises

**Exercise 1:** Write a program that prompts the user to enter positive numbers to calculate their sum. Use a loop that continues until the user enters a negative number or zero, at which point the program should stop asking for input and display the sum of all the positive numbers entered.

**Exercise 2:** Create a program that prints all the prime numbers between 1 and 100, but skips any prime numbers that contain the digit '3' (like 3, 13, 23, etc.).

**Exercise 3:** Write a program that iterates through the numbers 1 to 100. For multiples of 3, print "Fizz" instead of the number. For multiples of 5, print "Buzz". For numbers that are multiples of both 3 and 5, print "FizzBuzz". However, if the number contains the digit 7, skip that number entirely using `continue`.

**Exercise 4:** Create a nested loop that searches for a specific pattern in a 2D list (like a word search puzzle). Once the pattern is found, use `break` statements appropriately to exit both loops.

**Hint for Exercise 1:** Use a `while True` loop to keep asking for input. Check if the input is negative or zero, and use `break` if it is. Otherwise, add the positive number to a running sum.

```python
# Exercise 1 solution outline
sum_of_numbers = 0

while True:
    user_input = float(input("Enter a positive number (or negative/zero to stop): "))
    
    if user_input <= 0:
        break
        
    sum_of_numbers += user_input

print(f"The sum of all positive numbers entered is: {sum_of_numbers}")
```

In the next section, we'll explore the `pass` statement, which provides a way to create placeholder code in Python.