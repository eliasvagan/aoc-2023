import fs from 'fs';
import { CubeGame } from './lib/cubeGame';

// Check if a file path is provided as a command-line argument
if (process.argv.length < 3) {
  console.error('Usage: ts-node solve_01A.ts <file-path>');
  process.exit(1);
}

// Get the file path from command-line arguments
const filePath = process.argv[2] as fs.PathOrFileDescriptor;
const fileContent = fs.readFileSync(filePath, 'utf-8');
const lines = fileContent.split('\n').filter(Boolean);

const game = new CubeGame(lines); 
const sumPowers = game.allGames.map(({ rounds }) => (
  rounds.reduce((min, next) => (
    {
      red:   Math.max(min.red,   next.red),
      green: Math.max(min.green, next.green),
      blue:  Math.max(min.blue,  next.blue),
    }
  ), { red: 0, green: 0, blue: 0 })
)).reduce((sum, power) => sum + power.red * power.blue * power.green, 0);

console.log({
  sumPowers
});
  