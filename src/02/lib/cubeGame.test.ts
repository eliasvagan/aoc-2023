import { CubeGame, CubeGameCriteria } from "./cubeGame";

describe('CubeGame', () => {
  let game: CubeGame;

  beforeEach(() => {
    game = new CubeGame([
      'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
      'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
      'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
    ]);
  });

  it('should parse the right amount of games',  () => {
    const games = game.allGames;
    expect(games.length).toBe(3);
  });

  it('should parse games on expected format', () => {
    const games = game.allGames;
    expect(games).toEqual([
      {
        id: 1,
        rounds: [
          { red: 4,   green: 0,   blue: 3 },
          { red: 1,   green: 2,   blue: 6 },
          { red: 0,   green: 2,   blue: 0 }
        ]
      },
      {
        id: 2,
        rounds: [
          { red: 0,   green: 2,   blue: 1 },
          { red: 1,   green: 3,   blue: 4 },
          { red: 0,   green: 1,   blue: 1 }
        ]
      },
      {
        id: 3,
        rounds: [
          { red: 20,  green: 8,   blue: 6 },
          { red: 4,   green: 13,  blue: 5 },
          { red: 1,   green: 5,   blue: 0 }
        ]
      }
    ]);
  });

  it('should filter out games on a criteria', () => {
    const criteria: CubeGameCriteria = {
      red:   count => count === 0 || count === 1,
      green: count => count > 0,
      blue:  count => count < 7,
    }
    const games = game.getGames(criteria);

    expect(games.length).toBe(1);
  });

  it('should get the sum of minimum power', () => {
    expect(game.minPowerSum).toBe(1620);
  })
});