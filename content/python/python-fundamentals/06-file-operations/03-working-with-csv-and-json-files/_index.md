---
title: 'Working with CSV and JSON Files'
linkTitle: 'Working with CSV and JSON Files'
weight: 28
---

CSV (Comma-Separated Values) and JSON (JavaScript Object Notation) are two of the most common file formats used for storing and exchanging data. Python provides built-in modules to work with these formats efficiently.

## Working with CSV Files

CSV files store tabular data (numbers and text) in plain text. Each line of the file is a data record, and each record consists of one or more fields, separated by commas (or other delimiters).

### The `csv` Module

Python's `csv` module provides functionality to both read from and write to CSV files.

```python
import csv
```

### Reading CSV Files

There are several ways to read CSV files:

#### Basic CSV Reading

```python
import csv

# Open the CSV file
with open('data.csv', 'r', newline='') as file:
    # Create a CSV reader object
    csv_reader = csv.reader(file)
    
    # Skip the header row (if present)
    header = next(csv_reader)
    print(f"Header: {header}")
    
    # Process each row
    for row in csv_reader:
        print(row)  # row is a list of strings
```

**Note:**
The `newline=''` parameter is important when working with CSV files to ensure consistent handling of line endings across different platforms.

#### Reading CSV with Different Delimiters

```python
# For TSV (Tab-Separated Values)
with open('data.tsv', 'r', newline='') as file:
    csv_reader = csv.reader(file, delimiter='\t')
    for row in csv_reader:
        print(row)
```

#### Reading CSV into a Dictionary

The `DictReader` class creates dictionaries for each row, mapping field names to values:

```python
with open('data.csv', 'r', newline='') as file:
    # Create a dictionary reader object
    dict_reader = csv.DictReader(file)
    
    # Process each row
    for row in dict_reader:
        print(row)  # row is a dictionary where keys are column names
        # Access fields by name
        print(f"Name: {row['name']}, Age: {row['age']}")
```

This approach is more readable and less error-prone than accessing fields by index, especially for files with many columns.

#### Reading CSV Files with Custom Dialects

CSV files might have different formatting conventions (quoting, escaping, etc.). You can define custom dialects to handle these:

```python
import csv

# Register a custom dialect
csv.register_dialect('custom',
                     delimiter=';',
                     quotechar='"',
                     escapechar='\\',
                     doublequote=True,
                     skipinitialspace=True)

with open('european_data.csv', 'r', newline='') as file:
    reader = csv.reader(file, dialect='custom')
    for row in reader:
        print(row)
```

### Writing CSV Files

Writing to CSV files is similar to reading:

#### Basic CSV Writing

```python
import csv

data = [
    ['Name', 'Age', 'City'],  # Header row
    ['John Doe', '30', 'New York'],
    ['Jane Smith', '25', 'Los Angeles'],
    ['Bob Johnson', '45', 'Chicago']
]

with open('output.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    
    # Write all rows at once
    writer.writerows(data)
    
    # Or write row by row
    # for row in data:
    #     writer.writerow(row)
```

#### Writing Dictionaries to CSV

```python
import csv

data = [
    {'Name': 'John Doe', 'Age': '30', 'City': 'New York'},
    {'Name': 'Jane Smith', 'Age': '25', 'City': 'Los Angeles'},
    {'Name': 'Bob Johnson', 'Age': '45', 'City': 'Chicago'}
]

with open('output.csv', 'w', newline='') as file:
    # Define column names (field names)
    fieldnames = ['Name', 'Age', 'City']
    
    # Create a dictionary writer object
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    
    # Write the header row
    writer.writeheader()
    
    # Write all rows at once
    writer.writerows(data)
    
    # Or write row by row
    # for row in data:
    #     writer.writerow(row)
```

### Practical Example: CSV Data Processing

Let's see a practical example of reading a CSV file, processing the data, and writing the results back to a new CSV file:

```python
import csv

def calculate_statistics(filename):
    """Calculate average age and salary by department from a CSV file."""
    departments = {}
    
    with open(filename, 'r', newline='') as file:
        reader = csv.DictReader(file)
        
        for row in reader:
            dept = row['Department']
            age = int(row['Age'])
            salary = float(row['Salary'].replace('$', '').replace(',', ''))
            
            if dept not in departments:
                departments[dept] = {'count': 0, 'total_age': 0, 'total_salary': 0}
            
            departments[dept]['count'] += 1
            departments[dept]['total_age'] += age
            departments[dept]['total_salary'] += salary
    
    # Calculate averages
    results = []
    for dept, data in departments.items():
        count = data['count']
        avg_age = data['total_age'] / count
        avg_salary = data['total_salary'] / count
        results.append({
            'Department': dept,
            'Employee Count': count,
            'Average Age': round(avg_age, 1),
            'Average Salary': f"${round(avg_salary, 2):,.2f}"
        })
    
    # Sort by department name
    results.sort(key=lambda x: x['Department'])
    
    # Write results to a new CSV file
    output_file = 'department_statistics.csv'
    with open(output_file, 'w', newline='') as file:
        fieldnames = ['Department', 'Employee Count', 'Average Age', 'Average Salary']
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        
        writer.writeheader()
        writer.writerows(results)
    
    print(f"Statistics saved to {output_file}")
    return results

# Example usage
statistics = calculate_statistics('employee_data.csv')
for stat in statistics:
    print(f"{stat['Department']}: {stat['Employee Count']} employees, " 
          f"Avg Age: {stat['Average Age']}, Avg Salary: {stat['Average Salary']}")
```

**Important:**
When processing CSV files with numerical data, remember that all values are read as strings. You need to convert them to the appropriate data types before performing calculations.

### Handling Common CSV Challenges

#### Dealing with Missing Values

```python
with open('data_with_missing.csv', 'r', newline='') as file:
    reader = csv.DictReader(file)
    
    for row in reader:
        # Handle missing values with get() method and provide default
        name = row.get('Name', 'Unknown')
        # Or use conditional logic
        age = row['Age'] if row['Age'] else 'Not specified'
        print(f"Name: {name}, Age: {age}")
```

#### Handling Large CSV Files

For large CSV files, reading the entire file into memory might not be feasible. Process it row by row instead:

```python
def process_large_csv(filename):
    row_count = 0
    total = 0
    
    with open(filename, 'r', newline='') as file:
        reader = csv.DictReader(file)
        
        for row in reader:
            # Process one row at a time
            value = float(row['Value'])
            total += value
            row_count += 1
            
            # Optionally, report progress periodically
            if row_count % 100000 == 0:
                print(f"Processed {row_count} rows...")
    
    avg = total / row_count if row_count > 0 else 0
    print(f"Processed {row_count} rows. Average value: {avg:.2f}")
```

## Working with JSON Files

JSON (JavaScript Object Notation) is a lightweight data interchange format. It's easy for humans to read and write and easy for machines to parse and generate.

### The `json` Module

Python's `json` module provides methods to encode Python objects as JSON strings and decode JSON strings into Python objects.

```python
import json
```

### Reading JSON Files

#### Loading JSON from a File

```python
import json

with open('data.json', 'r') as file:
    # Parse JSON into a Python object
    data = json.load(file)
    
    # Now data is a Python object (typically a dict or list)
    print(type(data))
    print(data)
```

#### Working with Nested JSON Data

JSON often contains nested structures. You can access them using standard Python dictionary and list operations:

```python
with open('nested_data.json', 'r') as file:
    data = json.load(file)
    
    # Access nested elements
    name = data['person']['name']
    first_hobby = data['person']['hobbies'][0]
    
    print(f"Name: {name}")
    print(f"First hobby: {first_hobby}")
    
    # Iterate through nested lists
    print("All hobbies:")
    for hobby in data['person']['hobbies']:
        print(f"- {hobby}")
```

### Writing JSON Files

#### Saving Python Objects as JSON

```python
import json

# Python dictionary
person = {
    'name': 'John Doe',
    'age': 30,
    'city': 'New York',
    'hobbies': ['reading', 'hiking', 'photography'],
    'is_student': False,
    'has_car': None
}

# Write to a JSON file
with open('person.json', 'w') as file:
    json.dump(person, file)

# Write with pretty formatting (indentation)
with open('person_pretty.json', 'w') as file:
    json.dump(person, file, indent=4)
```

#### Controlling JSON Serialization

You can customize how objects are serialized to JSON:

```python
import json
from datetime import datetime

# Custom data with objects that aren't JSON serializable by default
data = {
    'name': 'Event Log',
    'created_at': datetime.now(),
    'entries': [
        {'id': 1, 'timestamp': datetime(2023, 1, 15, 10, 30), 'message': 'System started'},
        {'id': 2, 'timestamp': datetime(2023, 1, 15, 11, 45), 'message': 'User logged in'}
    ]
}

# Define a custom JSON encoder
class DateTimeEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        return super().default(obj)

# Use the custom encoder
with open('logs.json', 'w') as file:
    json.dump(data, file, cls=DateTimeEncoder, indent=4)
```

### Converting Between JSON and Python Objects

#### JSON to Python Object (Deserialization)

```python
# JSON string
json_string = '{"name": "Jane Smith", "age": 25, "city": "London"}'

# Convert JSON string to Python object
person = json.loads(json_string)
print(f"Name: {person['name']}, Age: {person['age']}")
```

#### Python Object to JSON String (Serialization)

```python
# Python dictionary
person = {'name': 'Bob Johnson', 'age': 45, 'city': 'Chicago'}

# Convert Python object to JSON string
json_string = json.dumps(person)
print(json_string)

# Pretty print with indentation
pretty_json = json.dumps(person, indent=4)
print(pretty_json)
```

### Practical Example: JSON Configuration File

Let's see how to use JSON for a configuration file:

```python
import json
import os

def load_config(config_file='config.json'):
    """Load application configuration from a JSON file."""
    # Default configuration
    default_config = {
        'app_name': 'My Application',
        'version': '1.0.0',
        'debug_mode': False,
        'log_level': 'INFO',
        'max_connections': 100,
        'themes': ['light', 'dark', 'system'],
        'default_theme': 'system',
        'data_sources': {
            'primary': {
                'type': 'mysql',
                'host': 'localhost',
                'port': 3306,
                'username': '',
                'password': ''
            },
            'cache': {
                'type': 'redis',
                'host': 'localhost',
                'port': 6379
            }
        }
    }
    
    # Try to load configuration from file
    config = default_config.copy()
    try:
        if os.path.exists(config_file):
            with open(config_file, 'r') as file:
                loaded_config = json.load(file)
                # Update default config with loaded values
                config.update(loaded_config)
                print(f"Configuration loaded from {config_file}")
        else:
            # Create a new config file with default values
            with open(config_file, 'w') as file:
                json.dump(default_config, file, indent=4)
                print(f"Created new configuration file: {config_file}")
    except Exception as e:
        print(f"Error loading configuration: {e}")
        print("Using default configuration")
    
    return config

def save_config(config, config_file='config.json'):
    """Save the configuration to a JSON file."""
    try:
        with open(config_file, 'w') as file:
            json.dump(config, file, indent=4)
        print(f"Configuration saved to {config_file}")
        return True
    except Exception as e:
        print(f"Error saving configuration: {e}")
        return False

# Example usage
config = load_config()
print(f"App name: {config['app_name']}")
print(f"Debug mode: {config['debug_mode']}")

# Modify configuration
config['debug_mode'] = True
config['log_level'] = 'DEBUG'
config['data_sources']['primary']['username'] = 'admin'

# Save modified configuration
save_config(config)
```

### Practical Example: Working with an API Response

Many web APIs return data in JSON format. Here's how you might work with such data:

```python
import json
import requests  # You'll need to install this: pip install requests

def get_weather(city, api_key):
    """Get current weather data for a city using a weather API."""
    base_url = "https://api.openweathermap.org/data/2.5/weather"
    params = {
        'q': city,
        'appid': api_key,
        'units': 'metric'  # or 'imperial' for Fahrenheit
    }
    
    try:
        response = requests.get(base_url, params=params)
        
        # Check if the request was successful
        if response.status_code == 200:
            # Parse JSON response
            weather_data = json.loads(response.text)
            
            # Extract relevant information
            result = {
                'city': weather_data['name'],
                'country': weather_data['sys']['country'],
                'temperature': weather_data['main']['temp'],
                'feels_like': weather_data['main']['feels_like'],
                'description': weather_data['weather'][0]['description'],
                'humidity': weather_data['main']['humidity'],
                'wind_speed': weather_data['wind']['speed']
            }
            
            return result
        else:
            print(f"Error: API returned status code {response.status_code}")
            print(f"Response: {response.text}")
            return None
    
    except requests.exceptions.RequestException as e:
        print(f"Request error: {e}")
        return None
    except json.JSONDecodeError as e:
        print(f"JSON parsing error: {e}")
        return None
    except KeyError as e:
        print(f"Data extraction error: {e}")
        return None

# Example usage (you need to provide your own API key)
api_key = "your_api_key_here"
weather = get_weather("London", api_key)

if weather:
    print(f"Weather in {weather['city']}, {weather['country']}:")
    print(f"Temperature: {weather['temperature']}°C (Feels like: {weather['feels_like']}°C)")
    print(f"Description: {weather['description']}")
    print(f"Humidity: {weather['humidity']}%")
    print(f"Wind speed: {weather['wind_speed']} m/s")
```

## Combining CSV and JSON Processing

Sometimes you might need to convert between CSV and JSON formats or process data from one format to another.

### Converting CSV to JSON

```python
import csv
import json

def csv_to_json(csv_file, json_file):
    """Convert a CSV file to a JSON file."""
    # List to store the data
    data = []
    
    # Read the CSV file
    with open(csv_file, 'r', newline='') as file:
        csv_reader = csv.DictReader(file)
        for row in csv_reader:
            data.append(row)
    
    # Write the JSON file
    with open(json_file, 'w') as file:
        json.dump(data, file, indent=4)
    
    print(f"Converted {csv_file} to {json_file}")
    print(f"Processed {len(data)} records")

# Example usage
csv_to_json('data.csv', 'data.json')
```

### Converting JSON to CSV

```python
import csv
import json

def json_to_csv(json_file, csv_file):
    """Convert a JSON file to a CSV file."""
    # Read the JSON file
    with open(json_file, 'r') as file:
        data = json.load(file)
    
    # Ensure data is a list
    if not isinstance(data, list):
        data = [data]  # Convert single object to a list
    
    # Extract field names (column headers)
    if data:
        fieldnames = data[0].keys()
    else:
        print("No data found in JSON file")
        return
    
    # Write the CSV file
    with open(csv_file, 'w', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(data)
    
    print(f"Converted {json_file} to {csv_file}")
    print(f"Processed {len(data)} records")

# Example usage
json_to_csv('data.json', 'converted_data.csv')
```

## Best Practices for Working with CSV and JSON Files

### CSV Best Practices

1. **Always use the `newline=''` parameter** when opening CSV files to ensure consistent handling of line endings across platforms.

2. **Use `DictReader` and `DictWriter`** for more readable and maintainable code, especially for files with many columns.

3. **Handle potential errors in data:**
   ```python
   # Safe value conversion
   try:
       age = int(row['Age'])
   except (ValueError, KeyError):
       age = 0  # Default value
   ```

4. **Use appropriate delimiters** based on your data. If your data contains commas, consider using a different delimiter like tab (`\t`) or pipe (`|`).

5. **Always close files** by using the `with` statement to automatically handle file closing.

6. **For large files, process row by row** rather than loading the entire file into memory.

### JSON Best Practices

1. **Use `indent` parameter for readable output** when writing JSON files meant for human consumption.

2. **Handle potential JSON parsing errors** with try-except blocks.

3. **Be careful with data types** when working with numeric values. JSON doesn't distinguish between integers and floats, so you might need to convert types after parsing.

4. **Use custom encoders and decoders** for handling types not natively supported by JSON (like datetime).

5. **Validate JSON schema** for critical applications to ensure the data meets your expectations.

6. **Consider using alternative libraries** like `ujson` or `simplejson` for better performance with large files.

## Exercises

**Exercise 1:** Create a program that reads a CSV file containing student records (name, age, grade) and computes the average grade. Write the results to a new CSV file that includes each student's name, grade, and whether they are above or below the average.

**Exercise 2:** Write a script that converts an address book from CSV to JSON format. The CSV file has columns for name, email, phone, and address. The JSON output should group contacts alphabetically by the first letter of their name.

**Exercise 3:** Create a program that reads weather data from a JSON file containing 7 days of forecasts. The program should calculate the average temperature, find the hottest and coldest days, and write a summary to a CSV file.

**Hint for Exercise 1:** Use `csv.DictReader` to read the file and convert the grade values to numbers before calculating the average. Then use `csv.DictWriter` to write the results.

In the next section, we'll explore Object-Oriented Programming in Python, learning how to create and use classes and objects.
