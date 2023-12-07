import { parseCalibrationValueNumeric } from './parseCalibrationValueNumeric';

describe('Method parseCalibrationValue', () => {
  const tested: (val: string) => number = parseCalibrationValueNumeric;

  it('should extract first and last digits from a string', () => {
    const expected = [
      { inp: '1abc2',       out: 12 },
      { inp: 'pqr3stu8vwx', out: 38 },
      { inp: 'a1b2c3d4e5f', out: 15 },
      { inp: 'treb7uchet',  out: 77 },
    ];
    for (const { inp, out } of expected) {
      expect(tested(inp)).toBe(out);
    }
  });
});