import { parseCalibrationValueLexical } from './parseCalibrationValueLexical';

describe('parse calibration value with lexical numbers', () => {
  const tested: (val: string) => number = parseCalibrationValueLexical;

  it('should parse numbers correctly', () => {
    const expected = [
      { inp: 'eight2onethree',                out: 83 },
      { inp: 'six2412twothreeight',           out: 68 },
      { inp: 'tzjkffsvbjseven5rhmlxonezlx',   out: 71 },
      { inp: 'kscpjfdxp895foureightckjjl1',   out: 81 },
      { inp: 'qtvbgtclhnk4ninefourseven5one', out: 41 },
      { inp: '9ngvdjddqbz',                   out: 99 },
    ];
    for(const { inp, out } of expected) {
      expect(tested(inp)).toBe(out);
    }
  });
});
