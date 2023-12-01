import * as fs from 'fs';

// Check if a file path is provided as a command-line argument
if (process.argv.length < 3) {
  console.error('Usage: ts-node solve-01B.ts <file-path>');
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
  const numExp = /one|two|three|four|five|six|seven|eight|nine|\d/g;
  const nums = value.match(numExp);

  if (nums === null) {
    throw Error(`Parsing error! "${value}" returned no number(s)!`);
  }

  const replacements = {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9',
  };

  return Number(
    [nums.at(0), nums.at(-1)]
      .map(num => replacements[(num as keyof typeof replacements)] ?? num)
      .join('')
  );
};

  // UNCOMMENT TO DEBUG
  console.table(lines.filter(Boolean).map(v => ({ from: v, to: parseCalibrationValue(v) })));
  
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
  