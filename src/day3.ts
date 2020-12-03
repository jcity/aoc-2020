import { getInput } from './helpers/getInput';

const INPUT = getInput(3).map((l) => l.split(''));

const part1 = () => {
  let x = 0;
  let y = 0;
  let count = 0;
  while (y + 1 < INPUT.length) {
    y += 1;
    x = (x + 3) % INPUT[0].length;
    if (INPUT[y][x] === '#') count += 1;
  }
  return count;
};

console.log('Part 1');
console.log(`Solution: ${part1()}`);
