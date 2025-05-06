---
title: 'Encapsulation in Python'
linkTitle: 'Encapsulation in Python'
weight: 35
---

Encapsulation is one of the four fundamental principles of object-oriented programming (OOP), alongside inheritance, polymorphism, and abstraction. It refers to the bundling of data (attributes) and methods (functions) that operate on the data into a single unit (a class), and restricting access to some of the object's components.

## Understanding Encapsulation

At its core, encapsulation serves two main purposes:

1. **Bundling related data and methods together**: This creates a coherent, self-contained unit that's easier to understand and use.
2. **Restricting access to certain components**: This prevents external code from directly modifying an object's internal state in potentially harmful ways.

Encapsulation can be thought of as creating a protective wrapper around your data to ensure it's only accessed or modified in controlled ways.

```python
# Example of a simple encapsulated class
class BankAccount:
    def __init__(self, account_number, balance):
        self._account_number = account_number  # Protected attribute
        self._balance = balance  # Protected attribute
    
    # Public methods to access and modify data in controlled ways
    def get_balance(self):
        return self._balance
    
    def deposit(self, amount):
        if amount > 0:
            self._balance += amount
            return True
        return False
    
    def withdraw(self, amount):
        if 0 < amount <= self._balance:
            self._balance -= amount
            return True
        return False
```

In this example, the `BankAccount` class encapsulates data (account number and balance) and provides methods that safely interact with this data. External code can't directly modify the balance, ensuring that deposits and withdrawals follow the business rules (positive deposits, no overdrafts).

## Access Modifiers in Python

Unlike languages like Java or C++, Python doesn't have strict access modifiers (like `private`, `protected`, `public`). Instead, it follows a convention-based approach:

1. **Public Members**: Attributes and methods that are accessible from outside the class. They have no special naming convention.

2. **Protected Members**: Attributes and methods that shouldn't be accessed from outside the class, but can be accessed by subclasses. They are prefixed with a single underscore (`_`).

3. **Private Members**: Attributes and methods that shouldn't be accessed from outside the class or by subclasses. They are prefixed with a double underscore (`__`).

```python
class Employee:
    def __init__(self, name, salary, employee_id):
        self.name = name               # Public attribute
        self._salary = salary          # Protected attribute
        self.__employee_id = employee_id  # Private attribute
    
    def get_id(self):                  # Public method
        return self.__employee_id
    
    def _calculate_bonus(self):        # Protected method
        return self._salary * 0.1
    
    def __update_internal_data(self):  # Private method
        # Some internal implementation
        pass
```

**Important:**
Python's private attributes are implemented using name mangling. The interpreter changes the name of the attribute to `_ClassName__attribute_name`. This means private attributes are still accessible if you know the mangled name, but this approach discourages direct access.

```python
employee = Employee("John Doe", 50000, "E12345")

# Accessing attributes
print(employee.name)              # Works: Public attribute
print(employee._salary)           # Works, but not recommended: Protected attribute
# print(employee.__employee_id)   # Error: Private attribute is not directly accessible

# Name mangling allows access, but strongly discouraged
print(employee._Employee__employee_id)  # Works, but very bad practice
```

## Getters and Setters in Python

Getters and setters are methods that provide controlled access to attributes. They allow you to:

1. Validate data before assigning it to an attribute
2. Compute derived attributes on-the-fly
3. Enforce encapsulation rules
4. Change implementation details without affecting the public interface

```python
class Person:
    def __init__(self, name, age):
        self._name = name
        self._age = age
    
    # Getter for name
    def get_name(self):
        return self._name
    
    # Setter for name
    def set_name(self, name):
        if isinstance(name, str) and name:
            self._name = name
        else:
            raise ValueError("Name must be a non-empty string")
    
    # Getter for age
    def get_age(self):
        return self._age
    
    # Setter for age with validation
    def set_age(self, age):
        if isinstance(age, int) and 0 <= age <= 120:
            self._age = age
        else:
            raise ValueError("Age must be an integer between 0 and 120")
```

## Properties in Python

Python provides a more elegant way to implement getters and setters using the `@property` decorator and its corresponding setter, which allows you to access the methods as if they were attributes:

```python
class Person:
    def __init__(self, name, age):
        self._name = name
        self._age = age
    
    # Property for name
    @property
    def name(self):
        """Get the person's name."""
        return self._name
    
    @name.setter
    def name(self, value):
        """Set the person's name with validation."""
        if isinstance(value, str) and value:
            self._name = value
        else:
            raise ValueError("Name must be a non-empty string")
    
    # Property for age
    @property
    def age(self):
        """Get the person's age."""
        return self._age
    
    @age.setter
    def age(self, value):
        """Set the person's age with validation."""
        if isinstance(value, int) and 0 <= value <= 120:
            self._age = value
        else:
            raise ValueError("Age must be an integer between 0 and 120")
    
    # Read-only property (no setter)
    @property
    def is_adult(self):
        """Check if the person is an adult."""
        return self._age >= 18
```

With properties, you can use a more natural syntax while still enforcing encapsulation:

```python
person = Person("Alice", 30)

# Using properties like attributes (but they're methods)
print(person.name)      # Uses the @property getter
person.name = "Alicia"  # Uses the @name.setter

print(person.age)       # Uses the @property getter
person.age = 31         # Uses the @age.setter

print(person.is_adult)  # Uses the @property getter (read-only)
# person.is_adult = False  # Error: can't set attribute (no setter defined)
```

**Note:**
Properties provide a clean way to implement encapsulation without changing how client code interacts with your classes. They're especially useful when you start with simple public attributes and later need to add validation or computation.

## Data Encapsulation with Immutable Objects

Another form of encapsulation in Python is creating immutable objects—objects whose state cannot be modified after creation. This is a strong form of encapsulation because it guarantees that an object's state remains consistent throughout its lifetime.

```python
class ImmutablePoint:
    def __init__(self, x, y):
        self.__x = x
        self.__y = y
    
    @property
    def x(self):
        return self.__x
    
    @property
    def y(self):
        return self.__y
    
    # Instead of modifying, create a new instance
    def move(self, dx, dy):
        return ImmutablePoint(self.__x + dx, self.__y + dy)
    
    def __str__(self):
        return f"Point({self.__x}, {self.__y})"
```

In this example, `ImmutablePoint` provides read-only properties for `x` and `y`, and operations like `move()` return a new instance rather than modifying the existing one.

## Practical Example: Library Management System

Let's see encapsulation in action with a more complex example of a library management system:

```python
class Book:
    def __init__(self, title, author, isbn, available=True):
        self.__title = title
        self.__author = author
        self.__isbn = isbn
        self.__available = available
        self.__borrower = None
    
    @property
    def title(self):
        return self.__title
    
    @property
    def author(self):
        return self.__author
    
    @property
    def isbn(self):
        return self.__isbn
    
    @property
    def is_available(self):
        return self.__available
    
    @property
    def borrower(self):
        return self.__borrower
    
    def borrow(self, patron_id):
        """Attempt to borrow this book."""
        if self.__available:
            self.__available = False
            self.__borrower = patron_id
            return True
        return False
    
    def return_book(self):
        """Return this book to the library."""
        self.__available = True
        self.__borrower = None


class Library:
    def __init__(self, name):
        self.__name = name
        self.__books = {}  # ISBN -> Book mapping
        self.__patrons = set()  # Set of registered patron IDs
    
    @property
    def name(self):
        return self.__name
    
    @property
    def book_count(self):
        return len(self.__books)
    
    @property
    def patron_count(self):
        return len(self.__patrons)
    
    def add_book(self, book):
        """Add a book to the library collection."""
        if not isinstance(book, Book):
            raise TypeError("Can only add Book objects to the library")
        self.__books[book.isbn] = book
    
    def register_patron(self, patron_id):
        """Register a new patron."""
        self.__patrons.add(patron_id)
    
    def borrow_book(self, isbn, patron_id):
        """
        Process a book borrowing request.
        
        Returns:
            - True if successful
            - False if book is unavailable
            - None if book or patron doesn't exist
        """
        if isbn not in self.__books:
            return None
        
        if patron_id not in self.__patrons:
            return None
        
        return self.__books[isbn].borrow(patron_id)
    
    def return_book(self, isbn):
        """Process a book return."""
        if isbn in self.__books:
            self.__books[isbn].return_book()
            return True
        return False
    
    def get_available_books(self):
        """Get a list of available books."""
        return [book for book in self.__books.values() if book.is_available]
    
    def get_borrowed_books(self):
        """Get a list of borrowed books."""
        return [book for book in self.__books.values() if not book.is_available]


# Using the library system
def main():
    # Create a library
    central_library = Library("Central City Library")
    
    # Add books
    book1 = Book("Python Programming", "John Smith", "978-1-123456-78-9")
    book2 = Book("Data Structures", "Jane Doe", "978-1-234567-89-0")
    central_library.add_book(book1)
    central_library.add_book(book2)
    
    # Register patrons
    central_library.register_patron("P001")
    central_library.register_patron("P002")
    
    # Borrow books
    success = central_library.borrow_book("978-1-123456-78-9", "P001")
    print(f"Borrowing result: {success}")
    
    # Check status
    available_books = central_library.get_available_books()
    borrowed_books = central_library.get_borrowed_books()
    
    print("\nAvailable Books:")
    for book in available_books:
        print(f"- {book.title} by {book.author}")
    
    print("\nBorrowed Books:")
    for book in borrowed_books:
        print(f"- {book.title} by {book.author}, borrowed by {book.borrower}")
    
    # Return a book
    central_library.return_book("978-1-123456-78-9")
    print("\nAfter return, available books:")
    for book in central_library.get_available_books():
        print(f"- {book.title} by {book.author}")


if __name__ == "__main__":
    main()
```

In this example:
- The `Book` class encapsulates book details and the borrowing state
- The `Library` class encapsulates the collection of books and patron information
- Both classes use private attributes (with double underscores) to protect their internal state
- Public methods provide controlled ways to interact with these classes
- Properties provide read-only access to certain attributes

## Benefits of Encapsulation

1. **Data Protection**: Prevents accidental or unauthorized changes to important data

2. **Flexibility**: Implementation details can be changed without affecting code that uses the class

3. **Maintainability**: Clean interfaces make code easier to understand and maintain

4. **Data Validation**: Ensures that data remains in a valid state

5. **Information Hiding**: Simplifies the user's view of the object by hiding complex implementation details

## Common Encapsulation Patterns

### 1. Private Implementation, Public Interface

```python
class SortedList:
    def __init__(self):
        self.__items = []  # Private implementation
    
    # Public interface
    def add(self, item):
        self.__items.append(item)
        self.__items.sort()
    
    def get_items(self):
        return list(self.__items)  # Return a copy to prevent modification
    
    def __len__(self):
        return len(self.__items)
```

### 2. Computed/Derived Properties

```python
class Rectangle:
    def __init__(self, width, height):
        self.__width = width
        self.__height = height
    
    @property
    def width(self):
        return self.__width
    
    @width.setter
    def width(self, value):
        if value > 0:
            self.__width = value
        else:
            raise ValueError("Width must be positive")
    
    @property
    def height(self):
        return self.__height
    
    @height.setter
    def height(self, value):
        if value > 0:
            self.__height = value
        else:
            raise ValueError("Height must be positive")
    
    # Computed property
    @property
    def area(self):
        return self.__width * self.__height
    
    @property
    def perimeter(self):
        return 2 * (self.__width + self.__height)
```

### 3. State Management

```python
class TrafficLight:
    def __init__(self):
        self.__states = ["red", "yellow", "green"]
        self.__current_state_index = 0
    
    @property
    def current_state(self):
        return self.__states[self.__current_state_index]
    
    def change_state(self):
        self.__current_state_index = (self.__current_state_index + 1) % len(self.__states)
        return self.current_state
```

## Common Pitfalls and Best Practices

## Pitfalls

1. **Overusing Private Attributes**: While encapsulation is important, making everything private can create unnecessary complexity. Use private attributes only when needed.

2. **Exposing Implementation Details**: If you expose too many details about how a class works internally, it becomes harder to change the implementation later.

3. **Inconsistent Access Patterns**: Mixing direct attribute access, getters/setters, and properties can make code confusing. Try to be consistent.

4. **Forgetting Documentation**: Well-encapsulated code still needs good documentation to explain what methods do, especially if the implementation is hidden.

## Best Practices

1. **Design for Public Consumption**: Think about how your class will be used by others before deciding what to make public or private.

2. **Use Properties for Attribute Access Control**: Properties provide a clean way to maintain encapsulation without cluttering your class with getter/setter methods.

3. **Start Simple**: Begin with simple public attributes. If you later need validation or computed values, you can convert to properties without changing how the class is used.

4. **Return Copies of Mutable Objects**: When returning a reference to a mutable internal object (like a list), return a copy to prevent external modification.

```python
class Customer:
    def __init__(self, name):
        self.__name = name
        self.__orders = []
    
    @property
    def name(self):
        return self.__name
    
    def add_order(self, order):
        self.__orders.append(order)
    
    @property
    def orders(self):
        return list(self.__orders)  # Return a copy, not the original list
```

5. **Document Access Levels**: Use docstrings to clarify which attributes and methods are part of the public interface and which are internal implementation details.

## Exercises

**Exercise 1:** Create a `BankAccount` class with private attributes for account number, holder name, and balance. Include methods for deposit, withdrawal, and checking the balance. Ensure that the account number can't be changed after creation, and the balance can only be modified through deposits and withdrawals.

**Exercise 2:** Enhance the `BankAccount` class by adding properties for `account_number`, `holder_name`, and `balance`. Make `account_number` a read-only property, `holder_name` a property that can be read and modified, and `balance` a read-only property. Add a method to get the account details as a dictionary.

**Exercise 3:** Create a `ShoppingCart` class that encapsulates a collection of items and their quantities. The class should have methods to add items, remove items, update quantities, calculate the total price, and clear the cart. Use appropriate encapsulation techniques to ensure the internal representation of the cart can't be directly modified.

**Hint for Exercise 1:** 
```python
class BankAccount:
    def __init__(self, account_number, holder_name, initial_balance=0):
        self.__account_number = account_number
        self.__holder_name = holder_name
        self.__balance = initial_balance
        
    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            return True
        return False
    
    # Implement withdrawal and check_balance methods
```

In the next section, we'll explore inheritance in Python, which allows you to create a hierarchy of classes and reuse code from parent classes.