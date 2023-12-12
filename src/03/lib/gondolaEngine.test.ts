import { GondolaEngine } from './gondolaEngine';

const engine = new GondolaEngine([
  '467..114..',
  '...*......',
  '..35..633.',
  '......#...',
  '617*......',
  '.....+.58.',
  '..592.....',
  '......755.',
  '...$.*....',
  '.664.598..',
]);

describe('GondolaEngine (day 3)', () => {
  it('should resolve gearRatio', () => {
    expect(engine.totalGearRatio).toBe(467 * 35 + 755 * 598);
  });
});