/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { getInput } from './helpers/getInput';

const TEST1 = `16
10
15
5
1
11
7
19
6
12
4`;

const TEST2 = `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`;

const INPUT = getInput(10, '\n').map((n) => +n);
const sorted = INPUT.sort((a, b) => a - b);
const highest = sorted[sorted.length - 1];
const adapterRating = highest + 3;
// console.log(INPUT);

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

const adapters = [0, ...sorted, adapterRating];
const masterTree = new Map<number, number[]>();
for (let i = 0; i < adapters.length; i++) {
  const children = [];
  if (i + 1 < adapters.length) {
    for (let offset = 1; offset <= 3 && i + offset < adapters.length; offset++) {
      if (adapters[i + offset] - adapters[i] <= 3) {
        children.push(adapters[i + offset]);
      }
    }
  }
  masterTree.set(adapters[i], children);
}

const validPathCountByRoot = new Map<number, number>();
const dfsHelper = (tree: Map<number, number[]>, root: number, stack: number[]): number => {
  // if we already calculated how many routes this node can take, return it
  if (validPathCountByRoot.has(root)) return validPathCountByRoot.get(root);

  // Get the possible options for this node, if there are no options, its the terminal node
  const children = [...tree.get(stack[0])];
  if (children.length === 0) {
    stack.shift();
    validPathCountByRoot.set(root, 1);
    return 1;
  }

  let pathCountForRoot = 0;
  while (children.length) {
    const childToCheck = children.shift();
    stack.unshift(childToCheck);

    const validPathCountForChild = dfsHelper(tree, childToCheck, stack);
    pathCountForRoot += validPathCountForChild;
  }

  validPathCountByRoot.set(root, pathCountForRoot);
  return pathCountForRoot;
};

const dfs = (tree: Map<number, number[]>, root: number): number => {
  return dfsHelper(tree, root, [root]);
};

console.log(masterTree);
const solution = dfs(masterTree, 0);
console.log('Counts', validPathCountByRoot);
console.log('Answer2:', solution);
