console.log(
  "CHALLENGE_TOKEN: 'b7617cf3c6ea3c500c285726931687f3e32d33a7a5fdee0b96e4ad1a3c9736208a19aa5c96b1a270'"
);

// Challenge variables
// INPUT = map[chemin:[------- ------- ------- ------ ------ ------ ------ ----- ----- ++++ ++++ ++ ++ ++ ++] depart:8.527928e+06];
const chemin = [
  "-------",
  "-------",
  "-------",
  "------",
  "------",
  "------",
  "------",
  "-----",
  "-----",
  "++++",
  "++++",
  "++",
  "++",
  "++",
  "++",
];
const depart = 8.527928e6;
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

function solveProblem() {
  const arr = chemin
    .map((e) =>
      "-" in stringToDictOfCharOccurrences(e)
        ? -Math.pow(10, stringToDictOfCharOccurrences(e)["-"] - 1)
        : Math.pow(10, stringToDictOfCharOccurrences(e)["+"] - 1)
    )
    .log("pows");
  return depart + arr.sumUp();
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
