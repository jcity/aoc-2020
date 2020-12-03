import { getInput } from './helpers/getInput';

// find the two entries that sum to 2020 and then multiply those two numbers together
const part1 = (input: number[]) => {
  console.log('Part 1');
  const target = 2020;
  let low = 0;
  let high = input.length - 1;
  while (input[low] + input[high] !== target && low <= high) {
    if (input[low] + input[high] < target) {
      low += 1;
    } else {
      high -= 1;
    }
  }

  console.log(`Low: ${input[low]}`);
  console.log(`High: ${input[high]}`);
  console.log(`Sum: ${input[low] + input[high]}`);
  console.log(`Answer: ${input[low] * input[high]}`);
};

// find the three entries that sum to 2020 and then multiply those three numbers together
const part2 = (input: number[]) => {
  console.log('\nPart 2');
  const finalTarget = 2020;
  let high = input.length - 1;
  while (high > finalTarget) high -= 1;

  let low = 0;
  let mid = 1;
  while (input[low] + input[mid] + input[high] !== finalTarget) {
    const localTarget = finalTarget - input[high];
    while (input[low] + input[mid + 1] <= localTarget && mid < high) {
      mid += 1;
    }
    while (input[low + 1] + input[mid] <= localTarget && low < mid) {
      low += 1;
    }

    if (input[low] + input[mid] !== localTarget) {
      high -= 1;
      low = 0;
      mid = 1;
    }
  }

  console.log(`Low: ${input[low]}`);
  console.log(`Mid: ${input[mid]}`);
  console.log(`High: ${input[high]}`);
  console.log(`Sum: ${input[low] + input[mid] + input[high]}`);
  console.log(`Answer: ${input[low] * input[mid] * input[high]}`);
};

const run = async () => {
  const input = (await getInput(1))
    .map((num: string) => +num)
    .sort((n1, n2) => {
      if (n1 < n2) return -1;
      if (n1 > n2) return 1;
      return 0;
    });
  part1(input);
  part2(input);
};

run();
