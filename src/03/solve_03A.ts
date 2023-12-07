import lines from '../utils/linesFromFile';
import { GondolaEngine, HasPosition } from './lib/gondolaEngine';

const engine: GondolaEngine = new GondolaEngine(lines);

const sumValidParts = engine.parts
  .reduce((sum: number, part: HasPosition<number>) => sum + part.value, 0);

console.log(sumValidParts);