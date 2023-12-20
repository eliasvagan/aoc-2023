import lines from '../utils/linesFromFile';

type Card = 'A' 
  | 'K' | 'Q' | 'J' 
  | 'T' | '9' | '8' 
  | '7' | '6' | '5' 
  | '4' | '3' | '2';

type Hand = [Card, Card, Card, Card, Card];

type CardGame = {
  hand: Hand;
  bet: number;
  rank: number;
}

const parseHandValue = (hand: Hand): number => {
  const combinations = [
    (h: Hand) => {
      h[0];
    },
  ];
};

/**
 * Make a card from a raw input line
 * 
 * @param raw
 * @returns 
 */
const parseCardGame = (raw: string): CardGame => {
  const bet = Number(raw.match(/\d/));
  const hand = raw.match(/Game \d/g).slice(1);
  return { bet, hand, rank };
};

const compareHands = (a: Hand, b: Hand): number => {
  const diff = parseHandValue(a) - parseHandValue(b);
  if (diff !== 0) return diff;

  // Handle 
  const cardValue: Record<Card, number> = {
    '2': 1,
    '3': 2,
    '4': 3,
    '5': 4,
    '6': 5,
    '7': 6,
    '8': 7,
    '9': 8,
    'A': 13,
    'J': 10,
    'K': 12,
    'Q': 11,
    'T': 9,
  };
  for (let i = 0; i < a.length; i++) {
    if (a[i] === b[i]) continue;
    return cardValue[a[i] as Card] - cardValue[b[i] as Card];
  }
};

console.log(lines.map(parseCardGame));