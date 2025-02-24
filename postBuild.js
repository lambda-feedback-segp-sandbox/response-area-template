const fs = require('fs');
const path = require('path');

// Path to the generated file
const outputFilePath = path.resolve(__dirname, 'dist', 'web-components.js');

// Read the file content
fs.readFile(outputFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Perform string replacement
  const updatedData = data.replace(
    'parse: t => JSON.parse(t)',
    'parse: t => { try { return JSON.parse(t); } catch (e) { return null; } }'
  );

  // Write the updated content back to the file
  fs.writeFile(outputFilePath, updatedData, 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
    } else {
      console.log('File updated successfully!');
    }
  });
});