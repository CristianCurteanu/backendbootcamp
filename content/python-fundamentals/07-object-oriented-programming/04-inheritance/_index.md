---
title: 'Inheritance'
linkTitle: 'Inheritance'
weight: 33
---


Inheritance is one of the key principles of object-oriented programming (OOP) that allows a class to inherit attributes and methods from another class. The class that inherits is called a subclass (or derived class), and the class being inherited from is called a superclass (or base class). Inheritance promotes code reuse and establishes a relationship between classes.

## Basic Inheritance

Let's start with a simple example of inheritance:

```python
# Base class (superclass)
class Animal:
    def __init__(self, name, species):
        self.name = name
        self.species = species
        
    def make_sound(self):
        print("Some generic animal sound")
        
    def __str__(self):
        return f"{self.name} is a {self.species}"

# Derived class (subclass)
class Dog(Animal):
    def __init__(self, name, breed):
        # Call the base class's __init__ method
        super().__init__(name, species="Dog")
        self.breed = breed
        
    def make_sound(self):
        print("Woof!")
        
    def __str__(self):
        return f"{self.name} is a {self.breed} dog"

# Creating instances
generic_animal = Animal("Generic", "Unknown")
my_dog = Dog("Buddy", "Golden Retriever")

# Using methods
print(generic_animal)  # Generic is a Unknown
generic_animal.make_sound()  # Some generic animal sound

print(my_dog)  # Buddy is a Golden Retriever dog
my_dog.make_sound()  # Woof!
```

In this example, `Dog` inherits from `Animal`, which means that a `Dog` is a specialized version of an `Animal`. The `super()` function is used to call methods from the parent class, including the constructor.

**Important:**
When creating a subclass, you explicitly specify the parent class in parentheses: `class Subclass(ParentClass):`. This establishes the inheritance relationship.

## Advantages of Inheritance

1. **Code Reuse**: Inherit common functionality from parent classes instead of duplicating code
2. **Logical Hierarchy**: Establish is-a relationships between objects
3. **Specialization**: Customize behavior through method overriding
4. **Polymorphism**: Treat objects of different classes uniformly if they share a common parent
5. **Maintainability**: Changes to the parent class automatically apply to all child classes

## Method Overriding

Method overriding occurs when a subclass provides a specific implementation for a method already defined in its parent class. In the example above, `Dog` overrides the `make_sound()` method to provide dog-specific behavior.

```python
class Cat(Animal):
    def __init__(self, name, color):
        super().__init__(name, species="Cat")
        self.color = color
        
    def make_sound(self):
        print("Meow!")
        
    def purr(self):
        print(f"{self.name} is purring")

my_cat = Cat("Whiskers", "Orange")
my_cat.make_sound()  # Meow!
my_cat.purr()  # Whiskers is purring
```

The `Cat` class overrides the `make_sound()` method from `Animal` to provide cat-specific behavior.

## Extending Parent Methods

Instead of completely replacing a parent method, you can extend it by calling the parent implementation and then adding additional functionality:

```python
class Bird(Animal):
    def __init__(self, name, wingspan):
        super().__init__(name, species="Bird")
        self.wingspan = wingspan
        
    def make_sound(self):
        # Call the parent method first
        super().make_sound()
        # Then add additional functionality
        print("Chirp!")
        
    def fly(self):
        print(f"{self.name} is flying with a wingspan of {self.wingspan} cm")

my_bird = Bird("Tweety", 15)
my_bird.make_sound()  # Outputs: Some generic animal sound\nChirp!
my_bird.fly()  # Tweety is flying with a wingspan of 15 cm
```

By using `super().make_sound()`, you call the parent's version of the method before adding your custom behavior.

## Inheriting from Multiple Classes (Multiple Inheritance)

Python supports multiple inheritance, allowing a class to inherit from more than one parent class:

```python
class Flyable:
    def fly(self):
        print("Flying...")
    
    def land(self):
        print("Landing...")

class Swimmable:
    def swim(self):
        print("Swimming...")
    
    def dive(self):
        print("Diving...")

class Duck(Animal, Flyable, Swimmable):
    def __init__(self, name):
        super().__init__(name, species="Duck")
    
    def make_sound(self):
        print("Quack!")

donald = Duck("Donald")
donald.make_sound()  # Quack!
donald.fly()         # Flying...
donald.swim()        # Swimming...
donald.land()        # Landing...
```

In this example, `Duck` inherits from three classes: `Animal`, `Flyable`, and `Swimmable`. This allows the `Duck` class to have the behaviors of all three parent classes.

**Note:**
Multiple inheritance can lead to complex issues, especially the "diamond problem" where a class inherits from two classes that both inherit from a common base class. Python uses the Method Resolution Order (MRO) to determine which method to call.

## Method Resolution Order (MRO)

When using multiple inheritance, Python follows a specific order to resolve method calls, known as Method Resolution Order (MRO):

```python
class Base:
    def method(self):
        print("Base method")

class A(Base):
    def method(self):
        print("A method")

class B(Base):
    def method(self):
        print("B method")

class C(A, B):
    pass

c = C()
c.method()  # Outputs: A method

# View the MRO
print(C.__mro__)
# (<class '__main__.C'>, <class '__main__.A'>, <class '__main__.B'>, <class '__main__.Base'>, <class 'object'>)
```

To view the MRO of a class, you can use the `__mro__` attribute or the `mro()` method.

## Abstract Base Classes

Abstract base classes (ABCs) are classes that cannot be instantiated and are designed to be subclassed. They may contain abstract methods that must be implemented by their subclasses:

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass
    
    @abstractmethod
    def perimeter(self):
        pass
    
    def describe(self):
        print(f"This shape has an area of {self.area()} square units and a perimeter of {self.perimeter()} units.")

# This won't work - can't instantiate an abstract class
# my_shape = Shape()  # TypeError

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height
    
    def perimeter(self):
        return 2 * (self.width + self.height)

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        import math
        return math.pi * self.radius ** 2
    
    def perimeter(self):
        import math
        return 2 * math.pi * self.radius

# Create instances of concrete subclasses
rect = Rectangle(5, 10)
circ = Circle(7)

rect.describe()  # This shape has an area of 50 square units and a perimeter of 30 units.
circ.describe()  # This shape has an area of 153.93... square units and a perimeter of 43.98... units.
```

Abstract base classes ensure that derived classes implement specific methods, providing a form of interface enforcement in Python.

## Instance Checking and Inheritance

The `isinstance()` function checks if an object is an instance of a class or any of its subclasses:

```python
# Using our previously defined classes
print(isinstance(my_dog, Dog))      # True
print(isinstance(my_dog, Animal))   # True
print(isinstance(my_cat, Dog))      # False
print(isinstance(donald, Flyable))  # True
```

The `issubclass()` function checks if a class is a subclass of another class:

```python
print(issubclass(Dog, Animal))      # True
print(issubclass(Duck, Flyable))    # True
print(issubclass(Cat, Dog))         # False
```

## Inheritance Gotchas

1. **Attribute Shadowing**:

```python
class Parent:
    x = 10  # Class attribute

class Child(Parent):
    pass

class GrandChild(Child):
    x = 20  # Shadows Parent.x

print(Parent.x)      # 10
print(Child.x)       # 10 (inherited)
print(GrandChild.x)  # 20 (shadowed)
```

2. **Overriding Built-in Methods**:

```python
class MyList(list):
    def append(self, item):
        # Only append if item is not already in the list
        if item not in self:
            super().append(item)

unique_list = MyList([1, 2, 3])
unique_list.append(2)  # Won't be added (already exists)
unique_list.append(4)  # Will be added
print(unique_list)  # [1, 2, 3, 4]
```

3. **`super()` Calling Order with Multiple Inheritance**:

```python
class A:
    def method(self):
        print("A.method called")

class B:
    def method(self):
        print("B.method called")

class C(A, B):
    def method(self):
        print("C.method called")
        super().method()  # Calls A.method() due to MRO

class D(B, A):
    def method(self):
        print("D.method called")
        super().method()  # Calls B.method() due to MRO

c = C()
c.method()
# Output:
# C.method called
# A.method called

d = D()
d.method()
# Output:
# D.method called
# B.method called
```

## Practical Example: Creating a Library Management System

Let's apply inheritance to create a simple library management system:

```python
class LibraryItem:
    def __init__(self, title, item_id):
        self.title = title
        self.item_id = item_id
        self.checked_out = False
    
    def check_out(self):
        if not self.checked_out:
            self.checked_out = True
            return True
        return False
    
    def return_item(self):
        if self.checked_out:
            self.checked_out = False
            return True
        return False
    
    def __str__(self):
        status = "checked out" if self.checked_out else "available"
        return f"{self.title} ({self.item_id}) - {status}"

class Book(LibraryItem):
    def __init__(self, title, item_id, author, pages):
        super().__init__(title, item_id)
        self.author = author
        self.pages = pages
    
    def __str__(self):
        base_str = super().__str__()
        return f"{base_str} - by {self.author}, {self.pages} pages"

class DVD(LibraryItem):
    def __init__(self, title, item_id, director, runtime):
        super().__init__(title, item_id)
        self.director = director
        self.runtime = runtime
    
    def __str__(self):
        base_str = super().__str__()
        return f"{base_str} - directed by {self.director}, {self.runtime} minutes"

class Magazine(LibraryItem):
    def __init__(self, title, item_id, issue, month):
        super().__init__(title, item_id)
        self.issue = issue
        self.month = month
    
    def __str__(self):
        base_str = super().__str__()
        return f"{base_str} - Issue {self.issue}, {self.month}"

class Library:
    def __init__(self, name):
        self.name = name
        self.items = {}
    
    def add_item(self, item):
        self.items[item.item_id] = item
    
    def check_out_item(self, item_id):
        if item_id in self.items:
            return self.items[item_id].check_out()
        return False
    
    def return_item(self, item_id):
        if item_id in self.items:
            return self.items[item_id].return_item()
        return False
    
    def list_items(self):
        for item in self.items.values():
            print(item)

# Using the library system
my_library = Library("Community Library")

# Add items
book1 = Book("The Great Gatsby", "B001", "F. Scott Fitzgerald", 180)
book2 = Book("To Kill a Mockingbird", "B002", "Harper Lee", 281)
dvd1 = DVD("Inception", "D001", "Christopher Nolan", 148)
mag1 = Magazine("National Geographic", "M001", 37, "June 2023")

my_library.add_item(book1)
my_library.add_item(book2)
my_library.add_item(dvd1)
my_library.add_item(mag1)

# List all items
print("Library Inventory:")
my_library.list_items()

# Check out an item
print("\nChecking out The Great Gatsby...")
if my_library.check_out_item("B001"):
    print("Checkout successful!")
else:
    print("Checkout failed!")

# List items again to see the status change
print("\nUpdated Library Inventory:")
my_library.list_items()

# Return an item
print("\nReturning The Great Gatsby...")
if my_library.return_item("B001"):
    print("Return successful!")
else:
    print("Return failed!")

# List items again
print("\nFinal Library Inventory:")
my_library.list_items()
```

**Expected Output:**
```
Library Inventory:
The Great Gatsby (B001) - available - by F. Scott Fitzgerald, 180 pages
To Kill a Mockingbird (B002) - available - by Harper Lee, 281 pages
Inception (D001) - available - directed by Christopher Nolan, 148 minutes
National Geographic (M001) - available - Issue 37, June 2023

Checking out The Great Gatsby...
Checkout successful!

Updated Library Inventory:
The Great Gatsby (B001) - checked out - by F. Scott Fitzgerald, 180 pages
To Kill a Mockingbird (B002) - available - by Harper Lee, 281 pages
Inception (D001) - available - directed by Christopher Nolan, 148 minutes
National Geographic (M001) - available - Issue 37, June 2023

Returning The Great Gatsby...
Return successful!

Final Library Inventory:
The Great Gatsby (B001) - available - by F. Scott Fitzgerald, 180 pages
To Kill a Mockingbird (B002) - available - by Harper Lee, 281 pages
Inception (D001) - available - directed by Christopher Nolan, 148 minutes
National Geographic (M001) - available - Issue 37, June 2023
```

This example demonstrates how inheritance allows us to create specialized classes (`Book`, `DVD`, and `Magazine`) that inherit common functionality from a base class (`LibraryItem`), while adding their own unique attributes and behaviors.

## Best Practices for Inheritance

1. **"Is-a" Relationship**: Use inheritance only when there's a true "is-a" relationship (e.g., a Dog is an Animal).

2. **Favor Composition Over Inheritance**: When appropriate, use composition (having objects as attributes) rather than inheritance to build complex classes.

   ```python
   # Inheritance approach
   class Car(Vehicle):
       pass
       
   # Composition approach
   class Car:
       def __init__(self):
           self.engine = Engine()
           self.wheels = [Wheel() for _ in range(4)]
   ```

3. **Keep Inheritance Hierarchies Shallow**: Deep inheritance hierarchies can become difficult to understand and maintain. Try to keep them to a maximum of 2-3 levels.

4. **Use Abstract Base Classes for Interfaces**: When you want to enforce that certain methods are implemented, use abstract base classes.

5. **Document the Inheritance Design**: Make sure to document the purpose of the inheritance hierarchy and the responsibilities of each class.

6. **Follow the Liskov Substitution Principle**: Subclasses should be substitutable for their base classes without altering the desirable properties of the program.

## Exercises

**Exercise 1:** Create a base class `Employee` with attributes for name, id, and salary. Then create two subclasses: `Manager` (with an additional attribute for department) and `Developer` (with an additional attribute for programming language). Include appropriate methods in each class.

**Exercise 2:** Implement a simple banking system with a base class `Account` and derived classes `SavingsAccount` and `CheckingAccount`. The base class should handle the basic account operations, while the derived classes implement specific features like interest calculation for savings and overdraft protection for checking accounts.

**Exercise 3:** Create a class hierarchy for shapes as shown in the abstract base class example, but expand it to include more shapes like `Triangle`, `Square`, and `Ellipse`. Each class should properly implement the abstract methods and may include additional specialized methods.

**Hint for Exercise 1:** Start by defining the `Employee` class with an `__init__` method that takes name, id, and salary parameters. Then create the subclasses and use `super().__init__(...)` to initialize the common attributes before adding the specialized ones.

```python
# Exercise 1 solution outline
class Employee:
    def __init__(self, name, emp_id, salary):
        self.name = name
        self.emp_id = emp_id
        self.salary = salary
    
    def get_details(self):
        return f"Name: {self.name}, ID: {self.emp_id}, Salary: ${self.salary}"

class Manager(Employee):
    def __init__(self, name, emp_id, salary, department):
        super().__init__(name, emp_id, salary)
        self.department = department
    
    def get_details(self):
        base_details = super().get_details()
        return f"{base_details}, Department: {self.department}"
```

In the next section, we'll explore other object-oriented programming concepts in Python, including polymorphism and encapsulation.