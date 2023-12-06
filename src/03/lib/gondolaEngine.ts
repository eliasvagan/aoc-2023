export interface HasPosition<T> {
  row: number;
  col: number;
  value: T;
}

export type Symbol = HasPosition<string>;
export type Part = HasPosition<number>


export class GondolaEngine {
  private _symbols: symbol[];
  private _parts: Part[];

  /**
   * @param schematic Scrambled engine schematic string (puzzle input)
   */
  constructor(
    schematic: string[],
  ) {
    this._parts = this
      .findOccurrences(schematic, /\d+/g, Number.parseInt)
      .filter(this._isValidPart);

    this._symbols = this
      .findOccurrences(schematic, /[^\d\r.]/g);
  }

  public get parts(): Part[] {
    return this._parts;
  }

  public get totalGearRatio(): number {
    const gears = this._symbols
      .filter(s => s.value === '*')
      .map(gear => {
        const neighbours: Part[] = this._parts.filter((part: Part) => {
          const partSize = part.value.toString().length;
          if (
            gear.col >= part.col -1  && gear.col <= part.col + partSize && // Should there be partSize + 1?
            gear.row >= part.row -1  && gear.row <= part.row + 1
          ) { 
            return true;
          }
          return false;
        });

        const ratio: number = neighbours.reduce((ratio, gear) => ratio * gear.value ,1);

        return {
          neighbours,
          ratio
        }
      });

    return gears.reduce((sum, gear) => sum + gear.ratio, 0);
  }

  /**
   * Using a regex, find all occurrences in rows and their 
   * respective positions
   * 
   * @param rows 
   * @param matcher RegExp w/global flag
   * @param parser 
   * @returns 
   */
  private findOccurrences = <T = string>(
    rows: string[], 
    matcher: RegExp,
    parser?: (val: string) => T,
  ): HasPosition<T>[] => {

    if (!matcher.global) {
      throw Error('Matcher must include global flag!');
    }

    const found: HasPosition<T>[] = [];
    for (let row = 0; row < rows.length; row++) {
      const line: string = rows[row]!;
      let part: RegExpExecArray | null = null;
      while ((part = matcher.exec(line)) != null) {
        found.push({
          row,
          col: part.index,
          value: parser ? parser(part[0]) : part[0] as T
        })
      }
    }
    return found;
  };

  /**
   * Check whether a part is valid from an array of symbols
   * 
   * @param symbols 
   * @param part
   * @returns 
   */
  private _isValidPart = (part: Part): boolean => {
    for (let i = 0; i < part.value.toString().length; i++) {
      const offsets: [ number, number ][] = [
        [  i -1, -1 ],  // Left up
        [  i -1,  0 ],  // Left
        [  i -1,  1 ],  // Left down
        [  i +1, -1 ],  // Right up
        [  i +1,  0 ],  // Right
        [  i +1,  1 ],  // Right down
        [  i,     1 ],  // Down
        [  i,    -1 ],  // Up
      ];
      for (const [ dx, dy ] of offsets) {
        // TODO: Rewrite symbols to be an x/y-map to make this faster
        if (this._symbols.find(sym => (
          sym.col === part.col + dx && 
          sym.row === part.row + dy
        ))) return true;
      }
      
    }
    return false;
  }
}
