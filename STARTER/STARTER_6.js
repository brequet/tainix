// INPUT = map[values:[87 38 64 76 79 48 83 96 52 64 17 83 93 46 12 12 18 58 51 62 19 51 90 54 43 95 79]];
console.log(
  "CHALLENGE_TOKEN: 'c44e5fbae9c0a6f82868d64e8f6d77fbfdd5bf1cf0c692b10cc2e9c6de5771cf053c70b76ed8daac'"
);

// Challenge variables
const values = [
  87, 38, 64, 76, 79, 48, 83, 96, 52, 64, 17, 83, 93, 46, 12, 12, 18, 58, 51,
  62, 19, 51, 90, 54, 43, 95, 79,
];

console.log(1 + 1);
console.log("values");

function solveProblem() {
  return values.filter((e) => e % 3 === 0).join("-");
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
