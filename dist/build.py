import os
import zipfile

# Define the output ZIP file name
output_zip_file = os.path.normpath(os.path.join(os.path.dirname(os.path.realpath(__file__)), 'build.zip'))

# List of files and directories to exclude
exclude_items = ["content.js", "pnpm-lock.yaml", "package.json", "webpack.config.js", "node_modules", "features", "utils"]

# Calculate the source directory path based on the script's location
source_dir = os.path.abspath(os.path.join(os.path.dirname(os.path.realpath(__file__)), "../extension/"))  # Move up one level from the script's directory
print(source_dir)

def zip_project_directory(source, output, excludes):
    # Open the ZIP file for writing
    with zipfile.ZipFile(output, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, _, files in os.walk(source):
            # Check if the current directory is in the list of excluded items
            if any(exclude_item in root for exclude_item in excludes):
                continue

            for file in files:
                file_path = os.path.join(root, file)

                # Check if the file should be excluded
                if any(exclude_item in file_path for exclude_item in excludes):
                    continue

                # Calculate the relative path to preserve directory structure
                relative_path = os.path.relpath(file_path, source)

                # Add the file to the ZIP archive with the relative path
                zipf.write(file_path, relative_path)

if __name__ == "__main__":
    zip_project_directory(source_dir, output_zip_file, exclude_items)
