---
title: 'Classes and Objects in Python'
linkTitle: 'Classes and Objects in Python'
weight: 30
---


Object-Oriented Programming (OOP) is a programming paradigm that uses "objects" to model real-world entities. Python is a multi-paradigm programming language that fully supports object-oriented programming through its class system.

## Understanding Python's Object-Oriented Programming

Before diving into the syntax, let's understand the fundamental concepts of OOP:

1. **Classes**: Templates or blueprints that define the structure and behavior of objects.
2. **Objects**: Instances of classes, representing specific entities.
3. **Attributes**: Data stored inside an object (variables).
4. **Methods**: Functions that define what an object can do.
5. **Encapsulation**: Bundling data and methods that work on that data within a single unit.
6. **Inheritance**: The ability to create new classes that inherit properties and methods from existing classes.
7. **Polymorphism**: The ability to use a single interface with different underlying forms.

## Creating a Class

In Python, you define a class using the `class` keyword:

```python
class Dog:
    # Class attribute - shared by all instances
    species = "Canis familiaris"
    
    # Initializer / Constructor
    def __init__(self, name, age):
        # Instance attributes - unique to each instance
        self.name = name
        self.age = age
    
    # Instance method
    def description(self):
        return f"{self.name} is {self.age} years old"
    
    # Another instance method
    def speak(self, sound):
        return f"{self.name} says {sound}"
```

Let's break down this class definition:

- `class Dog:` - This declares a new class named `Dog`.
- `species = "Canis familiaris"` - This is a class attribute, shared by all instances of the class.
- `def __init__(self, name, age):` - This is the initializer method (constructor). It's called when you create a new instance. The `self` parameter refers to the instance being created.
- `self.name = name` - Creating instance attributes by assigning values to `self.<attribute_name>`.
- `def description(self):` - This is an instance method. It can access and modify the instance's attributes via the `self` parameter.

**Note:**
In Python methods, the first parameter is always a reference to the current instance of the class. By convention, this parameter is named `self`, but you could technically use any name (though it's strongly recommended to stick with the convention).

## Creating Objects (Instances)

Once you've defined a class, you can create objects (instances) of that class:

```python
# Create instances of the Dog class
buddy = Dog("Buddy", 9)
miles = Dog("Miles", 4)

# Access attributes
print(buddy.name)   # Output: Buddy
print(miles.age)    # Output: 4

# Access class attribute through instances
print(buddy.species)  # Output: Canis familiaris
print(miles.species)  # Output: Canis familiaris

# Access class attribute through the class itself
print(Dog.species)  # Output: Canis familiaris

# Call methods
print(buddy.description())  # Output: Buddy is 9 years old
print(miles.speak("Woof"))  # Output: Miles says Woof
```

Each object has its own set of attributes (like `name` and `age`) but shares class attributes (like `species`).

## Instance Methods in Detail

Instance methods are functions defined within a class that operate on instances of that class. They always take `self` as their first parameter:

```python
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height
    
    def perimeter(self):
        return 2 * (self.width + self.height)
    
    def resize(self, width, height):
        self.width = width
        self.height = height
        return self.area()  # Returns the new area

# Create a rectangle
rect = Rectangle(10, 5)
print(f"Area: {rect.area()}")         # Output: Area: 50
print(f"Perimeter: {rect.perimeter()}") # Output: Perimeter: 30

# Resize the rectangle and get the new area
new_area = rect.resize(20, 10)
print(f"New area: {new_area}")        # Output: New area: 200
```

## Class Methods and Static Methods

Python allows you to define methods that are bound to the class rather than its instances:

### Class Methods

Class methods are methods that are bound to the class rather than its instances. They can access and modify class state. You define a class method using the `@classmethod` decorator:

```python
class Person:
    # Class attribute
    count = 0
    
    def __init__(self, name):
        self.name = name
        # Increment the count when a new instance is created
        Person.count += 1
    
    @classmethod
    def number_of_people(cls):
        return cls.count
    
    @classmethod
    def create_anonymous(cls):
        return cls("Anonymous")

# Create instances
person1 = Person("Alice")
person2 = Person("Bob")

# Call class method
print(Person.number_of_people())  # Output: 2

# Create an instance using a class method
anonymous = Person.create_anonymous()
print(anonymous.name)  # Output: Anonymous
print(Person.number_of_people())  # Output: 3
```

Class methods receive the class itself as the first parameter, conventionally named `cls`.

### Static Methods

Static methods are methods that are bound to the class but don't access or modify class or instance state. You define a static method using the `@staticmethod` decorator:

```python
class MathUtils:
    @staticmethod
    def add(x, y):
        return x + y
    
    @staticmethod
    def multiply(x, y):
        return x * y

# Call static methods directly on the class
print(MathUtils.add(5, 3))       # Output: 8
print(MathUtils.multiply(5, 3))  # Output: 15

# You can also call static methods on instances, but it's not common practice
math = MathUtils()
print(math.add(5, 3))  # Output: 8
```

Static methods don't receive a special first parameter. They behave like regular functions but belong to the class's namespace.

**Important:**
- Use **instance methods** when you need to access or modify instance state.
- Use **class methods** when you need to access or modify class state.
- Use **static methods** when you don't need to access or modify instance or class state.

## Properties

Properties allow you to define methods that can be accessed like attributes, providing better control over attribute access:

```python
class Circle:
    def __init__(self, radius):
        self._radius = radius  # Using underscore to indicate "private" attribute
    
    @property
    def radius(self):
        """Get the radius of the circle."""
        return self._radius
    
    @radius.setter
    def radius(self, value):
        """Set the radius of the circle."""
        if value <= 0:
            raise ValueError("Radius must be positive")
        self._radius = value
    
    @property
    def diameter(self):
        """Get the diameter of the circle."""
        return 2 * self._radius
    
    @property
    def area(self):
        """Get the area of the circle."""
        import math
        return math.pi * self._radius ** 2

# Create a circle
circle = Circle(5)

# Access properties as if they were attributes
print(f"Radius: {circle.radius}")    # Output: Radius: 5
print(f"Diameter: {circle.diameter}")  # Output: Diameter: 10
print(f"Area: {circle.area:.2f}")    # Output: Area: 78.54

# Modify radius using the setter
circle.radius = 7
print(f"New radius: {circle.radius}")  # Output: New radius: 7
print(f"New area: {circle.area:.2f}")  # Output: New area: 153.94

# This will raise a ValueError
try:
    circle.radius = -1
except ValueError as e:
    print(f"Error: {e}")  # Output: Error: Radius must be positive

# Properties without setters are read-only
try:
    circle.area = 100  # This will raise an AttributeError
except AttributeError as e:
    print(f"Error: {e}")  # Output: Error: can't set attribute
```

Properties provide several benefits:
- They allow computed attributes.
- They enable validation when setting attribute values.
- They maintain backward compatibility if you need to change how an attribute is calculated.
- They can be read-only if you only define the getter.

## Instance Variables vs. Class Variables

Understanding the difference between instance variables and class variables is critical:

```python
class Dog:
    # Class variable
    species = "Canis familiaris"
    
    # Class variable (mutable - be careful!)
    tricks = []
    
    def __init__(self, name):
        # Instance variable
        self.name = name
    
    def add_trick(self, trick):
        # This modifies the class variable!
        self.tricks.append(trick)

# Create two dogs
dog1 = Dog("Buddy")
dog2 = Dog("Max")

# Add a trick for dog1
dog1.add_trick("roll over")
print(dog1.tricks)  # Output: ['roll over']

# But dog2 also has the trick!
print(dog2.tricks)  # Output: ['roll over']
```

This behavior might be surprising! Since `tricks` is a class variable and lists are mutable, changes to it affect all instances. The correct approach for instance-specific lists:

```python
class Dog:
    # Class variable
    species = "Canis familiaris"
    
    def __init__(self, name):
        # Instance variable
        self.name = name
        # Initialize an empty list for each instance
        self.tricks = []
    
    def add_trick(self, trick):
        # This modifies the instance variable
        self.tricks.append(trick)

# Create two dogs
dog1 = Dog("Buddy")
dog2 = Dog("Max")

# Add a trick for dog1
dog1.add_trick("roll over")
print(dog1.tricks)  # Output: ['roll over']

# dog2's tricks are separate
print(dog2.tricks)  # Output: []
```

**Note:**
Be cautious when using mutable types (like lists or dictionaries) as class variables. If you want each instance to have its own copy, initialize them in the `__init__` method as instance variables.

## Private and Protected Attributes

Python doesn't have true private attributes, but it does have naming conventions:

- **Public attributes**: Regular names, accessible from anywhere.
- **Protected attributes**: Names with a single leading underscore (`_name`), indicating they shouldn't be accessed directly (by convention).
- **Name-mangled attributes**: Names with double leading underscores (`__name`), which are transformed by Python to avoid name conflicts in subclasses.

```python
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner          # Public attribute
        self._balance = balance     # Protected attribute (by convention)
        self.__account_num = "12345"  # Name-mangled attribute
    
    def deposit(self, amount):
        self._balance += amount
        return self._balance
    
    def withdraw(self, amount):
        if amount > self._balance:
            return "Insufficient funds"
        self._balance -= amount
        return self._balance
    
    def get_balance(self):
        return self._balance
    
    def get_account_details(self):
        # We can access the mangled attribute within the class
        return f"Account for {self.owner}, Account #: {self.__account_num}"

# Create an account
account = BankAccount("Alice", 1000)

# Accessing public attribute
print(account.owner)  # Output: Alice

# Accessing protected attribute (possible but discouraged)
print(account._balance)  # Output: 1000

# Accessing name-mangled attribute
try:
    print(account.__account_num)  # This raises an AttributeError
except AttributeError as e:
    print(f"Error: {e}")  # Output: Error: 'BankAccount' object has no attribute '__account_num'

# The mangled name is actually accessible if you know the pattern
print(account._BankAccount__account_num)  # Output: 12345

# Using the public methods
print(account.deposit(500))  # Output: 1500
print(account.withdraw(200))  # Output: 1300
print(account.get_balance())  # Output: 1300
print(account.get_account_details())  # Output: Account for Alice, Account #: 12345
```

**Important:**
Python's approach to privacy is based on the principle "we're all consenting adults here." It doesn't prevent access to attributes but uses naming conventions to indicate developer intent.

## Practical Example: Building a Library System

Let's build a more complex example of a library system using classes and objects:

```python
class Book:
    def __init__(self, title, author, isbn, publication_year, available=True):
        self.title = title
        self.author = author
        self.isbn = isbn
        self.publication_year = publication_year
        self.available = available
    
    def __str__(self):
        return f"{self.title} by {self.author} ({self.publication_year})"
    
    def check_out(self):
        if self.available:
            self.available = False
            return True
        return False
    
    def return_book(self):
        self.available = True


class Library:
    def __init__(self, name):
        self.name = name
        self.books = []
    
    def add_book(self, book):
        self.books.append(book)
    
    def remove_book(self, isbn):
        for book in self.books:
            if book.isbn == isbn:
                self.books.remove(book)
                return True
        return False
    
    def search_by_title(self, title):
        results = []
        for book in self.books:
            if title.lower() in book.title.lower():
                results.append(book)
        return results
    
    def search_by_author(self, author):
        results = []
        for book in self.books:
            if author.lower() in book.author.lower():
                results.append(book)
        return results
    
    def check_out_book(self, isbn):
        for book in self.books:
            if book.isbn == isbn:
                return book.check_out()
        return False
    
    def return_book(self, isbn):
        for book in self.books:
            if book.isbn == isbn:
                book.return_book()
                return True
        return False
    
    def get_available_books(self):
        return [book for book in self.books if book.available]
    
    def get_checked_out_books(self):
        return [book for book in self.books if not book.available]


class Member:
    def __init__(self, name, member_id):
        self.name = name
        self.member_id = member_id
        self.checked_out_books = []
    
    def check_out_book(self, book):
        if book.check_out():
            self.checked_out_books.append(book)
            return True
        return False
    
    def return_book(self, book):
        if book in self.checked_out_books:
            book.return_book()
            self.checked_out_books.remove(book)
            return True
        return False
    
    def __str__(self):
        return f"Member: {self.name} (ID: {self.member_id})"


# Create a library
city_library = Library("City Public Library")

# Add books to the library
book1 = Book("The Great Gatsby", "F. Scott Fitzgerald", "9780743273565", 1925)
book2 = Book("To Kill a Mockingbird", "Harper Lee", "9780061120084", 1960)
book3 = Book("1984", "George Orwell", "9780451524935", 1949)
book4 = Book("Pride and Prejudice", "Jane Austen", "9780141439518", 1813)

city_library.add_book(book1)
city_library.add_book(book2)
city_library.add_book(book3)
city_library.add_book(book4)

# Create a member
alice = Member("Alice Johnson", "M001")

# Search for books
print("Search results for 'the':")
for book in city_library.search_by_title("the"):
    print(f"- {book}")

# Alice checks out a book
print("\nAlice checks out 'The Great Gatsby':")
if alice.check_out_book(book1):
    print(f"Successfully checked out: {book1}")
else:
    print(f"Failed to check out: {book1}")

# List available books
print("\nAvailable books:")
for book in city_library.get_available_books():
    print(f"- {book}")

# List checked out books
print("\nChecked out books:")
for book in city_library.get_checked_out_books():
    print(f"- {book}")

# Alice returns the book
print("\nAlice returns 'The Great Gatsby':")
if alice.return_book(book1):
    print(f"Successfully returned: {book1}")
else:
    print(f"Failed to return: {book1}")

# Verify it's available again
print("\nAvailable books after return:")
for book in city_library.get_available_books():
    print(f"- {book}")
```

This library system demonstrates several OOP concepts:
- Classes representing real-world entities (Book, Library, Member)
- Encapsulation of data and methods
- Object interaction (Members check out Books from a Library)
- Data validation (can't check out an unavailable book)

## Special Methods (Magic Methods)

Python classes can implement special methods (also called magic methods or dunder methods) that enable instances to work with Python's built-in functions and operators:

```python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    # String representation
    def __str__(self):
        return f"Vector({self.x}, {self.y})"
    
    # Detailed string representation
    def __repr__(self):
        return f"Vector({self.x}, {self.y})"
    
    # Addition (v1 + v2)
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)
    
    # Subtraction (v1 - v2)
    def __sub__(self, other):
        return Vector(self.x - other.x, self.y - other.y)
    
    # Equality comparison (v1 == v2)
    def __eq__(self, other):
        return self.x == other.x and self.y == other.y
    
    # Get length of vector (len(v))
    def __len__(self):
        import math
        return int(math.sqrt(self.x ** 2 + self.y ** 2))
    
    # Make object callable (v())
    def __call__(self):
        return (self.x, self.y)

# Create vectors
v1 = Vector(3, 4)
v2 = Vector(5, 6)

# Use the special methods
print(v1)          # Output: Vector(3, 4)
print(v1 + v2)     # Output: Vector(8, 10)
print(v1 - v2)     # Output: Vector(-2, -2)
print(v1 == v2)    # Output: False
print(len(v1))     # Output: 5
print(v1())        # Output: (3, 4)
```

Here are some common special methods:

| Method | Description | Example |
|--------|-------------|---------|
| `__init__(self, ...)` | Constructor | `obj = MyClass()` |
| `__str__(self)` | String representation for users | `print(obj)` |
| `__repr__(self)` | String representation for developers | `repr(obj)` |
| `__len__(self)` | Length | `len(obj)` |
| `__add__(self, other)` | Addition | `obj1 + obj2` |
| `__sub__(self, other)` | Subtraction | `obj1 - obj2` |
| `__mul__(self, other)` | Multiplication | `obj1 * obj2` |
| `__truediv__(self, other)` | Division | `obj1 / obj2` |
| `__eq__(self, other)` | Equality | `obj1 == obj2` |
| `__lt__(self, other)` | Less than | `obj1 < obj2` |
| `__gt__(self, other)` | Greater than | `obj1 > obj2` |
| `__getitem__(self, key)` | Indexing | `obj[key]` |
| `__call__(self, ...)` | Calling as function | `obj()` |

## Common Mistakes and Gotchas

### 1. Forgetting `self` Parameter

One of the most common mistakes is forgetting to include `self` as the first parameter in instance methods:

```python
class Counter:
    def __init__(self):
        self.count = 0
    
    # Incorrect: missing self parameter
    def increment():
        self.count += 1  # This will raise an error
    
    # Correct
    def decrement(self):
        self.count -= 1
```

### 2. Modifying Class Variables Unintentionally

As we saw earlier, modifying mutable class variables affects all instances:

```python
class MyClass:
    shared_list = []  # Shared among all instances
    
    def add_item(self, item):
        self.shared_list.append(item)  # Modifies the class variable for all instances
```

### 3. Shadow Instance Variables

If an instance variable has the same name as a class variable, it shadows (hides) the class variable:

```python
class Example:
    value = 10  # Class variable
    
    def update_value(self, new_value):
        self.value = new_value  # Creates an instance variable, doesn't affect the class variable

e1 = Example()
e2 = Example()

print(e1.value)  # Output: 10
e1.update_value(20)
print(e1.value)  # Output: 20
print(e2.value)  # Output: 10 (unchanged)
print(Example.value)  # Output: 10 (unchanged)
```

### 4. Circular References

Circular references can prevent objects from being garbage collected:

```python
class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

# Create a circular reference
node1 = Node(1)
node2 = Node(2)
node1.next = node2
node2.next = node1  # Circular reference

# These objects reference each other, so they won't be garbage collected
# until the reference is explicitly broken
```

## Best Practices

### 1. Follow Naming Conventions

- **Class names** should use CapWords convention (e.g., `BankAccount`).
- **Method and attribute names** should use lowercase with underscores (e.g., `calculate_interest`).
- **Protected attributes** should have a single leading underscore (e.g., `_balance`).
- **"Private" attributes** should have double leading underscores (e.g., `__account_num`).

### 2. Use Properties for Attribute Access Control

Instead of direct attribute access, use properties for validation and computed attributes:

```python
class Temperature:
    def __init__(self, celsius=0):
        self._celsius = celsius
    
    @property
    def celsius(self):
        return self._celsius
    
    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Temperature cannot be below absolute zero")
        self._celsius = value
    
    @property
    def fahrenheit(self):
        return self._celsius * 9/5 + 32
    
    @fahrenheit.setter
    def fahrenheit(self, value):
        self.celsius = (value - 32) * 5/9
```

### 3. Write Clear Docstrings

Document your classes and methods with informative docstrings:

```python
class BankAccount:
    """
    A class representing a bank account.
    
    Attributes:
        owner (str): The name of the account owner.
        balance (float): The current account balance.
    """
    
    def __init__(self, owner, balance=0):
        """
        Initialize a new BankAccount.
        
        Args:
            owner (str): The name of the account owner.
            balance (float, optional): The initial balance. Defaults to 0.
        """
        self.owner = owner
        self.balance = balance
    
    def deposit(self, amount):
        """
        Deposit money into the account.
        
        Args:
            amount (float): The amount to deposit.
            
        Returns:
            float: The new balance.
            
        Raises:
            ValueError: If amount is negative.
        """
        if amount < 0:
            raise ValueError("Cannot deposit negative amount")
        self.balance += amount
        return self.balance
```

### 4. Keep Classes Focused

Each class should have a single responsibility. If a class is doing too many things, consider splitting it into multiple classes:

```python
# Instead of one large class
class CustomerOrder:
    def __init__(self, customer_name, items):
        self.customer_name = customer_name
        self.items = items
    
    # Methods for customer info, order processing, payment, shipping, etc.

# Better approach: Split into focused classes
class Customer:
    def __init__(self, name, email, address):
        self.name = name
        self.email = email
        self.address = address

class Order:
    def __init__(self, customer, items):
        self.customer = customer
        self.items = items
        self.total = sum(item.price for item in items)

class PaymentProcessor:
    def process_payment(self, order, payment_method):
        # Payment processing logic
        pass

class ShippingManager:
    def ship_order(self, order):
        # Shipping logic
        pass
```

## Exercises

**Exercise 1:** Create a `Rectangle` class with attributes for width and height. Include methods to calculate the area and perimeter. Add a method `is_square()` that returns True if the rectangle is a square.

**Exercise 2:** Create a `BankAccount` class with methods for deposit and withdrawal. Ensure that withdrawals cannot exceed the account balance. Add a method to display the account details.

**Exercise 3:** Design a `Student` class to track student information. Include attributes for name, ID, and a list of courses. Add methods to add a course, drop a course, and calculate the GPA based on course grades.

**Exercise 4:** Create a `ShoppingCart` class that simulates an online shopping cart. Allow users to add items, remove items, and calculate the total cost. Each item should have a name, price, and quantity.

**Hint for Exercise 1:**
```python
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height
    
    def perimeter(self):
        return 2 * (self.width + self.height)
    
    def is_square(self):
        return self.width == self.height
```

In the next section, we'll explore the concept of inheritance, which allows you to create new classes that inherit attributes and methods from existing classes.
