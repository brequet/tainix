// INPUT = map[kms:[14 33 45 106 151 251 306 383 446] runners:[11 12 5 10 6 5 7 7 12] stop:525];
console.log(
  "CHALLENGE_TOKEN: '3f821872baada3f81afede12ea5c3682ccca3f1c9cb98a188001bb31a427da4b95fe36192ec0bcdf'"
);

// Challenge variables
const kms = [14, 33, 45, 106, 151, 251, 306, 383, 446];
const runners = [11, 12, 5, 10, 6, 5, 7, 7, 12];
const stop = 525;

function solveProblem() {
  let res = stop;
  kms.forEach((km, i) => (res += runners[i] * (stop - km)));
  return res;
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
