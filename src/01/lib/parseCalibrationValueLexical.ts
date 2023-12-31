/**
* Parse numeric value from an elf calibration string
* 
* @param value 
* @returns result
*/
export const parseCalibrationValueLexical = (value: string): number => {
  const numExpStart = /(one|two|three|four|five|six|seven|eight|nine|\d)/;
  const numExpEnd = /.*(one|two|three|four|five|six|seven|eight|nine|\d).*/;

  const replacements: Record<string, string> = {
    'eight': '8',
    'five':  '5',
    'four':  '4',
    'nine':  '9',
    'one':   '1',
    'seven': '7',
    'six':   '6',
    'three': '3',
    'two':   '2',
  };

  return Number([
    value.match(numExpStart)?.at(1) ?? 'error',
    value.match(numExpEnd)?.at(1) ?? 'error',
  ].map((num: string): string => ( 
    replacements[num ] ?? num 
  ))
    .join(''),
  );
};