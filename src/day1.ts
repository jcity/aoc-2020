import { getInput } from './helpers/getInput';

// find the two entries that sum to 2020 and then multiply those two numbers together
const run = async () => {
  const input = (await getInput(1))
    .map((num: string) => +num)
    .sort((n1, n2) => {
      if (n1 < n2) return -1;
      if (n1 > n2) return 1;
      return 0;
    });

  const target = 2020;
  let left = 0;
  let right = input.length - 1;
  while (input[left] + input[right] !== target && input[left] <= input[right]) {
    if (input[left] + input[right] < target) left += 1;
    if (input[left] + input[right] > target) right -= 1;
  }
  console.log(`Left: ${input[left]}`);
  console.log(`Right: ${input[right]}`);
  console.log(`Answer: ${input[left] * input[right]}`);
};

run();
