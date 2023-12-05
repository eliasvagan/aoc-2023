import lines from '../utils/linesFromFile';

type HasPosition<T> = {
  row: number;
  col: number;
  value: T;
}

type Symbol = HasPosition<symbol>
type Part = HasPosition<number>

/**
 * Using a regex, find all occurrences in rows and their 
 * respective positions
 * 
 * @param rows 
 * @param matcher RegExp w/global flag
 * @param parser 
 * @returns 
 */
const findOccurrences = <T = string>(
  rows: String[], 
  matcher: RegExp,
  parser?: (val: string) => T,
): HasPosition<T>[] => {

  if (!matcher.global) {
    throw Error('Matcher must include global flag!');
  }

  const found: HasPosition<T>[] = [];
  for (let row = 0; row < rows.length; row++) {
    const line: string = rows[row] as string;
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
}

/**
 * Check whether a part is valid from an array of symbols
 * 
 * @param symbols 
 * @param part
 * @returns 
 */
const isValidPart = (symbols: Symbol[]) => (part: Part): boolean => {
  for (let i = 0; i < part.value.toString().length; i++) {
    const offsets: [ number, number ][] = [
      [ -1 + i, -1 ],  // Above left
      [ -1 + i,  0 ],  // Above
      [ -1 + i,  1 ],  // Above right
      [  1 + i, -1 ],  // Below left
      [  1 + i,  0 ],  // Below 
      [  1 + i,  1 ],  // Below right
      [  i,      1 ],  // Right
      [  i,     -1 ],  // Left
    ];
    for (const [ dx, dy ] of offsets) {
      // TODO: Rewrite symbols to be an x/y-map to make this faster
      if (symbols.find(sym => (
        sym.col === part.col + dx && 
        sym.row === part.row + dy
      ))) return true;
    }
  }
  return false;
}

const parts: Part[] = findOccurrences(lines, /\d+/g, Number.parseInt);
const symbols: Symbol[] = findOccurrences(lines, /[^\d\r.]/g);

const sumValidParts = parts
  .filter(isValidPart(symbols))
  .reduce((sum: number, part: Part) => sum + part.value, 0);

console.log(sumValidParts);