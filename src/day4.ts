import { getInput } from './helpers/getInput';

const INPUT = getInput(4, '\n\n').map((line) => line.split(/\s+/).map((field) => field.split(':')));

const part1 = INPUT.filter((passportFields: string[][]) => {
  if (passportFields.length === 8) return true;
  if (passportFields.length <= 6) return false;
  return passportFields.filter(([key]) => key === 'cid').length === 0;
});

const inRange = (n: number, l: number, h: number) => n >= l && n <= h;
const part2 = part1.filter((passportFields: string[][]) => {
  const validFields = passportFields.filter(([field, value]: string[]) => {
    if (field === 'byr') return inRange(+value, 1920, 2002);
    if (field === 'iyr') return inRange(+value, 2010, 2020);
    if (field === 'eyr') return inRange(+value, 2020, 2030);
    if (field === 'hgt') {
      const unit = value.slice(-2);
      if (unit === 'in') return inRange(+value.replace('in', ''), 59, 76);
      if (unit === 'cm') return inRange(+value.replace('cm', ''), 150, 193);
      return false;
    }
    if (field === 'hcl') return value.match(/^#(\d|[a-f]){6}$/);
    if (field === 'ecl') return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value);
    if (field === 'pid') return value.match(/^\d{9}$/);
    return true; // cid
  });
  return validFields.length === passportFields.length;
});

console.log(`Part 1 Solution: ${part1.length}`);
console.log(`Part 2 Solution: ${part2.length}`);
