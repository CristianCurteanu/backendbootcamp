---
title: 'Variables and Data Types'
linkTitle: 'Variables and Data Types'
weight: 3
---



Variables in Python are used to store data values. Unlike some other programming languages, Python has no command for declaring a variable. A variable is created the moment you first assign a value to it.

## Creating Variables

In Python, you create a variable by assigning a value to it using the equals sign (`=`):

```python
# Creating variables
name = "John"
age = 30
height = 5.9
is_student = True
```

Python variable names are case-sensitive and must follow these rules:
- Must start with a letter or underscore
- Can only contain alphanumeric characters and underscores (A-Z, a-z, 0-9, and _)
- Cannot be a Python keyword

```python
# Valid variable names
my_var = 10
_count = 20
total1 = 30

# Invalid variable names
1st_number = 40  # Cannot start with a digit
my-name = "John"  # Hyphens not allowed
if = 50  # Cannot use keywords
```

## Data Types in Python

Python has several built-in data types. The main categories are:

1. **Numeric Types**: integers, floating-point numbers, and complex numbers
2. **Sequence Types**: strings, lists, and tuples
3. **Mapping Type**: dictionaries
4. **Set Types**: sets and frozen sets
5. **Boolean Type**: True or False
6. **None Type**: represents the absence of a value

Let's explore each of these types in detail:

### 1. Numeric Types

**Integers** are whole numbers, positive or negative, without decimals:

```python
x = 10
y = -5
big_number = 1_000_000  # Underscores for readability in Python 3.6+
```

**Floating-point numbers** contain decimal points or use exponential notation:

```python
pi = 3.14159
e = 2.71828
large_num = 1.5e6  # 1.5 million (1.5 × 10^6)
small_num = 1.5e-6  # 0.0000015 (1.5 × 10^-6)
```

**Complex numbers** have a real and imaginary part, written with a "j" as the imaginary part:

```python
z = 2 + 3j
print(z.real)  # 2.0
print(z.imag)  # 3.0
```

### 2. Sequence Types

**Strings** are sequences of characters, enclosed in single or double quotes:

```python
name = "Alice"
message = 'Hello, World!'

# Multi-line strings use triple quotes
long_text = """This is a longer
text that spans
multiple lines"""
```

**Lists** are ordered, changeable collections that can contain different data types:

```python
fruits = ["apple", "banana", "cherry"]
mixed_list = [1, "hello", 3.14, True]

# Accessing list elements (indexing starts at 0)
print(fruits[0])  # "apple"
```

**Tuples** are ordered, unchangeable collections:

```python
coordinates = (10, 20)
rgb_color = (255, 0, 127)

# Accessing tuple elements
print(coordinates[0])  # 10
```

### 3. Mapping Type

**Dictionaries** are unordered collections of key-value pairs:

```python
person = {
    "name": "John",
    "age": 30,
    "city": "New York"
}

# Accessing dictionary values
print(person["name"])  # "John"
```

### 4. Set Types

**Sets** are unordered collections of unique elements:

```python
fruits = {"apple", "banana", "cherry"}
numbers = {1, 2, 3, 3, 4}  # Duplicate values are automatically removed

# Sets are useful for removing duplicates
list_with_duplicates = [1, 2, 2, 3, 4, 4, 5]
unique_numbers = set(list_with_duplicates)
print(unique_numbers)  # {1, 2, 3, 4, 5}
```

### 5. Boolean Type

Boolean values represent truth values, either `True` or `False`:

```python
is_active = True
is_complete = False

print(10 > 5)  # True
print(10 == 5)  # False
```

### 6. None Type

`None` represents the absence of a value or a null value:

```python
result = None
print(result)  # None
```

## Checking Data Types

You can check the type of any variable using the `type()` function:

```python
x = 10
y = "Hello"
z = 3.14

print(type(x))  # <class 'int'>
print(type(y))  # <class 'str'>
print(type(z))  # <class 'float'>
```

## Type Conversion

Python allows you to convert between different data types:

```python
# Converting between numeric types
x = 10
float_x = float(x)  # 10.0
complex_x = complex(x)  # 10+0j

# Converting to and from strings
age = 30
age_str = str(age)  # "30"
age_back = int(age_str)  # 30

# String to list
greeting = "Hello"
char_list = list(greeting)  # ['H', 'e', 'l', 'l', 'o']

# List to tuple
numbers = [1, 2, 3]
numbers_tuple = tuple(numbers)  # (1, 2, 3)
```

**Important:**
Converting between types can lead to data loss or errors. For example, converting a float to an integer truncates the decimal part, and trying to convert an invalid string to a number will raise an error.

```python
# Data loss example
pi = 3.14159
pi_int = int(pi)  # 3 (decimal part is lost)

# Error example
try:
    num = int("hello")  # This will raise a ValueError
except ValueError as e:
    print(f"Error: {e}")  # Error: invalid literal for int() with base 10: 'hello'
```

## Variables are References

In Python, variables are references to objects in memory. Understanding this concept is important:

```python
a = [1, 2, 3]  # 'a' references a list
b = a  # 'b' references the same list as 'a'

b.append(4)  # Modifies the list
print(a)  # [1, 2, 3, 4] - 'a' also reflects the change
```

To create a copy rather than a reference:

```python
a = [1, 2, 3]
b = a.copy()  # Creates a new list with the same elements

b.append(4)
print(a)  # [1, 2, 3] - 'a' is unchanged
print(b)  # [1, 2, 3, 4]
```

## Dynamic Typing

Python is dynamically typed, meaning you can reassign variables to different data types:

```python
x = 5       # x is an integer
x = "hello"  # Now x is a string
x = [1, 2, 3]  # Now x is a list
```

This flexibility can be powerful but requires care to avoid unexpected errors.

## Variables and Data Types in Practice

Let's see a complete example that demonstrates various data types and variable operations:

```python
# Student Record Management Example

# Numeric types
student_id = 12345
gpa = 3.75
complex_number = 1 + 2j  # Not typically used in this context

# String data
first_name = "Alice"
last_name = "Smith"
full_name = first_name + " " + last_name  # String concatenation

# Boolean data
is_enrolled = True
is_on_probation = False

# List - mutable sequence
courses = ["Math", "Physics", "Computer Science"]
courses.append("Chemistry")  # Adding a course

# Tuple - immutable sequence
semester_dates = ("January 15, 2023", "May 20, 2023")

# Dictionary - key-value pairs
student_info = {
    "id": student_id,
    "name": full_name,
    "gpa": gpa,
    "courses": courses,
    "enrolled": is_enrolled
}

# Set - unique elements
unique_student_ids = {12345, 67890, 54321}

# None - absence of value
graduation_date = None  # Not yet determined

# Type conversions
gpa_string = str(gpa)  # Convert to string for formatting
gpa_rounded = int(gpa)  # Convert to integer (loses decimal precision)

# Printing information
print(f"Student Record for {full_name} (ID: {student_id})")
print(f"GPA: {gpa}")
print(f"Courses: {', '.join(courses)}")
print(f"Enrollment status: {'Enrolled' if is_enrolled else 'Not enrolled'}")

# Accessing dictionary values
print(f"Information from dictionary: {student_info['name']} has a GPA of {student_info['gpa']}")

# Checking types
print(f"Type of student_id: {type(student_id)}")
print(f"Type of courses: {type(courses)}")
print(f"Type of student_info: {type(student_info)}")
```

**Expected Output**:
```
Student Record for Alice Smith (ID: 12345)
GPA: 3.75
Courses: Math, Physics, Computer Science, Chemistry
Enrollment status: Enrolled
Information from dictionary: Alice Smith has a GPA of 3.75
Type of student_id: <class 'int'>
Type of courses: <class 'list'>
Type of student_info: <class 'dict'>
```

## Common Pitfalls with Variables and Data Types

1. **Modifying mutable objects unintentionally**:
   ```python
   original = [1, 2, 3]
   copy = original  # This is a reference, not a copy
   copy.append(4)   # Modifies both copy and original
   ```

2. **String immutability**:
   ```python
   name = "John"
   name[0] = "B"  # Error: strings are immutable
   # Correct approach:
   name = "B" + name[1:]  # Creates a new string
   ```

3. **Integer division**:
   ```python
   result = 5 / 2    # 2.5 (float division)
   result = 5 // 2   # 2 (integer division)
   ```

4. **Comparing floating-point numbers**:
   ```python
   x = 0.1 + 0.2     # 0.30000000000000004 (not exactly 0.3)
   print(x == 0.3)   # False
   
   # Better approach:
   import math
   print(math.isclose(x, 0.3))  # True
   ```

**Note:**
Python's handling of variables is very different from languages like C, Java, or C#. In Python, variables are references to objects, not containers for values. This concept becomes particularly important when working with mutable objects like lists and dictionaries.

## Exercises

**Exercise 1:** Create variables for storing information about a book including title (string), publication year (integer), price (float), is_available (boolean), and authors (list of strings). Print all the information with appropriate labels.

**Exercise 2:** Create a dictionary representing a shopping cart with at least 3 items. Each item should have a name, price, and quantity. Calculate and print the total cost of the cart.

**Exercise 3:** Given the string "Python is a versatile programming language", write code to:
- Convert it to all uppercase
- Count how many times the letter 'a' appears
- Replace "Python" with "Java" and print the result
- Split it into a list of words

**Hint for Exercise 1:** Remember to use appropriate variable names and print using formatted strings (f-strings) for cleaner output.

In the next section, we'll explore operators and expressions in Python, building on your knowledge of variables and data types.