import fs from 'fs';
import path from 'path';

export const getInput = (dayNumber: number, howToSplit: string | RegExp = '\n') => {
  const input = fs.readFileSync(path.resolve(`${__dirname}/../../input/day${dayNumber}.txt`), 'utf-8').trim();
  return input.split(howToSplit);
};
