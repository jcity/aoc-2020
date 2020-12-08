import { getInput } from './helpers/getInput';

const INPUT = getInput(4).reduce<string[][]>(
  (lastValue: string[][], curValue: string) => {
    if (curValue === '') {
      lastValue.push([]);
    } else {
      const idx = lastValue.length - 1;
      curValue.split(' ').forEach((val: string) => lastValue[idx].push(val));
    }
    return lastValue;
  },
  [[]],
);

const part1 = INPUT.filter((fields: string[]) => {
  if (fields.length === 8) return true;
  if (fields.length <= 6) return false;
  const keys = fields.map((value) => value.split(':')[0]);
  return !keys.includes('cid');
});

const isFourDigits = (s: string) => s.match(/^\d{4}$/);
const inRange = (n: number, l: number, h: number) => n >= l && n <= h;

const part2 = part1.filter((fields: string[]) => {
  const validFields = fields.filter((value) => {
    const [key, val] = value.split(':');
    if (key === 'byr') return isFourDigits(val) && inRange(+val, 1920, 2002);
    if (key === 'iyr') return isFourDigits(val) && inRange(+val, 2010, 2020);
    if (key === 'eyr') return isFourDigits(val) && inRange(+val, 2020, 2030);
    if (key === 'hgt') {
      const unit = val.slice(-2);
      if (unit === 'cm') return inRange(+val.replace('cm', ''), 150, 193);
      if (unit === 'in') return inRange(+val.replace('in', ''), 59, 76);
      return false;
    }
    if (key === 'hcl') return val.match(/^#(\d|[a-f]){6}$/);
    if (key === 'ecl') return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(val);
    if (key === 'pid') return val.match(/^\d{9}$/);
    return true; // cid
  });
  return fields.length === validFields.length;
});

console.log('Part 1');
console.log(`Solution: ${part1.length}`);

console.log('Part 2');
console.log(`Solution: ${part2.length}`);
