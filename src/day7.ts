import { getInput } from './helpers/getInput';

const INPUT = getInput(7);

const rules = new Map<string, Map<string, number>>();
INPUT.forEach((line) => {
  const [bagColor, canContain] = line.split(/\s+bags\s+contain\s+/);
  if (canContain.match(/no other bags/)) rules.set(bagColor, new Map());
  else {
    const contains = new Map<string, number>();
    canContain
      .replace(/\./, '')
      .replace(/bag(s)?/g, '')
      .split(',')
      .map((s) => s.trim())
      .forEach((s) => {
        contains.set(s.slice(1).trim(), +s.split(' ')[0]);
      });
    rules.set(bagColor, contains);
  }
});

const part1 = () => {
  const validBags = new Set<string>();
  const searchBags = ['shiny gold'];
  while (searchBags.length !== 0) {
    const searchColor = searchBags.shift();
    rules.forEach((canContain, color) => {
      const colorCapacity = canContain.get(searchColor);
      if (colorCapacity) {
        searchBags.push(color);
        validBags.add(color);
      }
    });
  }
  return validBags.size;
};

console.log(`Part 1 Solution: ${part1()}`);
