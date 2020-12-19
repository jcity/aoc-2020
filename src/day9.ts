import { getInput } from './helpers/getInput';

const INPUT = getInput(9).map((n) => +n);

let answer1;
const stack = [];
let i = 0;
while (i < INPUT.length) {
  if (i < 25) {
    stack.push(INPUT[i]);
  } else {
    let foundPair = false;
    for (let first = 0; first < INPUT.length && !foundPair; first++) {
      for (let second = 1; second < INPUT.length && !foundPair; second++) {
        if (first === second) continue;
        if (INPUT[first] + INPUT[second] === INPUT[i]) {
          foundPair = true;
          stack.push(INPUT[i]);
          stack.shift();
        }
      }
    }
    if (!foundPair) {
      answer1 = INPUT[i];
      break;
    }
  }

  i++;
}
console.log(`Answer; ${answer1}`);

let answer2 = 0;
let idx = 0;
const possibles = [];
while (idx < INPUT.length && !answer2) {
  for (let j = 0; j < possibles.length && !answer2; j++) {
    possibles[j].push(INPUT[idx]);
    const test = possibles[j].reduce((a, b) => a + b);
    if (test === answer1) {
      const an2 = possibles[j].sort((a, b) => a - b);
      answer2 = an2[0] + an2[an2.length - 1];
    } else if (test > answer1) {
      possibles.splice(j, 1);
    }
  }

  if (INPUT[idx] < answer1) {
    possibles.push([INPUT[idx]]);
  }

  idx++;
}
console.log(`Answer; ${answer2}`);
