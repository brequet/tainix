// INPUT = map[side:61];
console.log(
  "CHALLENGE_TOKEN: '70d5cb324d49cfa105e6612355806c3c9f740abc5b1201ce148cf681dadac423fa39f5bbbf4ee113'"
);

// Challenge variables
const side = 61;

function solveProblem() {
  return side * (side + 4);
}

console.log(`Answer: '${solveProblem()}'`);

/**
 * Predefined utility functions
 */

function stringToDictOfCharOccurrences(str) {
  return str.split("").reduce((acc, cur) => {
    if (!(cur in acc)) acc[cur] = 0;
    acc[cur]++;
    return acc;
  }, {});
}
