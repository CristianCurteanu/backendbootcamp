---
title: 'Setup Development Environment'
linkTitle: Setup Development Environment
weight: 2
---


## Installing Python

Before you can start programming in Python, you need to set up your development environment. This process involves installing Python and optionally an Integrated Development Environment (IDE) or code editor to make your programming experience more efficient.

### Installing Python on Windows

1. **Download the installer**:
   - Visit the official Python website at [python.org](https://www.python.org/downloads/)
   - Click on the "Download Python" button for the latest version
   - Select the Windows installer (.exe) file

2. **Run the installer**:
   - Open the downloaded file
   - Check the box that says "Add Python to PATH" - this is very important as it allows you to run Python from the command prompt
   - Click "Install Now" for a standard installation

   ![Python Installation](https://placeholder-image-python-install.png)

3. **Verify the installation**:
   - Open Command Prompt (search for "cmd" in the Start menu)
   - Type `python --version` and press Enter
   - You should see the Python version number displayed

```
C:\Users\username> python --version
Python 3.11.4
```

### Installing Python on macOS

1. **Using the official installer**:
   - Visit [python.org](https://www.python.org/downloads/)
   - Download the macOS installer (.pkg file)
   - Open the downloaded file and follow the installation wizard

2. **Using Homebrew** (recommended for developers):
   - If you don't have Homebrew installed, open Terminal and run:
     ```
     /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
     ```
   - Install Python using Homebrew:
     ```
     brew install python
     ```

3. **Verify the installation**:
   - Open Terminal
   - Type `python3 --version` and press Enter
   - You should see the Python version displayed

### Installing Python on Linux

Most Linux distributions come with Python pre-installed. To verify and ensure you have the latest version:

1. **Check the current version**:
   - Open Terminal
   - Type `python3 --version`

2. **Installing on Ubuntu/Debian**:
   ```
   sudo apt update
   sudo apt install python3 python3-pip
   ```

3. **Installing on Fedora**:
   ```
   sudo dnf install python3 python3-pip
   ```

4. **Installing on Arch Linux**:
   ```
   sudo pacman -S python python-pip
   ```

## Choosing a Code Editor or IDE

While you can write Python code in any text editor, using a specialized code editor or Integrated Development Environment (IDE) can significantly improve your productivity.

### Popular Options for Beginners

1. **Visual Studio Code (VS Code)**:
   - Free, lightweight, and highly customizable
   - Works on Windows, macOS, and Linux
   - Install the Python extension for features like syntax highlighting, code completion, and debugging
   - Download from [code.visualstudio.com](https://code.visualstudio.com/)

2. **PyCharm**:
   - Powerful IDE specifically designed for Python
   - Available in free Community Edition and paid Professional Edition
   - Includes advanced features like intelligent code completion, on-the-fly error checking, and integrated debugging
   - Download from [jetbrains.com/pycharm](https://www.jetbrains.com/pycharm/)

3. **Thonny**:
   - Python IDE designed for beginners
   - Comes with Python built-in, so no need for separate installation
   - Simple interface with helpful features for learning
   - Download from [thonny.org](https://thonny.org/)

4. **IDLE**:
   - Comes bundled with Python installation
   - Basic features but sufficient for beginners
   - No additional installation required

**Important:**
Choose an environment that matches your comfort level. If you're just starting, Thonny or IDLE might be less overwhelming, while VS Code or PyCharm offer more features as you advance.

## Running Your First Python Program

Now that you have Python and a code editor installed, let's write and run your first Python program.

### Method 1: Using the Python Interactive Shell

The Python interactive shell (also called the REPL - Read, Evaluate, Print, Loop) lets you execute Python commands line by line.

1. **Open the interactive shell**:
   - Open Command Prompt (Windows) or Terminal (macOS/Linux)
   - Type `python` (Windows) or `python3` (macOS/Linux) and press Enter
   - You should see the Python prompt (`>>>`)

2. **Write a simple command**:
   ```python
   >>> print("Hello, Python!")
   ```

3. **Press Enter** to see the output:
   ```
   Hello, Python!
   ```

4. **Exit the shell**:
   - Type `exit()` or press Ctrl+Z (Windows) or Ctrl+D (macOS/Linux) followed by Enter

### Method 2: Creating and Running a Python File

1. **Create a new file**:
   - Open your chosen code editor
   - Create a new file named `hello.py`
   - Type the following code:

```python
# My first Python program
print("Hello, Python!")
print("Welcome to the world of programming!")

# A simple calculation
sum = 5 + 3
print("The sum of 5 and 3 is:", sum)

# Getting user input
name = input("What is your name? ")
print("Nice to meet you,", name)
```

2. **Save the file** to a location you can easily access, like your Desktop or Documents folder

3. **Run the program**:

   **Using Command Line**:
   - Open Command Prompt or Terminal
   - Navigate to the directory where you saved the file using the `cd` command
   - Run the program with:
     ```
     python hello.py    # On Windows
     python3 hello.py   # On macOS/Linux
     ```

   **Using VS Code**:
   - With the file open, click the "Run" button (triangle icon) in the top-right corner, or
   - Right-click in the editor and select "Run Python File in Terminal"

   **Using PyCharm**:
   - Right-click in the editor and select "Run 'hello'" or
   - Use the green "Run" button in the toolbar

   **Using IDLE**:
   - With the file open, press F5 or select "Run > Run Module" from the menu

4. **View the output**:
   The program will execute and you'll see the output in the terminal or console window.
   You'll also be prompted to enter your name, and then see a personalized greeting.

**Expected Output**:
```
Hello, Python!
Welcome to the world of programming!
The sum of 5 and 3 is: 8
What is your name? [You type your name here]
Nice to meet you, [Your name]
```

**Note:**
The `input()` function pauses the program and waits for the user to type something and press Enter. This allows for interactive programs that can respond to user input.

## Understanding the Python Environment

### Python Interpreter

Python is an interpreted language, which means the Python interpreter reads and executes your code line by line. This is different from compiled languages where the entire program is translated to machine code before execution.

### Python Packages and pip

Python's functionality can be extended with packages (also called libraries or modules). The Python Package Index (PyPI) hosts thousands of third-party packages for various purposes.

To install packages, you use pip, Python's package installer:

```
pip install package_name    # On Windows
pip3 install package_name   # On macOS/Linux
```

We'll explore packages in more detail in later lessons.

### Virtual Environments

As you advance in Python, you'll learn about virtual environments, which allow you to create isolated Python environments for different projects. This is important for managing dependencies, but for now, the global Python installation is sufficient for learning the basics.

## Troubleshooting Common Installation Issues

### "Python is not recognized as an internal or external command"

This typically means Python wasn't added to your system's PATH. You can fix this by:
1. Reinstalling Python and checking "Add Python to PATH"
2. Manually adding Python to PATH (search online for instructions specific to your OS version)

### "pip is not recognized as an internal or external command"

Similar to the above, pip might not be in your PATH. Try using:
```
python -m pip install package_name
```

### Multiple Python Versions

If you have multiple Python versions installed, you may need to specify which version to use:
```
python3.9 script.py    # Run with Python 3.9
```

In the next lesson, we'll explore Python syntax fundamentals and start writing more sophisticated programs.