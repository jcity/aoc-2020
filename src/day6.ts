import { getInput } from './helpers/getInput';

const INPUT = getInput(6, '\n\n').map((line) => line.split('\n'));

const part1 = INPUT.map((answers) => {
  const questions = new Set();
  answers.forEach((answer) => {
    answer.split('').forEach((letter) => questions.add(letter));
  });
  return questions.size;
}).reduce((prev, cur) => prev + cur);

console.log(`Part 1 Solution: ${part1}`);
