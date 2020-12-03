import { getInput } from './helpers/getInput';

const INPUT = getInput(2).map((line: string) => {
  const [bounds, letter, password] = line.split(' ');
  const [min, max] = bounds.split('-');
  return {
    letter: letter.replace(':', ''),
    max: +max,
    min: +min,
    password,
  };
});

const part1 = INPUT.filter(({ password, min, max, letter }) => {
  const count = password.split('').filter((curLetter) => curLetter === letter).length;
  return count >= min && count <= max;
});

const part2 = INPUT.filter(
  ({ password, min, max, letter }) =>
    (password[min - 1] === letter || password[max - 1] === letter) && password[min - 1] !== password[max - 1],
);

console.log('Part 1');
console.log(`Answer: ${part1.length}`);

console.log('\nPart 2');
console.log(`Answer: ${part2.length}`);
