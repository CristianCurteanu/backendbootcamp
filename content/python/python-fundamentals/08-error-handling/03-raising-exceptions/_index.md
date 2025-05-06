---
title: 'Raising Exceptions in Python'
linkTitle: 'Raising Exceptions in Python'
weight: 3
---

While handling exceptions is important, there are situations where you'll want to deliberately raise exceptions in your code. Raising exceptions allows you to signal errors or exceptional conditions that occur during program execution, making your code more robust and communicative.

## The `raise` Statement

Python provides the `raise` statement to explicitly trigger exceptions. The basic syntax is:

```python
raise ExceptionType("Error message")
```

Here's a simple example:

```python
def divide(a, b):
    if b == 0:
        raise ZeroDivisionError("Cannot divide by zero")
    return a / b

try:
    result = divide(10, 0)
except ZeroDivisionError as e:
    print(f"Error: {e}")  # Output: Error: Cannot divide by zero
```

In this example, rather than letting Python raise the exception, we explicitly raise it with our own custom message.

## When to Raise Exceptions

You should raise exceptions in the following situations:

1. **Input validation**: When function parameters don't meet expected requirements
2. **Impossible state**: When the program reaches a state that shouldn't be possible
3. **API contracts**: When your code interface contract is violated
4. **Resource unavailability**: When required resources aren't accessible
5. **Business rules**: When business logic constraints are violated

Here's an example of input validation:

```python
def calculate_square_root(number):
    if not isinstance(number, (int, float)):
        raise TypeError("Input must be a number")
    if number < 0:
        raise ValueError("Cannot calculate square root of a negative number")
    
    return number ** 0.5

try:
    result = calculate_square_root(-5)
except ValueError as e:
    print(f"Error: {e}")  # Output: Error: Cannot calculate square root of a negative number
```

**Important:**
Raising exceptions is not just about preventing errors but also about making your code communicate issues clearly. A well-crafted exception explains what went wrong and why.

## Built-in Exception Types

Python provides many built-in exception types to handle various error situations:

| Exception | Description |
|-----------|-------------|
| `Exception` | Base class for all exceptions |
| `ArithmeticError` | Base class for arithmetic errors |
| `AssertionError` | Raised when an assert statement fails |
| `AttributeError` | Raised when attribute reference/assignment fails |
| `EOFError` | Raised when input() hits end-of-file condition |
| `FileNotFoundError` | Raised when a file or directory is requested but doesn't exist |
| `ImportError` | Raised when the imported module is not found |
| `IndexError` | Raised when index of a sequence is out of range |
| `KeyError` | Raised when a key is not found in a dictionary |
| `KeyboardInterrupt` | Raised when the user hits interrupt key (Ctrl+C) |
| `NameError` | Raised when a local or global name is not found |
| `NotImplementedError` | Raised by abstract methods |
| `OSError` | Raised when system operation causes system error |
| `OverflowError` | Raised when the result of an arithmetic operation is too large |
| `RuntimeError` | Raised when an error does not fall under any other category |
| `StopIteration` | Raised by next() to indicate there are no further items |
| `SyntaxError` | Raised by parser when syntax error is encountered |
| `TypeError` | Raised when a function or operation is applied to an object of incorrect type |
| `ValueError` | Raised when a function gets an argument of correct type but improper value |
| `ZeroDivisionError` | Raised when division or modulo by zero occurs |

Choose the most appropriate exception type based on the error situation to make your code more clear and maintainable.

## Creating Custom Exceptions

For specialized error handling, you can create your own exception classes by inheriting from the built-in `Exception` class or a more specific exception class:

```python
class InsufficientFundsError(Exception):
    """Exception raised when a withdrawal exceeds the available balance."""
    
    def __init__(self, balance, amount, message="Insufficient funds"):
        self.balance = balance
        self.amount = amount
        self.message = f"{message}: available balance ${balance}, attempted withdrawal ${amount}"
        super().__init__(self.message)

class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance
        
    def withdraw(self, amount):
        if amount > self.balance:
            raise InsufficientFundsError(self.balance, amount)
        
        self.balance -= amount
        return self.balance

try:
    account = BankAccount("John Doe", 100)
    account.withdraw(150)
except InsufficientFundsError as e:
    print(f"Transaction failed: {e}")
    # Output: Transaction failed: Insufficient funds: available balance $100, attempted withdrawal $150
```

Custom exceptions:
- Make error handling more specific and readable
- Allow storing of additional context relevant to the exception
- Create a hierarchy of exception types for your application domain

**Note:**
Name your custom exceptions with the suffix "Error" to follow Python convention and make the code more readable.

## Re-raising Exceptions

Sometimes you want to catch an exception, perform some operations, and then re-raise the exception to be handled further up the call stack:

```python
def process_data(data):
    try:
        result = complex_calculation(data)
        return result
    except ValueError as e:
        print(f"Logging error: {e}")
        # Clean up resources, log the error, etc.
        raise  # Re-raise the caught exception
```

You can also raise a different exception while preserving the original exception as the cause using the `from` keyword:

```python
def read_configuration():
    try:
        with open("config.json", "r") as file:
            import json
            return json.load(file)
    except json.JSONDecodeError as e:
        # Transform the exception to a more application-specific one
        raise ConfigurationError("Invalid configuration format") from e
    except FileNotFoundError as e:
        raise ConfigurationError("Configuration file not found") from e
```

The `from` clause maintains the traceback of the original exception, which helps with debugging.

## Raising from Exception Handlers

You can also use exception handlers to transform lower-level exceptions into higher-level ones that make more sense in your application's context:

```python
def get_user_data(user_id):
    try:
        # Database operations that might raise various exceptions
        return database.find_user(user_id)
    except database.ConnectionError:
        raise ServiceUnavailableError("Database connection failed")
    except database.QueryError:
        raise InvalidRequestError(f"Invalid user ID format: {user_id}")
    except database.TimeoutError:
        raise ServiceUnavailableError("Database query timed out")
```

This pattern helps in creating a clear separation between the internal implementation details and the external API of your module.

## Assertions vs. Exceptions

Python provides an `assert` statement, which can also raise exceptions (specifically, `AssertionError`). However, assertions and exceptions serve different purposes:

```python
def calculate_average(numbers):
    # Assertion: used for conditions that should never happen
    # and indicate a bug in the program
    assert isinstance(numbers, list), "Numbers must be a list"
    assert numbers, "List cannot be empty"
    
    # Exception: used for expected error conditions
    # that can happen during normal operation
    if not all(isinstance(x, (int, float)) for x in numbers):
        raise TypeError("All elements must be numbers")
    
    return sum(numbers) / len(numbers)
```

**Important:**
- Use assertions for programmer errors that should never happen in production
- Use exceptions for expected error conditions that might happen in normal operation
- Assertions can be disabled globally in production by running Python with the `-O` optimization flag

## Practical Example: File Processing with Exception Handling

Let's look at a practical example that demonstrates raising and handling exceptions:

```python
def process_data_file(filename):
    """
    Process data from a file with comprehensive error handling.
    
    Args:
        filename (str): The name of the file to process
        
    Returns:
        list: Processed data from the file
        
    Raises:
        ValueError: If the file format is invalid
        FileNotFoundError: If the file doesn't exist
        PermissionError: If we don't have permission to read the file
    """
    try:
        with open(filename, 'r') as file:
            lines = file.readlines()
            
        if not lines:
            raise ValueError(f"File '{filename}' is empty")
            
        processed_data = []
        for line_num, line in enumerate(lines, 1):
            line = line.strip()
            
            if not line:
                continue  # Skip empty lines
                
            try:
                # Assume each line should contain comma-separated numbers
                values = [float(val) for val in line.split(',')]
                
                if not values:
                    raise ValueError(f"Line {line_num} doesn't contain any values")
                    
                processed_data.append(values)
                
            except ValueError as e:
                # Re-raise with more context
                raise ValueError(f"Error in line {line_num}: {line} - {str(e)}") from e
                
        return processed_data
        
    except FileNotFoundError:
        raise FileNotFoundError(f"File '{filename}' does not exist")
    except PermissionError:
        raise PermissionError(f"No permission to read '{filename}'")
    except Exception as e:
        # Catch-all for unexpected errors
        raise RuntimeError(f"Unexpected error processing '{filename}'") from e

# Usage
try:
    data = process_data_file("measurements.csv")
    print(f"Successfully processed {len(data)} data points")
except ValueError as e:
    print(f"Data format error: {e}")
except FileNotFoundError as e:
    print(f"File error: {e}")
except PermissionError as e:
    print(f"Permission error: {e}")
except Exception as e:
    print(f"Unexpected error: {e}")
    # In a real application, you might log the full traceback here
```

This example demonstrates:
1. Raising specific exceptions for different error conditions
2. Adding context to exceptions
3. Re-raising exceptions with additional information
4. Using exception hierarchy for organized error handling

## The Zen of Exception Handling

For effective exception handling and raising:

1. **Be specific**: Raise the most specific exception type for the error
   ```python
   # Good
   if not os.path.exists(filename):
       raise FileNotFoundError(f"File {filename} not found")
   
   # Less good
   if not os.path.exists(filename):
       raise Exception(f"File {filename} not found")  # Too generic
   ```

2. **Provide context**: Include specific information in exception messages
   ```python
   # Good
   raise ValueError(f"Invalid age: {age}. Age must be between 0 and 120")
   
   # Less good
   raise ValueError("Invalid input")  # Too vague
   ```

3. **Catch only what you can handle**: Don't catch exceptions you don't plan to handle properly
   ```python
   # Good
   try:
       process_data(user_input)
   except ValueError as e:
       print(f"Invalid input: {e}")
   
   # Dangerous
   try:
       process_data(user_input)
   except Exception:  # Catches everything, including programming errors
       print("An error occurred")
   ```

4. **Don't suppress exceptions**: Avoid empty except blocks
   ```python
   # Bad practice
   try:
       process_data(user_input)
   except:
       pass  # Silently ignores all errors
   ```

5. **Clean up resources**: Use `finally` or context managers to ensure resources are released
   ```python
   # Good
   try:
       file = open("data.txt", "r")
       process_file(file)
   except Exception as e:
       handle_error(e)
   finally:
       file.close()  # Always executed
   
   # Better
   with open("data.txt", "r") as file:  # Context manager handles closing
       process_file(file)
   ```

## Common Patterns for Raising Exceptions

### 1. Validate Inputs Early

Check function inputs immediately and raise exceptions before doing any work:

```python
def process_user_data(user_id, data):
    if not isinstance(user_id, int) or user_id <= 0:
        raise ValueError(f"Invalid user ID: {user_id}. Must be a positive integer.")
    
    if not isinstance(data, dict):
        raise TypeError(f"Data must be a dictionary, got {type(data).__name__}")
    
    required_fields = ['name', 'email', 'age']
    for field in required_fields:
        if field not in data:
            raise ValueError(f"Missing required field: {field}")
    
    # Now we can safely proceed with processing
    # ...
```

### 2. Use a Factory Function to Handle Multiple Error Cases

For complex validation logic:

```python
def create_user(user_data):
    try:
        validate_name(user_data.get('name'))
        validate_email(user_data.get('email'))
        validate_age(user_data.get('age'))
        validate_address(user_data.get('address'))
        
        return User(**user_data)
        
    except ValueError as e:
        # Re-package multiple validation errors into one user-friendly message
        raise ValueError(f"Invalid user data: {e}") from e
```

### 3. Explicit Error Messages with Contextual Information

Include relevant context in error messages:

```python
def withdraw(account, amount):
    if amount <= 0:
        raise ValueError(f"Withdrawal amount must be positive, got {amount}")
    
    if amount > account.balance:
        raise InsufficientFundsError(
            balance=account.balance,
            amount=amount,
            message=f"Account {account.id} has insufficient funds"
        )
    
    # Process withdrawal
    # ...
```

### 4. Error Hierarchies for API Design

Create an exception hierarchy for cleaner API design:

```python
# Base exception for your module
class DatabaseError(Exception):
    """Base class for all database exceptions."""
    pass

# More specific exceptions
class ConnectionError(DatabaseError):
    """Raised when connection to the database fails."""
    pass

class QueryError(DatabaseError):
    """Raised when a query is invalid."""
    pass

class RecordNotFoundError(QueryError):
    """Raised when a requested record doesn't exist."""
    pass

# Usage in code
def get_user(user_id):
    try:
        connect_to_db()
    except IOError as e:
        raise ConnectionError("Failed to connect to database") from e
    
    try:
        result = execute_query(f"SELECT * FROM users WHERE id = {user_id}")
        if not result:
            raise RecordNotFoundError(f"User with ID {user_id} does not exist")
        return result
    except SyntaxError as e:
        raise QueryError(f"Invalid query syntax: {e}") from e
```

## Exercises

**Exercise 1:** Write a function called `divide_numbers` that takes two parameters and returns their division. The function should raise appropriate exceptions for different error cases, such as non-numeric inputs or division by zero.

**Exercise 2:** Create a `Person` class with attributes for name, age, and email. Implement validation in the `__init__` method to raise appropriate exceptions if:
- Name is not a string or is empty
- Age is not a number or is negative
- Email doesn't contain an '@' character

**Exercise 3:** Implement a custom exception hierarchy for a banking system. Create a base `BankException` class and at least three specific exception types that inherit from it (like `InsufficientFundsError`, `AccountNotFoundError`, etc.). Then write a `transfer_money` function that uses these exceptions.

**Exercise 4:** Write a function that reads a JSON configuration file and raises appropriate exceptions with helpful error messages for different failure modes (file not found, invalid JSON, missing required fields, etc.).

**Hint for Exercise 1:** Consider using `isinstance()` to check the types of the input parameters, and use specific exceptions like `TypeError` for wrong types and `ZeroDivisionError` for division by zero.

```python
# Exercise 1 solution outline
def divide_numbers(a, b):
    if not isinstance(a, (int, float)) or not isinstance(b, (int, float)):
        raise TypeError("Both inputs must be numbers")
    
    if b == 0:
        raise ZeroDivisionError("Cannot divide by zero")
    
    return a / b
```

In the next section, we'll explore debugging techniques and tools in Python to help you find and fix errors in your code more efficiently.