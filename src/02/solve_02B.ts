import lines from '../utils/linesFromFile';
import { CubeGame } from './lib/cubeGame';

const sumPowers = new CubeGame(lines).minPowerSum;

console.log(sumPowers);
  