import lines from '../utils/linesFromFile';
import { CubeGame, CubeGameCriteria, Game } from './lib/cubeGame';

const criteria: CubeGameCriteria = {
  blue:  count => count <= 14,
  green: count => count <= 13, 
  red:   count => count <= 12,
};

const game = new CubeGame(lines); 
const goodGames = game.getGames(criteria);
const solution = goodGames.reduce((sum: number, game: Game) => sum += game.id, 0);

console.log(solution);
