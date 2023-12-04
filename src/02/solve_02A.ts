import fs from 'fs';

// Check if a file path is provided as a command-line argument
if (process.argv.length < 3) {
  console.error('Usage: ts-node solve_01A.ts <file-path>');
  process.exit(1);
}

// Get the file path from command-line arguments
const filePath = process.argv[2] as fs.PathOrFileDescriptor;
const fileContent = fs.readFileSync(filePath, 'utf-8');
const lines = fileContent.split('\n');

/**
 * Solve
 */

type Ball = 'red' | 'blue' | 'green';

type Criteria = Record<Ball, (count: number) => boolean>;

type Game = {
  id: number;
  rounds: Record<Ball, number>[];
}

const isValidGame = (criteria: Criteria) => (game: Game): boolean => {
  for (const { red, green , blue } of game.rounds) {
    if (!criteria.red(red) || !criteria.green(green) || !criteria.blue(blue)) {
      return false;
    }
  }
  return true;
};

const myCriteria: Criteria = {
  red:   count => count <= 12,
  green: count => count <= 13, 
  blue:  count => count <= 14
};

/**
 * Parse a game from a line of text
 * 
 * @param line 
 * @returns 
 */
const parseGame = (line: string): Game => {
  const [ _, id, roundsRaw ] = line.match(/^Game (\d+)\:\s(.+)$/)!;
  if (!id || !roundsRaw) {
    throw Error(`Illegal game line format! "${line}"`);
  }
  const rounds = roundsRaw.split(/\;\s/)
    .map((roundRaw: string) => {
      const [ red, green, blue ] = [
        roundRaw.match(/(\d)\sred/g)?.at(1),
        roundRaw.match(/(\d)\sgreen/g)?.at(1),
        roundRaw.match(/(\d)\sblue/g)?.at(1),
      ].map((value: string | undefined) => (
        value ? Number.parseInt(value) : 0
      ));
      return { red, green, blue };
  });
  console.log(rounds);

  return { id, rounds } as any;
};

const solution = lines
  .filter(Boolean)
  .map(parseGame)
  .filter(isValidGame(myCriteria))
  .length;
  

console.log({
  solution
});
  