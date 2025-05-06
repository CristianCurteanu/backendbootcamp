---
title: 'Sets'
linkTitle: 'Sets'
weight: 15
---

A set is an unordered collection of unique elements in Python. Sets are one of Python's built-in data structures and are particularly useful when you need to ensure that all elements in a collection are distinct or when you need to perform mathematical set operations like unions, intersections, and differences.

## Creating Sets

There are several ways to create a set in Python:

### 1. Using Curly Braces `{}`

```python
# Creating a set with curly braces
fruits = {"apple", "banana", "cherry"}
print(fruits)  # Output might be: {'cherry', 'banana', 'apple'}
```

### 2. Using the `set()` Constructor

```python
# Creating a set from a list
colors = set(["red", "green", "blue"])
print(colors)  # Output might be: {'blue', 'green', 'red'}

# Creating a set from a string
letters = set("hello")
print(letters)  # Output: {'h', 'e', 'l', 'o'} (note only unique letters)
```

### 3. Creating an Empty Set

```python
# Empty set (must use the constructor, as {} creates an empty dictionary)
empty_set = set()
print(empty_set)  # Output: set()
print(type(empty_set))  # Output: <class 'set'>

# This creates an empty dictionary, not a set
empty_dict = {}
print(type(empty_dict))  # Output: <class 'dict'>
```

**Important:**
You cannot create an empty set using just curly braces `{}`. This syntax creates an empty dictionary. To create an empty set, you must use the `set()` constructor.

## Key Characteristics of Sets

1. **Unordered**: Elements in a set have no specific order. You cannot access elements by index or key.
2. **Unique Elements**: Sets automatically remove duplicates. Each element can appear only once.
3. **Mutable**: You can add or remove elements from a set after it's created.
4. **Heterogeneous**: Sets can contain elements of different data types.
5. **Hashable Elements**: Set elements must be hashable (immutable) data types like numbers, strings, or tuples. Lists, dictionaries, and other sets cannot be elements of a set.

```python
# Demonstrating uniqueness
numbers = {1, 2, 3, 2, 1, 4, 5}
print(numbers)  # Output: {1, 2, 3, 4, 5} (duplicates are removed)

# Heterogeneous data types
mixed_set = {1, "hello", (1, 2, 3)}
print(mixed_set)  # Output might be: {1, 'hello', (1, 2, 3)}

# Error if we try to add unhashable elements
try:
    invalid_set = {1, [2, 3], 4}  # This will cause an error
except TypeError as e:
    print(f"Error: {e}")  # Output: Error: unhashable type: 'list'
```

## Basic Set Operations

### Adding Elements

```python
fruits = {"apple", "banana", "cherry"}

# Add a single element
fruits.add("orange")
print(fruits)  # Output might be: {'orange', 'cherry', 'apple', 'banana'}

# Add multiple elements using update()
fruits.update(["mango", "grapes"])
print(fruits)  # Output might include all fruits
```

### Removing Elements

```python
fruits = {"apple", "banana", "cherry", "orange", "mango"}

# Remove an element (raises KeyError if not found)
fruits.remove("banana")
print(fruits)  # Output: set without 'banana'

# Discard an element (no error if not found)
fruits.discard("pear")  # No error even though 'pear' is not in the set
print(fruits)

# Remove and return an arbitrary element
popped = fruits.pop()
print(f"Popped: {popped}")
print(fruits)

# Remove all elements
fruits.clear()
print(fruits)  # Output: set()
```

**Note:**
The difference between `remove()` and `discard()` is that `remove()` will raise a KeyError if the element doesn't exist, while `discard()` will do nothing.

### Checking Membership

```python
fruits = {"apple", "banana", "cherry"}

# Check if an element is in the set
print("banana" in fruits)  # Output: True
print("pear" in fruits)    # Output: False
print("pear" not in fruits)  # Output: True
```

## Set Methods and Operations

Python sets support mathematical set operations, which makes them very powerful for certain tasks:

### 1. Union

The union of two sets includes all unique elements from both sets. You can use the `|` operator or the `union()` method:

```python
set1 = {1, 2, 3}
set2 = {3, 4, 5}

# Using the | operator
union_set = set1 | set2
print(union_set)  # Output: {1, 2, 3, 4, 5}

# Using the union() method
union_set = set1.union(set2)
print(union_set)  # Output: {1, 2, 3, 4, 5}

# You can unite more than two sets
set3 = {5, 6, 7}
union_set = set1.union(set2, set3)
print(union_set)  # Output: {1, 2, 3, 4, 5, 6, 7}
```

### 2. Intersection

The intersection of two sets includes only elements present in both sets. You can use the `&` operator or the `intersection()` method:

```python
set1 = {1, 2, 3, 4}
set2 = {3, 4, 5, 6}

# Using the & operator
intersection_set = set1 & set2
print(intersection_set)  # Output: {3, 4}

# Using the intersection() method
intersection_set = set1.intersection(set2)
print(intersection_set)  # Output: {3, 4}

# Intersection of multiple sets
set3 = {4, 5, 6, 7}
intersection_set = set1.intersection(set2, set3)
print(intersection_set)  # Output: {4}
```

### 3. Difference

The difference between two sets includes elements in the first set but not in the second set. You can use the `-` operator or the `difference()` method:

```python
set1 = {1, 2, 3, 4}
set2 = {3, 4, 5, 6}

# Using the - operator
difference_set = set1 - set2
print(difference_set)  # Output: {1, 2}

# Using the difference() method
difference_set = set1.difference(set2)
print(difference_set)  # Output: {1, 2}

# The difference is not commutative
difference_set = set2 - set1
print(difference_set)  # Output: {5, 6}
```

### 4. Symmetric Difference

The symmetric difference includes elements in either set, but not in both. You can use the `^` operator or the `symmetric_difference()` method:

```python
set1 = {1, 2, 3, 4}
set2 = {3, 4, 5, 6}

# Using the ^ operator
symmetric_difference = set1 ^ set2
print(symmetric_difference)  # Output: {1, 2, 5, 6}

# Using the symmetric_difference() method
symmetric_difference = set1.symmetric_difference(set2)
print(symmetric_difference)  # Output: {1, 2, 5, 6}
```

### 5. Subset and Superset

You can check if one set is a subset or superset of another set:

```python
set1 = {1, 2, 3}
set2 = {1, 2, 3, 4, 5}

# Check if set1 is a subset of set2
print(set1.issubset(set2))  # Output: True
print(set1 <= set2)         # Output: True

# Check if set1 is a proper subset of set2
print(set1 < set2)          # Output: True

# Check if set2 is a superset of set1
print(set2.issuperset(set1))  # Output: True
print(set2 >= set1)           # Output: True

# Check if set2 is a proper superset of set1
print(set2 > set1)            # Output: True
```

A proper subset/superset means the sets are not equal.

### 6. Disjoint Sets

Two sets are disjoint if they have no elements in common:

```python
set1 = {1, 2, 3}
set2 = {4, 5, 6}
set3 = {3, 4, 5}

print(set1.isdisjoint(set2))  # Output: True (no common elements)
print(set1.isdisjoint(set3))  # Output: False ('3' is common)
```

## Update Operations

Python also provides methods to modify a set in place based on set operations:

```python
set1 = {1, 2, 3, 4}
set2 = {3, 4, 5, 6}

# Update set1 with the union
set1.update(set2)
print(set1)  # Output: {1, 2, 3, 4, 5, 6}

# Reset set1
set1 = {1, 2, 3, 4}

# Update set1 with the intersection
set1.intersection_update(set2)
print(set1)  # Output: {3, 4}

# Reset set1
set1 = {1, 2, 3, 4}

# Update set1 with the difference
set1.difference_update(set2)
print(set1)  # Output: {1, 2}

# Reset set1
set1 = {1, 2, 3, 4}

# Update set1 with the symmetric difference
set1.symmetric_difference_update(set2)
print(set1)  # Output: {1, 2, 5, 6}
```

## Frozen Sets

Python also provides an immutable version of sets called frozen sets. Once created, you cannot modify a frozen set:

```python
# Creating a frozen set
frozen = frozenset([1, 2, 3, 4])
print(frozen)  # Output: frozenset({1, 2, 3, 4})

# Trying to modify a frozen set raises an error
try:
    frozen.add(5)  # This will cause an error
except AttributeError as e:
    print(f"Error: {e}")  # Output: Error: 'frozenset' object has no attribute 'add'
```

Frozen sets can be used as elements in other sets or as keys in dictionaries since they are hashable (immutable):

```python
# Using frozen sets as elements in a set
set_of_frozensets = {frozenset([1, 2]), frozenset([3, 4])}
print(set_of_frozensets)  # Output: {frozenset({1, 2}), frozenset({3, 4})}

# Using a frozen set as a dictionary key
dict_with_frozensets = {frozenset([1, 2]): "set1", frozenset([3, 4]): "set2"}
print(dict_with_frozensets)  # Output: {frozenset({1, 2}): 'set1', frozenset({3, 4}): 'set2'}
```

## Set Comprehensions

Similar to list comprehensions, Python allows you to create sets using set comprehensions:

```python
# Create a set of squares for numbers 1 to 5
squares = {x**2 for x in range(1, 6)}
print(squares)  # Output: {1, 4, 9, 16, 25}

# Create a set of even numbers from 1 to 10
evens = {x for x in range(1, 11) if x % 2 == 0}
print(evens)  # Output: {2, 4, 6, 8, 10}

# Create a set of uppercase letters from a string
uppercase_letters = {char.upper() for char in "hello world" if char.isalpha()}
print(uppercase_letters)  # Output: {'H', 'E', 'L', 'O', 'W', 'R', 'D'}
```

## Practical Examples

### Example 1: Removing Duplicates from a List

One of the most common uses of sets is to remove duplicates from a list:

```python
def remove_duplicates(items):
    """Remove duplicates from a list while preserving order."""
    return list(dict.fromkeys(items))  # More efficient than using a set

# Test the function
numbers = [1, 2, 2, 3, 4, 3, 5, 1, 4]
unique_numbers = remove_duplicates(numbers)
print(unique_numbers)  # Output: [1, 2, 3, 4, 5]

# Note: If order doesn't matter, you can simply do:
unique_numbers = list(set(numbers))
```

### Example 2: Finding Common Elements

```python
def find_common_elements(list1, list2):
    """Find common elements between two lists."""
    set1 = set(list1)
    set2 = set(list2)
    return list(set1.intersection(set2))

# Test the function
group1 = ["apple", "banana", "cherry", "orange"]
group2 = ["banana", "kiwi", "orange", "pear"]
common = find_common_elements(group1, group2)
print(common)  # Output: ['banana', 'orange'] (order may vary)
```

### Example 3: Finding Unique Words in a Text

```python
def unique_words(text):
    """Find all unique words in a text."""
    # Split by whitespace and remove punctuation
    words = text.lower().replace(".", "").replace(",", "").replace("!", "").split()
    return set(words)

# Test the function
sample_text = "The quick brown fox jumps over the lazy dog. The dog barks, but the fox jumps away!"
unique = unique_words(sample_text)
print(unique)
print(f"Number of unique words: {len(unique)}")
```

### Example 4: Set-Based Data Analysis

```python
def analyze_survey(responses):
    """Analyze survey responses where respondents could select multiple options."""
    # Count total respondents
    total_respondents = len(responses)
    
    # Find all unique options selected
    all_options = set()
    for response in responses:
        all_options.update(response)
    
    # Count how many people selected each option
    option_counts = {}
    for option in all_options:
        option_counts[option] = sum(1 for response in responses if option in response)
    
    # Find combinations of options that appeared together
    option_pairs = {}
    for response in responses:
        if len(response) >= 2:
            # Consider all pairs in this response
            for i, option1 in enumerate(response):
                for option2 in response[i+1:]:
                    pair = frozenset([option1, option2])  # Order doesn't matter
                    option_pairs[pair] = option_pairs.get(pair, 0) + 1
    
    return {
        "total_respondents": total_respondents,
        "unique_options": all_options,
        "option_counts": option_counts,
        "common_pairs": option_pairs
    }

# Sample survey data: each list represents one person's selections
survey_data = [
    ["pizza", "burger", "pasta"],
    ["pizza", "salad", "sushi"],
    ["burger", "steak"],
    ["pizza", "pasta", "salad"],
    ["sushi", "salad"]
]

analysis = analyze_survey(survey_data)

print(f"Total respondents: {analysis['total_respondents']}")
print(f"All food options selected: {analysis['unique_options']}")
print("\nOption popularity:")
for option, count in analysis['option_counts'].items():
    percentage = (count / analysis['total_respondents']) * 100
    print(f"  {option}: {count} responses ({percentage:.1f}%)")

print("\nCommon combinations:")
for pair, count in sorted(analysis['common_pairs'].items(), key=lambda x: x[1], reverse=True):
    if count > 1:  # Only show pairs that appeared more than once
        pair_list = list(pair)
        print(f"  {pair_list[0]} and {pair_list[1]}: {count} responses")
```

## Performance Considerations

Sets in Python are implemented using hash tables, which provide several performance benefits:

1. **Fast Membership Testing**: Checking if an element is in a set (`x in s`) is very fast, with O(1) average time complexity.
2. **Fast Add and Remove**: Adding and removing elements are also O(1) operations on average.
3. **Efficient for Uniqueness**: Sets automatically handle uniqueness, making them efficient for removing duplicates.
4. **Set Operations**: Set operations like union, intersection, and difference are optimized and generally faster than equivalent operations on lists.

```python
import time

# Demonstrate the performance advantage of sets for membership testing
def measure_membership_performance(n):
    """Compare membership testing in lists vs. sets."""
    # Create a list and a set with n elements
    data_list = list(range(n))
    data_set = set(range(n))
    
    # Test membership in list
    start_time = time.time()
    list_result = n-1 in data_list
    list_time = time.time() - start_time
    
    # Test membership in set
    start_time = time.time()
    set_result = n-1 in data_set
    set_time = time.time() - start_time
    
    print(f"n = {n}:")
    print(f"  List membership test: {list_time:.6f} seconds")
    print(f"  Set membership test:  {set_time:.6f} seconds")
    print(f"  Set is {list_time/set_time:.1f}x faster")

# Try with different sizes
for n in [1000, 10000, 100000, 1000000]:
    measure_membership_performance(n)
    print()
```

**Important:**
While sets provide fast lookups, they have some overhead and are not always the best choice:
- For very small collections, lists might be faster due to less overhead.
- Sets consume more memory than lists for the same elements.
- If you need ordered data or duplicates, lists are more appropriate.

## When to Use Sets

Sets are particularly useful in the following scenarios:

1. **When you need to ensure uniqueness**: Sets automatically remove duplicates, making them perfect for storing unique items.
2. **For membership testing**: If you frequently need to check if an item exists in a collection, sets provide fast lookups.
3. **When you need to perform set operations**: If your problem involves operations like unions, intersections, or differences, sets have built-in methods for these.
4. **For removing duplicates from a sequence**: Converting a list to a set and back to a list is a quick way to remove duplicates (though it doesn't preserve order).
5. **When order doesn't matter**: If you don't care about the order of elements, sets can be more efficient than lists.

## Common Set Pitfalls

1. **Assuming Sets Maintain Order**: Before Python 3.7, sets didn't guarantee any specific order. Even now, you shouldn't rely on the order of elements in a set.
2. **Using Unhashable Types**: Trying to add mutable objects like lists or dictionaries to a set will cause an error.
3. **Modifying a Set During Iteration**: This can lead to unexpected behavior or errors.
4. **Forgetting That Set Elements Must Be Unique**: If you need to store duplicates, use a list or counter.

## Exercises

**Exercise 1:** Write a function that takes two lists and returns three lists containing:
1. Elements that appear in both lists
2. Elements that appear only in the first list
3. Elements that appear only in the second list

**Exercise 2:** Create a function that counts the number of unique characters in a string, ignoring case and spaces.

**Exercise 3:** Implement a function that determines if two sentences are anagrams of each other (contain the same characters in different orders, ignoring spaces and punctuation).

**Exercise 4:** Write a program that simulates a classroom attendance system. Allow the user to:
- Add students to the class
- Mark students as present or absent
- Display who's present
- Display who's absent
- Display the full class roster

**Hint for Exercise 1:** Use set operations like intersection and difference to find the required elements.

```python
def analyze_lists(list1, list2):
    set1 = set(list1)
    set2 = set(list2)
    
    common = list(set1 & set2)
    only_in_first = list(set1 - set2)
    only_in_second = list(set2 - set1)
    
    return common, only_in_first, only_in_second
```

In the next section, we'll explore string manipulation in Python, learning how to work with text efficiently.