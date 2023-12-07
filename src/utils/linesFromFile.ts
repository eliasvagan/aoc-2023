/**
 * !!! IMPORTANT !!!
 * 
 * Importing from this file requires that the runtime entrypoint be 
 * provided a file path as a command-line argument
*/

import fs from 'fs';

// Check that a file path is provided as a command-line argument
if (process.argv.length < 3) {
  console.error('Usage: ts-node solve_XX.ts <file-path>');
  process.exit(1);
}

// Read file from path
const filePath = process.argv[2] as fs.PathOrFileDescriptor;
const fileContent = fs.readFileSync(filePath, 'utf-8');

export default fileContent
  .split(/\r\n|\n/)
  .filter(Boolean); // Remove empty lines