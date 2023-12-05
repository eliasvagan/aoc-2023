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
    'one':   '1',
    'two':   '2',
    'three': '3',
    'four':  '4',
    'five':  '5',
    'six':   '6',
    'seven': '7',
    'eight': '8',
    'nine':  '9',
  };

  return Number([
    value.match(numExpStart)?.at(1) ?? 'error',
    value.match(numExpEnd)?.at(1) ?? 'error',
  ].map((num: string): string => ( 
      replacements[num as keyof typeof replacements] ?? num 
    ))
    .join('')
  );
};