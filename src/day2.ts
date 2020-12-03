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

const part1 = INPUT.filter((testCase) => {
  const count = testCase.password.split('').filter((letter) => letter === testCase.letter).length;
  return count >= testCase.min && count <= testCase.max;
}).length;

console.log('Part 1');
console.log(`Answer: ${part1}`);
