import { getInput } from './helpers/getInput';

const INPUT = getInput(6, '\n\n').map((line) => line.split('\n'));

const groupAnswers = INPUT.map((group) => group.map((answers) => new Set(answers.split(''))));

const part1 = groupAnswers
  .map((answers) => {
    return answers.reduce((prev, cur) => new Set([...prev.values(), ...cur.values()])).size;
  })
  .reduce((prev, cur) => prev + cur);

const part2 = groupAnswers
  .map((answers) => {
    return answers.reduce((prev, cur) => {
      prev.forEach((questionId) => {
        if (!cur.has(questionId)) prev.delete(questionId);
      });
      return prev;
    }).size;
  })
  .reduce((prev, cur) => prev + cur);

console.log(`Part 1 Solution: ${part1}`);
console.log(`Part 2 Solution: ${part2}`);
