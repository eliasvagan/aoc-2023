import lines from '../utils/linesFromFile';
import { CubeGame, CubeGameCriteria } from './lib/cubeGame';

const criteria: CubeGameCriteria = {
  red:   count => count <= 12,
  green: count => count <= 13, 
  blue:  count => count <= 14
};

const game = new CubeGame(lines); 
const goodGames = game.getGames(criteria);
const solution = goodGames.reduce((sum, game) => sum += game.id, 0);

console.log(solution);
  