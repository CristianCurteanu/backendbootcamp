---
title: 'Loops (for, while)'
linkTitle: 'Loops (for, while)'
weight: 8
---


Loops allow you to execute a block of code repeatedly. They are essential when you need to perform the same action multiple times or process collections of data. Python provides two main types of loops: `for` loops and `while` loops.

## The `for` Loop

The `for` loop in Python is designed to iterate over a sequence (like a list, tuple, dictionary, set, or string) or other iterable objects. The general syntax is:

```python
for variable in iterable:
    # Code to execute in each iteration
```

Let's explore some common uses of `for` loops:

### Iterating Over a List

```python
fruits = ["apple", "banana", "cherry"]

for fruit in fruits:
    print(f"I like {fruit}s")

# Output:
# I like apples
# I like bananas
# I like cherrys
```

In this example, the loop variable `fruit` takes on each value in the `fruits` list, one at a time.

### Iterating Over a String

Strings are sequences of characters, so you can iterate over them:

```python
message = "Hello"

for character in message:
    print(character)

# Output:
# H
# e
# l
# l
# o
```

### Using the `range()` Function

The `range()` function generates a sequence of numbers, which is perfect for `for` loops:

```python
# range(stop) - generates numbers from 0 to stop-1
for i in range(5):
    print(i)
# Output: 0 1 2 3 4

# range(start, stop) - generates numbers from start to stop-1
for i in range(2, 6):
    print(i)
# Output: 2 3 4 5

# range(start, stop, step) - generates numbers from start to stop-1 with step
for i in range(1, 10, 2):
    print(i)
# Output: 1 3 5 7 9
```

The `range()` function is commonly used when you need to repeat an action a specific number of times or when you need the indices of a sequence.

### Iterating With Index Using `enumerate()`

If you need both the value and its position (index) in the sequence, use the `enumerate()` function:

```python
fruits = ["apple", "banana", "cherry"]

for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

# Output:
# 0: apple
# 1: banana
# 2: cherry
```

### Iterating Over Dictionaries

When iterating over a dictionary, the loop variable takes on the keys:

```python
person = {
    "name": "John",
    "age": 30,
    "city": "New York"
}

# Iterating over keys (default)
for key in person:
    print(f"Key: {key}, Value: {person[key]}")

# Explicitly iterating over keys
for key in person.keys():
    print(f"Key: {key}")

# Iterating over values
for value in person.values():
    print(f"Value: {value}")

# Iterating over key-value pairs
for key, value in person.items():
    print(f"Key: {key}, Value: {value}")
```

**Important:**
When iterating over a dictionary, the order of items was not guaranteed before Python 3.7. Since Python 3.7, dictionaries maintain insertion order.

## The `while` Loop

The `while` loop executes a block of code as long as a specified condition is `True`. The general syntax is:

```python
while condition:
    # Code to execute in each iteration
```

### Basic `while` Loop

```python
count = 0

while count < 5:
    print(f"Count: {count}")
    count += 1  # Increment count to avoid an infinite loop

# Output:
# Count: 0
# Count: 1
# Count: 2
# Count: 3
# Count: 4
```

**Important:**
Always ensure that the condition in a `while` loop will eventually become `False`, or you'll create an infinite loop that will run forever (or until you force the program to stop).

### User Input Validation with `while`

The `while` loop is particularly useful for validating user input:

```python
while True:
    response = input("Enter 'yes' or 'no': ").lower()
    
    if response == "yes" or response == "no":
        break  # Exit the loop if valid input
    else:
        print("Invalid input. Try again.")

print(f"You entered: {response}")
```

This loop continues asking for input until the user enters either "yes" or "no".

### `while` Loop with a Counter

You can use a counter variable to control how many times a loop executes:

```python
attempts = 0
max_attempts = 3

while attempts < max_attempts:
    password = input("Enter your password: ")
    
    if password == "secret":
        print("Access granted!")
        break
    else:
        attempts += 1
        remaining = max_attempts - attempts
        if remaining > 0:
            print(f"Incorrect password. {remaining} attempts remaining.")
        else:
            print("Access denied. Too many incorrect attempts.")
```

This example limits the user to three password attempts.

## Loop Control Statements

Python provides several statements to control the flow of loops:

### The `break` Statement

The `break` statement exits the innermost loop prematurely:

```python
for i in range(1, 10):
    if i == 5:
        break  # Exit the loop when i equals 5
    print(i)

# Output: 1 2 3 4
```

### The `continue` Statement

The `continue` statement skips the rest of the current iteration and jumps to the next iteration:

```python
for i in range(1, 10):
    if i % 2 == 0:
        continue  # Skip even numbers
    print(i)

# Output: 1 3 5 7 9
```

### The `else` Clause in Loops

Surprisingly, Python allows an `else` clause with loops. The `else` block executes after the loop completes normally (i.e., not via a `break` statement):

```python
# Find a number in a list
numbers = [1, 3, 5, 7, 9]
search_for = 5

for num in numbers:
    if num == search_for:
        print(f"Found {search_for}!")
        break
else:
    print(f"{search_for} is not in the list.")

# Output: Found 5!

# Try searching for a number not in the list
search_for = 6

for num in numbers:
    if num == search_for:
        print(f"Found {search_for}!")
        break
else:
    print(f"{search_for} is not in the list.")

# Output: 6 is not in the list.
```

The `else` clause is useful for implementing search algorithms where you need to know whether the loop completed without finding the item.

## Nested Loops

You can place one loop inside another to create nested loops:

```python
for i in range(1, 4):  # Outer loop
    for j in range(1, 4):  # Inner loop
        print(f"({i}, {j})", end=" ")
    print()  # New line after each row

# Output:
# (1, 1) (1, 2) (1, 3) 
# (2, 1) (2, 2) (2, 3) 
# (3, 1) (3, 2) (3, 3) 
```

Nested loops are particularly useful for working with multi-dimensional data structures:

```python
# Print a 2D list in a grid format
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

for row in matrix:
    for element in row:
        print(element, end=" ")
    print()  # New line after each row

# Output:
# 1 2 3 
# 4 5 6 
# 7 8 9 
```

## List Comprehensions

Python offers a concise way to create lists using a single line of code called a list comprehension:

```python
# Traditional approach
squares = []
for i in range(1, 6):
    squares.append(i ** 2)
print(squares)  # [1, 4, 9, 16, 25]

# List comprehension approach
squares = [i ** 2 for i in range(1, 6)]
print(squares)  # [1, 4, 9, 16, 25]
```

You can also add conditions to list comprehensions:

```python
# Only include squares of even numbers
even_squares = [i ** 2 for i in range(1, 11) if i % 2 == 0]
print(even_squares)  # [4, 16, 36, 64, 100]
```

List comprehensions can replace many common for-loop patterns and make your code more concise and readable.

## Dictionary Comprehensions

Similar to list comprehensions, you can create dictionaries in a concise way:

```python
# Create a dictionary of squares
squares_dict = {i: i ** 2 for i in range(1, 6)}
print(squares_dict)  # {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# Create a dictionary with a condition
even_squares_dict = {i: i ** 2 for i in range(1, 11) if i % 2 == 0}
print(even_squares_dict)  # {2: 4, 4: 16, 6: 36, 8: 64, 10: 100}
```

### Practical Examples

#### Example 1: Sum of Numbers

Calculate the sum of all numbers from 1 to n using both `for` and `while` loops:

```python
def sum_with_for(n):
    """Calculate the sum of numbers from 1 to n using a for loop."""
    total = 0
    for i in range(1, n + 1):
        total += i
    return total

def sum_with_while(n):
    """Calculate the sum of numbers from 1 to n using a while loop."""
    total = 0
    i = 1
    while i <= n:
        total += i
        i += 1
    return total

# Test both functions
n = 10
print(f"Sum of numbers from 1 to {n} (for loop): {sum_with_for(n)}")
print(f"Sum of numbers from 1 to {n} (while loop): {sum_with_while(n)}")
```

#### Example 2: FizzBuzz

The classic programming challenge:

```python
def fizzbuzz(n):
    """
    Print numbers from 1 to n, but for multiples of 3 print "Fizz",
    for multiples of 5 print "Buzz", and for multiples of both print "FizzBuzz".
    """
    for i in range(1, n + 1):
        if i % 3 == 0 and i % 5 == 0:
            print("FizzBuzz")
        elif i % 3 == 0:
            print("Fizz")
        elif i % 5 == 0:
            print("Buzz")
        else:
            print(i)

# Run FizzBuzz for numbers 1 to 15
fizzbuzz(15)
```

#### Example 3: Prime Number Finder

Find all prime numbers up to a given limit:

```python
def find_primes(limit):
    """Find all prime numbers up to the given limit."""
    primes = []
    
    for num in range(2, limit + 1):
        is_prime = True
        
        # Check if num is divisible by any smaller number
        for divisor in range(2, int(num ** 0.5) + 1):
            if num % divisor == 0:
                is_prime = False
                break
        
        if is_prime:
            primes.append(num)
    
    return primes

# Find all primes up to 50
print(find_primes(50))
```

#### Example 4: Word Counter

Count the occurrences of each word in a text:

```python
def count_words(text):
    """Count the occurrences of each word in the given text."""
    # Create an empty dictionary to store word counts
    word_counts = {}
    
    # Split the text into words
    words = text.split()
    
    # Loop through each word
    for word in words:
        # Remove punctuation and convert to lowercase
        clean_word = word.strip(".,!?\"'()[]{}:;").lower()
        
        if clean_word:  # Skip empty strings
            # Increment the count for this word
            if clean_word in word_counts:
                word_counts[clean_word] += 1
            else:
                word_counts[clean_word] = 1
    
    return word_counts

# Sample text
sample_text = """
Python is a powerful programming language. Python is easy to learn.
Python is used for web development, data analysis, artificial intelligence, and more.
"""

# Count words
result = count_words(sample_text)

# Print the results in a readable format
print("Word Counts:")
for word, count in sorted(result.items()):
    print(f"{word}: {count}")
```

### Loop Efficiency and Best Practices

#### 1. Choose the Right Loop

- Use `for` loops when you know the number of iterations in advance or when iterating over a collection.
- Use `while` loops when you need to continue until a condition changes or for indefinite iterations.

```python
# Good use of for loop
for i in range(10):
    print(i)

# Good use of while loop
response = ""
while response != "quit":
    response = input("Enter a command (type 'quit' to exit): ")
    # Process the response
```

#### 2. Avoid Modifying the Iteration Variable in a `for` Loop

In Python, the iteration variable is automatically updated by the loop mechanism. Modifying it manually can lead to unexpected behavior:

```python
# Problematic - modifying the iteration variable
for i in range(5):
    print(i)
    i += 2  # This has no effect on the loop's behavior

# Better approach if you need to skip items
i = 0
while i < 5:
    print(i)
    i += 3  # Skip by incrementing more than 1
```

#### 3. Avoid Modifying Collections During Iteration

Modifying a collection while iterating over it can lead to unexpected behavior:

```python
# Problematic - modifying a list during iteration
numbers = [1, 2, 3, 4, 5]
for num in numbers:
    if num % 2 == 0:
        numbers.remove(num)  # This modifies the list being iterated

# Better approach
numbers = [1, 2, 3, 4, 5]
numbers = [num for num in numbers if num % 2 != 0]
# or
odd_numbers = []
for num in numbers:
    if num % 2 != 0:
        odd_numbers.append(num)
numbers = odd_numbers
```

#### 4. Use `enumerate()` Instead of Manual Counting

```python
# Manual index tracking
fruits = ["apple", "banana", "cherry"]
index = 0
for fruit in fruits:
    print(f"{index}: {fruit}")
    index += 1

# Better approach with enumerate()
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")
```

#### 5. Use List Comprehensions for Simple Transformations

```python
# Traditional loop for transformation
numbers = [1, 2, 3, 4, 5]
squared = []
for num in numbers:
    squared.append(num ** 2)

# Cleaner approach with list comprehension
numbers = [1, 2, 3, 4, 5]
squared = [num ** 2 for num in numbers]
```

#### 6. Break Out of Complex Loops Early

```python
def find_item(matrix, target):
    """Find an item in a 2D matrix."""
    for i, row in enumerate(matrix):
        for j, value in enumerate(row):
            if value == target:
                return (i, j)  # Return early when found
    return None  # Not found
```

#### 7. Be Aware of the Performance Impact of Nested Loops

Nested loops multiply the number of iterations, which can impact performance for large data sets:

```python
# This runs in O(n²) time
n = 1000
for i in range(n):
    for j in range(n):
        # Some operation

# Consider if there's a more efficient algorithm
```

### Common Loop Patterns

#### Pattern 1: Loop with a Counter

```python
count = 0
for item in collection:
    if condition(item):
        count += 1
print(f"Found {count} items matching the condition")
```

#### Pattern 2: Find the Maximum/Minimum Value

```python
numbers = [23, 54, 12, 87, 34]
max_value = numbers[0]  # Assume the first item is the maximum

for num in numbers[1:]:  # Start from the second item
    if num > max_value:
        max_value = num

print(f"The maximum value is {max_value}")
```

#### Pattern 3: Filtering Items

```python
original = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
filtered = []

for num in original:
    if num % 2 == 0:  # Keep only even numbers
        filtered.append(num)

print(filtered)  # [2, 4, 6, 8, 10]

# Alternatively, using list comprehension
filtered = [num for num in original if num % 2 == 0]
```

#### Pattern 4: Aggregating Values

```python
expenses = [120.50, 35.75, 240.00, 55.25, 100.00]
total = 0

for expense in expenses:
    total += expense

print(f"Total expenses: ${total:.2f}")

# Alternatively, using sum()
total = sum(expenses)
```

#### Pattern 5: Nested Loop for Combinations

```python
fruits = ["apple", "banana", "cherry"]
colors = ["red", "green", "blue"]

combinations = []
for fruit in fruits:
    for color in colors:
        combinations.append((fruit, color))

print(combinations)
# [('apple', 'red'), ('apple', 'green'), ('apple', 'blue'),
#  ('banana', 'red'), ('banana', 'green'), ('banana', 'blue'),
#  ('cherry', 'red'), ('cherry', 'green'), ('cherry', 'blue')]

# Alternatively, using list comprehension
combinations = [(fruit, color) for fruit in fruits for color in colors]
```

## Exercises

**Exercise 1:** Write a program that prints the multiplication table for a given number. For example, if the number is 5, it should print:
```
5 x 1 = 5
5 x 2 = 10
...
5 x 10 = 50
```

**Exercise 2:** Create a program that generates a list of all even numbers between 1 and 100 using a loop. Then create the same list using a list comprehension.

**Exercise 3:** Write a program that asks the user for a number and then prints all the factors of that number. A factor is a number that divides the given number without a remainder.

**Exercise 4:** Create a nested loop to generate a "pyramid" pattern like this:
```
*
**
***
****
*****
```

**Hint for Exercise 1:** Use a for loop with the range function to iterate from 1 to 10, and in each iteration, multiply the given number by the current loop variable.

```python
# Exercise 1 solution outline
num = 5
for i in range(1, 11):
    result = num * i
    print(f"{num} x {i} = {result}")
```

In the next section, we'll explore break and continue statements in more detail, learn about the pass statement, and introduce exception handling basics.