import { getInput } from './helpers/getInput';

const TARGET = 2020;
const INPUT = getInput(1)
  .map((num: string) => +num)
  .sort((n1, n2) => {
    if (n1 < n2) return -1;
    if (n1 > n2) return 1;
    return 0;
  });

// find the two entries that sum to 2020 and then multiply those two numbers together
const part1 = (numbers: number[]) => {
  console.log('Part 1');
  let low = 0;
  let high = numbers.length - 1;
  while (numbers[low] + numbers[high] !== TARGET && low <= high) {
    if (numbers[low] + numbers[high] < TARGET) {
      low += 1;
    } else {
      high -= 1;
    }
  }

  console.log(`Low: ${numbers[low]}`);
  console.log(`High: ${numbers[high]}`);
  console.log(`Sum: ${numbers[low] + numbers[high]}`);
  console.log(`Answer: ${numbers[low] * numbers[high]}`);
};

// find the three entries that sum to 2020 and then multiply those three numbers together
const part2 = (numbers: number[]) => {
  console.log('\nPart 2');
  let low = 0;
  let mid = 1;
  let high = numbers.length - 1;
  while (numbers[low] + numbers[mid] + numbers[high] !== TARGET) {
    const localTarget = TARGET - numbers[high];
    while (numbers[low] + numbers[mid + 1] <= localTarget && mid < high) {
      mid += 1;
    }
    while (numbers[low + 1] + numbers[mid] <= localTarget && low < mid) {
      low += 1;
    }

    if (numbers[low] + numbers[mid] !== localTarget) {
      high -= 1;
      low = 0;
      mid = 1;
    }
  }

  console.log(`Low: ${numbers[low]}`);
  console.log(`Mid: ${numbers[mid]}`);
  console.log(`High: ${numbers[high]}`);
  console.log(`Sum: ${numbers[low] + numbers[mid] + numbers[high]}`);
  console.log(`Answer: ${numbers[low] * numbers[mid] * numbers[high]}`);
};

part1(INPUT);
part2(INPUT);
