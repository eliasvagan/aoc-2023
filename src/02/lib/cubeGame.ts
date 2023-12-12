export type Cube = 'red' | 'blue' | 'green';
export type CubeGameCriteria = Record<Cube, (count: number) => boolean>;

export interface Game {
  id: number;
  rounds: Record<Cube, number>[];
}

export class CubeGame {
  private _games: Game[];
  
  constructor(
    gamesRaw: string[],
  ) {
    this._games = gamesRaw.map(this._parseGame);
  }

  /**
   * All parsed games
   */
  public get allGames(): Game[] {
    return this._games;
  }

  /**
   * Get games that satisfy a criteria for all respective rounds
   * 
   * @param criteria 
   * @returns 
   */
  public getGames(criteria: CubeGameCriteria): Game[] {
    return this._games.filter((game: Game) => {
      for (const round of game.rounds) {
        if ( !criteria.blue(round.blue)
          || !criteria.green(round.green)
          || !criteria.red(round.red)
        ) return false;
      }
      return true;
    });
  }

  /**
   * Get the sum of all games' minimum power
   * 
   * @returns 
   */
  public get minPowerSum(): number {
    return this._games.reduce((sum: number, game: Game) => (
      sum + this._getMinPower(game)
    ), 0);
  }

  /**
   * Parse games from a string
   * 
   * @param gameRaw 
   * @returns
   */
  private _parseGame(gameRaw: string): Game {
    const id: number = Number.parseInt(gameRaw.match(/Game\s(\d+)/)?.at(1) ?? '-1');
    const roundsRaw: string = (gameRaw.match(/Game\s\d+:\s(.*)/)?.at(1) ?? '');
    const rounds = roundsRaw
      .split(/;\s/)
      .map((roundRaw: string) => {
        const red = Number.parseInt(roundRaw.match(/(\d+)\sred/)?.at(1) ?? '0');
        const green = Number.parseInt(roundRaw.match(/(\d+)\sgreen/)?.at(1) ?? '0');
        const blue = Number.parseInt(roundRaw.match(/(\d+)\sblue/)?.at(1) ?? '0');
        return { blue, green, red };
      });
    return { id, rounds };
  }

  /**
   * Calculate the minimum power of a game, i.e. the product of each 
   * cube colour's max count
   * 
   * @param game 
   * @returns 
   */
  private _getMinPower(game: Game): number {
    const powers = game.rounds.reduce((min, next) => (
      {
        blue:  Math.max(min.blue,  next.blue),
        green: Math.max(min.green, next.green),
        red:   Math.max(min.red,   next.red),
      }
    ), { blue: 0, green: 0, red: 0 });
    return powers.red * powers.green * powers.blue;
  }
}