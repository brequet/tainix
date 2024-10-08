// INPUT = map[joueurs:[3 1 45 40 41 50 5 37 52 2 46 49 8 9 25 60 17 14 6 59 31 55 20 15 18 48 30 57 7 35 13]];
console.log("CHALLENGE_TOKEN: '15cb13203747738ea6d54aa638e92ccfe1c41c8719fce12443523444428500e293cd14fded21ca0a'");

// Challenge variables
const joueurs = [3, 1, 45, 40, 41, 50, 5, 37, 52, 2, 46, 49, 8, 9, 25, 60, 17, 14, 6, 59, 31, 55, 20, 15, 18, 48, 30, 57, 7, 35, 13];

function solveProblem() {
  return "Your answer here";
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
