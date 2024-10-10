// INPUT = map[joueurs:[33 17 22 19 21 10 2 44 35 41 46 52 20 15 51 32 58 29 47 6 40 5 12 53 59 11 16 27 45 3 60]];
console.log(
  "CHALLENGE_TOKEN: 'a46a593217f721c127198ba55837f374b39adb5788d4bdfb537dd1c52c777c25e8f19c580609877a'"
);

// Challenge variables
const joueurs = [
  33, 17, 22, 19, 21, 10, 2, 44, 35, 41, 46, 52, 20, 15, 51, 32, 58, 29, 47, 6,
  40, 5, 12, 53, 59, 11, 16, 27, 45, 3, 60,
];

function solveProblem() {
  joueursWithIndex = joueurs.map((joueur, index) => ({ joueur, index }));
  joueursWithIndex.sort((a, b) => b.joueur - a.joueur);
  return joueursWithIndex
    .slice(0, 11)
    .map((j) => j.index)
    .join("-");
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
