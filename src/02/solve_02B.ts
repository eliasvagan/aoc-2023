import { CubeGame } from './lib/cubeGame';
import lines from '../utils/linesFromFile';

const sumPowers = new CubeGame(lines).minPowerSum;

console.log(sumPowers);
