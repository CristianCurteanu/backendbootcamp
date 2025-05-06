---
title: 'Input and Output Statements'
linkTitle: 'Input and Output Statements'
weight: 6
---

## Input and Output Operations

Input and output operations are fundamental to any programming language. They allow your program to interact with users, files, and other systems.

### Basic Output with `print()`

The `print()` function displays text and variables to the console:

```python
# Simple print statement
print("Hello, World!")

# Printing multiple items
print("The answer is", 42)

# Printing with variables
name = "Alice"
age = 30
print("Name:", name, "Age:", age)
```

The `print()` function has several useful parameters:

| Parameter | Description | Example |
|-----------|-------------|---------|
| `sep` | Separator between items (default is space) | `print("Hello", "World", sep="-")` |
| `end` | String at the end (default is newline) | `print("Hello", end="! ")` |
| `file` | File-like object to write to | `print("Log entry", file=log_file)` |
| `flush` | Whether to flush the stream | `print("Progress", flush=True)` |

```python
# Using print parameters
print("Apple", "Banana", "Cherry", sep=" | ")  # Apple | Banana | Cherry

# Preventing new line with end parameter
print("Hello", end=" ")
print("World!")  # Hello World!

# Printing a numbered list
for i in range(1, 4):
    print(i, end=". ")
    print(f"Item {i}")
# Output:
# 1. Item 1
# 2. Item 2
# 3. Item 3
```

### String Formatting in Output

Python offers multiple ways to format strings for output:

#### 1. f-strings (Python 3.6+)

```python
name = "Alice"
age = 30
print(f"Name: {name}, Age: {age}")  # Name: Alice, Age: 30

# Expressions in f-strings
print(f"Age in 5 years: {age + 5}")  # Age in 5 years: 35

# Formatting specifications
pi = 3.14159
print(f"Pi to 2 decimal places: {pi:.2f}")  # Pi to 2 decimal places: 3.14
```

#### 2. `str.format()` method

```python
name = "Bob"
age = 25
print("Name: {}, Age: {}".format(name, age))  # Name: Bob, Age: 25

# Positional references
print("Age: {1}, Name: {0}".format(name, age))  # Age: 25, Name: Bob

# Named references
print("Name: {n}, Age: {a}".format(n=name, a=age))  # Name: Bob, Age: 25
```

#### 3. % operator (older style)

```python
name = "Charlie"
age = 35
print("Name: %s, Age: %d" % (name, age))  # Name: Charlie, Age: 35
```

**Important:**
f-strings (introduced in Python 3.6) are the recommended approach for string formatting due to their readability and performance. They allow embedding expressions directly in string literals.

### Basic Input with `input()`

The `input()` function reads a line from the console (as a string):

```python
# Simple input
name = input("Enter your name: ")
print(f"Hello, {name}!")

# Note: input() always returns a string
age_str = input("Enter your age: ")
age = int(age_str)  # Convert to integer
print(f"In 5 years, you will be {age + 5} years old.")

# Converting directly
height = float(input("Enter your height in meters: "))
print(f"Your height in centimeters: {height * 100}")
```

**Note:**
Always validate user input before conversion to avoid errors. For example, if a user enters "twenty" when you expect a number, `int("twenty")` will raise a `ValueError`.

```python
# Safe input conversion
try:
    age = int(input("Enter your age: "))
    print(f"In 5 years, you will be {age + 5} years old.")
except ValueError:
    print("Invalid input. Please enter a number.")
```

### Formatting Console Output

You can enhance console output with various formatting techniques:

```python
# Creating tables
print("Name\tAge\tCity")
print("----\t---\t----")
print("Alice\t30\tNew York")
print("Bob\t25\tChicago")
print("Charlie\t35\tSan Francisco")

# Using f-strings for table formatting
data = [
    {"name": "Alice", "age": 30, "city": "New York"},
    {"name": "Bob", "age": 25, "city": "Chicago"},
    {"name": "Charlie", "age": 35, "city": "San Francisco"}
]

print(f"{'Name':<10}{'Age':<8}{'City':<15}")
print(f"{'-'*10:<10}{'-'*8:<8}{'-'*15:<15}")
for person in data:
    print(f"{person['name']:<10}{person['age']:<8}{person['city']:<15}")
```

Output:
```
Name      Age     City           
--------------    ---------------
Alice     30      New York       
Bob       25      Chicago        
Charlie   35      San Francisco  
```

In the format specifiers (`{value:<width}`):
- `<` left-aligns text (default)
- `>` right-aligns text
- `^` centers text
- The number represents the width

### Reading and Writing Files

File I/O is a common operation in Python programs:

#### Opening and Closing Files

```python
# Opening a file for reading ('r' is default mode)
file = open("example.txt", "r")
content = file.read()
file.close()  # Important to close files

# Better approach with context manager (automatically closes file)
with open("example.txt", "r") as file:
    content = file.read()
    # File is automatically closed when the block ends
```

#### File Modes

| Mode | Description |
|------|-------------|
| `'r'` | Read (default) |
| `'w'` | Write (create or truncate) |
| `'a'` | Append (create if doesn't exist) |
| `'x'` | Exclusive creation (fail if file exists) |
| `'b'` | Binary mode (add to other modes) |
| `'t'` | Text mode (default) |
| `'+'` | Update (read and write) |

#### Reading Files

```python
# Reading the entire file
with open("example.txt", "r") as file:
    content = file.read()
    print(content)

# Reading line by line
with open("example.txt", "r") as file:
    for line in file:
        print(line.strip())  # strip() removes trailing newline

# Reading all lines into a list
with open("example.txt", "r") as file:
    lines = file.readlines()
    for line in lines:
        print(line.strip())
```

#### Writing Files

```python
# Writing to a file (creates or overwrites)
with open("output.txt", "w") as file:
    file.write("Hello, World!\n")
    file.write("This is a new line.")

# Appending to a file
with open("output.txt", "a") as file:
    file.write("\nThis line is appended.")

# Writing multiple lines
lines = ["Line 1", "Line 2", "Line 3"]
with open("output.txt", "w") as file:
    file.writelines(line + "\n" for line in lines)
```

### Working with CSV Files

CSV (Comma-Separated Values) files are commonly used for tabular data:

```python
import csv

# Reading a CSV file
with open("data.csv", "r", newline="") as file:
    reader = csv.reader(file)
    for row in reader:
        print(row)  # row is a list of values

# Reading a CSV with headers
with open("data.csv", "r", newline="") as file:
    reader = csv.DictReader(file)  # Assumes first row has headers
    for row in reader:
        print(row)  # row is a dictionary

# Writing a CSV file
data = [
    ["Name", "Age", "City"],
    ["Alice", 30, "New York"],
    ["Bob", 25, "Chicago"],
    ["Charlie", 35, "San Francisco"]
]

with open("new_data.csv", "w", newline="") as file:
    writer = csv.writer(file)
    writer.writerows(data)

# Writing a CSV with dictionaries
data = [
    {"Name": "Alice", "Age": 30, "City": "New York"},
    {"Name": "Bob", "Age": 25, "City": "Chicago"},
    {"Name": "Charlie", "Age": 35, "City": "San Francisco"}
]

with open("new_data.csv", "w", newline="") as file:
    fieldnames = ["Name", "Age", "City"]
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(data)
```

### Working with JSON Files

JSON (JavaScript Object Notation) is a popular data format:

```python
import json

# Reading JSON from a file
with open("data.json", "r") as file:
    data = json.load(file)
    print(data)  # data is a Python dictionary or list

# Writing Python data to a JSON file
data = {
    "people": [
        {"name": "Alice", "age": 30, "city": "New York"},
        {"name": "Bob", "age": 25, "city": "Chicago"},
        {"name": "Charlie", "age": 35, "city": "San Francisco"}
    ]
}

with open("new_data.json", "w") as file:
    json.dump(data, file, indent=4)  # indent for pretty formatting
```

## Practical Example: Contact Manager

Let's create a simple contact manager that demonstrates various input and output operations:

```python
import json
import os

def contact_manager():
    """
    A simple contact manager that demonstrates input/output operations.
    """
    contacts_file = "contacts.json"
    contacts = []
    
    # Load existing contacts if the file exists
    if os.path.exists(contacts_file):
        try:
            with open(contacts_file, "r") as file:
                contacts = json.load(file)
            print(f"Loaded {len(contacts)} contacts from {contacts_file}")
        except json.JSONDecodeError:
            print(f"Error loading {contacts_file}. Starting with empty contacts.")
    
    while True:
        # Display menu
        print("\nContact Manager")
        print("===============")
        print("1. View all contacts")
        print("2. Add a contact")
        print("3. Search contacts")
        print("4. Save and exit")
        
        choice = input("\nEnter your choice (1-4): ")
        
        if choice == "1":
            # View all contacts
            if not contacts:
                print("No contacts found.")
            else:
                print("\n{:<20} {:<15} {:<30}".format("Name", "Phone", "Email"))
                print("-" * 65)
                for contact in contacts:
                    print("{:<20} {:<15} {:<30}".format(
                        contact.get("name", "N/A"),
                        contact.get("phone", "N/A"),
                        contact.get("email", "N/A")
                    ))
        
        elif choice == "2":
            # Add a contact
            name = input("Enter name: ")
            phone = input("Enter phone number: ")
            email = input("Enter email: ")
            
            contact = {"name": name, "phone": phone, "email": email}
            contacts.append(contact)
            print(f"Contact {name} added successfully.")
        
        elif choice == "3":
            # Search contacts
            search_term = input("Enter search term: ").lower()
            found = False
            
            print("\n{:<20} {:<15} {:<30}".format("Name", "Phone", "Email"))
            print("-" * 65)
            
            for contact in contacts:
                name = contact.get("name", "").lower()
                phone = contact.get("phone", "").lower()
                email = contact.get("email", "").lower()
                
                if (search_term in name or 
                    search_term in phone or 
                    search_term in email):
                    print("{:<20} {:<15} {:<30}".format(
                        contact.get("name", "N/A"),
                        contact.get("phone", "N/A"),
                        contact.get("email", "N/A")
                    ))
                    found = True
            
            if not found:
                print("No matching contacts found.")
        
        elif choice == "4":
            # Save and exit
            with open(contacts_file, "w") as file:
                json.dump(contacts, file, indent=4)
            print(f"Contacts saved to {contacts_file}")
            break
        
        else:
            print("Invalid choice. Please enter a number between 1 and 4.")

# Run the contact manager
if __name__ == "__main__":
    contact_manager()
```

**Expected Output:**
```
Loaded 2 contacts from contacts.json

Contact Manager
===============
1. View all contacts
2. Add a contact
3. Search contacts
4. Save and exit

Enter your choice (1-4): 1

Name                 Phone           Email                         
-----------------------------------------------------------------
John Doe            555-123-4567    john.doe@example.com         
Jane Smith          555-987-6543    jane.smith@example.com       

Contact Manager
===============
1. View all contacts
2. Add a contact
3. Search contacts
4. Save and exit

Enter your choice (1-4): 2
Enter name: Alice Johnson
Enter phone number: 555-555-5555
Enter email: alice.j@example.com
Contact Alice Johnson added successfully.

Contact Manager
===============
1. View all contacts
2. Add a contact
3. Search contacts
4. Save and exit

Enter your choice (1-4): 4
Contacts saved to contacts.json
```

## Common I/O Issues and Best Practices

1. **Always use context managers** (`with` statement) when working with files to ensure they are properly closed, even if an exception occurs.

2. **Handle file exceptions** properly:
   ```python
   try:
       with open("file.txt", "r") as file:
           content = file.read()
   except FileNotFoundError:
       print("The file does not exist.")
   except PermissionError:
       print("You don't have permission to access this file.")
   except Exception as e:
       print(f"An error occurred: {e}")
   ```

3. **Validate user input** before processing:
   ```python
   while True:
       try:
           age = int(input("Enter your age: "))
           if age < 0 or age > 120:
               print("Please enter a valid age between 0 and 120.")
               continue
           break
       except ValueError:
           print("Please enter a valid number.")
   ```

4. **Use appropriate file modes** to avoid accidentally overwriting data.

5. **Consider character encoding** when working with text files:
   ```python
   with open("file.txt", "r", encoding="utf-8") as file:
       content = file.read()
   ```

## Exercises

**Exercise 1:** Write a program that asks the user for their name, age, and favorite color. Then display a formatted message that includes this information.

**Exercise 2:** Create a program that reads a text file, counts the number of lines, words, and characters, and displays the results.

**Exercise 3:** Build a simple note-taking application that allows the user to add notes, view all notes, and save them to a file. When the program starts, it should load any existing notes from the file.

**Hint for Exercise 1:** Use the `input()` function to get user information and f-strings to format the output message.

In the next section, we'll explore conditional statements in Python, learning how to make decisions in your programs based on different conditions.