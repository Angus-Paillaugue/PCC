import subprocess
import os

# Get the current directory
current_dir = os.path.dirname(os.path.abspath(__file__))

# Build the path to the JavaScript file
js_file_path = os.path.join(current_dir, 'build.js')

# Run the JavaScript file using Node.js
subprocess.run(['node', js_file_path])
