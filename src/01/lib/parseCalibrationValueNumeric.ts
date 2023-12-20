/**
 * Parse numeric value from an elf calibration string
 * 
 * @param value 
 * @returns result
 */
export const parseCalibrationValueNumeric = (value: string): number => {
  const nums: string[] | null = value.match(/(\d)/g);
  if (nums === null) {
    throw Error(`Parsing error! "${value}" returned no number(s)!`);
  }
  const numericValue: string = nums
    .filter((_num, i, all) => i === 0 || i === all.length -1)
    .reduce((acc: string, num: string, _i, all: string[]) => (
      `${acc}${num}${all.length === 1 ? num : ''}`
    ), '');
      
  return Number(numericValue);
};