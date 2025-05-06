---
title: 'Polymorphism'
linkTitle: 'Polymorphism'
weight: 34
---


Polymorphism is a core concept in object-oriented programming that allows objects of different classes to be treated as objects of a common superclass. The term comes from Greek words meaning "many forms," and that's exactly what polymorphism allows: a single interface to entities of different types.

## Understanding Polymorphism

In Python, polymorphism allows you to define methods in different classes with the same name, enabling you to call the same method on different objects and get different results. This promotes code reusability and flexibility.

There are several ways polymorphism manifests in Python:

### 1. Method Overriding

Method overriding occurs when a subclass provides a specific implementation of a method that is already defined in its parent class. When you call the method on an instance of the subclass, the overridden method in the subclass is executed instead of the parent class method.

```python
class Animal:
    def speak(self):
        print("Animal makes a sound")

class Dog(Animal):
    def speak(self):
        print("Dog barks")

class Cat(Animal):
    def speak(self):
        print("Cat meows")

# Create instances
animal = Animal()
dog = Dog()
cat = Cat()

# Call the speak method on each object
animal.speak()  # Output: Animal makes a sound
dog.speak()     # Output: Dog barks
cat.speak()     # Output: Cat meows
```

In this example, the `speak()` method is defined in the `Animal` class and overridden in both the `Dog` and `Cat` subclasses. Each class provides its own implementation of the method, demonstrating polymorphism through method overriding.

### 2. Duck Typing

Python's approach to polymorphism is closely tied to the concept of "duck typing," which follows the principle: "If it walks like a duck and quacks like a duck, then it probably is a duck." This means Python doesn't care about the type of an object, only that it implements the methods or attributes being accessed.

```python
class Dog:
    def speak(self):
        print("Woof!")

class Cat:
    def speak(self):
        print("Meow!")

class Duck:
    def speak(self):
        print("Quack!")

def make_speak(animal):
    animal.speak()

# Create instances
dog = Dog()
cat = Cat()
duck = Duck()

# Use polymorphism through duck typing
make_speak(dog)   # Output: Woof!
make_speak(cat)   # Output: Meow!
make_speak(duck)  # Output: Quack!
```

In this example, the `make_speak()` function doesn't care about the type of animal it receives; it only cares that the object has a `speak()` method. This is duck typing in action: as long as the object implements the expected interface, it will work.

**Note:**
Unlike statically-typed languages like Java or C++, Python doesn't require objects to explicitly inherit from a common superclass to use polymorphism. Duck typing provides a more flexible approach.

### 3. Method Overloading (Simulated)

Method overloading allows a class to have multiple methods with the same name but different parameters. Python doesn't support traditional method overloading where you define multiple methods with the same name in the same class. However, you can simulate it using default arguments or variable parameters.

```python
class Calculator:
    def add(self, *args):
        result = 0
        for arg in args:
            result += arg
        return result

# Create a calculator instance
calc = Calculator()

# Call add with different numbers of arguments
print(calc.add(2, 3))        # Output: 5
print(calc.add(2, 3, 4))     # Output: 9
print(calc.add(1, 2, 3, 4))  # Output: 10
```

This example simulates method overloading by using variable arguments (`*args`). The `add()` method can accept any number of arguments, demonstrating polymorphic behavior.

### 4. Abstract Base Classes (ABC)

Python provides the `abc` module for working with abstract base classes, which are classes that cannot be instantiated and are designed to be subclassed. Abstract methods defined in an abstract base class must be implemented by its subclasses, providing a formal way to enforce polymorphism.

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass
    
    @abstractmethod
    def perimeter(self):
        pass

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
        return math.pi * (self.radius ** 2)
    
    def perimeter(self):
        import math
        return 2 * math.pi * self.radius

# Create instances
rectangle = Rectangle(5, 4)
circle = Circle(3)

# Calculate and display areas
print(f"Rectangle area: {rectangle.area()}")         # Output: Rectangle area: 20
print(f"Circle area: {circle.area():.2f}")           # Output: Circle area: 28.27
print(f"Rectangle perimeter: {rectangle.perimeter()}") # Output: Rectangle perimeter: 18
print(f"Circle perimeter: {circle.perimeter():.2f}")   # Output: Circle perimeter: 18.85
```

In this example, the abstract base class `Shape` defines the interface with abstract methods `area()` and `perimeter()`. The concrete subclasses `Rectangle` and `Circle` must implement these methods, ensuring a consistent interface but allowing for different implementations.

**Important:**
Attempting to instantiate the abstract base class directly would raise a `TypeError`, as abstract classes cannot be instantiated.

## Practical Example: Building a Multimedia Player

Let's look at a more comprehensive example of polymorphism in a multimedia player application:

```python
from abc import ABC, abstractmethod

class MediaFile(ABC):
    def __init__(self, filename):
        self.filename = filename
    
    @abstractmethod
    def play(self):
        pass
    
    @abstractmethod
    def display_info(self):
        pass
    
    def get_filename(self):
        return self.filename

class AudioFile(MediaFile):
    def __init__(self, filename, artist, title, duration):
        super().__init__(filename)
        self.artist = artist
        self.title = title
        self.duration = duration
    
    def play(self):
        print(f"Playing audio: {self.title} by {self.artist}")
        # Code to actually play the audio would go here
    
    def display_info(self):
        print(f"Audio: {self.title}")
        print(f"Artist: {self.artist}")
        print(f"Duration: {self.format_duration()}")
        print(f"File: {self.filename}")
    
    def format_duration(self):
        minutes = self.duration // 60
        seconds = self.duration % 60
        return f"{minutes}:{seconds:02d}"

class VideoFile(MediaFile):
    def __init__(self, filename, title, duration, resolution):
        super().__init__(filename)
        self.title = title
        self.duration = duration
        self.resolution = resolution
    
    def play(self):
        print(f"Playing video: {self.title} ({self.resolution})")
        # Code to actually play the video would go here
    
    def display_info(self):
        print(f"Video: {self.title}")
        print(f"Resolution: {self.resolution}")
        print(f"Duration: {self.format_duration()}")
        print(f"File: {self.filename}")
    
    def format_duration(self):
        minutes = self.duration // 60
        seconds = self.duration % 60
        return f"{minutes}:{seconds:02d}"

class ImageFile(MediaFile):
    def __init__(self, filename, title, resolution):
        super().__init__(filename)
        self.title = title
        self.resolution = resolution
    
    def play(self):
        print(f"Displaying image: {self.title}")
        # Code to display the image would go here
    
    def display_info(self):
        print(f"Image: {self.title}")
        print(f"Resolution: {self.resolution}")
        print(f"File: {self.filename}")

class MediaPlayer:
    def __init__(self):
        self.media_library = []
    
    def add_media(self, media):
        if isinstance(media, MediaFile):
            self.media_library.append(media)
            print(f"Added {media.get_filename()} to library")
        else:
            print("Error: Not a valid media file")
    
    def play_all(self):
        print("\nPlaying all media:")
        for media in self.media_library:
            media.play()
    
    def display_library(self):
        print("\nMedia Library:")
        for i, media in enumerate(self.media_library, 1):
            print(f"\nItem {i}:")
            media.display_info()
            print("-" * 20)

# Create media files
song = AudioFile("song.mp3", "The Beatles", "Hey Jude", 243)
movie = VideoFile("movie.mp4", "The Matrix", 8280, "1080p")
photo = ImageFile("photo.jpg", "Vacation", "4K")

# Create media player and add files
player = MediaPlayer()
player.add_media(song)
player.add_media(movie)
player.add_media(photo)

# Use the media player
player.display_library()
player.play_all()
```

**Output:**
```
Added song.mp3 to library
Added movie.mp4 to library
Added photo.jpg to library

Media Library:

Item 1:
Audio: Hey Jude
Artist: The Beatles
Duration: 4:03
File: song.mp3
--------------------

Item 2:
Video: The Matrix
Resolution: 1080p
Duration: 138:00
File: movie.mp4
--------------------

Item 3:
Image: Vacation
Resolution: 4K
File: photo.jpg
--------------------

Playing all media:
Playing audio: Hey Jude by The Beatles
Playing video: The Matrix (1080p)
Displaying image: Vacation
```

In this example:
1. The abstract base class `MediaFile` defines a common interface with methods like `play()` and `display_info()`.
2. Different types of media (audio, video, image) implement these methods in their own way.
3. The `MediaPlayer` class can work with any type of media as long as it adheres to the `MediaFile` interface.
4. When we call `play_all()`, we see polymorphism in action as each media type responds differently to the same method call.

## Benefits of Polymorphism

1. **Code Reusability**: Polymorphism allows you to write methods that can operate on objects of various types, reducing code duplication.

2. **Extensibility**: New classes can be added to the system without modifying existing code, as long as they implement the required interface.

3. **Flexibility**: Systems can be designed to work with objects at a more abstract level, focusing on what operations are performed rather than how they are performed.

4. **Maintenance**: Changes to one class don't affect other classes, making the code easier to maintain.

## Common Pitfalls and Best Practices

### Pitfall 1: Ignoring the Liskov Substitution Principle

The Liskov Substitution Principle states that objects of a superclass should be replaceable with objects of its subclasses without affecting the correctness of the program.

```python
# Problematic
class Bird:
    def fly(self):
        print("I can fly")

class Penguin(Bird):
    def fly(self):
        raise Exception("Penguins can't fly!")  # Violates LSP

# Better approach
class Bird:
    def move(self):
        print("I can move")

class FlyingBird(Bird):
    def move(self):
        print("I can fly")

class SwimmingBird(Bird):
    def move(self):
        print("I can swim")
```

### Best Practice 1: Use Abstract Base Classes for Complex Hierarchies

For complex class hierarchies, use the `abc` module to create abstract base classes that define the required interface.

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def draw(self):
        pass
```

### Best Practice 2: Follow the "Tell, Don't Ask" Principle

Instead of checking the type of an object and then calling different methods, let polymorphism handle the variations.

```python
# Avoid this
def process_shape(shape):
    if isinstance(shape, Circle):
        shape.draw_circle()
    elif isinstance(shape, Rectangle):
        shape.draw_rectangle()

# Prefer this
def process_shape(shape):
    shape.draw()  # Polymorphic method call
```

### Best Practice 3: Use Duck Typing for Flexibility

Embrace Python's duck typing to create flexible code that works with any object that supports the required operations.

```python
def process_data(data_source):
    # As long as data_source has a read() method, this will work
    content = data_source.read()
    return process_content(content)

# Can be used with files, network streams, StringIO objects, etc.
```

## Exercises

**Exercise 1:** Create a base class `Vehicle` with a method `move()`. Then create subclasses for `Car`, `Boat`, and `Airplane`, each overriding the `move()` method to describe how that vehicle moves. Then create a function that takes a vehicle and makes it move.

**Exercise 2:** Implement a simple polymorphic system for different types of employees (regular employees, managers, and executives) with a common method `calculate_salary()` that works differently for each employee type.

**Exercise 3:** Create an abstract base class `PaymentMethod` with an abstract method `process_payment(amount)`. Then implement concrete classes `CreditCard`, `PayPal`, and `BankTransfer` that each implement the payment processing differently. Finally, create a `ShoppingCart` class that can process a payment using any payment method.

**Hint for Exercise 1:**
```python
class Vehicle:
    def move(self):
        pass

class Car(Vehicle):
    def move(self):
        return "The car drives on the road"

# Complete the other classes and create a function that demonstrates polymorphism
```

In the next sections of Object-Oriented Programming, we'll dive deeper into encapsulation and explore advanced concepts like magic methods, properties, and class decorators.