/* eslint-disable prefer-const */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { getInput } from './helpers/getInput';

const TEST1 = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`;

const INPUT = getInput(11, '\n').map((n) => n.split(''));

const isEmpty = (char: string) => char === 'L';
const isOccupied = (char: string) => char === '#';
const isFloor = (char: string) => char === '.';
const printSeats = (s: string[][]) => console.log(s.map((l) => l.join('')));
const copySeats = (s: string[][]) => s.map((l) => [...l]);

const countAdjacent = (seats: string[][], x: number, y: number) => {
  let count = 0;
  // left
  if (x - 1 >= 0 && isOccupied(seats[y][x - 1])) {
    count++;
  }
  // right
  if (x + 1 < seats[y].length && isOccupied(seats[y][x + 1])) {
    count++;
  }
  // up
  if (y - 1 >= 0 && isOccupied(seats[y - 1][x])) {
    count++;
  }
  // down
  if (y + 1 < seats.length && isOccupied(seats[y + 1][x])) {
    count++;
  }

  // down, right
  if (y + 1 < seats.length && x + 1 < seats[y + 1].length && isOccupied(seats[y + 1][x + 1])) {
    count++;
  }

  // down, left
  if (y + 1 < seats.length && x - 1 >= 0 && isOccupied(seats[y + 1][x - 1])) {
    count++;
  }

  // up, right
  if (y - 1 >= 0 && x + 1 < seats[y - 1].length && isOccupied(seats[y - 1][x + 1])) {
    count++;
  }

  // up, left
  if (y - 1 >= 0 && x - 1 >= 0 && isOccupied(seats[y - 1][x - 1])) {
    count++;
  }

  // console.log('moves', count);
  return count;
};

const part1 = (input: string[][]) => {
  printSeats(input);
  let iterations = 0;
  let count = 0;
  let seats = [...input];
  while (iterations === 0 || count > 0) {
    count = 0;
    iterations++;
    let changedSeats = copySeats(seats);
    for (let y = 0; y < seats.length; y++) {
      console.log(seats[0].join(''));
      for (let x = 0; x < seats[y].length; x++) {
        if (isFloor(seats[y][x])) continue;
        else if (isEmpty(seats[y][x]) && countAdjacent(seats, x, y) === 0) {
          changedSeats[y][x] = '#';
          count++;
        } else if (isOccupied(seats[y][x]) && countAdjacent(seats, x, y) >= 4) {
          changedSeats[y][x] = 'L';
          count++;
        }
      }
    }
    seats = changedSeats;
    console.log(`Iteration ${iterations} count ${count}`);
    printSeats(seats);
  }

  let numOccupied = 0;
  for (let y = 0; y < seats.length; y++) {
    for (let x = 0; x < seats[y].length; x++) {
      if (isOccupied(seats[y][x])) {
        numOccupied++;
      }
    }
  }

  return numOccupied;
};

console.log(`Solution1: ${part1(INPUT)}`);
