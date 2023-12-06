import lines from '../utils/linesFromFile';
import { GondolaEngine, Part } from './lib/gondolaEngine';

const engine: GondolaEngine = new GondolaEngine(lines);

const sumValidParts = engine.parts
  .reduce((sum: number, part: Part) => sum + part.value, 0);

console.log(sumValidParts);