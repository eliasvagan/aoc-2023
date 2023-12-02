import { parseCalibrationValue } from './solve_01B';

describe('parse calibration value', () => {
    it('should parse numbers correctly', () => {
        const expected = [
            { inp: 'eight2onethree',              out: 83 },
            { inp: 'six2412twothreeight',         out: 68 },
            { inp: 'tzjkffsvbjseven5rhmlxonezlx', out: 71 },
            { inp: 'kscpjfdxp895foureightckjjl1', out: 81 },
            { inp: 'qtvbgtclhnk4ninefourseven5one', out: 41 }
        ];
        for(const { inp, out } of expected) {
            expect(parseCalibrationValue(inp)).toBe(out);
        }
    });
});