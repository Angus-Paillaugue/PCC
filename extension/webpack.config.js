const path = require('path');

module.exports = {
  mode: 'production',
  entry: './content.js', // Entry point of your content script
  output: {
    filename: 'content.bundle.js', // Output filename
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
};