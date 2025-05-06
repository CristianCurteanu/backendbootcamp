---
title: 'Standard Library Overview'
linkTitle: 'Standard Library Overview'
weight: 23
---

Python's standard library is a collection of modules and packages that come bundled with Python, providing a rich set of tools and functionality right out of the box. This extensive library is one of Python's greatest strengths, making it a "batteries included" language that allows you to accomplish many common programming tasks without installing additional packages.

## What is the Standard Library?

The standard library consists of over 200 modules that provide solutions for file I/O, system interaction, internet protocols, data manipulation, mathematics, and much more. These modules are thoroughly tested, well-documented, and designed to work seamlessly across different platforms.

**Important:**
The standard library is always available in any Python installation, making your code more portable. When possible, it's often better to use the standard library before reaching for third-party packages.

## Accessing and Using Standard Library Modules

To use a module from the standard library, you need to import it:

```python
# Import an entire module
import math

# Now you can use functions from the math module
result = math.sqrt(16)
print(result)  # 4.0

# Import specific functions from a module
from random import randint

# Now you can use the imported function directly
random_number = randint(1, 10)
print(random_number)  # A random integer between 1 and 10
```

## Essential Standard Library Modules

Let's explore some of the most commonly used modules in the standard library, organized by category:

## 1. Working with Data Types and Structures

### `collections` - Specialized Container Data Types

The `collections` module provides alternatives to Python's built-in containers:

```python
from collections import Counter, defaultdict, namedtuple

# Counter - count occurrences of elements
words = ["apple", "banana", "apple", "orange", "banana", "apple"]
word_counts = Counter(words)
print(word_counts)  # Counter({'apple': 3, 'banana': 2, 'orange': 1})
print(word_counts.most_common(2))  # [('apple', 3), ('banana', 2)]

# defaultdict - dictionary with default values for missing keys
fruit_colors = defaultdict(list)
fruit_colors["apple"].append("red")  # No error even though "apple" doesn't exist yet
fruit_colors["apple"].append("green")
fruit_colors["banana"].append("yellow")
print(fruit_colors)  # defaultdict(<class 'list'>, {'apple': ['red', 'green'], 'banana': ['yellow']})

# namedtuple - tuple with named fields
Person = namedtuple("Person", ["name", "age", "city"])
john = Person("John Doe", 30, "New York")
print(john.name)  # John Doe
print(john.age)   # 30
print(john[0])    # John Doe (can still use index access)
```

### `datetime` - Date and Time Operations

The `datetime` module provides classes for manipulating dates and times:

```python
from datetime import datetime, date, timedelta

# Current date and time
now = datetime.now()
print(f"Current date and time: {now}")

# Creating date objects
birthday = date(1990, 5, 15)
print(f"Birthday: {birthday}")

# Date arithmetic
today = date.today()
days_alive = (today - birthday).days
print(f"Days alive: {days_alive}")

# Time deltas
one_week_from_now = now + timedelta(weeks=1)
print(f"One week from now: {one_week_from_now}")

# Formatting dates
formatted_date = now.strftime("%Y-%m-%d %H:%M:%S")
print(f"Formatted date: {formatted_date}")

# Parsing dates
date_string = "2023-05-15 14:30:00"
parsed_date = datetime.strptime(date_string, "%Y-%m-%d %H:%M:%S")
print(f"Parsed date: {parsed_date}")
```

## 2. Mathematics and Numeric Operations

### `math` - Mathematical Functions

The `math` module provides access to mathematical functions:

```python
import math

# Constants
print(f"Pi: {math.pi}")
print(f"Euler's number (e): {math.e}")

# Basic functions
print(f"Square root of 16: {math.sqrt(16)}")
print(f"5 raised to the power of 3: {math.pow(5, 3)}")
print(f"Absolute value of -7.5: {math.fabs(-7.5)}")

# Trigonometry (angles in radians)
print(f"Sine of 90 degrees: {math.sin(math.pi/2)}")
print(f"Cosine of 0 degrees: {math.cos(0)}")

# Logarithms
print(f"Natural logarithm of 10: {math.log(10)}")
print(f"Base-10 logarithm of 100: {math.log10(100)}")

# Rounding
print(f"Ceiling of 4.3: {math.ceil(4.3)}")
print(f"Floor of 4.8: {math.floor(4.8)}")
print(f"Truncated 4.8: {math.trunc(4.8)}")
```

### `random` - Random Number Generation

The `random` module provides functions for generating random numbers:

```python
import random

# Random float between 0 and 1
print(f"Random float: {random.random()}")

# Random float within a range
print(f"Random float between 5 and 10: {random.uniform(5, 10)}")

# Random integer within a range (inclusive)
print(f"Random integer between 1 and 10: {random.randint(1, 10)}")

# Random selection from a sequence
fruits = ["apple", "banana", "cherry", "date"]
print(f"Random fruit: {random.choice(fruits)}")

# Multiple random selections with replacement
print(f"5 random fruits (with replacement): {random.choices(fruits, k=5)}")

# Multiple random selections without replacement
print(f"3 random fruits (without replacement): {random.sample(fruits, k=3)}")

# Shuffle a list in place
random.shuffle(fruits)
print(f"Shuffled fruits: {fruits}")
```

**Note:**
The `random` module generates pseudo-random numbers that are not suitable for cryptographic purposes. For cryptographically secure random numbers, use the `secrets` module instead.

## 3. File and Data Handling

### `os` and `os.path` - Operating System Interface

The `os` module provides a way to use operating system dependent functionality:

```python
import os

# Current working directory
print(f"Current directory: {os.getcwd()}")

# List files and directories
print(f"Files in current directory: {os.listdir('.')}")

# Create a directory
os.makedirs("new_folder", exist_ok=True)

# File path manipulation
filepath = os.path.join("new_folder", "example.txt")
print(f"File path: {filepath}")

# Check if a file exists
print(f"Does path exist? {os.path.exists(filepath)}")

# Get file information
if os.path.exists("example.py"):
    size = os.path.getsize("example.py")
    modified_time = os.path.getmtime("example.py")
    print(f"File size: {size} bytes")
    print(f"Last modified: {modified_time}")

# Environment variables
home_dir = os.environ.get("HOME")  # On Windows, use "USERPROFILE"
print(f"Home directory: {home_dir}")
```

### `json` - JSON Data Encoding and Decoding

The `json` module provides functions for working with JSON data:

```python
import json

# Python dictionary
person = {
    "name": "John Doe",
    "age": 30,
    "city": "New York",
    "languages": ["Python", "JavaScript", "Java"],
    "is_employee": True,
    "height": 1.85
}

# Convert Python object to JSON string
json_string = json.dumps(person, indent=4)
print(f"JSON string:\n{json_string}")

# Convert JSON string back to Python object
decoded_person = json.loads(json_string)
print(f"Decoded name: {decoded_person['name']}")

# Writing JSON to a file
with open("person.json", "w") as file:
    json.dump(person, file, indent=4)

# Reading JSON from a file
with open("person.json", "r") as file:
    loaded_person = json.load(file)
    print(f"Loaded from file: {loaded_person['name']}")
```

### `csv` - CSV File Reading and Writing

The `csv` module provides functions for working with CSV files:

```python
import csv

# Writing CSV data
data = [
    ["Name", "Age", "City"],
    ["John Doe", 30, "New York"],
    ["Jane Smith", 25, "Los Angeles"],
    ["Bob Johnson", 35, "Chicago"]
]

with open("people.csv", "w", newline="") as file:
    writer = csv.writer(file)
    writer.writerows(data)

# Reading CSV data
with open("people.csv", "r") as file:
    reader = csv.reader(file)
    for row in reader:
        print(row)

# Reading CSV with dictionaries
with open("people.csv", "r") as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(f"{row['Name']} is {row['Age']} years old and lives in {row['City']}")
```

## 4. String Processing

### `re` - Regular Expressions

The `re` module provides support for regular expressions:

```python
import re

text = "Contact us at info@example.com or support@company.org"

# Find all email addresses
email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
emails = re.findall(email_pattern, text)
print(f"Emails found: {emails}")  # ['info@example.com', 'support@company.org']

# Search for a pattern
match = re.search(r'contact', text, re.IGNORECASE)
if match:
    print(f"Found 'contact' at position: {match.start()}")

# Replace text
new_text = re.sub(r'example\.com', 'python.org', text)
print(f"After replacement: {new_text}")

# Split text
parts = re.split(r'[@\.]', 'user@example.com')
print(f"Split parts: {parts}")  # ['user', 'example', 'com']
```

### `string` - Common String Operations

The `string` module provides various string constants and utilities:

```python
import string

# String constants
print(f"Lowercase letters: {string.ascii_lowercase}")
print(f"Uppercase letters: {string.ascii_uppercase}")
print(f"Digits: {string.digits}")
print(f"Hexadecimal digits: {string.hexdigits}")
print(f"Punctuation: {string.punctuation}")

# String formatting (older style)
template = string.Template("$name is $age years old")
result = template.substitute(name="Alice", age=30)
print(result)  # "Alice is 30 years old"
```

## 5. Internet and Network

### `urllib` - URL Handling

The `urllib` package provides modules for working with URLs:

```python
from urllib.request import urlopen
from urllib.parse import urlparse, urlencode

# Parse a URL
url = "https://www.example.com/path?query=value"
parsed_url = urlparse(url)
print(f"Scheme: {parsed_url.scheme}")  # https
print(f"Netloc: {parsed_url.netloc}")  # www.example.com
print(f"Path: {parsed_url.path}")      # /path
print(f"Query: {parsed_url.query}")    # query=value

# URL encoding
params = {"name": "John Doe", "age": 30}
encoded_params = urlencode(params)
print(f"Encoded params: {encoded_params}")  # name=John+Doe&age=30

# Fetch URL content
try:
    with urlopen("https://www.python.org") as response:
        html = response.read()
        print(f"Received {len(html)} bytes from python.org")
except Exception as e:
    print(f"Error fetching URL: {e}")
```

**Note:**
For more advanced HTTP requests, consider using the `requests` library, which is not part of the standard library but is widely used in the Python community.

## 6. System and Process Management

### `sys` - System-Specific Parameters and Functions

The `sys` module provides access to some variables used or maintained by the Python interpreter:

```python
import sys

# Python version
print(f"Python version: {sys.version}")
print(f"Version info: {sys.version_info}")

# Command line arguments
print(f"Command line arguments: {sys.argv}")

# Module search path
print(f"Module search paths:")
for path in sys.path:
    print(f"  - {path}")

# Standard input, output, and error
sys.stdout.write("This writes directly to standard output\n")
sys.stderr.write("This writes directly to standard error\n")

# Exit the program
# sys.exit(0)  # Exit with a success code
```

### `subprocess` - Subprocess Management

The `subprocess` module allows you to spawn new processes, connect to their input/output/error pipes, and obtain their return codes:

```python
import subprocess

# Run an external command and capture output
result = subprocess.run(["echo", "Hello from subprocess"], 
                         capture_output=True, text=True)
print(f"Command output: {result.stdout}")
print(f"Return code: {result.returncode}")

# Shell commands (use with caution due to security implications)
result = subprocess.run("dir" if sys.platform == "win32" else "ls", 
                         shell=True, capture_output=True, text=True)
print(f"Directory listing output:\n{result.stdout}")

# Run a command with timeout
try:
    result = subprocess.run(["python", "-c", "import time; time.sleep(3); print('Done')"], 
                            timeout=1, capture_output=True, text=True)
except subprocess.TimeoutExpired:
    print("Command timed out")
```

## 7. Data Compression and Archiving

### `zipfile` - Work with ZIP Archives

The `zipfile` module provides tools to create, read, write, append, and list a ZIP file:

```python
import zipfile
import os

# Create a ZIP file
with zipfile.ZipFile("example.zip", "w") as zip_file:
    # Add files to the ZIP
    if os.path.exists("people.csv"):
        zip_file.write("people.csv")
    if os.path.exists("person.json"):
        zip_file.write("person.json")
    
    # Add a file with data from a string
    zip_file.writestr("info.txt", "This is a file created directly in the ZIP.")

# Read a ZIP file
with zipfile.ZipFile("example.zip", "r") as zip_file:
    # List contents
    print("ZIP file contents:")
    for file_info in zip_file.infolist():
        print(f"  - {file_info.filename} ({file_info.file_size} bytes)")
    
    # Extract all files
    zip_file.extractall("extracted_files")
    
    # Read a file from the ZIP without extracting
    if "info.txt" in zip_file.namelist():
        content = zip_file.read("info.txt").decode("utf-8")
        print(f"Content of info.txt: {content}")
```

## 8. Concurrency and Parallelism

### `threading` - Thread-based Parallelism

The `threading` module provides thread-based parallelism:

```python
import threading
import time

def task(name, delay):
    """A simple function to run in a thread."""
    print(f"Thread {name} starting")
    time.sleep(delay)
    print(f"Thread {name} finished after {delay} seconds")

# Create and start threads
threads = []
for i in range(3):
    thread = threading.Thread(target=task, args=(f"T{i}", i+1))
    threads.append(thread)
    thread.start()

# Wait for all threads to finish
for thread in threads:
    thread.join()

print("All threads finished")
```

### `concurrent.futures` - High-level Interface for Async Execution

The `concurrent.futures` module provides a high-level interface for asynchronously executing callables:

```python
import concurrent.futures
import time

def cpu_bound_task(n):
    """A CPU-bound task that computes the sum of squares."""
    return sum(i*i for i in range(n))

def io_bound_task(n):
    """An I/O-bound task that simulates waiting for an external resource."""
    time.sleep(n)
    return f"Task {n} completed after {n} seconds"

# Process pool for CPU-bound tasks
print("Running CPU-bound tasks with ProcessPoolExecutor...")
with concurrent.futures.ProcessPoolExecutor() as executor:
    results = executor.map(cpu_bound_task, [1000000, 2000000, 3000000])
    for result in results:
        print(f"Result: {result}")

# Thread pool for I/O-bound tasks
print("\nRunning I/O-bound tasks with ThreadPoolExecutor...")
with concurrent.futures.ThreadPoolExecutor() as executor:
    future_to_task = {executor.submit(io_bound_task, i): i for i in range(1, 4)}
    for future in concurrent.futures.as_completed(future_to_task):
        task_id = future_to_task[future]
        try:
            result = future.result()
            print(f"Task {task_id} result: {result}")
        except Exception as e:
            print(f"Task {task_id} generated an exception: {e}")
```

## 9. Data Persistence and Databases

### `sqlite3` - SQLite Database Interface

The `sqlite3` module provides a SQL interface to SQLite databases:

```python
import sqlite3

# Connect to a database (creates it if it doesn't exist)
conn = sqlite3.connect("example.db")
cursor = conn.cursor()

# Create a table
cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    age INTEGER,
    email TEXT UNIQUE
)
""")

# Insert data
users = [
    ("John Doe", 30, "john@example.com"),
    ("Jane Smith", 25, "jane@example.com"),
    ("Bob Johnson", 35, "bob@example.com")
]

cursor.executemany("INSERT OR REPLACE INTO users (name, age, email) VALUES (?, ?, ?)", users)
conn.commit()

# Query data
print("All users:")
cursor.execute("SELECT * FROM users")
for row in cursor.fetchall():
    print(f"ID: {row[0]}, Name: {row[1]}, Age: {row[2]}, Email: {row[3]}")

# Parameterized query
min_age = 28
print(f"\nUsers older than {min_age}:")
cursor.execute("SELECT name, age FROM users WHERE age > ?", (min_age,))
for row in cursor.fetchall():
    print(f"{row[0]} is {row[1]} years old")

# Close the connection
conn.close()
```

### `pickle` - Python Object Serialization

The `pickle` module implements binary protocols for serializing and de-serializing Python objects:

```python
import pickle

# Object to serialize
data = {
    "name": "John",
    "age": 30,
    "skills": ["Python", "JavaScript", "SQL"],
    "is_active": True
}

# Serialize to a file
with open("data.pickle", "wb") as file:
    pickle.dump(data, file)

# Deserialize from a file
with open("data.pickle", "rb") as file:
    loaded_data = pickle.load(file)
    print(f"Loaded data: {loaded_data}")

# Serialize to a string
serialized = pickle.dumps(data)
print(f"Serialized data (first 50 bytes): {serialized[:50]}")

# Deserialize from a string
deserialized = pickle.loads(serialized)
print(f"Deserialized data: {deserialized}")
```

**Important:**
The `pickle` module is not secure against erroneous or maliciously constructed data. Never unpickle data received from untrusted or unauthenticated sources.

## 10. Development and Debugging

### `logging` - Logging Facility

The `logging` module provides a flexible framework for emitting log messages:

```python
import logging

# Configure basic logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    filename='app.log'
)

# Log messages at different levels
logging.debug("This is a debug message")
logging.info("This is an info message")
logging.warning("This is a warning message")
logging.error("This is an error message")
logging.critical("This is a critical message")

# Create a custom logger
logger = logging.getLogger("my_app")
logger.setLevel(logging.INFO)

# Create console handler
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.INFO)

# Create formatter
formatter = logging.Formatter('%(name)s - %(levelname)s - %(message)s')
console_handler.setFormatter(formatter)

# Add handler to logger
logger.addHandler(console_handler)

# Use the custom logger
logger.info("This is an info message from my custom logger")
logger.error("This is an error message from my custom logger")
```

### `unittest` - Unit Testing Framework

The `unittest` module provides a framework for creating and running tests:

```python
import unittest

# Function to test
def add(a, b):
    return a + b

# Test case class
class TestAddFunction(unittest.TestCase):
    
    def test_add_positive_numbers(self):
        self.assertEqual(add(2, 3), 5)
        
    def test_add_negative_numbers(self):
        self.assertEqual(add(-1, -1), -2)
        
    def test_add_mixed_numbers(self):
        self.assertEqual(add(-1, 1), 0)
        
    def test_add_zero(self):
        self.assertEqual(add(5, 0), 5)
        
    def test_add_string_numbers(self):
        with self.assertRaises(TypeError):
            add("2", 3)

# Run the tests
if __name__ == "__main__":
    unittest.main(argv=['first-arg-is-ignored'], exit=False)
```

## Using the Python Documentation

The standard library is well-documented. You can access the documentation in several ways:

1. **Online Documentation**: Visit [docs.python.org](https://docs.python.org/) for comprehensive documentation.

2. **Help Function**: Use the `help()` function in the Python interpreter:
   ```python
   import math
   help(math)  # Shows documentation for the math module
   help(math.sqrt)  # Shows documentation for the sqrt function
   ```

3. **Docstrings**: Most standard library functions and methods have docstrings that provide information about their usage:
   ```python
   print(math.sqrt.__doc__)  # Prints the docstring for math.sqrt
   ```

4. **Dir Function**: The `dir()` function shows all the attributes and methods of an object:
   ```python
   import random
   print(dir(random))  # Lists all attributes and methods of the random module
   ```

## Finding the Right Module

With over 200 modules in the standard library, it can be challenging to find the right one for your needs. Here are some categories to help you navigate:

1. **Built-in Functions**: Functions always available without importing anything, like `print()`, `len()`, and `range()`.

2. **Text Processing**: `string`, `re`, `difflib`, `textwrap`, `unicodedata`, etc.

3. **Data Types**: `collections`, `array`, `heapq`, `bisect`, `weakref`, etc.

4. **Numeric and Mathematical**: `math`, `random`, `statistics`, `decimal`, `fractions`, etc.

5. **File and Directory Access**: `os.path`, `fileinput`, `pathlib`, `tempfile`, `glob`, etc.

6. **Data Persistence**: `pickle`, `sqlite3`, `dbm`, `csv`, `configparser`, etc.

7. **Data Compression**: `zlib`, `gzip`, `bz2`, `zipfile`, `tarfile`, etc.

8. **File Formats**: `csv`, `json`, `xml.*`, `html.*`, etc.

9. **Cryptographic**: `hashlib`, `hmac`, `secrets`, etc.

10. **Operating System**: `os`, `io`, `time`, `argparse`, `logging`, `platform`, etc.

11. **Concurrent Execution**: `threading`, `multiprocessing`, `concurrent`, `asyncio`, etc.

12. **Networking**: `socket`, `ssl`, `email`, `http.*`, `urllib.*`, etc.

13. **Internet Data Handling**: `json`, `webbrowser`, `cgi`, `wsgiref`, etc.

14. **Development Tools**: `unittest`, `doctest`, `pydoc`, `typing`, etc.

## Practical Example: Web Scraper

Let's put together several standard library modules to create a simple web scraper:

```python
import urllib.request
import re
import csv
import os
from datetime import datetime

def scrape_website(url, output_file):
    """
    Scrape a website and extract all the links.
    
    Args:
        url (str): The URL to scrape
        output_file (str): The CSV file to save the results
    """
    print(f"Scraping {url}...")
    
    try:
        # Fetch the page content
        with urllib.request.urlopen(url) as response:
            html = response.read().decode('utf-8')
        
        # Extract all links using regular expressions
        link_pattern = r'href=[\'"]?([^\'" >]+)'
        links = re.findall(link_pattern, html)
        
        # Process the links to make them absolute
        processed_links = []
        for link in links:
            # Skip javascript: and mailto: links
            if link.startswith(('javascript:', 'mailto:')):
                continue
                
            # Make relative links absolute
            if not link.startswith(('http://', 'https://')):
                if link.startswith('/'):
                    # Add domain to absolute path
                    parts = urllib.parse.urlparse(url)
                    base = f"{parts.scheme}://{parts.netloc}"
                    link = base + link
                else:
                    # Add path to relative link
                    if url.endswith('/'):
                        link = url + link
                    else:
                        link = url + '/' + link
            
            processed_links.append(link)
        
        # Write results to CSV
        with open(output_file, 'w', newline='', encoding='utf-8') as file:
            writer = csv.writer(file)
            writer.writerow(['URL', 'Extracted On'])
            timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            for link in processed_links:
                writer.writerow([link, timestamp])
        
        print(f"Found {len(processed_links)} links. Results saved to {output_file}")
        
    except Exception as e:
        print(f"Error: {e}")

# Run the scraper on Python's website
if __name__ == "__main__":
    os.makedirs("scraped_data", exist_ok=True)
    output_file = os.path.join("scraped_data", "python_links.csv")
    scrape_website("https://www.python.org", output_file)
```

## Exercises

**Exercise 1:** Write a program that uses the `random` module to simulate rolling two dice 1000 times. Count how many times each possible sum (2 through 12) appears and display the results.

**Exercise 2:** Use the `os` and `datetime` modules to create a script that walks through a directory structure and lists all files larger than 1MB, along with their creation date.

**Exercise 3:** Create a simple note-taking application using the `json` module for storage. Your app should allow the user to add, view, and delete notes. Each note should have a title, content, and timestamp.

**Exercise 4:** Use the `re` module to write a function that extracts all phone numbers from a text. Consider various formats like (123) 456-7890, 123-456-7890, and 1234567890.

**Hint for Exercise 1:** Use `random.randint(1, 6)` to simulate rolling a single die, and create a dictionary to count the occurrences of each sum.

```python
# Exercise 1 sample solution outline
import random

# Initialize a dictionary to count each sum
results = {i: 0 for i in range(2, 13)}

# Roll two dice 1000 times
for _ in range(1000):
    die1 = random.randint(1, 6)
    die2 = random.randint(1, 6)
    total = die1 + die2
    results[total] += 1

# Display the results
for total, count in results.items():
    print(f"Sum {total}: {count} times ({count/10:.1f}%)")
```

In the next section, we'll learn about creating and using our own modules in Python, which allows you to organize your code into reusable components.