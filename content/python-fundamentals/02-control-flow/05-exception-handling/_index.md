---
title: 'Exception Handling Basics'
linkTitle: 'Exception Handling Basics'
weight: 11
---

Exception handling is a crucial aspect of writing robust programs. It allows your code to gracefully respond to unexpected situations or errors instead of crashing. Python provides a comprehensive exception handling mechanism using `try`, `except`, `else`, `finally`, and `raise` statements.

## Understanding Exceptions

An exception is an event that occurs during the execution of a program that disrupts the normal flow of instructions. When an error occurs in Python, it creates an exception object. If the exception is not handled, the program terminates with an error message.

Some common built-in exceptions include:

- `SyntaxError`: Raised when there's a syntax error in your code
- `TypeError`: Raised when an operation is performed on an inappropriate data type
- `ValueError`: Raised when a function receives an argument of the correct type but invalid value
- `NameError`: Raised when a variable is not found in the local or global scope
- `IndexError`: Raised when trying to access an index that is outside the bounds of a sequence
- `KeyError`: Raised when a dictionary key is not found
- `FileNotFoundError`: Raised when a file or directory is requested but doesn't exist
- `ZeroDivisionError`: Raised when dividing by zero
- `ImportError`: Raised when an import statement fails

Here's how an unhandled exception looks:

```python
# Attempting to divide by zero
x = 10 / 0  # Raises ZeroDivisionError

# Output:
# Traceback (most recent call last):
#   File "<stdin>", line 1, in <module>
# ZeroDivisionError: division by zero
```

## The `try` and `except` Blocks

The basic structure for handling exceptions is:

```python
try:
    # Code that might raise an exception
except ExceptionType:
    # Code that executes if ExceptionType is raised
```

Here's a simple example of handling a division by zero error:

```python
try:
    numerator = 10
    denominator = 0
    result = numerator / denominator
    print(f"Result: {result}")
except ZeroDivisionError:
    print("Error: Division by zero is not allowed.")

# Output:
# Error: Division by zero is not allowed.
```

## Handling Multiple Exceptions

You can handle multiple exception types using multiple `except` blocks:

```python
try:
    # Try to convert user input to an integer and divide
    number = int(input("Enter a number: "))
    result = 100 / number
    print(f"100 divided by {number} is {result}")
except ValueError:
    print("Error: Please enter a valid integer.")
except ZeroDivisionError:
    print("Error: Division by zero is not allowed.")

# Sample runs:
# Enter a number: abc
# Error: Please enter a valid integer.

# Enter a number: 0
# Error: Division by zero is not allowed.

# Enter a number: 5
# 100 divided by 5 is 20.0
```

You can also catch multiple exception types with a single `except` block by grouping the exception types in a tuple:

```python
try:
    # Some code that might raise exceptions
    number = int(input("Enter a number: "))
    result = 100 / number
    print(f"100 divided by {number} is {result}")
except (ValueError, ZeroDivisionError):
    print("Error: Please enter a non-zero integer.")
```

## Catching All Exceptions

You can catch all exceptions using a generic `except` clause, but this is generally not recommended as it can mask unexpected errors:

```python
try:
    # Some risky code
    result = some_function()
except:  # Catches any exception
    print("An error occurred.")
```

A better approach is to use `Exception` as the exception type, which catches all standard exceptions but still allows you to access the exception details:

```python
try:
    # Some risky code
    number = int(input("Enter a number: "))
    result = 100 / number
except Exception as e:
    print(f"An error occurred: {e}")
    print(f"Error type: {type(e).__name__}")
```

**Important:**
While catching all exceptions can prevent your program from crashing, it can also hide bugs and make debugging more difficult. It's generally better to catch specific exceptions that you anticipate and can handle appropriately.

## The `else` Clause

The `else` clause in a `try`/`except` block executes if no exceptions are raised in the `try` block:

```python
try:
    number = int(input("Enter a number: "))
    result = 100 / number
except ValueError:
    print("Error: Please enter a valid integer.")
except ZeroDivisionError:
    print("Error: Division by zero is not allowed.")
else:
    print(f"100 divided by {number} is {result}")
    print("No exceptions were raised.")
```

The `else` clause is particularly useful when you want to separate the code that might raise an exception from the code that should run only if no exceptions are raised.

## The `finally` Clause

The `finally` clause contains code that always executes, regardless of whether an exception was raised or not:

```python
try:
    file = open("example.txt", "r")
    content = file.read()
    # Process the content
except FileNotFoundError:
    print("Error: The file was not found.")
finally:
    # This block always executes
    try:
        file.close()
        print("File closed successfully.")
    except:
        print("No file to close.")
```

The `finally` clause is essential for cleanup actions (like closing files or releasing resources) that must occur whether an exception was raised or not.

## Raising Exceptions

You can manually raise exceptions using the `raise` statement:

```python
def validate_age(age):
    if not isinstance(age, int):
        raise TypeError("Age must be an integer")
    if age < 0:
        raise ValueError("Age cannot be negative")
    if age > 120:
        raise ValueError("Age unreasonably high")
    return True

try:
    validate_age(-5)
except (TypeError, ValueError) as e:
    print(f"Validation error: {e}")

# Output:
# Validation error: Age cannot be negative
```

Raising exceptions is useful when you want to indicate that an error or exceptional condition has occurred in your code.

## Re-raising Exceptions

Sometimes you might want to catch an exception, perform some action, and then re-raise the exception to let it propagate further. You can do this with a simple `raise` statement without arguments:

```python
try:
    # Some code that might raise an exception
    number = int(input("Enter a number: "))
    result = 100 / number
except ValueError:
    print("Logging: Invalid input provided.")
    raise  # Re-raise the caught exception
```

## Creating Custom Exceptions

You can create your own exception types by defining a new class that inherits from `Exception` or one of its subclasses:

```python
class InsufficientFundsError(Exception):
    """Raised when a withdrawal would result in a negative balance."""
    def __init__(self, balance, amount):
        self.balance = balance
        self.amount = amount
        self.deficit = amount - balance
        message = f"Cannot withdraw ${amount}. Balance is ${balance}, resulting in a deficit of ${self.deficit}."
        super().__init__(message)

class BankAccount:
    def __init__(self, name, balance=0):
        self.name = name
        self.balance = balance
    
    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Deposit amount must be positive")
        self.balance += amount
        return self.balance
    
    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive")
        if amount > self.balance:
            raise InsufficientFundsError(self.balance, amount)
        self.balance -= amount
        return self.balance

# Using the custom exception
account = BankAccount("John", 100)

try:
    account.withdraw(150)
except InsufficientFundsError as e:
    print(f"Error: {e}")
    print(f"You need ${e.deficit} more to make this withdrawal.")

# Output:
# Error: Cannot withdraw $150. Balance is $100, resulting in a deficit of $50.
# You need $50 more to make this withdrawal.
```

Custom exceptions help make your code more readable and maintainable by clearly communicating the specific error conditions that can occur in your program.

### Practical Exception Handling Examples

#### Example 1: Safe File Operations

```python
def read_file_safely(filename):
    """
    Safely read a file and return its contents.
    Returns None if the file cannot be read.
    """
    try:
        with open(filename, 'r') as file:
            return file.read()
    except FileNotFoundError:
        print(f"Warning: File '{filename}' not found.")
        return None
    except PermissionError:
        print(f"Warning: No permission to read '{filename}'.")
        return None
    except Exception as e:
        print(f"Unexpected error reading '{filename}': {e}")
        return None

# Test the function
content = read_file_safely("config.txt")
if content is not None:
    print("File content:", content)
else:
    print("Using default configuration.")
```

#### Example 2: User Input Validation

```python
def get_integer_input(prompt, min_value=None, max_value=None):
    """
    Get an integer input from the user within specified bounds.
    Continues asking until a valid integer is provided.
    """
    while True:
        try:
            value = int(input(prompt))
            
            if min_value is not None and value < min_value:
                print(f"Error: The number must be at least {min_value}.")
                continue
                
            if max_value is not None and value > max_value:
                print(f"Error: The number must be at most {max_value}.")
                continue
                
            return value
            
        except ValueError:
            print("Error: Please enter a valid integer.")

# Test the function
age = get_integer_input("Enter your age (0-120): ", 0, 120)
print(f"Your age is: {age}")
```

#### Example 3: API Request with Timeout

```python
import requests
import time

def fetch_data_from_api(url, max_retries=3, timeout=5):
    """
    Fetch data from an API with retry logic and timeout.
    """
    retry_count = 0
    
    while retry_count < max_retries:
        try:
            response = requests.get(url, timeout=timeout)
            response.raise_for_status()  # Raise an exception for HTTP errors
            return response.json()
            
        except requests.exceptions.Timeout:
            print(f"Request timed out. Retrying ({retry_count + 1}/{max_retries})...")
            
        except requests.exceptions.ConnectionError:
            print(f"Connection error. Retrying ({retry_count + 1}/{max_retries})...")
            
        except requests.exceptions.HTTPError as e:
            print(f"HTTP error occurred: {e}")
            if response.status_code == 404:  # Not Found
                print("Resource not found. Giving up.")
                return None
            
        except requests.exceptions.RequestException as e:
            print(f"An error occurred: {e}")
            return None
            
        retry_count += 1
        time.sleep(1)  # Wait before retrying
    
    print(f"Failed after {max_retries} retries.")
    return None

# Example usage
try:
    data = fetch_data_from_api("https://api.example.com/data")
    if data:
        print("Data fetched successfully:", data)
    else:
        print("Failed to fetch data.")
except Exception as e:
    print(f"Unexpected error: {e}")
```

#### Example 4: Database Operations with Transactions

```python
import sqlite3

def update_user_profile(user_id, name, email):
    """
    Update a user's profile in the database, ensuring all changes succeed or none do.
    """
    connection = None
    try:
        connection = sqlite3.connect("users.db")
        cursor = connection.cursor()
        
        # Start a transaction
        connection.execute("BEGIN TRANSACTION")
        
        # Update user name
        cursor.execute(
            "UPDATE users SET name = ? WHERE id = ?",
            (name, user_id)
        )
        
        # Update user email
        cursor.execute(
            "UPDATE users SET email = ? WHERE id = ?",
            (email, user_id)
        )
        
        # Log the change
        cursor.execute(
            "INSERT INTO user_activity_log (user_id, activity, timestamp) VALUES (?, ?, datetime('now'))",
            (user_id, f"Profile updated: name={name}, email={email}")
        )
        
        # Commit the transaction
        connection.commit()
        
        print(f"User {user_id} profile updated successfully.")
        return True
        
    except sqlite3.Error as e:
        # Roll back any changes if something went wrong
        if connection:
            connection.rollback()
        print(f"Database error: {e}")
        return False
        
    finally:
        # Close the connection even if an exception occurred
        if connection:
            connection.close()

# Example usage
success = update_user_profile(123, "John Smith", "john.smith@example.com")
if not success:
    print("Please try updating your profile again later.")
```

## Best Practices for Exception Handling

#### 1. Be Specific About Which Exceptions to Catch

Catch specific exceptions rather than using a broad `except` clause:

```python
# Poor practice
try:
    # Some code
except:  # Catches everything!
    print("An error occurred")

# Better practice
try:
    # Some code
except (ValueError, TypeError) as e:
    print(f"Input error: {e}")
except FileNotFoundError as e:
    print(f"File error: {e}")
```

#### 2. Keep `try` Blocks Small

Include only the code that might raise the exception in the `try` block:

```python
# Poor practice
try:
    data = input("Enter data: ")
    value = int(data)
    result = 100 / value
    print(f"Result: {result}")
except Exception as e:
    print(f"Error: {e}")

# Better practice
try:
    data = input("Enter data: ")
    value = int(data)  # Only this line might raise ValueError
except ValueError:
    print("Error: Please enter a valid integer.")
else:
    try:
        result = 100 / value  # Only this line might raise ZeroDivisionError
    except ZeroDivisionError:
        print("Error: Cannot divide by zero.")
    else:
        print(f"Result: {result}")
```

#### 3. Clean Up Resources with `finally` or Context Managers

Always clean up resources like file handles or database connections:

```python
# Using finally
file = None
try:
    file = open("data.txt", "r")
    # Process the file
except FileNotFoundError:
    print("File not found.")
finally:
    if file:
        file.close()

# Using context manager (better approach)
try:
    with open("data.txt", "r") as file:
        # Process the file
except FileNotFoundError:
    print("File not found.")
```

The `with` statement (context manager) automatically handles cleanup, which is more concise and less error-prone.

#### 4. Don't Use Exceptions for Flow Control

Exceptions should be used for exceptional conditions, not for regular flow control:

```python
# Poor practice
def get_item(dictionary, key):
    try:
        return dictionary[key]
    except KeyError:
        return None

# Better practice
def get_item(dictionary, key):
    return dictionary.get(key)  # Returns None if key doesn't exist
```

#### 5. Log Exceptions Appropriately

In production code, log exceptions with useful context information:

```python
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

try:
    # Some risky operation
    result = perform_complex_operation(data)
except Exception as e:
    logger.error(f"Error processing data: {e}", exc_info=True)
    # Gracefully handle the error for the user
```

#### 6. Don't Silence Exceptions Without Good Reason

If you catch an exception, you should handle it meaningfully:

```python
# Poor practice
try:
    process_data()
except Exception:
    pass  # Silently ignore errors

# Better practice
try:
    process_data()
except Exception as e:
    print(f"Failed to process data: {e}")
    # Take appropriate action (retry, use fallback, inform user, etc.)
```

#### 7. Create Custom Exceptions For Your Application's Domains

Custom exceptions make your code more readable and allow for more specific error handling:

```python
class ConfigError(Exception):
    """Base class for configuration errors."""
    pass

class ConfigNotFoundError(ConfigError):
    """Raised when a configuration file is not found."""
    pass

class ConfigParseError(ConfigError):
    """Raised when a configuration file cannot be parsed."""
    pass

def load_config(filename):
    if not os.path.exists(filename):
        raise ConfigNotFoundError(f"Configuration file {filename} not found")
    
    try:
        with open(filename, 'r') as file:
            data = file.read()
            # Parse the config
            return parse_config(data)
    except ValueError as e:
        raise ConfigParseError(f"Failed to parse {filename}: {e}")
```

## Exercises

**Exercise 1:** Write a function called `safe_divide` that takes two parameters and returns their division. The function should handle potential errors (like division by zero or invalid inputs) gracefully and return `None` if the division cannot be performed.

**Exercise 2:** Create a function that asks the user for a filename and tries to open and read that file. Handle all possible exceptions that might occur (file not found, permission error, etc.) with appropriate error messages.

**Exercise 3:** Write a program that asks the user to enter a list of numbers separated by commas, calculates their average, and handles any potential errors (like invalid input) gracefully. Your program should continue asking until it gets valid input.

**Exercise 4:** Create a custom exception called `InvalidPasswordError` that is raised when a password doesn't meet certain criteria (e.g., minimum length, contains uppercase letters, etc.). Write a function to validate passwords that uses this custom exception.

**Hint for Exercise 1:**
```python
def safe_divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        print("Error: Division by zero is not allowed.")
        return None
    except TypeError:
        print("Error: Both inputs must be numbers.")
        return None
```

In the next section, we'll explore Python data structures in more detail, starting with lists and list operations.