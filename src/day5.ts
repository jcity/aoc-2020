import { getInput } from './helpers/getInput';

const INPUT = getInput(5).map((line) => [line.substring(0, 7), line.slice(-3)]);
const NUM_ROWS = 128;
const NUM_SEATS = 8;
const LOWER_ROW = 'F';
const LOWER_SEAT = 'L';

const partitioner = (rule: string, lowerChar: string, lowest: number, highest: number): number => {
  let low = lowest;
  let high = highest;
  for (let i = 0; i < rule.length; i += 1) {
    if (rule[i] === lowerChar) high = Math.floor((low + high) / 2);
    else low = Math.ceil((low + high) / 2);
  }
  return rule[rule.length - 1] === lowerChar ? low : high;
};

const sortedTickets = INPUT.map(([rowString, seatString]: string[]) => ({
  row: partitioner(rowString, LOWER_ROW, 0, NUM_ROWS - 1),
  seat: partitioner(seatString, LOWER_SEAT, 0, NUM_SEATS - 1),
}))
  .map(({ row, seat }) => ({
    row,
    seat,
    seatId: row * 8 + seat,
  }))
  .sort((left, right) => {
    if (left.seatId > right.seatId) return -1;
    if (left.seatId < right.seatId) return 1;
    return 0;
  });

const part1 = sortedTickets[0];
const part2 = sortedTickets.find(({ seatId }, idx) => seatId !== sortedTickets[idx + 1].seatId + 1);

console.log(`Part 1 Solution: ${part1.seatId}`);
console.log(`Part 2 Solution: ${part2.seatId - 1}`);
