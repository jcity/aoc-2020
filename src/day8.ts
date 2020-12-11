import { getInput } from './helpers/getInput';

const INPUT = getInput(8);
const parsedInstructions = INPUT.map((l) => {
  const [cmd, amt] = l.split(' ');
  return {
    amt: +amt,
    cmd,
  };
});

const doOp = (cmd: string, amt: number, accum: number, pos: number) => {
  if (cmd === 'nop') {
    pos++;
  } else if (cmd === 'acc') {
    accum += amt;
    pos++;
  } else {
    pos += amt;
  }

  return { accum, pos };
};

const part1 = (instructions: { amt: number; cmd: string }[]) => {
  let causedInfinite = false;
  let pos = 0;
  let accumulator = 0;
  const marker: number[] = [];
  while (pos < instructions.length) {
    if (marker[pos]) {
      causedInfinite = true;
      marker[pos]++;
      break;
    }

    const ins = instructions[pos];
    marker[pos] = !marker[pos] ? 1 : marker[pos]++;
    const result = doOp(ins.cmd, ins.amt, accumulator, pos);
    accumulator = result.accum;
    pos = result.pos;
  }

  return { accumulator, causedInfinite, marker, pos };
};

const part2 = (instructions: { amt: number; cmd: string }[]) => {
  for (let i = 0; i < instructions.length; i++) {
    const { cmd, amt } = instructions[i];
    if (cmd === 'acc') continue;

    const newIns = [...instructions];
    if (cmd === 'nop') {
      newIns[i] = { amt, cmd: 'jmp' };
    } else {
      newIns[i] = { amt, cmd: 'nop' };
    }

    const stopped = part1(newIns);
    if (stopped.pos === instructions.length) {
      return stopped;
    }
  }
};

console.log(`Part 1 Solution: ${part1(parsedInstructions).accumulator}`);
console.log(`Part 2 Solution: ${part2(parsedInstructions).accumulator}`);
