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
  const numExpStart = /one|two|three|four|five|six|seven|eight|nine|\d/g;
  const numExpEnd = /(<=$)one|two|three|four|five|six|seven|eight|nine|\d/g;

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

  return Number([
    value.match(numExpStart)?.at(0) ?? '0',
    value.match(numExpEnd)?.at(-1) ?? '0',
  ].map((num: string): string => ( 
      replacements[num as keyof typeof replacements] ?? num 
    ))
    .join('')
  );
};

  // UNCOMMENT TO PRINT TABLE EXPLANATION
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
  