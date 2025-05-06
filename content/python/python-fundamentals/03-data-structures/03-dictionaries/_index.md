---
title: 'Dictionaries'
linkTitle: 'Dictionaries'
weight: 14
---


Dictionaries are one of Python's most powerful data structures. They store data as key-value pairs, allowing you to quickly retrieve, add, modify, and delete values using their associated keys.

## Creating Dictionaries

There are several ways to create a dictionary in Python:

```python
# Empty dictionary
empty_dict = {}
also_empty = dict()

# Dictionary with initial values
person = {
    "name": "John",
    "age": 30,
    "city": "New York"
}

# Using the dict() constructor
person = dict(name="John", age=30, city="New York")

# Creating a dictionary from a list of tuples
items = [("name", "John"), ("age", 30), ("city", "New York")]
person = dict(items)
```

## Dictionary Keys and Values

In Python dictionaries:
- Keys must be immutable (strings, numbers, tuples, etc.)
- Values can be any data type (strings, numbers, lists, other dictionaries, etc.)
- Each key must be unique within a dictionary

```python
# Valid keys
valid_dict = {
    "string_key": "value1",
    42: "value2",
    (1, 2): "value3",
    True: "value4"
}

# Invalid key (will raise TypeError)
try:
    invalid_dict = {
        ["list", "key"]: "value"  # Lists are mutable, so they can't be keys
    }
except TypeError as e:
    print(f"Error: {e}")
```

**Important:**
While tuple keys are allowed because tuples are immutable, be cautious if the tuple contains mutable objects like lists. The tuple itself must be immutable in all of its contents.

## Accessing Dictionary Values

You can access values in a dictionary using their keys:

```python
person = {
    "name": "John",
    "age": 30,
    "city": "New York"
}

# Using square bracket notation
print(person["name"])  # Output: John

# Using the get() method
print(person.get("age"))  # Output: 30

# The get() method allows you to specify a default value
print(person.get("email", "Not available"))  # Output: Not available
```

**Note:**
If you try to access a key that doesn't exist using square brackets (`person["email"]`), Python will raise a `KeyError`. The `get()` method is safer as it returns `None` (or a specified default value) instead of raising an error.

## Modifying Dictionaries

Dictionaries are mutable, meaning you can change their content without creating a new dictionary:

```python
person = {
    "name": "John",
    "age": 30,
    "city": "New York"
}

# Adding a new key-value pair
person["email"] = "john@example.com"

# Modifying an existing value
person["age"] = 31

# Updating multiple key-value pairs at once
person.update({
    "age": 32,
    "job": "Engineer",
    "country": "USA"
})

print(person)
# Output: {'name': 'John', 'age': 32, 'city': 'New York', 'email': 'john@example.com', 'job': 'Engineer', 'country': 'USA'}
```

## Removing Items from Dictionaries

There are several ways to remove items from a dictionary:

```python
person = {
    "name": "John",
    "age": 30,
    "city": "New York",
    "email": "john@example.com"
}

# Remove a specific item and return its value
email = person.pop("email")
print(f"Removed email: {email}")

# Remove and return the last inserted item (Python 3.7+ guarantees insertion order)
last_item = person.popitem()
print(f"Removed last item: {last_item}")

# Remove a specific item without returning it
del person["age"]

# Clear all items
person.clear()
print(person)  # Output: {}
```

## Dictionary Methods

Python dictionaries come with many useful methods:

### Keys, Values, and Items

```python
person = {
    "name": "John",
    "age": 30,
    "city": "New York"
}

# Get all keys
keys = person.keys()
print(keys)  # Output: dict_keys(['name', 'age', 'city'])

# Get all values
values = person.values()
print(values)  # Output: dict_values(['John', 30, 'New York'])

# Get all key-value pairs as tuples
items = person.items()
print(items)  # Output: dict_items([('name', 'John'), ('age', 30), ('city', 'New York')])
```

**Note:**
The objects returned by `keys()`, `values()`, and `items()` are view objects that provide a dynamic view of the dictionary's entries. If the dictionary changes, these views reflect those changes.

### Copying Dictionaries

```python
person = {
    "name": "John",
    "age": 30,
    "city": "New York"
}

# Shallow copy
person_copy = person.copy()
person_copy["name"] = "Jane"  # This won't affect the original

# Alternative shallow copy
person_copy2 = dict(person)

print(person)       # Original unchanged
print(person_copy)  # Copy with modified name
```

**Important:**
A shallow copy means that nested objects (like lists or dictionaries inside your dictionary) are referenced, not duplicated. To create a deep copy that also duplicates nested objects, use the `copy` module:

```python
import copy

nested_dict = {
    "name": "John",
    "contact": {
        "email": "john@example.com",
        "phone": "555-1234"
    }
}

# Deep copy
deep_copy = copy.deepcopy(nested_dict)
deep_copy["contact"]["email"] = "john.doe@example.com"

print(nested_dict["contact"]["email"])  # Still "john@example.com"
print(deep_copy["contact"]["email"])    # "john.doe@example.com"
```

### Checking if a Key Exists

```python
person = {
    "name": "John",
    "age": 30,
    "city": "New York"
}

# Using the in operator
if "name" in person:
    print("Name exists in the dictionary")

if "email" not in person:
    print("Email does not exist in the dictionary")
```

### Setting Default Values

```python
person = {
    "name": "John",
    "age": 30
}

# Get a value, or set a default if it doesn't exist
email = person.setdefault("email", "default@example.com")
print(email)  # Output: default@example.com

print(person)  # Output: {'name': 'John', 'age': 30, 'email': 'default@example.com'}

# If the key already exists, setdefault doesn't change it
name = person.setdefault("name", "Jane")
print(name)  # Output: John (not changed to Jane)
```

### Dictionary Comprehensions

Similar to list comprehensions, Python offers dictionary comprehensions for creating dictionaries in a concise way:

```python
# Create a dictionary of squares
squares = {x: x**2 for x in range(1, 6)}
print(squares)  # Output: {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# Dictionary comprehension with condition
even_squares = {x: x**2 for x in range(1, 11) if x % 2 == 0}
print(even_squares)  # Output: {2: 4, 4: 16, 6: 36, 8: 64, 10: 100}

# Converting between dictionaries
prices = {"apple": 0.5, "banana": 0.25, "orange": 0.75}
double_prices = {item: price * 2 for item, price in prices.items()}
print(double_prices)  # Output: {'apple': 1.0, 'banana': 0.5, 'orange': 1.5}
```

## Nested Dictionaries

Dictionaries can contain other dictionaries as values, creating a nested structure:

```python
# Student record with nested dictionaries
student = {
    "name": "Alice",
    "grades": {
        "math": 90,
        "science": 85,
        "history": 92
    },
    "contact": {
        "email": "alice@example.com",
        "phone": "555-9876",
        "address": {
            "street": "123 Main St",
            "city": "Boston",
            "state": "MA",
            "zip": "02101"
        }
    }
}

# Accessing nested dictionary values
math_grade = student["grades"]["math"]
print(f"Math grade: {math_grade}")  # Output: Math grade: 90

state = student["contact"]["address"]["state"]
print(f"State: {state}")  # Output: State: MA

# Safer access with get()
email = student.get("contact", {}).get("email", "No email found")
country = student.get("contact", {}).get("address", {}).get("country", "USA")
print(f"Email: {email}, Country: {country}")  # Output: Email: alice@example.com, Country: USA
```

## Dictionary Iteration Patterns

There are several common patterns for iterating through dictionaries:

```python
person = {
    "name": "John",
    "age": 30,
    "city": "New York",
    "email": "john@example.com"
}

# Iterating through keys (default)
for key in person:
    print(f"Key: {key}")

# Explicitly iterating through keys
for key in person.keys():
    print(f"Key: {key}")

# Iterating through values
for value in person.values():
    print(f"Value: {value}")

# Iterating through key-value pairs
for key, value in person.items():
    print(f"{key}: {value}")

# Sorting a dictionary by keys during iteration
for key in sorted(person.keys()):
    print(f"{key}: {person[key]}")

# Sorting a dictionary by values during iteration
for key, value in sorted(person.items(), key=lambda item: item[1]):
    print(f"{key}: {value}")
```

## Merging Dictionaries

In Python 3.5+, you can merge dictionaries using the unpacking operator (`**`):

```python
# Python 3.5+
personal_info = {
    "name": "John",
    "age": 30
}

contact_info = {
    "email": "john@example.com",
    "phone": "555-1234"
}

# Merge dictionaries
person = {**personal_info, **contact_info}
print(person)
# Output: {'name': 'John', 'age': 30, 'email': 'john@example.com', 'phone': '555-1234'}
```

In Python 3.9+, you can use the merge operator (`|`):

```python
# Python 3.9+
personal_info = {
    "name": "John",
    "age": 30
}

contact_info = {
    "email": "john@example.com",
    "phone": "555-1234"
}

# Merge dictionaries
person = personal_info | contact_info
print(person)
# Output: {'name': 'John', 'age': 30, 'email': 'john@example.com', 'phone': '555-1234'}

# In-place merge
personal_info |= contact_info  # Updates personal_info
print(personal_info)
# Output: {'name': 'John', 'age': 30, 'email': 'john@example.com', 'phone': '555-1234'}
```

For older Python versions, you can use the `update()` method:

```python
# Compatible with all Python versions
personal_info = {
    "name": "John",
    "age": 30
}

contact_info = {
    "email": "john@example.com",
    "phone": "555-1234"
}

# Merge dictionaries
person = personal_info.copy()  # Create a copy to avoid modifying personal_info
person.update(contact_info)
print(person)
# Output: {'name': 'John', 'age': 30, 'email': 'john@example.com', 'phone': '555-1234'}
```

**Note:**
If there are duplicate keys, the value from the second dictionary (or the rightmost in case of multiple merges) will overwrite the value from the first.

## Practical Applications of Dictionaries

### Example 1: Counting Word Frequencies

```python
def count_word_frequencies(text):
    """Count the frequency of each word in a text."""
    # Clean and split the text
    words = text.lower().split()
    
    # Clean punctuation from words
    words = [word.strip('.,!?:;()[]{}""\'') for word in words]
    
    # Count frequencies
    word_counts = {}
    for word in words:
        if word:  # Skip empty strings
            if word in word_counts:
                word_counts[word] += 1
            else:
                word_counts[word] = 1
    
    return word_counts

# Example text
text = """
Python is a powerful programming language. Python is easy to learn,
and its syntax allows programmers to express concepts in fewer lines
of code than would be possible in languages such as C++ or Java.
Python supports multiple programming paradigms.
"""

# Count word frequencies
word_frequencies = count_word_frequencies(text)

# Display results
print("Word Frequencies:")
for word, count in sorted(word_frequencies.items()):
    print(f"{word}: {count}")
```

### Example 2: Student Grade Management System

```python
def grade_management_system():
    """A simple grade management system using dictionaries."""
    students = {}
    
    while True:
        print("\nStudent Grade Management System")
        print("1. Add student")
        print("2. Add/update grade")
        print("3. Calculate average grade")
        print("4. List all students")
        print("5. Exit")
        
        choice = input("\nEnter your choice (1-5): ")
        
        if choice == "1":
            # Add student
            name = input("Enter student name: ")
            if name in students:
                print(f"Student '{name}' already exists!")
            else:
                students[name] = {}
                print(f"Student '{name}' added successfully.")
        
        elif choice == "2":
            # Add/update grade
            name = input("Enter student name: ")
            if name not in students:
                print(f"Student '{name}' not found!")
                continue
                
            subject = input("Enter subject name: ")
            try:
                grade = float(input("Enter grade (0-100): "))
                if 0 <= grade <= 100:
                    students[name][subject] = grade
                    print(f"Grade for {name} in {subject} updated successfully.")
                else:
                    print("Grade must be between 0 and 100.")
            except ValueError:
                print("Invalid input. Grade must be a number.")
        
        elif choice == "3":
            # Calculate average grade
            name = input("Enter student name: ")
            if name not in students:
                print(f"Student '{name}' not found!")
                continue
                
            if not students[name]:
                print(f"No grades found for {name}.")
                continue
                
            average = sum(students[name].values()) / len(students[name])
            print(f"Average grade for {name}: {average:.2f}")
        
        elif choice == "4":
            # List all students
            if not students:
                print("No students in the system.")
                continue
                
            print("\nStudent List:")
            for name, grades in students.items():
                if grades:
                    average = sum(grades.values()) / len(grades)
                    subjects = ", ".join(grades.keys())
                    print(f"{name}: Average = {average:.2f}, Subjects = {subjects}")
                else:
                    print(f"{name}: No grades yet")
        
        elif choice == "5":
            # Exit
            print("Exiting the system. Goodbye!")
            break
        
        else:
            print("Invalid choice. Please enter a number between 1 and 5.")

# Run the grade management system
if __name__ == "__main__":
    grade_management_system()
```

### Example 3: Inventory Management

```python
def inventory_management():
    """A simple inventory management system using dictionaries."""
    inventory = {}
    
    # Initialize with some items
    inventory = {
        "apple": {"price": 0.5, "quantity": 100},
        "banana": {"price": 0.25, "quantity": 150},
        "orange": {"price": 0.75, "quantity": 80}
    }
    
    while True:
        print("\nInventory Management System")
        print("1. Add new item")
        print("2. Update item price")
        print("3. Update item quantity")
        print("4. View inventory")
        print("5. Calculate inventory value")
        print("6. Exit")
        
        choice = input("\nEnter your choice (1-6): ")
        
        if choice == "1":
            # Add new item
            item_name = input("Enter item name: ").lower()
            if item_name in inventory:
                print(f"Item '{item_name}' already exists!")
                continue
                
            try:
                price = float(input("Enter item price: $"))
                quantity = int(input("Enter item quantity: "))
                
                if price < 0 or quantity < 0:
                    print("Price and quantity must be non-negative.")
                    continue
                    
                inventory[item_name] = {"price": price, "quantity": quantity}
                print(f"Item '{item_name}' added successfully.")
            except ValueError:
                print("Invalid input. Price must be a number and quantity must be an integer.")
        
        elif choice == "2":
            # Update item price
            item_name = input("Enter item name: ").lower()
            if item_name not in inventory:
                print(f"Item '{item_name}' not found!")
                continue
                
            try:
                price = float(input("Enter new price: $"))
                if price < 0:
                    print("Price must be non-negative.")
                    continue
                    
                inventory[item_name]["price"] = price
                print(f"Price for '{item_name}' updated successfully.")
            except ValueError:
                print("Invalid input. Price must be a number.")
        
        elif choice == "3":
            # Update item quantity
            item_name = input("Enter item name: ").lower()
            if item_name not in inventory:
                print(f"Item '{item_name}' not found!")
                continue
                
            try:
                quantity = int(input("Enter new quantity: "))
                if quantity < 0:
                    print("Quantity must be non-negative.")
                    continue
                    
                inventory[item_name]["quantity"] = quantity
                print(f"Quantity for '{item_name}' updated successfully.")
            except ValueError:
                print("Invalid input. Quantity must be an integer.")
        
        elif choice == "4":
            # View inventory
            if not inventory:
                print("Inventory is empty.")
                continue
                
            print("\nCurrent Inventory:")
            print(f"{'Item':<10} {'Price':<10} {'Quantity':<10} {'Value':<10}")
            print("-" * 40)
            
            for item, details in sorted(inventory.items()):
                price = details["price"]
                quantity = details["quantity"]
                value = price * quantity
                print(f"{item:<10} ${price:<9.2f} {quantity:<10} ${value:<9.2f}")
        
        elif choice == "5":
            # Calculate inventory value
            if not inventory:
                print("Inventory is empty.")
                continue
                
            total_value = sum(
                details["price"] * details["quantity"]
                for details in inventory.values()
            )
            
            print(f"\nTotal Inventory Value: ${total_value:.2f}")
        
        elif choice == "6":
            # Exit
            print("Exiting Inventory Management System. Goodbye!")
            break
        
        else:
            print("Invalid choice. Please enter a number between 1 and 6.")

# Run the inventory management system
if __name__ == "__main__":
    inventory_management()
```

### Common Dictionary Operations and Their Time Complexity

Understanding the time complexity of dictionary operations helps you make efficient choices:

| Operation | Description | Time Complexity |
|-----------|-------------|----------------|
| `d[key]` | Access by key | O(1) average |
| `d[key] = value` | Assignment by key | O(1) average |
| `key in d` | Key membership test | O(1) average |
| `d.get(key)` | Access by key with default | O(1) average |
| `d.items()` | View all items | O(1) for the view, O(n) to iterate |
| `d.keys()` | View all keys | O(1) for the view, O(n) to iterate |
| `d.values()` | View all values | O(1) for the view, O(n) to iterate |
| `len(d)` | Count entries | O(1) |
| `d.pop(key)` | Remove and return value | O(1) average |
| `d.update(d2)` | Add items from another dict | O(len(d2)) |

**Note:**
The "average" designation for O(1) operations reflects that dictionary lookups have constant time complexity on average, but in worst-case scenarios (rare with modern hash implementations), they could degrade to O(n).

## Dictionary Best Practices

### 1. Use `get()` for Safe Key Access

```python
# Using square brackets can raise KeyError
user = {"name": "John"}
try:
    email = user["email"]  # KeyError if key doesn't exist
except KeyError:
    email = "No email found"

# Better approach with get()
email = user.get("email", "No email found")
```

### 2. Use Dictionary Comprehensions for Simple Transformations

```python
# Traditional approach
prices = {"apple": 0.5, "banana": 0.25, "orange": 0.75}
sale_prices = {}
for item, price in prices.items():
    sale_prices[item] = price * 0.8

# Cleaner with dict comprehension
sale_prices = {item: price * 0.8 for item, price in prices.items()}
```

### 3. Use `defaultdict` for Automatic Default Values

```python
from collections import defaultdict

# Regular dictionary requires checking if key exists
word_counts = {}
for word in words:
    if word not in word_counts:
        word_counts[word] = 0
    word_counts[word] += 1

# With defaultdict
word_counts = defaultdict(int)  # Default value is 0 for int
for word in words:
    word_counts[word] += 1
```

### 4. Use `collections.Counter` for Counting

```python
from collections import Counter

# Manual counting
word_counts = {}
for word in words:
    if word in word_counts:
        word_counts[word] += 1
    else:
        word_counts[word] = 1

# Using Counter
word_counts = Counter(words)

# Counter has additional methods
most_common = word_counts.most_common(3)  # Get 3 most common words
```

### 5. Create Immutable Dictionary with `types.MappingProxyType`

```python
from types import MappingProxyType

original = {"name": "John", "age": 30}

# Create a read-only view
read_only = MappingProxyType(original)

# This fails with TypeError
try:
    read_only["age"] = 31
except TypeError as e:
    print(f"Error: {e}")

# But the original dictionary can still be modified
original["age"] = 31
print(read_only["age"])  # Reflects changes to original
```

### 6. Use `OrderedDict` When Order Matters (pre-Python 3.7)

```python
from collections import OrderedDict

# Regular dictionaries in Python 3.7+ preserve insertion order
regular_dict = {}
regular_dict["first"] = 1
regular_dict["second"] = 2
regular_dict["third"] = 3

# OrderedDict provides additional functionality
ordered = OrderedDict()
ordered["first"] = 1
ordered["second"] = 2
ordered["third"] = 3

# Move an item to the end
ordered.move_to_end("first")
print(list(ordered.items()))
# Output: [('second', 2), ('third', 3), ('first', 1)]

# Get the first/last item
first_key = next(iter(ordered))
last_key = next(reversed(ordered))
```

## Exercises

**Exercise 1:** Create a program that reads a text file and counts the frequency of each word. Ignore case and punctuation. Display the 10 most common words and their counts.

**Exercise 2:** Write a function that takes a list of dictionaries (each representing a person with 'name' and 'age' keys) and returns a new dictionary where keys are age groups ('0-9', '10-19', etc.) and values are lists of names of people in that age group.

**Exercise 3:** Implement a simple contact management system using dictionaries. The system should allow users to add, edit, delete, and search for contacts. Each contact should store name, phone, email, and address information.

**Exercise 4:** Create a nested dictionary that represents a small library. The main dictionary keys should be book categories. Each category should contain books as dictionaries with title, author, publication year, and availability status. Implement functions to add books, check out books, return books, and search for books by different criteria.

**Hint for Exercise 1:** Use a combination of string methods like `lower()`, `split()`, and `strip()` to process the text. Consider using the `Counter` class from the `collections` module.

```python
# Exercise 1 solution outline
from collections import Counter

def count_words_in_file(filename):
    with open(filename, 'r') as file:
        text = file.read().lower()
        
    # Remove punctuation and split into words
    import string
    for char in string.punctuation:
        text = text.replace(char, ' ')
    
    words = text.split()
    word_counts = Counter(words)
    
    # Get the 10 most common words
    most_common = word_counts.most_common(10)
    
    return most_common

# Example usage
result = count_words_in_file('sample.txt')
for word, count in result:
    print(f"{word}: {count}")
```

In the next section, we'll explore another important Python data structure: Sets.