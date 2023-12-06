import lines from '../utils/linesFromFile';
import { GondolaEngine } from './lib/gondolaEngine';

const { totalGearRatio } = new GondolaEngine(lines);

console.log(totalGearRatio);