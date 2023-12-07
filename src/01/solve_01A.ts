import lines from '../utils/linesFromFile';
import { parseCalibrationValueNumeric } from './lib/parseCalibrationValueNumeric';

const solution = lines
  .map(parseCalibrationValueNumeric)
  .reduce((sum: number, next: number) => next + sum, 0);

console.log(solution);
