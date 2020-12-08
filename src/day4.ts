import { getInput } from './helpers/getInput';

const INPUT = getInput(4).reduce<string[][]>(
  (lastValue: string[][], curValue: string) => {
    if (curValue === '') {
      lastValue.push([]);
    } else {
      const idx = lastValue.length - 1;
      curValue.split(' ').forEach((val: string) => lastValue[idx].push(val));
    }
    return lastValue;
  },
  [[]],
);

const part1 = INPUT.filter((value: string[]) => {
  if (value.length === 8) return true;
  if (value.length <= 6) return false;
  const keys = value.map((val) => val.split(':')[0]);
  return !keys.includes('cid');
}).length;

console.log('Part 1');
console.log(`Solution: ${part1}`);
