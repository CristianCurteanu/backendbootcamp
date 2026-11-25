---
title: 'Command-line Interface Tool: File Creation tool'
linkTitle: 'Command-line Interface Tool: File Creation tool'
weight: 1
---


In this project, we'll build a command-line tool that creates new files and directories. The tool will check if a file already exists before creating it, create any missing parent directories if needed, and handle errors appropriately by sending messages to STDERR.

## Project Overview

Our file creation tool will:
1. Accept file paths as command-line arguments
2. Create parent directories if they don't exist
3. Create the specified file if it doesn't exist
4. Output error messages to STDERR if the file already exists
5. Provide options for handling existing files (overwrite, append, etc.)
6. Include helpful usage information

This project demonstrates several important Python concepts:
- Command-line argument parsing
- File and directory operations
- Error handling
- Standard output and error streams
- Creating a reusable command-line tool

### Step 1: Setting Up the Basic Structure

First, let's create a basic script that can accept command-line arguments:

```python
#!/usr/bin/env python3
"""
File Creation Tool - A utility to create files and directories.

Usage:
    filecreate.py <filepath> [<filepath> ...]
    filecreate.py -h | --help
"""

import sys
import os

def main():
    """Main function to process command-line arguments and create files."""
    # Skip the script name (first argument)
    args = sys.argv[1:]
    
    if not args or "-h" in args or "--help" in args:
        print(__doc__)
        return 0
    
    # Process each file path
    for filepath in args:
        create_file(filepath)
    
    return 0

def create_file(filepath):
    """Create a file at the specified path."""
    print(f"Creating file: {filepath}")
    # Actual file creation will be implemented here

if __name__ == "__main__":
    sys.exit(main())
```

This code sets up a basic command-line interface that accepts file paths as arguments and provides help information when requested.

### Step 2: Implementing File Creation Logic

Now, let's implement the file creation logic, including directory creation if needed:

```python
def create_file(filepath):
    """
    Create a file at the specified path.
    
    Args:
        filepath (str): Path to the file to create
        
    Returns:
        bool: True if successful, False otherwise
    """
    try:
        # Check if the file already exists
        if os.path.exists(filepath):
            sys.stderr.write(f"Error: File '{filepath}' already exists.\n")
            return False
        
        # Get the directory part of the path
        directory = os.path.dirname(filepath)
        
        # Create the directory if it doesn't exist
        if directory and not os.path.exists(directory):
            print(f"Creating directory: {directory}")
            os.makedirs(directory)
        
        # Create the file (by opening it in write mode and then closing it)
        with open(filepath, 'w') as f:
            pass
        
        print(f"Successfully created file: {filepath}")
        return True
        
    except OSError as e:
        sys.stderr.write(f"Error creating file '{filepath}': {e}\n")
        return False
```

This function:
1. Checks if the file already exists and outputs an error message to STDERR if it does
2. Gets the directory part of the path
3. Creates any missing directories using `os.makedirs()`
4. Creates the file by opening it in write mode and immediately closing it
5. Handles any OS errors that might occur during the process

### Step 3: Adding Options for Handling Existing Files

Let's enhance our tool to handle existing files according to user preferences:

```python
#!/usr/bin/env python3
"""
File Creation Tool - A utility to create files and directories.

Usage:
    filecreate.py [options] <filepath> [<filepath> ...]
    filecreate.py -h | --help

Options:
    -f, --force       Overwrite existing files
    -a, --append      Append to existing files
    -s, --skip        Skip existing files (default)
    -h, --help        Show this help message
"""

import sys
import os
import getopt

def main():
    """Main function to process command-line arguments and create files."""
    # Default options
    force = False
    append = False
    
    try:
        # Parse command-line options
        opts, args = getopt.getopt(sys.argv[1:], "hfas", ["help", "force", "append", "skip"])
    except getopt.GetoptError as e:
        sys.stderr.write(f"Error: {e}\n")
        print(__doc__)
        return 1
    
    # Process options
    for opt, _ in opts:
        if opt in ("-h", "--help"):
            print(__doc__)
            return 0
        elif opt in ("-f", "--force"):
            force = True
            append = False
        elif opt in ("-a", "--append"):
            append = True
            force = False
    
    # Check if there are file paths provided
    if not args:
        sys.stderr.write("Error: No file paths provided.\n")
        print(__doc__)
        return 1
    
    # Process each file path
    success_count = 0
    for filepath in args:
        if create_file(filepath, force=force, append=append):
            success_count += 1
    
    # Report results
    total = len(args)
    print(f"\nSummary: {success_count} of {total} files processed successfully.")
    
    return 0 if success_count == total else 1

def create_file(filepath, force=False, append=False):
    """
    Create a file at the specified path.
    
    Args:
        filepath (str): Path to the file to create
        force (bool): Whether to overwrite an existing file
        append (bool): Whether to append to an existing file
        
    Returns:
        bool: True if successful, False otherwise
    """
    try:
        # Check if the file already exists
        if os.path.exists(filepath):
            if force:
                mode = 'w'
                print(f"Overwriting file: {filepath}")
            elif append:
                mode = 'a'
                print(f"Appending to file: {filepath}")
            else:
                sys.stderr.write(f"Error: File '{filepath}' already exists. Use -f to overwrite or -a to append.\n")
                return False
        else:
            mode = 'w'
            
            # Get the directory part of the path
            directory = os.path.dirname(filepath)
            
            # Create the directory if it doesn't exist
            if directory and not os.path.exists(directory):
                print(f"Creating directory: {directory}")
                os.makedirs(directory)
        
        # Create or modify the file
        with open(filepath, mode) as f:
            pass
        
        if not os.path.exists(filepath):
            print(f"Successfully created file: {filepath}")
        else:
            if force:
                print(f"Successfully overwrote file: {filepath}")
            elif append:
                print(f"Successfully appended to file: {filepath}")
        
        return True
        
    except OSError as e:
        sys.stderr.write(f"Error processing file '{filepath}': {e}\n")
        return False

if __name__ == "__main__":
    sys.exit(main())
```

We've added:
1. Command-line options using `getopt`
2. Options for different behaviors when a file already exists:
   - `-f`/`--force`: Overwrite existing files
   - `-a`/`--append`: Append to existing files
   - `-s`/`--skip`: Skip existing files (default)
3. A summary of the results after processing all files

### Step 4: Adding Content to Created Files

Let's enhance our tool to allow users to specify content for the files:

```python
#!/usr/bin/env python3
"""
File Creation Tool - A utility to create files and directories.

Usage:
    filecreate.py [options] <filepath> [<filepath> ...]
    filecreate.py -h | --help

Options:
    -f, --force           Overwrite existing files
    -a, --append          Append to existing files
    -s, --skip            Skip existing files (default)
    -c, --content=TEXT    Add specified text to the file
    -i, --interactive     Prompt for content interactively
    -h, --help            Show this help message
"""

import sys
import os
import getopt

def main():
    """Main function to process command-line arguments and create files."""
    # Default options
    force = False
    append = False
    content = None
    interactive = False
    
    try:
        # Parse command-line options
        opts, args = getopt.getopt(
            sys.argv[1:], 
            "hfasc:i", 
            ["help", "force", "append", "skip", "content=", "interactive"]
        )
    except getopt.GetoptError as e:
        sys.stderr.write(f"Error: {e}\n")
        print(__doc__)
        return 1
    
    # Process options
    for opt, arg in opts:
        if opt in ("-h", "--help"):
            print(__doc__)
            return 0
        elif opt in ("-f", "--force"):
            force = True
            append = False
        elif opt in ("-a", "--append"):
            append = True
            force = False
        elif opt in ("-c", "--content"):
            content = arg
        elif opt in ("-i", "--interactive"):
            interactive = True
    
    # Check if there are file paths provided
    if not args:
        sys.stderr.write("Error: No file paths provided.\n")
        print(__doc__)
        return 1
    
    # If interactive mode is enabled, prompt for content
    if interactive and content is None:
        print("Enter content (press Ctrl+D on Unix/Linux or Ctrl+Z on Windows when finished):")
        content_lines = []
        try:
            while True:
                line = input()
                content_lines.append(line)
        except EOFError:
            # End of input
            content = "\n".join(content_lines)
            print("\nContent captured.")
    
    # Process each file path
    success_count = 0
    for filepath in args:
        if create_file(filepath, force=force, append=append, content=content):
            success_count += 1
    
    # Report results
    total = len(args)
    print(f"\nSummary: {success_count} of {total} files processed successfully.")
    
    return 0 if success_count == total else 1

def create_file(filepath, force=False, append=False, content=None):
    """
    Create a file at the specified path.
    
    Args:
        filepath (str): Path to the file to create
        force (bool): Whether to overwrite an existing file
        append (bool): Whether to append to an existing file
        content (str): Optional content to write to the file
        
    Returns:
        bool: True if successful, False otherwise
    """
    try:
        # Check if the file already exists
        if os.path.exists(filepath):
            if force:
                mode = 'w'
                print(f"Overwriting file: {filepath}")
            elif append:
                mode = 'a'
                print(f"Appending to file: {filepath}")
            else:
                sys.stderr.write(f"Error: File '{filepath}' already exists. Use -f to overwrite or -a to append.\n")
                return False
        else:
            mode = 'w'
            
            # Get the directory part of the path
            directory = os.path.dirname(filepath)
            
            # Create the directory if it doesn't exist
            if directory and not os.path.exists(directory):
                print(f"Creating directory: {directory}")
                os.makedirs(directory)
        
        # Create or modify the file
        with open(filepath, mode) as f:
            if content is not None:
                f.write(content)
                if not content.endswith('\n'):
                    f.write('\n')
        
        if not os.path.exists(filepath):
            print(f"Successfully created file: {filepath}")
        else:
            if force:
                print(f"Successfully overwrote file: {filepath}")
            elif append:
                print(f"Successfully appended to file: {filepath}")
        
        return True
        
    except OSError as e:
        sys.stderr.write(f"Error processing file '{filepath}': {e}\n")
        return False

if __name__ == "__main__":
    sys.exit(main())
```

We've added:
1. The `-c`/`--content` option to specify content directly
2. The `-i`/`--interactive` option to enter content interactively
3. Logic to write the specified content to the file

### Step 5: Implementing Advanced Error Handling

Let's enhance our error handling to be more robust and informative:

```python
import os
import sys
import getopt
import errno

class FileCreationError(Exception):
    """Custom exception for file creation errors."""
    pass

def create_file(filepath, force=False, append=False, content=None):
    """
    Create a file at the specified path.
    
    Args:
        filepath (str): Path to the file to create
        force (bool): Whether to overwrite an existing file
        append (bool): Whether to append to an existing file
        content (str): Optional content to write to the file
        
    Returns:
        bool: True if successful, False otherwise
        
    Raises:
        FileCreationError: If the file cannot be created for any reason
    """
    try:
        # Check if the file already exists
        if os.path.exists(filepath):
            if os.path.isdir(filepath):
                raise FileCreationError(f"Path '{filepath}' is a directory, not a file")
                
            if force:
                mode = 'w'
                action = "Overwriting"
            elif append:
                mode = 'a'
                action = "Appending to"
            else:
                raise FileCreationError(f"File '{filepath}' already exists. Use -f to overwrite or -a to append.")
        else:
            mode = 'w'
            action = "Creating"
            
            # Get the directory part of the path
            directory = os.path.dirname(filepath)
            
            # Create the directory if it doesn't exist
            if directory and not os.path.exists(directory):
                try:
                    print(f"Creating directory: {directory}")
                    os.makedirs(directory)
                except OSError as e:
                    if e.errno == errno.EACCES:
                        raise FileCreationError(f"Permission denied to create directory '{directory}'")
                    else:
                        raise FileCreationError(f"Cannot create directory '{directory}': {e}")
        
        try:
            # Create or modify the file
            with open(filepath, mode) as f:
                if content is not None:
                    f.write(content)
                    if not content.endswith('\n'):
                        f.write('\n')
        except IOError as e:
            if e.errno == errno.EACCES:
                raise FileCreationError(f"Permission denied to write to '{filepath}'")
            else:
                raise FileCreationError(f"Cannot write to '{filepath}': {e}")
        
        print(f"{action} file: {filepath}")
        return True
        
    except FileCreationError as e:
        sys.stderr.write(f"Error: {e}\n")
        return False
    except Exception as e:
        sys.stderr.write(f"Unexpected error processing '{filepath}': {e}\n")
        return False
```

We've improved the error handling by:
1. Creating a custom exception class for file creation errors
2. Checking if the path is a directory before trying to create a file
3. Providing more specific error messages for common issues like permission denied
4. Using the `errno` module to check for specific error types

### Step 6: Completing the Tool with Verbosity Levels

Let's add verbosity levels to make the tool more user-friendly:

```python
#!/usr/bin/env python3
"""
File Creation Tool - A utility to create files and directories.

Usage:
    filecreate.py [options] <filepath> [<filepath> ...]
    filecreate.py -h | --help

Options:
    -f, --force           Overwrite existing files
    -a, --append          Append to existing files
    -s, --skip            Skip existing files (default)
    -c, --content=TEXT    Add specified text to the file
    -i, --interactive     Prompt for content interactively
    -v, --verbose         Increase output verbosity
    -q, --quiet           Suppress output except for errors
    -h, --help            Show this help message
"""

import os
import sys
import getopt
import errno

class FileCreationError(Exception):
    """Custom exception for file creation errors."""
    pass

def main():
    """Main function to process command-line arguments and create files."""
    # Default options
    force = False
    append = False
    content = None
    interactive = False
    verbose = 1  # Default verbosity level (0=quiet, 1=normal, 2=verbose)
    
    try:
        # Parse command-line options
        opts, args = getopt.getopt(
            sys.argv[1:], 
            "hfasc:ivq", 
            ["help", "force", "append", "skip", "content=", "interactive", "verbose", "quiet"]
        )
    except getopt.GetoptError as e:
        sys.stderr.write(f"Error: {e}\n")
        print(__doc__)
        return 1
    
    # Process options
    for opt, arg in opts:
        if opt in ("-h", "--help"):
            print(__doc__)
            return 0
        elif opt in ("-f", "--force"):
            force = True
            append = False
        elif opt in ("-a", "--append"):
            append = True
            force = False
        elif opt in ("-c", "--content"):
            content = arg
        elif opt in ("-i", "--interactive"):
            interactive = True
        elif opt in ("-v", "--verbose"):
            verbose = 2
        elif opt in ("-q", "--quiet"):
            verbose = 0
    
    # Check if there are file paths provided
    if not args:
        sys.stderr.write("Error: No file paths provided.\n")
        print(__doc__)
        return 1
    
    # If interactive mode is enabled, prompt for content
    if interactive and content is None:
        print("Enter content (press Ctrl+D on Unix/Linux or Ctrl+Z on Windows when finished):")
        content_lines = []
        try:
            while True:
                line = input()
                content_lines.append(line)
        except EOFError:
            # End of input
            content = "\n".join(content_lines)
            if verbose > 0:
                print("\nContent captured.")
    
    # Process each file path
    success_count = 0
    for filepath in args:
        if create_file(filepath, force=force, append=append, content=content, verbose=verbose):
            success_count += 1
    
    # Report results
    total = len(args)
    if verbose > 0:
        print(f"\nSummary: {success_count} of {total} files processed successfully.")
    
    return 0 if success_count == total else 1

def create_file(filepath, force=False, append=False, content=None, verbose=1):
    """
    Create a file at the specified path.
    
    Args:
        filepath (str): Path to the file to create
        force (bool): Whether to overwrite an existing file
        append (bool): Whether to append to an existing file
        content (str): Optional content to write to the file
        verbose (int): Verbosity level (0=quiet, 1=normal, 2=verbose)
        
    Returns:
        bool: True if successful, False otherwise
    """
    try:
        # Normalize and expand the file path
        filepath = os.path.abspath(os.path.expanduser(filepath))
        
        if verbose > 1:
            print(f"Processing file: {filepath}")
        
        # Check if the file already exists
        if os.path.exists(filepath):
            if os.path.isdir(filepath):
                raise FileCreationError(f"Path '{filepath}' is a directory, not a file")
                
            if force:
                mode = 'w'
                action = "Overwriting"
            elif append:
                mode = 'a'
                action = "Appending to"
            else:
                raise FileCreationError(f"File '{filepath}' already exists. Use -f to overwrite or -a to append.")
        else:
            mode = 'w'
            action = "Creating"
            
            # Get the directory part of the path
            directory = os.path.dirname(filepath)
            
            # Create the directory if it doesn't exist
            if directory and not os.path.exists(directory):
                try:
                    if verbose > 0:
                        print(f"Creating directory: {directory}")
                    os.makedirs(directory)
                except OSError as e:
                    if e.errno == errno.EACCES:
                        raise FileCreationError(f"Permission denied to create directory '{directory}'")
                    else:
                        raise FileCreationError(f"Cannot create directory '{directory}': {e}")
        
        try:
            # Create or modify the file
            with open(filepath, mode) as f:
                if content is not None:
                    if verbose > 1:
                        content_preview = content[:50] + "..." if len(content) > 50 else content
                        print(f"Writing content: {content_preview}")
                    f.write(content)
                    if not content.endswith('\n'):
                        f.write('\n')
        except IOError as e:
            if e.errno == errno.EACCES:
                raise FileCreationError(f"Permission denied to write to '{filepath}'")
            else:
                raise FileCreationError(f"Cannot write to '{filepath}': {e}")
        
        if verbose > 0:
            print(f"{action} file: {filepath}")
        return True
        
    except FileCreationError as e:
        sys.stderr.write(f"Error: {e}\n")
        return False
    except Exception as e:
        sys.stderr.write(f"Unexpected error processing '{filepath}': {e}\n")
        if verbose > 1:
            import traceback
            traceback.print_exc(file=sys.stderr)
        return False

if __name__ == "__main__":
    sys.exit(main())
```

Now our tool has:
1. Verbosity levels with `-v`/`--verbose` and `-q`/`--quiet` options
2. Path normalization and expansion using `os.path.abspath` and `os.path.expanduser`
3. Detailed error messages in verbose mode, including stack traces for unexpected errors

### Step 7: Testing the Tool

Let's create a comprehensive test function to verify our tool's functionality:

```python
def test_file_creation():
    """Test the file creation functionality."""
    import tempfile
    import shutil
    
    # Create a temporary directory for testing
    test_dir = tempfile.mkdtemp()
    print(f"Created test directory: {test_dir}")
    
    try:
        # Test case 1: Create a simple file
        test_file1 = os.path.join(test_dir, "test1.txt")
        print("\nTest 1: Creating a new file")
        result = create_file(test_file1, content="Test content", verbose=2)
        assert result is True
        assert os.path.exists(test_file1)
        
        # Test case 2: Attempt to create the same file (should fail)
        print("\nTest 2: Creating a file that already exists (should fail)")
        result = create_file(test_file1, content="Different content", verbose=2)
        assert result is False
        
        # Test case 3: Force overwrite an existing file
        print("\nTest 3: Force overwriting an existing file")
        result = create_file(test_file1, force=True, content="Overwritten content", verbose=2)
        assert result is True
        with open(test_file1, 'r') as f:
            content = f.read().strip()
        assert content == "Overwritten content"
        
        # Test case 4: Append to an existing file
        print("\nTest 4: Appending to an existing file")
        result = create_file(test_file1, append=True, content="Additional content", verbose=2)
        assert result is True
        with open(test_file1, 'r') as f:
            content = f.read().strip()
        assert content == "Overwritten content\nAdditional content"
        
        # Test case 5: Create a file in a non-existent directory
        print("\nTest 5: Creating a file in a new directory")
        nested_dir = os.path.join(test_dir, "nested", "path")
        test_file2 = os.path.join(nested_dir, "test2.txt")
        result = create_file(test_file2, content="Nested file content", verbose=2)
        assert result is True
        assert os.path.exists(test_file2)
        
        # Test case 6: Try to create a file that's actually a directory
        print("\nTest 6: Trying to create a file with the same name as a directory (should fail)")
        result = create_file(nested_dir, content="This should fail", verbose=2)
        assert result is False
        
        print("\nAll tests passed!")
        return True
        
    except AssertionError as e:
        print(f"Test failed: {e}")
        return False
    finally:
        # Clean up the temporary directory
        print(f"\nCleaning up test directory: {test_dir}")
        shutil.rmtree(test_dir)

# Add this at the end of the main() function to run tests
if "--test" in sys.argv:
    test_file_creation()
    return 0
```

This test function:
1. Creates a temporary directory for testing
2. Tests various scenarios like creating, overwriting, and appending to files
3. Verifies that directories are created when needed
4. Checks error conditions like trying to create a file with the same name as a directory
5. Cleans up after itself by removing the temporary directory

### Final Complete Code

Here's the complete code for our file creation tool:

```python
#!/usr/bin/env python3
"""
File Creation Tool - A utility to create files and directories.

Usage:
    filecreate.py [options] <filepath> [<filepath> ...]
    filecreate.py --test
    filecreate.py -h | --help

Options:
    -f, --force           Overwrite existing files
    -a, --append          Append to existing files
    -s, --skip            Skip existing files (default)
    -c, --content=TEXT    Add specified text to the file
    -i, --interactive     Prompt for content interactively
    -v, --verbose         Increase output verbosity
    -q, --quiet           Suppress output except for errors
    --test                Run self-test
    -h, --help            Show this help message
"""

import os
import sys
import getopt
import errno
import tempfile
import shutil

class FileCreationError(Exception):
    """Custom exception for file creation errors."""
    pass

def main():
    """Main function to process command-line arguments and create files."""
    # Default options
    force = False
    append = False
    content = None
    interactive = False
    verbose = 1  # Default verbosity level (0=quiet, 1=normal, 2=verbose)
    
    # Run self-test if requested
    if "--test" in sys.argv:
        return 0 if test_file_creation() else 1
    
    try:
        # Parse command-line options
        opts, args = getopt.getopt(
            sys.argv[1:], 
            "hfasc:ivq", 
            ["help", "force", "append", "skip", "content=", "interactive", "verbose", "quiet", "test"]
        )
    except getopt.GetoptError as e:
        sys.stderr.write(f"Error: {e}\n")
        print(__doc__)
        return 1
    
    # Process options
    for opt, arg in opts:
        if opt in ("-h", "--help"):
            print(__doc__)
            return 0
        elif opt in ("-f", "--force"):
            force = True
            append = False
        elif opt in ("-a", "--append"):
            append = True
            force = False
        elif opt in ("-c", "--content"):
            content = arg
        elif opt in ("-i", "--interactive"):
            interactive = True
        elif opt in ("-v", "--verbose"):
            verbose = 2
        elif opt in ("-q", "--quiet"):
            verbose = 0
    
    # Check if there are file paths provided
    if not args:
        sys.stderr.write("Error: No file paths provided.\n")
        print(__doc__)
        return 1
    
    # If interactive mode is enabled, prompt for content
    if interactive and content is None:
        print("Enter content (press Ctrl+D on Unix/Linux or Ctrl+Z on Windows when finished):")
        content_lines = []
        try:
            while True:
                line = input()
                content_lines.append(line)
        except EOFError:
            # End of input
            content = "\n".join(content_lines)
            if verbose > 0:
                print("\nContent captured.")
    
    # Process each file path
    success_count = 0
    for filepath in args:
        if create_file(filepath, force=force, append=append, content=content, verbose=verbose):
            success_count += 1
    
    # Report results
    total = len(args)
    if verbose > 0:
        print(f"\nSummary: {success_count} of {total} files processed successfully.")
    
    return 0 if success_count == total else 1

def create_file(filepath, force=False, append=False, content=None, verbose=1):
    """
    Create a file at the specified path.
    
    Args:
        filepath (str): Path to the file to create
        force (bool): Whether to overwrite an existing file
        append (bool): Whether to append to an existing file
        content (str): Optional content to write to the file
        verbose (int): Verbosity level (0=quiet, 1=normal, 2=verbose)
        
    Returns:
        bool: True if successful, False otherwise
    """
    try:
        # Normalize and expand the file path
        filepath = os.path.abspath(os.path.expanduser(filepath))
        
        if verbose > 1:
            print(f"Processing file: {filepath}")
        
        # Check if the file already exists
        if os.path.exists(filepath):
            if os.path.isdir(filepath):
                raise FileCreationError(f"Path '{filepath}' is a directory, not a file")
                
            if force:
                mode = 'w'
                action = "Overwriting"
            elif append:
                mode = 'a'
                action = "Appending to"
            else:
                raise FileCreationError(f"File '{filepath}' already exists. Use -f to overwrite or -a to append.")
        else:
            mode = 'w'
            action = "Creating"
            
            # Get the directory part of the path
            directory = os.path.dirname(filepath)
            
            # Create the directory if it doesn't exist
            if directory and not os.path.exists(directory):
                try:
                    if verbose > 0:
                        print(f"Creating directory: {directory}")
                    os.makedirs(directory)
                except OSError as e:
                    if e.errno == errno.EACCES:
                        raise FileCreationError(f"Permission denied to create directory '{directory}'")
                    else:
                        raise FileCreationError(f"Cannot create directory '{directory}': {e}")
        
        try:
            # Create or modify the file
            with open(filepath, mode) as f:
                if content is not None:
                    if verbose > 1:
                        content_preview = content[:50] + "..." if len(content) > 50 else content
                        print(f"Writing content: {content_preview}")
                    f.write(content)
                    if not content.endswith('\n'):
                        f.write('\n')
        except IOError as e:
            if e.errno == errno.EACCES:
                raise FileCreationError(f"Permission denied to write to '{filepath}'")
            else:
                raise FileCreationError(f"Cannot write to '{filepath}': {e}")
        
        if verbose > 0:
            print(f"{action} file: {filepath}")
        return True
        
    except FileCreationError as e:
        sys.stderr.write(f"Error: {e}\n")
        return False
    except Exception as e:
        sys.stderr.write(f"Unexpected error processing '{filepath}': {e}\n")
        if verbose > 1:
            import traceback
            traceback.print_exc(file=sys.stderr)
        return False

def test_file_creation():
    """Test the file creation functionality."""
    # Create a temporary directory for testing
    test_dir = tempfile.mkdtemp()
    print(f"Created test directory: {test_dir}")
    
    try:
        # Test case 1: Create a simple file
        test_file1 = os.path.join(test_dir, "test1.txt")
        print("\nTest 1: Creating a new file")
        result = create_file(test_file1, content="Test content", verbose=2)
        assert result is True
        assert os.path.exists(test_file1)
        
        # Test case 2: Attempt to create the same file (should fail)
        print("\nTest 2: Creating a file that already exists (should fail)")
        result = create_file(test_file1, content="Different content", verbose=2)
        assert result is False
        
        # Test case 3: Force overwrite an existing file
        print("\nTest 3: Force overwriting an existing file")
        result = create_file(test_file1, force=True, content="Overwritten content", verbose=2)
        assert result is True
        with open(test_file1, 'r') as f:
            content = f.read().strip()
        assert content == "Overwritten content"
        
        # Test case 4: Append to an existing file
        print("\nTest 4: Appending to an existing file")
        result = create_file(test_file1, append=True, content="Additional content", verbose=2)
        assert result is True
        with open(test_file1, 'r') as f:
            content = f.read().strip()
        assert content == "Overwritten content\nAdditional content"
        
        # Test case 5: Create a file in a non-existent directory
        print("\nTest 5: Creating a file in a new directory")
        nested_dir = os.path.join(test_dir, "nested", "path")
        test_file2 = os.path.join(nested_dir, "test2.txt")
        result = create_file(test_file2, content="Nested file content", verbose=2)
        assert result is True
        assert os.path.exists(test_file2)
        
        # Test case 6: Try to create a file that's actually a directory
        print("\nTest 6: Trying to create a file with the same name as a directory (should fail)")
        result = create_file(nested_dir, content="This should fail", verbose=2)
        assert result is False
        
        print("\nAll tests passed!")
        return True
        
    except AssertionError as e:
        print(f"Test failed: {e}")
        return False
    finally:
        # Clean up the temporary directory
        print(f"\nCleaning up test directory: {test_dir}")
        shutil.rmtree(test_dir)

if __name__ == "__main__":
    sys.exit(main())
```

## How to Use the File Creation Tool

Here are some examples of how to use our file creation tool:

### 1. Basic Usage: Create a Single File

```
python filecreate.py myfile.txt
```

This creates `myfile.txt` in the current directory if it doesn't already exist.

### 2. Create Multiple Files

```
python filecreate.py file1.txt file2.txt file3.txt
```

This creates three files: `file1.txt`, `file2.txt`, and `file3.txt`.

### 3. Create a File with Content

```
python filecreate.py --content="Hello, World!" greeting.txt
```

This creates `greeting.txt` with the content "Hello, World!".

### 4. Create a File in a New Directory

```
python filecreate.py new_directory/myfile.txt
```

This creates the directory `new_directory` if it doesn't exist and then creates `myfile.txt` inside it.

### 5. Overwrite an Existing File

```
python filecreate.py --force --content="New content" existing_file.txt
```

This overwrites `existing_file.txt` with "New content" even if the file already exists.

### 6. Append to an Existing File

```
python filecreate.py --append --content="Additional content" existing_file.txt
```

This adds "Additional content" to the end of `existing_file.txt` if it exists.

### 7. Interactive Mode: Enter Content Manually

```
python filecreate.py --interactive myfile.txt
```

This prompts you to enter content for `myfile.txt`. Press Ctrl+D (Unix/Linux) or Ctrl+Z followed by Enter (Windows) when you're done entering content.

### 8. Increase Verbosity for More Details

```
python filecreate.py --verbose new_directory/myfile.txt
```

This shows more details about the file creation process.

### 9. Quiet Mode: Minimal Output

```
python filecreate.py --quiet myfile.txt
```

This creates `myfile.txt` with minimal output, showing only errors if they occur.

## Run Self-Tests

```
python filecreate.py --test
```

This runs the self-tests to verify that the tool is working correctly.

## Understanding the Implementation

Let's break down the key components of our file creation tool:

### 1. Command-Line Argument Parsing

We use the `getopt` module to parse command-line arguments. This allows users to specify options and file paths when running the tool.

```python
opts, args = getopt.getopt(
    sys.argv[1:], 
    "hfasc:ivq", 
    ["help", "force", "append", "skip", "content=", "interactive", "verbose", "quiet", "test"]
)
```

The short options (like `-f`) and long options (like `--force`) provide flexibility for users.

### 2. File Creation Logic

The core functionality is in the `create_file()` function, which:
- Normalizes and expands file paths
- Checks if the file already exists
- Creates directories if needed
- Handles different modes (create, overwrite, append)
- Writes content to the file

The function returns `True` if successful and `False` otherwise, which allows the calling code to track successes and failures.

### 3. Error Handling

We use a custom exception class `FileCreationError` to represent specific file creation errors. This allows us to distinguish between expected errors (like a file already existing) and unexpected errors.

```python
class FileCreationError(Exception):
    """Custom exception for file creation errors."""
    pass
```

We catch and handle errors at multiple levels:
- Permission errors when creating directories or writing files
- Path validation errors (like trying to create a file with the same name as a directory)
- Unexpected errors with traceback information in verbose mode

### 4. Verbosity Levels

We implement three verbosity levels to control the amount of output:
- Quiet (0): Only show errors
- Normal (1): Show important actions and summaries
- Verbose (2): Show detailed information and previews of content

This allows users to choose the level of detail that suits their needs.

### 5. Testing

The `test_file_creation()` function verifies that the tool behaves as expected in various scenarios. It uses a temporary directory for testing and cleans up afterward, ensuring that tests don't leave files on the user's system.

## Extending the Tool

Here are some ways you could extend this tool for more advanced use cases:

### 1. Template Support

Add support for file templates:

```python
# Example implementation
def load_template(template_name):
    """Load a template from a templates directory."""
    template_dir = os.path.join(os.path.dirname(__file__), "templates")
    template_path = os.path.join(template_dir, template_name)
    
    if not os.path.exists(template_path):
        raise FileCreationError(f"Template '{template_name}' not found")
    
    with open(template_path, 'r') as f:
        return f.read()

# Add a command-line option
elif opt in ("-t", "--template"):
    try:
        content = load_template(arg)
    except FileCreationError as e:
        sys.stderr.write(f"Error: {e}\n")
        return 1
```

### 2. File Permissions

Add support for setting file permissions:

```python
# Add a command-line option
elif opt in ("--chmod"):
    try:
        chmod_mode = int(arg, 8)  # Parse octal number
    except ValueError:
        sys.stderr.write(f"Error: Invalid chmod mode '{arg}'\n")
        return 1

# Add to the create_file function
if 'chmod_mode' in locals():
    try:
        os.chmod(filepath, chmod_mode)
        if verbose > 1:
            print(f"Changed permissions of '{filepath}' to {oct(chmod_mode)[2:]}")
    except OSError as e:
        raise FileCreationError(f"Cannot change permissions of '{filepath}': {e}")
```

### 3. Batch Processing from a File List

Add support for reading file paths from a list file:

```python
# Add a command-line option
elif opt in ("--file-list"):
    try:
        with open(arg, 'r') as f:
            file_list = [line.strip() for line in f if line.strip()]
        args.extend(file_list)
    except IOError as e:
        sys.stderr.write(f"Error reading file list '{arg}': {e}\n")
        return 1
```

### 4. Backup Existing Files

Add support for backing up existing files before overwriting them:

```python
# Add a command-line option
elif opt in ("--backup"):
    backup = True

# Add to the create_file function
if os.path.exists(filepath) and 'backup' in locals() and backup:
    backup_path = filepath + ".bak"
    try:
        shutil.copy2(filepath, backup_path)
        if verbose > 0:
            print(f"Created backup: {backup_path}")
    except IOError as e:
        raise FileCreationError(f"Cannot create backup of '{filepath}': {e}")
```

## Conclusion

We've built a robust command-line tool for file creation that:

1. Creates files and directories as needed
2. Handles existing files with options to overwrite, append, or skip
3. Supports adding content from command-line arguments or interactive input
4. Provides clear error messages with appropriate exit codes
5. Includes comprehensive testing
6. Offers different verbosity levels for user feedback

This project demonstrates many important Python concepts:
- Command-line argument parsing
- File and directory operations
- Error handling and custom exceptions
- User interaction
- Testing and validation

The tool serves as a practical example of how Python can be used to create useful utilities that interact with the file system in a safe and user-friendly way.

## Exercises

**Exercise 1:** Add a `--recursive` option that creates recursively missing directories from the file path. For example, `filecreate.py --recursive dir/dir_1/file.txt` would create file in the missing `dir_1` directory

**Exercise 2:** Implement a feature that allows specifying content from a file using a syntax like `--content-file=input.txt`.

**Exercise 3:** Add support for file templates with variable substitution. For example, a template might contain placeholders like `{{name}}` that get replaced with values provided by the user.

**Hint for Exercise 1:** You'll need to use the `glob` module to find directories that are missing.
                