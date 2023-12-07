import { GondolaEngine } from './lib/gondolaEngine';
import lines from '../utils/linesFromFile';

const { totalGearRatio } = new GondolaEngine(lines);

console.log(totalGearRatio);