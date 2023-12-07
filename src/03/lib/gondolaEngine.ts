export interface HasPosition<T> {
  row: number;
  col: number;
  value: T;
}

export class GondolaEngine {
  private _symbols: HasPosition<string>[];
  private _parts: HasPosition<number>[];

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

  public get parts(): HasPosition<number>[] {
    return this._parts;
  }

  /**
   * Calculate the total sum of gear ratios. Gear ratios are pairs of parts 
   * whose only common neighbor is a single '*' symbol and multiplying them
   */
  public get totalGearRatio(): number {
    const resolveGear = (gear: HasPosition<string>): { 
      neighbours: HasPosition<number>[];
      ratio: number
    } => {
      const neighbours: HasPosition<number>[] = this._parts.filter((part: HasPosition<number>) => {
        const partSize = part.value.toString().length;
        if (
          gear.col >= part.col -1  && gear.col <= part.col + partSize &&
          gear.row >= part.row -1  && gear.row <= part.row + 1
        ) { 
          return true;
        }
        return false;
      });
      
      const ratio: number = neighbours.reduce((ratio, gear) => ratio * gear.value ,1);
      return { neighbours, ratio };
    };

    return this._symbols
      .filter(s => s.value === '*' )
      .map(resolveGear)
      .reduce((sum, gear) => sum + gear.ratio, 0);
  }

  /**
   * Using a regex, find all occurrences in rows and their 
   * respective positions
   * 
   * @param rows 
   * @param matcher RegExp w/global flag
   * @param parser Optionally provide to cast value from string to compatible type
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
      const line: string = rows[row] as string;
      let nextMatch: RegExpExecArray | null = null;
      while ((nextMatch = matcher.exec(line)) !== null) {
        found.push({
          col: nextMatch.index,
          row,
          value: parser?.(nextMatch[0]) ?? nextMatch[0] as T,
        });
      }
    }
    return found;
  };

  /**
   * Check whether a part has a symbol within proximity
   * 
   * @param symbols 
   * @param part
   * @returns 
   */
  private _isValidPart = (part: HasPosition<number>): boolean => {
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
  };
}
