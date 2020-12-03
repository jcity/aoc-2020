import { getInput } from './helpers/getInput';

const INPUT = getInput(3).map((l) => l.split(''));

const countTrees = (xSlope: number, ySlope: number) => {
  let x = 0;
  let y = 0;
  let count = 0;
  while (y + ySlope < INPUT.length) {
    y += ySlope;
    x = (x + xSlope) % INPUT[0].length;
    if (INPUT[y][x] === '#') count += 1;
  }
  return count;
};

const part1 = () => countTrees(3, 1);

const part2 = () => countTrees(1, 1) * countTrees(3, 1) * countTrees(5, 1) * countTrees(7, 1) * countTrees(1, 2);

console.log('Part 1');
console.log(`Solution: ${part1()}`);

console.log('\nPart 2');
console.log(`Solution: ${part2()}`);
