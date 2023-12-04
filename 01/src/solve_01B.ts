import * as fs from 'fs';
import { parseCalibrationValueLexical } from './lib/parseCalibrationValueLexical';

// Check if a file path is provided as a command-line argument
if (process.argv.length < 3) {
  console.error('Usage: ts-node solve-01B.ts <file-path>');
  process.exit(1);
}

// Get the file path from command-line arguments
const filePath = process.argv[2] as fs.PathOrFileDescriptor;
const fileContent = fs.readFileSync(filePath, 'utf-8');
const lines = fileContent.split('\n');

/**
 * Solve
 */
const solution = lines
  .filter(Boolean)
  .map(parseCalibrationValueLexical)
  .reduce((sum: number, next: number) => next + sum, 0)
  
console.log({
  solution
});
  