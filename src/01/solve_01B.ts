import lines from '../utils/linesFromFile';
import { parseCalibrationValueLexical } from './lib/parseCalibrationValueLexical';

const solution = lines
  .map(parseCalibrationValueLexical)
  .reduce((sum: number, next: number) => next + sum, 0)
  
console.log(solution);