
export type Cube = 'red' | 'blue' | 'green';
export type CubeGameCriteria = Record<Cube, (count: number) => boolean>;

export type Game = {
  id: number;
  rounds: Record<Cube, number>[];
}

export class CubeGame {

  private _games: Game[];
  
  constructor(
    gamesRaw: string[]
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
   * Parse games from a string
   * 
   * @param gameRaw 
   * @returns
   */
  private _parseGame(gameRaw: string): Game {
    const id: number = Number.parseInt(gameRaw.match(/Game\s(\d+)/)!.at(1)!);
    const roundsRaw: string[] = gameRaw.match(/Game\s\d+\:\s(.*)/)!.at(1)!.split(/\;\s/);
    const rounds = roundsRaw.map((roundRaw: string) => {
      const red = Number.parseInt(roundRaw.match(/(\d+)\sred/)?.at(1) ?? '0');
      const green = Number.parseInt(roundRaw.match(/(\d+)\sgreen/)?.at(1) ?? '0');
      const blue = Number.parseInt(roundRaw.match(/(\d+)\sblue/)?.at(1) ?? '0');
      return { red, green, blue };
    })
    return { id, rounds };
  }
}