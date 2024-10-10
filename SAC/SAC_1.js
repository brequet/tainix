console.log(
  "CHALLENGE_TOKEN: '8277cc92c49164898dc8bae52eb9f68d783f90a0790c49fb400a7b7bc1330f43b933047514dc4efe'"
);

// Challenge variables
// INPUT = map[objets:[75 39 76 10 74 20 73 90 70 59 57 19 32 36 37 62 56 69 31 64 65 72 30 23 40 43 49 53 38 11 27 34 35 71 61 78 81 52 63 82 42 46 60 51 84 66 25 29 22 21 26 18 28 54 15] sac:751];
const sac = 751;
const objets = [
  75, 39, 76, 10, 74, 20, 73, 90, 70, 59, 57, 19, 32, 36, 37, 62, 56, 69, 31,
  64, 65, 72, 30, 23, 40, 43, 49, 53, 38, 11, 27, 34, 35, 71, 61, 78, 81, 52,
  63, 82, 42, 46, 60, 51, 84, 66, 25, 29, 22, 21, 26, 18, 28, 54, 15,
];

/**
 * Predefined overridings
 */

Array.prototype.sumUp = function () {
  return this.reduce((acc, cur) => acc + cur, 0);
};

Array.prototype.log = function (arrName = null) {
  if (arrName == null) console.log("Logging array:", this);
  else console.log(`Logging array ${arrName}:`, this);
  return this;
};

Array.prototype.sortAsc = function () {
  return this.sort((a, b) => a - b);
};

Array.prototype.sortDesc = function () {
  return this.sort((a, b) => b - a);
};

function solveProblem() {
  placeSac = sac;
  descObj = objets.sortDesc();
  for (i = 0; i < 10; i++) {
    if (placeSac >= descObj[i]) {
      placeSac -= descObj[i];
    } else {
      return placeSac;
    }
  }
  ascObj = objets.sortAsc();
  for (i = 0; i < 10; i++) {
    if (placeSac > ascObj[i]) {
      placeSac -= ascObj[i];
    } else {
      return placeSac;
    }
  }
  return placeSac;
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
