import fs from 'fs';
import path from 'path';

export const getInput = (dayNumber: number, howToSplit: string | RegExp = '\n', testInput = '') => {
  const input = testInput || fs.readFileSync(path.resolve(`${__dirname}/../../input/day${dayNumber}.txt`), 'utf-8');
  return input.trim().split(howToSplit);
};
