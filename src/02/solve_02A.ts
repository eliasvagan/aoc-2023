import fs from 'fs';
import { CubeGame, CubeGameCriteria } from './lib/cubeGame';

// Check if a file path is provided as a command-line argument
if (process.argv.length < 3) {
  console.error('Usage: ts-node solve_01A.ts <file-path>');
  process.exit(1);
}

// Get the file path from command-line arguments
const filePath = process.argv[2] as fs.PathOrFileDescriptor;
const fileContent = fs.readFileSync(filePath, 'utf-8');
const lines = fileContent.split('\n').filter(Boolean);

// Solve the task 
const criteria: CubeGameCriteria = {
  red:   count => count <= 12,
  green: count => count <= 13, 
  blue:  count => count <= 14
};

const game = new CubeGame(lines); 
const goodGames = game.getGames(criteria);
const solution = goodGames.reduce((sum, game) => sum += game.id, 0);

console.log({
  solution
});
  