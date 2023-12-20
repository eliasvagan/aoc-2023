import lines from '../utils/linesFromFile';

type Card = 'A' 
  | 'K' | 'Q' | 'J' 
  | 'T' | '9' | '8' 
  | '7' | '6' | '5' 
  | '4' | '3' | '2';

type Hand = [Card, Card, Card, Card, Card];

type CardGame = {
  label: string;
  value: number;
  hand: Hand;
  bet: number;
}

const parseHand = (hand: Hand): {
  label: string; 
  value: number 
} => {
  const handCombos: { 
    label: string;
    value: number;
    test: (h: Hand) => boolean;
  }[] = [
    {
      label: 'Five of a kind',
      value: 7,
      test: (h) => h.reduce((pass, card) => pass && card === h[0], true),
    },
    {
      label: 'Four of a kind',
      value: 6,
      test: (h) => /\w?(\w)\1{3}/.test([...h].sort().join('')),
    },
    {
      label: 'Full house',
      value: 5,
      test: (h) => /^(\w)\1{1,2}(\w)\2{1,2}$/.test([...h].sort().join('')),
    },
    {
      label: 'Three of a kind',
      value: 4,
      test: (h) => {
        const unique = Array.from(new Set(h));
        if (unique.length !== 3) return false;
        for (const card of unique) {
          if (h.filter(c => c === card).length === 3) 
            return true;
        }
        return false;
      }
    },
    {
      label: 'Two pair',
      value: 3,
      test: (h) => {
        const unique = Array.from(new Set(h));
        return (
          unique.length === 3 && 
          /(\w)\1?(\w)\2?(\w)\3?/.test(h.join(''))
        );
      },
    },
    {
      label: 'One pair',
      value: 2,
      test: (h) => Array.from(new Set(h)).length === 4,
    },
    { 
      label: 'High card',
      value: 1,
      test: (h) => Array.from(new Set(h)).length === 5,
    }
  ];

  // Resolve best combo
  for (const combo of handCombos.sort((a, b) => b.value - a.value)) {
    if (combo.test(hand)) {
      return { 
        label: combo.label, 
        value: combo.value 
      };
    }
  }

  // No combo
  return {
    label: 'No combo',
    value: 0
  }
};

/**
 * Make a card from a raw input line
 * 
 * @param raw
 * @returns 
 */
const parseCardGame = (raw: string): CardGame => {
  const bet: number = Number(raw.match(/\w+\s(\d+)/)!.at(1));
  const hand: Hand = raw.match(/\w{5}/)?.[0].split('') as Hand;

  const { label, value } = parseHand(hand);
  
  return {
    bet,
    hand,
    label,
    value,
  }
};

const compareHands = (a: Hand, b: Hand): number => {
  const diff = parseHand(b).value - parseHand(a).value;
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
    return cardValue[b[i] as Card] - cardValue[a[i] as Card];
  }
  return 0;
};

const parsedGames = lines
  .map(parseCardGame)
  .sort((a, b) => compareHands(a.hand, b.hand))
  .map(((game, index, all) => { 
    const rank = all.length - index;
    return { 
      ...game, 
      rank, 
      score: game.bet * rank,
      hand: game.hand.join('')
    }
  }));
console.table(parsedGames);
console.log({ sum: parsedGames.reduce((s, n) => s + n.score , 0)});