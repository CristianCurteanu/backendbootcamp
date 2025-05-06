---
title: 'Attributes and Methods'
linkTitle: 'Attributes and Methods'
weight: 31
---

In object-oriented programming, classes serve as blueprints for creating objects. These objects have two main components: attributes (data) and methods (functions). Together, they define the state and behavior of objects.

## Class Attributes vs. Instance Attributes

Python objects can have two types of attributes:

1. **Class attributes**: Shared by all instances of a class
2. **Instance attributes**: Unique to each instance of a class

### Class Attributes

Class attributes are defined at the class level and are the same for all instances of the class. They're useful for:
- Constants shared across all instances
- Default values
- Tracking information about the class as a whole

```python
class Circle:
    # Class attribute
    pi = 3.14159
    
    def __init__(self, radius):
        # Instance attribute
        self.radius = radius
    
    def area(self):
        return Circle.pi * self.radius ** 2

# Creating objects
circle1 = Circle(5)
circle2 = Circle(7)

# All instances share the same class attribute
print(circle1.pi)  # 3.14159
print(circle2.pi)  # 3.14159

# You can also access class attributes through the class itself
print(Circle.pi)   # 3.14159
```

**Important:**
Class attributes can be accessed through the class (e.g., `Circle.pi`) or through instances (e.g., `circle1.pi`). However, if you modify a class attribute through an instance, it creates a new instance attribute that shadows the class attribute for that specific instance.

```python
# Modifying a class attribute through the class
Circle.pi = 3.14
print(Circle.pi)    # 3.14
print(circle1.pi)   # 3.14
print(circle2.pi)   # 3.14

# Modifying through an instance (creates a new instance attribute)
circle1.pi = 3.0
print(Circle.pi)    # 3.14 (class attribute unchanged)
print(circle1.pi)   # 3.0 (instance attribute shadows class attribute)
print(circle2.pi)   # 3.14 (still sees the class attribute)
```

### Instance Attributes

Instance attributes are unique to each object and define the object's state. They're typically defined in the class's `__init__` method (constructor):

```python
class Person:
    def __init__(self, name, age):
        # Instance attributes
        self.name = name
        self.age = age

# Creating instances with different attributes
person1 = Person("Alice", 30)
person2 = Person("Bob", 25)

print(person1.name)  # Alice
print(person2.name)  # Bob
```

You can also add or modify instance attributes outside the constructor:

```python
# Adding a new attribute to person1
person1.email = "alice@example.com"
print(person1.email)  # alice@example.com

# This attribute only exists for person1
# print(person2.email)  # AttributeError
```

**Note:**
While Python allows adding attributes dynamically, it's better practice to define all attributes in the `__init__` method for clarity and to avoid attribute errors.

## Methods in Python Classes

Methods are functions defined within a class that operate on instances of the class. There are several types of methods in Python:

### Instance Methods

Instance methods are the most common type of methods. They:
- Take `self` as the first parameter (referring to the instance)
- Can access and modify instance attributes
- Can access class attributes

```python
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    # Instance method
    def area(self):
        return self.width * self.height
    
    # Instance method that modifies the instance
    def resize(self, width, height):
        self.width = width
        self.height = height
        return self.area()

# Create a rectangle
rect = Rectangle(5, 10)
print(f"Area: {rect.area()}")  # Area: 50

# Resize the rectangle
new_area = rect.resize(7, 3)
print(f"New area: {new_area}")  # New area: 21
```

The `self` parameter refers to the specific instance that calls the method, allowing the method to access and modify that instance's attributes.

### Class Methods

Class methods are methods that operate on the class itself rather than instances. They:
- Are defined with the `@classmethod` decorator
- Take `cls` as the first parameter (referring to the class)
- Can access and modify class attributes
- Cannot access instance attributes

```python
class Student:
    # Class attribute to track the number of students
    count = 0
    
    def __init__(self, name, grade):
        self.name = name
        self.grade = grade
        # Increment the student count
        Student.count += 1
    
    # Instance method
    def display_info(self):
        return f"Name: {self.name}, Grade: {self.grade}"
    
    # Class method to create a student from a string
    @classmethod
    def from_string(cls, student_str):
        name, grade_str = student_str.split(',')
        grade = int(grade_str)
        # Create and return a new instance
        return cls(name, grade)
    
    # Class method to get the student count
    @classmethod
    def get_count(cls):
        return cls.count

# Create students normally
student1 = Student("Alice", 95)
student2 = Student("Bob", 87)

# Create a student using the class method
student3 = Student.from_string("Charlie,91")

print(student3.display_info())  # Name: Charlie, Grade: 91
print(f"Total students: {Student.get_count()}")  # Total students: 3
```

Class methods are useful for:
- Creating alternative constructors
- Tracking class-level statistics
- Operations that involve the class but don't need a specific instance

### Static Methods

Static methods are methods that don't operate on either the class or instances. They:
- Are defined with the `@staticmethod` decorator
- Don't take `self` or `cls` as a first parameter
- Cannot access instance or class attributes directly
- Are essentially regular functions that are logically related to the class

```python
class MathUtils:
    @staticmethod
    def is_prime(n):
        """Check if a number is prime."""
        if n <= 1:
            return False
        if n <= 3:
            return True
        if n % 2 == 0 or n % 3 == 0:
            return False
        i = 5
        while i * i <= n:
            if n % i == 0 or n % (i + 2) == 0:
                return False
            i += 6
        return True
    
    @staticmethod
    def factorial(n):
        """Calculate factorial of n."""
        if n < 0:
            raise ValueError("Factorial is not defined for negative numbers")
        result = 1
        for i in range(2, n + 1):
            result *= i
        return result

# Static methods can be called on the class
print(MathUtils.is_prime(17))     # True
print(MathUtils.factorial(5))     # 120

# They can also be called on instances, but this is less common
math = MathUtils()
print(math.is_prime(23))          # True
```

Static methods are useful for utility functions that are related to the class's purpose but don't need to access instance or class data.

## Method Types Comparison

| Feature | Instance Method | Class Method | Static Method |
|---------|----------------|-------------|--------------|
| Decorator | None | `@classmethod` | `@staticmethod` |
| First parameter | `self` (instance) | `cls` (class) | None |
| Can access instance attributes | Yes | No | No |
| Can access class attributes | Yes | Yes | No |
| Can modify instance state | Yes | No | No |
| Can modify class state | Yes | Yes | No |
| Can be called via | Instance | Class or instance | Class or instance |
| Typical use | Operations on instance data | Alternative constructors, class-level operations | Utility functions |

## Special Methods (Magic Methods)

Python classes can define special methods (also called "dunder" or "magic" methods) that enable instances to work with Python's built-in operations and functions. These methods have names surrounded by double underscores.

### `__init__` - Constructor

We've already seen `__init__`, which initializes a new instance:

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
```

### `__str__` - String Representation

The `__str__` method defines the string representation of an object, used by the `str()` function and `print()`:

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def __str__(self):
        return f"Person({self.name}, {self.age})"

person = Person("Alice", 30)
print(person)  # Person(Alice, 30)
```

### `__repr__` - Official Representation

The `__repr__` method returns the "official" string representation of an object, aimed at developers:

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def __str__(self):
        return f"Person: {self.name}, {self.age}"
    
    def __repr__(self):
        return f"Person('{self.name}', {self.age})"

person = Person("Alice", 30)
print(str(person))   # Person: Alice, 30
print(repr(person))  # Person('Alice', 30)
```

The `__repr__` output should ideally be a valid Python expression that could recreate the object.

### Operator Overloading

Special methods allow objects to work with Python's operators:

```python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __str__(self):
        return f"Vector({self.x}, {self.y})"
    
    # Addition: v1 + v2
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)
    
    # Subtraction: v1 - v2
    def __sub__(self, other):
        return Vector(self.x - other.x, self.y - other.y)
    
    # Multiplication by scalar: v1 * 3
    def __mul__(self, scalar):
        return Vector(self.x * scalar, self.y * scalar)
    
    # Length (magnitude): len(v1)
    def __len__(self):
        return int((self.x ** 2 + self.y ** 2) ** 0.5)
    
    # Comparison: v1 == v2
    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

# Create vectors
v1 = Vector(3, 4)
v2 = Vector(1, 2)

# Use operators with vectors
v3 = v1 + v2
print(v3)           # Vector(4, 6)

v4 = v1 - v2
print(v4)           # Vector(2, 2)

v5 = v1 * 2
print(v5)           # Vector(6, 8)

print(len(v1))      # 5 (magnitude of vector is 5)

print(v1 == Vector(3, 4))  # True
print(v1 == v2)     # False
```

Here are more common special methods:

| Method | Description | Example Usage |
|--------|-------------|---------------|
| `__init__(self, ...)` | Constructor | `obj = MyClass()` |
| `__del__(self)` | Destructor | `del obj` |
| `__str__(self)` | String representation | `str(obj)`, `print(obj)` |
| `__repr__(self)` | Official representation | `repr(obj)` |
| `__len__(self)` | Length | `len(obj)` |
| `__getitem__(self, key)` | Get item by key | `obj[key]` |
| `__setitem__(self, key, value)` | Set item by key | `obj[key] = value` |
| `__delitem__(self, key)` | Delete item by key | `del obj[key]` |
| `__iter__(self)` | Iterator | `for x in obj` |
| `__next__(self)` | Next item in iterator | `next(obj)` |
| `__contains__(self, item)` | Membership test | `item in obj` |
| `__call__(self, ...)` | Call as function | `obj()` |
| `__add__(self, other)` | Addition | `obj + other` |
| `__sub__(self, other)` | Subtraction | `obj - other` |
| `__mul__(self, other)` | Multiplication | `obj * other` |
| `__truediv__(self, other)` | Division | `obj / other` |
| `__eq__(self, other)` | Equality | `obj == other` |
| `__lt__(self, other)` | Less than | `obj < other` |
| `__gt__(self, other)` | Greater than | `obj > other` |

## Property Decorators

Python provides property decorators that allow you to define methods that can be accessed like attributes. This enables you to:
- Control attribute access (getters and setters)
- Validate data
- Calculate attributes on-the-fly

```python
class Temperature:
    def __init__(self, celsius=0):
        self._celsius = celsius
    
    # Getter
    @property
    def celsius(self):
        return self._celsius
    
    # Setter
    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Temperature below absolute zero is not possible")
        self._celsius = value
    
    # Calculated property
    @property
    def fahrenheit(self):
        return (self.celsius * 9/5) + 32
    
    # Setter for the calculated property
    @fahrenheit.setter
    def fahrenheit(self, value):
        self.celsius = (value - 32) * 5/9

# Create a temperature
temp = Temperature(25)

# Access properties as if they were attributes
print(f"Celsius: {temp.celsius}°C")      # Celsius: 25°C
print(f"Fahrenheit: {temp.fahrenheit}°F")  # Fahrenheit: 77.0°F

# Set the temperature using properties
temp.celsius = 30
print(f"Celsius: {temp.celsius}°C")      # Celsius: 30°C
print(f"Fahrenheit: {temp.fahrenheit}°F")  # Fahrenheit: 86.0°F

temp.fahrenheit = 68
print(f"Celsius: {temp.celsius}°C")      # Celsius: 20.0°C
print(f"Fahrenheit: {temp.fahrenheit}°F")  # Fahrenheit: 68.0°F

# Validation prevents invalid values
try:
    temp.celsius = -300  # Below absolute zero
except ValueError as e:
    print(f"Error: {e}")  # Error: Temperature below absolute zero is not possible
```

Properties are an excellent way to enforce encapsulation, allowing you to:
- Hide the internal implementation
- Validate values before setting attributes
- Provide computed attributes
- Control access to attributes

## Public, Protected, and Private Attributes

Python doesn't enforce access control like some other languages, but it follows certain conventions for attribute visibility:

1. **Public attributes**: Regular attributes with no underscore prefix
2. **Protected attributes**: Attributes with a single underscore prefix, indicating they're intended for internal use
3. **Private attributes**: Attributes with a double underscore prefix, which are name-mangled to avoid accidental access

```python
class Account:
    def __init__(self, owner, balance):
        self.owner = owner        # Public attribute
        self._balance = balance   # Protected attribute
        self.__pin = "1234"       # Private attribute
        
    def deposit(self, amount):
        self._balance += amount
        return self._balance
    
    def withdraw(self, amount, pin):
        if pin != self.__pin:
            return "Invalid PIN"
        
        if amount > self._balance:
            return "Insufficient funds"
        
        self._balance -= amount
        return self._balance
    
    def __get_pin(self):  # Private method
        return self.__pin

# Create an account
acc = Account("Alice", 1000)

# Access public attribute
print(acc.owner)  # Alice

# Access protected attribute (not recommended, but possible)
print(acc._balance)  # 1000

# Try to access private attribute
try:
    print(acc.__pin)  # AttributeError
except AttributeError as e:
    print(f"Error: {e}")  # Error: 'Account' object has no attribute '__pin'

# Name mangling: Private attributes are accessible, but their names are mangled
print(acc._Account__pin)  # 1234 (not recommended to access directly)

# Proper way to interact with protected/private attributes is through methods
print(acc.deposit(500))   # 1500
print(acc.withdraw(200, "1234"))  # 1300
print(acc.withdraw(100, "wrong"))  # Invalid PIN
```

**Important:**
These access conventions are not enforced by Python but are followed by convention:
- Public attributes are freely accessible
- Protected attributes (single underscore) indicate "intended for internal use" but are still accessible
- Private attributes (double underscore) use name mangling to avoid accidental access, but can still be accessed if you know the mangled name

## Method Chaining

Method chaining is a programming pattern where multiple methods are called in a sequence, with each method returning `self` (the instance):

```python
class StringBuilder:
    def __init__(self):
        self.parts = []
    
    def append(self, text):
        self.parts.append(str(text))
        return self  # Return self for chaining
    
    def clear(self):
        self.parts = []
        return self  # Return self for chaining
    
    def build(self):
        return ''.join(self.parts)

# Create a StringBuilder
sb = StringBuilder()

# Use method chaining
result = sb.append("Hello").append(" ").append("World!").build()
print(result)  # Hello World!

# Chain more methods
result = sb.clear().append("Python ").append("is ").append("awesome!").build()
print(result)  # Python is awesome!
```

Method chaining makes code more concise and readable when performing multiple operations on the same object.

## Practical Example: Building a Complete Class

Let's create a comprehensive `BankAccount` class that demonstrates all the concepts we've covered:

```python
class BankAccount:
    # Class attribute
    interest_rate = 0.01  # 1% annual interest
    account_count = 0
    
    def __init__(self, owner, initial_balance=0):
        # Validate initial balance
        if initial_balance < 0:
            raise ValueError("Initial balance cannot be negative")
        
        # Instance attributes
        self.owner = owner
        self._balance = initial_balance
        self.__account_number = BankAccount.account_count + 10000
        self.__transactions = []
        
        # Log the opening transaction
        self.__add_transaction("OPEN", initial_balance)
        
        # Update class attribute
        BankAccount.account_count += 1
    
    # Property for balance
    @property
    def balance(self):
        return self._balance
    
    # Property for account number
    @property
    def account_number(self):
        return self.__account_number
    
    # Property for transaction history
    @property
    def transaction_history(self):
        return self.__transactions.copy()
    
    # Instance methods
    def deposit(self, amount):
        """Deposit money into the account."""
        if amount <= 0:
            raise ValueError("Deposit amount must be positive")
        
        self._balance += amount
        self.__add_transaction("DEPOSIT", amount)
        return self  # For method chaining
    
    def withdraw(self, amount):
        """Withdraw money from the account."""
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive")
        
        if amount > self._balance:
            raise ValueError("Insufficient funds")
        
        self._balance -= amount
        self.__add_transaction("WITHDRAW", -amount)
        return self  # For method chaining
    
    def apply_interest(self):
        """Apply annual interest to the account."""
        interest = self._balance * BankAccount.interest_rate
        self._balance += interest
        self.__add_transaction("INTEREST", interest)
        return self  # For method chaining
    
    def transfer(self, other_account, amount):
        """Transfer money to another account."""
        if not isinstance(other_account, BankAccount):
            raise TypeError("Transfer target must be a BankAccount")
        
        # First withdraw from this account
        self.withdraw(amount)
        
        # Then deposit to the other account
        other_account.deposit(amount)
        
        # Update transaction descriptions
        self.__transactions[-1]["description"] = f"TRANSFER TO {other_account.account_number}"
        other_account.__transactions[-1]["description"] = f"TRANSFER FROM {self.__account_number}"
        
        return self  # For method chaining
    
    # Private method
    def __add_transaction(self, description, amount):
        """Add a transaction to the history."""
        import datetime
        
        transaction = {
            "date": datetime.datetime.now(),
            "description": description,
            "amount": amount,
            "balance": self._balance
        }
        
        self.__transactions.append(transaction)
    
    # Special methods
    def __str__(self):
        return f"BankAccount of {self.owner} (#{self.__account_number}): Balance ${self._balance:.2f}"
    
    def __repr__(self):
        return f"BankAccount('{self.owner}', {self._balance})"
    
    # Class methods
    @classmethod
    def set_interest_rate(cls, rate):
        """Set the interest rate for all accounts."""
        if rate < 0:
            raise ValueError("Interest rate cannot be negative")
        cls.interest_rate = rate
    
    @classmethod
    def get_account_count(cls):
        """Get the total number of accounts."""
        return cls.account_count
    
    # Static method
    @staticmethod
    def validate_owner_name(name):
        """Validate that a name is appropriate for an account owner."""
        if not isinstance(name, str):
            return False
        if len(name.strip()) < 2:
            return False
        return True


# Using the BankAccount class
if __name__ == "__main__":
    # Create accounts
    alice_account = BankAccount("Alice Smith", 1000)
    bob_account = BankAccount("Bob Johnson", 500)
    
    # Display account information
    print(alice_account)  # BankAccount of Alice Smith (#10000): Balance $1000.00
    print(bob_account)    # BankAccount of Bob Johnson (#10001): Balance $500.00
    
    # Perform operations with method chaining
    alice_account.deposit(300).withdraw(50).apply_interest()
    
    # Transfer money
    alice_account.transfer(bob_account, 200)
    
    # Display updated balances
    print(f"{alice_account.owner}'s balance: ${alice_account.balance:.2f}")
    print(f"{bob_account.owner}'s balance: ${bob_account.balance:.2f}")
    
    # Check transaction history
    print("\nAlice's Transaction History:")
    for t in alice_account.transaction_history:
        print(f"{t['date'].strftime('%Y-%m-%d %H:%M:%S')} - {t['description']}: ${abs(t['amount']):.2f} - Balance: ${t['balance']:.2f}")
    
    # Use class methods
    print(f"\nTotal accounts: {BankAccount.get_account_count()}")
    
    # Change interest rate for all accounts
    BankAccount.set_interest_rate(0.02)  # Change to 2%
    print(f"New interest rate: {BankAccount.interest_rate * 100:.1f}%")
    
    # Validate a name using the static method
    print(f"Is 'John Doe' a valid owner name? {BankAccount.validate_owner_name('John Doe')}")
    print(f"Is 'J' a valid owner name? {BankAccount.validate_owner_name('J')}")
```

This comprehensive example demonstrates:
- Class and instance attributes
- Property decorators
- Public, protected, and private attributes
- Instance, class, and static methods
- Special methods
- Method chaining
- Various OOP best practices

## Exercises

**Exercise 1:** Create a `Rectangle` class with attributes for width and height. Include methods to calculate area and perimeter. Add a property that returns a tuple representing the dimensions and implement a method that allows the rectangle to be scaled by a given factor.

**Exercise 2:** Create a `Book` class to represent books in a library. Include attributes for title, author, ISBN, and availability status. Implement methods to check out and return the book. Use proper encapsulation with property decorators for attributes like ISBN that shouldn't change after initialization.

**Exercise 3:** Implement a `ShoppingCart` class that stores items added by the user. Each item should be a dictionary with a name, price, and quantity. Include methods to add items, remove items, update quantities, and calculate the total cost. Implement `__str__` and `__repr__` methods and a property for the item count.

**Hint for Exercise 1:** Use properties to ensure width and height cannot be negative. The scale method should multiply both dimensions by the factor and return self for method chaining.

In the next section, we'll explore constructors in more detail and how they work in Python's object-oriented programming model.