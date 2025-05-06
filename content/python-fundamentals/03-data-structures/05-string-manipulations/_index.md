---
title: 'String Manipulation'
linkTitle: 'String Manipulation'
weight: 15
---


Strings are one of the most commonly used data types in programming. In Python, strings are sequences of characters enclosed in quotes (single, double, or triple quotes). String manipulation involves various operations to modify, analyze, or extract information from strings.

## Creating Strings

There are several ways to create strings in Python:

```python
# Single quotes
name = 'John'

# Double quotes
message = "Hello, World!"

# Triple quotes (for multi-line strings)
description = """This is a multi-line
string that spans
multiple lines."""

# Empty string
empty_string = ""
```

Both single and double quotes work the same way, but using double quotes allows you to include single quotes within the string without escaping them, and vice versa:

```python
# Single quotes inside double quotes
message = "Don't worry about apostrophes"

# Double quotes inside single quotes
code = 'The variable is called "counter"'
```

## String Concatenation

You can combine strings using the `+` operator:

```python
first_name = "John"
last_name = "Doe"
full_name = first_name + " " + last_name
print(full_name)  # Output: John Doe
```

You can also use the `+=` operator to append to a string:

```python
greeting = "Hello"
greeting += ", World!"
print(greeting)  # Output: Hello, World!
```

For more complex string building, especially when combining different data types, it's often better to use string formatting methods (covered later) rather than concatenation.

## String Repetition

The `*` operator repeats a string a specified number of times:

```python
separator = "-" * 20
print(separator)  # Output: --------------------

word = "Python "
repeated = word * 3
print(repeated)  # Output: Python Python Python 
```

## String Indexing

Strings in Python are sequences, and each character has an index. Indexing starts at 0 for the first character:

```python
message = "Hello, World!"

# Access individual characters
first_char = message[0]    # 'H'
sixth_char = message[5]    # ','

# Negative indexing (counting from the end)
last_char = message[-1]    # '!'
second_last = message[-2]  # 'd'

print(f"First character: {first_char}")
print(f"Last character: {last_char}")
```

**Important:**
Strings in Python are immutable, which means you cannot change individual characters directly:

```python
message = "Hello"
# This will cause an error:
# message[0] = "h"  # TypeError: 'str' object does not support item assignment

# Instead, create a new string
message = "h" + message[1:]
print(message)  # Output: hello
```

## String Slicing

Slicing allows you to extract a portion of a string:

```python
message = "Hello, World!"

# Syntax: string[start:end:step]
# The slice includes start but excludes end

# Extract "Hello"
hello = message[0:5]  # or simply message[:5]

# Extract "World"
world = message[7:12]

# Extract every second character
every_second = message[::2]  # "Hlo ol!"

# Extract the last 5 characters
last_five = message[-5:]  # "orld!"

# Reverse a string
reversed_msg = message[::-1]  # "!dlroW ,olleH"

print(f"Hello part: {hello}")
print(f"World part: {world}")
print(f"Every second character: {every_second}")
print(f"Last five characters: {last_five}")
print(f"Reversed message: {reversed_msg}")
```

## String Methods

Python provides many built-in methods for string manipulation:

### Case Conversion Methods

```python
message = "Hello, World!"

# Convert to uppercase
upper_case = message.upper()
print(upper_case)  # HELLO, WORLD!

# Convert to lowercase
lower_case = message.lower()
print(lower_case)  # hello, world!

# Convert first character of each word to uppercase
title_case = "welcome to python".title()
print(title_case)  # Welcome To Python

# Capitalize only the first character of the string
capitalized = "welcome to python".capitalize()
print(capitalized)  # Welcome to python

# Swap case (uppercase becomes lowercase and vice versa)
swapped = "Hello, World!".swapcase()
print(swapped)  # hELLO, wORLD!
```

### Searching Methods

```python
message = "Python is a powerful programming language"

# Check if a string starts with a specific prefix
starts_with_python = message.startswith("Python")
print(starts_with_python)  # True

# Check if a string ends with a specific suffix
ends_with_language = message.endswith("language")
print(ends_with_language)  # True

# Find the position of a substring (returns -1 if not found)
position = message.find("powerful")
print(position)  # 11

# Count occurrences of a substring
count = message.count("p")
print(count)  # 3 (two in "Python" and one in "powerful")

# Check if a string contains only alphabetic characters
is_alpha = "Python".isalpha()
print(is_alpha)  # True

# Check if a string contains only digits
is_digit = "12345".isdigit()
print(is_digit)  # True

# Check if a string is alphanumeric
is_alnum = "Python3".isalnum()
print(is_alnum)  # True

# Check if all characters are whitespace
is_space = "   ".isspace()
print(is_space)  # True
```

### Transformation Methods

```python
# Replace parts of a string
original = "Python is cool, Python is powerful"
replaced = original.replace("Python", "Java")
print(replaced)  # Java is cool, Java is powerful

# Replace with a limit
replaced_once = original.replace("Python", "Java", 1)
print(replaced_once)  # Java is cool, Python is powerful

# Strip whitespace from the beginning and end
text = "   Hello, World!   "
stripped = text.strip()
print(stripped)  # "Hello, World!"

# Strip only from the left
left_stripped = text.lstrip()
print(left_stripped)  # "Hello, World!   "

# Strip only from the right
right_stripped = text.rstrip()
print(right_stripped)  # "   Hello, World!"

# Strip specific characters (not just whitespace)
text_with_symbols = "###Hello, World!###"
stripped_symbols = text_with_symbols.strip("#")
print(stripped_symbols)  # "Hello, World!"

# Pad a string to a fixed length
padded = "Hello".ljust(10, "*")
print(padded)  # "Hello*****"

right_padded = "Hello".rjust(10, "*")
print(right_padded)  # "*****Hello"

center_padded = "Hello".center(10, "*")
print(center_padded)  # "**Hello***"
```

### Splitting and Joining

```python
# Split a string into a list based on a delimiter
message = "apple,banana,cherry,date"
fruits = message.split(",")
print(fruits)  # ['apple', 'banana', 'cherry', 'date']

# Split with a maximum number of splits
first_two = message.split(",", 2)
print(first_two)  # ['apple', 'banana', 'cherry,date']

# Split by whitespace (default behavior of split())
sentence = "Python is a programming language"
words = sentence.split()
print(words)  # ['Python', 'is', 'a', 'programming', 'language']

# Split by lines
multiline = """Line 1
Line 2
Line 3"""
lines = multiline.splitlines()
print(lines)  # ['Line 1', 'Line 2', 'Line 3']

# Join a list of strings into a single string
joined = ", ".join(fruits)
print(joined)  # 'apple, banana, cherry, date'

# Join with empty string
no_spaces = "".join(words)
print(no_spaces)  # 'Pythonisaprogramminglanguage'
```

## String Formatting

Python provides several ways to format strings:

### f-strings (Python 3.6+)

```python
name = "Alice"
age = 30
height = 5.8

# Basic formatting
greeting = f"Hello, my name is {name} and I am {age} years old."
print(greeting)

# Format specifications
height_formatted = f"My height is {height:.1f} feet."
print(height_formatted)  # My height is 5.8 feet.

# Expressions in f-strings
print(f"In five years, I'll be {age + 5} years old.")  # In five years, I'll be 35 years old.

# Alignment and padding
for num in range(1, 11):
    print(f"{num:2d} squared is {num**2:3d}")
# Output:
#  1 squared is   1
#  2 squared is   4
#  3 squared is   9
# ...
# 10 squared is 100
```

### The `format()` Method

```python
# Basic formatting
greeting = "Hello, my name is {} and I am {} years old.".format(name, age)
print(greeting)

# Positional arguments
template = "The order is: {0}, {1}, {2}."
print(template.format("first", "second", "third"))  # The order is: first, second, third.

# Reuse positional arguments
template = "The repeated order is: {0}, {1}, {0}."
print(template.format("first", "second"))  # The repeated order is: first, second, first.

# Named arguments
info = "Name: {name}, Age: {age}, Height: {height}m".format(name="Bob", age=25, height=1.85)
print(info)  # Name: Bob, Age: 25, Height: 1.85m

# Format specifications
pi = 3.14159265359
print("Pi is approximately {:.2f}".format(pi))  # Pi is approximately 3.14

# Alignment
for i in range(1, 11):
    print("Number: {:<2}, Square: {:<3}, Cube: {:<4}".format(i, i**2, i**3))
# Number: 1 , Square: 1  , Cube: 1   
# Number: 2 , Square: 4  , Cube: 8   
# ...
```

### The `%` Operator (older style)

```python
# Basic formatting
greeting = "Hello, my name is %s and I am %d years old." % (name, age)
print(greeting)

# Format specifiers
pi = 3.14159
print("Pi is approximately %.2f" % pi)  # Pi is approximately 3.14

# Multiple values
print("Name: %s, Age: %d, Height: %.1f" % (name, age, height))
```

**Note:**
While the `%` operator is still supported, f-strings and the `format()` method are generally preferred in modern Python code due to improved readability and flexibility.

## String Interpolation with Variables

Python 3.6+ introduced a simpler form of string formatting using f-strings, which directly interpolate variables:

```python
name = "Charlie"
age = 40
print(f"{name} is {age} years old.")  # Charlie is 40 years old.
```

## Working with Unicode and Special Characters

Python 3 strings are Unicode by default, which means they can contain characters from various languages and special symbols:

```python
# Unicode characters
unicode_string = "こんにちは"  # Japanese for "Hello"
print(unicode_string)

# Unicode escape sequences
heart_symbol = "\u2764"  # Unicode code point for heart
print(heart_symbol)  # ❤

# Special escape sequences
text_with_newlines = "First line\nSecond line"
print(text_with_newlines)
# Output:
# First line
# Second line

text_with_tabs = "Name\tAge\tCity"
print(text_with_tabs)
# Output:
# Name    Age    City

# Raw strings (ignore escape characters)
raw_string = r"C:\Users\John\Documents"
print(raw_string)  # C:\Users\John\Documents
```

## Practical String Manipulation Examples

### Example 1: Password Validator

```python
def validate_password(password):
    """
    Validate that a password meets the following criteria:
    - At least 8 characters long
    - Contains at least one uppercase letter
    - Contains at least one lowercase letter
    - Contains at least one digit
    - Contains at least one special character (!@#$%^&*()_+)
    
    Returns a list of validation errors or an empty list if valid.
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
    special_chars = "!@#$%^&*()_+"
    if not any(char in special_chars for char in password):
        errors.append("Password must contain at least one special character (!@#$%^&*()_+)")
    
    return errors

# Test the validator
test_passwords = [
    "abc123",  # Too short
    "ALLUPPERCASE123!",  # No lowercase
    "alllowercase123!",  # No uppercase
    "ABCDEabcde!",  # No digits
    "ABCDEabcde123",  # No special chars
    "ABCabc123!",  # Valid
]

for password in test_passwords:
    errors = validate_password(password)
    if errors:
        print(f"Password '{password}' is invalid:")
        for error in errors:
            print(f"- {error}")
    else:
        print(f"Password '{password}' is valid")
    print()
```

### Example 2: Text Analyzer

```python
def analyze_text(text):
    """
    Analyze a text and return statistics about it.
    """
    # Prepare the text: convert to lowercase and remove punctuation
    import string
    text = text.lower()
    for punctuation in string.punctuation:
        text = text.replace(punctuation, "")
    
    # Split into words
    words = text.split()
    
    # Count the words
    word_count = len(words)
    
    # Count unique words
    unique_words = set(words)
    unique_word_count = len(unique_words)
    
    # Find most common words
    from collections import Counter
    word_counter = Counter(words)
    most_common = word_counter.most_common(5)
    
    # Calculate average word length
    total_length = sum(len(word) for word in words)
    avg_word_length = total_length / word_count if word_count > 0 else 0
    
    # Analyze sentence structure
    sentences = text.replace("!", ".").replace("?", ".").split(".")
    sentences = [s.strip() for s in sentences if s.strip()]
    sentence_count = len(sentences)
    avg_sentence_length = word_count / sentence_count if sentence_count > 0 else 0
    
    # Return the analysis
    return {
        "word_count": word_count,
        "unique_word_count": unique_word_count,
        "vocabulary_diversity": unique_word_count / word_count if word_count > 0 else 0,
        "avg_word_length": avg_word_length,
        "sentence_count": sentence_count,
        "avg_sentence_length": avg_sentence_length,
        "most_common_words": most_common
    }

# Test the analyzer
sample_text = """
Python is a high-level, general-purpose programming language. Its design philosophy emphasizes code readability with the use of significant indentation. Python is dynamically typed and garbage-collected. It supports multiple programming paradigms, including structured, object-oriented and functional programming. It is often described as a "batteries included" language due to its comprehensive standard library.
"""

analysis = analyze_text(sample_text)

print("Text Analysis Results:")
print(f"Word count: {analysis['word_count']}")
print(f"Unique word count: {analysis['unique_word_count']}")
print(f"Vocabulary diversity: {analysis['vocabulary_diversity']:.2f}")
print(f"Average word length: {analysis['avg_word_length']:.2f} characters")
print(f"Sentence count: {analysis['sentence_count']}")
print(f"Average sentence length: {analysis['avg_sentence_length']:.2f} words")
print("Most common words:")
for word, count in analysis['most_common_words']:
    print(f"- '{word}': {count} occurrences")
```

### Example 3: Simple Template Engine

```python
def render_template(template, variables):
    """
    A simple template engine that replaces {{variable}} in the template
    with the corresponding value from the variables dictionary.
    """
    result = template
    
    for key, value in variables.items():
        placeholder = "{{" + key + "}}"
        result = result.replace(placeholder, str(value))
    
    return result

# Test the template engine
template = """
Dear {{name}},

Thank you for your purchase of {{product}} on {{date}}.
Your order number is {{order_id}}.

Please contact us at {{support_email}} if you have any questions.

Sincerely,
{{company_name}}
"""

variables = {
    "name": "John Smith",
    "product": "Python Programming Book",
    "date": "May 15, 2023",
    "order_id": "ORD-12345",
    "support_email": "support@example.com",
    "company_name": "Tech Books Inc."
}

rendered = render_template(template, variables)
print(rendered)
```

## String Manipulation Best Practices

### 1. Use String Methods Instead of Manual Iteration

```python
# Less efficient
uppercase_chars = ""
for char in text:
    if char.isalpha():
        uppercase_chars += char.upper()

# More efficient
uppercase_chars = "".join(char.upper() for char in text if char.isalpha())
```

### 2. Use `join()` Instead of `+` for Building Strings

```python
# Less efficient (creates many intermediate strings)
result = ""
for item in items:
    result += item + ", "
result = result[:-2]  # Remove trailing comma and space

# More efficient
result = ", ".join(items)
```

### 3. Use f-strings for Readable Formatting

```python
# Less readable
info = "Name: " + name + ", Age: " + str(age) + ", City: " + city

# More readable
info = f"Name: {name}, Age: {age}, City: {city}"
```

### 4. Use String Methods for Validation

```python
# Less reliable
is_valid = True
for char in user_id:
    if not (char.isalpha() or char.isdigit() or char == '_'):
        is_valid = False
        break

# More reliable
is_valid = all(char.isalpha() or char.isdigit() or char == '_' for char in user_id)
# Or even better
is_valid = user_id.isalnum() or "_" in user_id
```

### 5. Consider Regular Expressions for Complex Pattern Matching

```python
import re

# Check if a string is a valid email address
def is_valid_email(email):
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))

# Test the function
emails = ["user@example.com", "invalid-email", "another.user@domain.co.uk"]
for email in emails:
    print(f"{email}: {'Valid' if is_valid_email(email) else 'Invalid'}")
```

## Exercises

**Exercise 1:** Write a function called `reverse_words` that takes a string as input and returns a new string with the words reversed but the order of the words maintained. For example, "Hello World" should become "olleH dlroW".

**Exercise 2:** Create a function that checks if a string is a palindrome (reads the same backward as forward), ignoring case, spaces, and punctuation. For example, "A man, a plan, a canal: Panama" is a palindrome.

**Exercise 3:** Write a function that extracts all email addresses from a given text. Use string methods (or regular expressions for an extra challenge) to identify and extract email patterns.

**Exercise 4:** Implement a function called `word_censorship` that takes two parameters: a text string and a list of words to censor. Replace each occurrence of a censored word with asterisks of the same length. The censorship should be case-insensitive.

**Hint for Exercise 1:**
```python
def reverse_words(text):
    words = text.split()
    reversed_words = [word[::-1] for word in words]
    return ' '.join(reversed_words)
```

In the next section, we'll explore lists in Python, which are versatile and widely used data structures for storing collections of items.