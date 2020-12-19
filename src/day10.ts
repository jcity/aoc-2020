/* eslint-disable @typescript-eslint/no-unused-expressions */
import { getInput } from './helpers/getInput';

const INPUT = getInput(10).map((n) => +n);
const sorted = INPUT.sort((a, b) => a - b);
const highest = sorted[sorted.length - 1];
const adapterRating = highest + 3;

let oneCount = 0;
let threeCount = 0;
let idx = 0;
let curRating = 0;
while (idx < sorted.length) {
  sorted[idx] - curRating === 1 ? oneCount++ : threeCount++;
  curRating = sorted[idx];
  idx++;
}
adapterRating - curRating === 1 ? oneCount++ : threeCount++;
console.log(`Answer1: ${oneCount * threeCount}`);
