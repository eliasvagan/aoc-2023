import * as fs from 'fs';

// Check if a file path is provided as a command-line argument
if (process.argv.length < 3) {
  console.error('Usage: ts-node solve_01A.ts <file-path>');
  process.exit(1);
}

// Get the file path from command-line arguments
const filePath = process.argv[2];
const fileContent = fs.readFileSync(filePath, 'utf-8');
const lines = fileContent.split('\n');

/**
 * Parse numeric value from an elf calibration string
 * 
 * @param value 
 * @returns result
 */
const parseCalibrationValue = (value: string): number => {
  const nums: string[] | null = value
    .match(/(\d)/g);
  if (nums === null) {
    throw Error(`Parsing error! "${value}" returned no number(s)!`);
  }

  const numericValue: string = (nums as string[])
    .filter((_num, i, all) => i === 0 || i === all.length -1)
    .reduce((acc: string, num: string, _i, all: string[]) => (
      `${acc}${num}${all.length === 1 ? num : ''}`
      ), '');
      
  return Number(numericValue);
};

/*
  ====   Solve   ====
*/
const solution = lines
  .filter(Boolean)
  .map(parseCalibrationValue)
  .reduce((sum, next) => next + sum, 0)

console.log({
  solution
});
  