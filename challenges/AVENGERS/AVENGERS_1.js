// INPUT = map[captainamerica:3 ironman:2 spiderman:7 thanos:309 thor:3];
console.log(
  "CHALLENGE_TOKEN: 'a7b0e3e49474c0eb267ac8b403ec538cfa23cc325215cccf3feaf2e9d9aa790c4cda11e5ab903885'"
);

// Challenge variables
let thanos = 309;
let ironman = 2;
let spiderman = 7;
let captainamerica = 3;
let thor = 3;

function solveProblem() {
  let turnCount = 1;

  while (!areAvengerWinning()) {
    turnCount++;
    switch (turnCount % 4) {
      case 0:
        ironman++;
        break;
      case 1:
        spiderman++;
        break;
      case 2:
        captainamerica++;
        break;
      case 3:
        thor++;
        break;
    }
  }

  return turnCount;
}

function areAvengerWinning() {
  return (
    ironman * 3 +
      10 +
      (spiderman * 4 + 5) +
      (captainamerica * 3 + 7) +
      (thor * 4 + 20) >
    thanos
  );
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
