// INPUT = map[cotes:[0.8 0.6 0.8 1 1 0.8 0.8 0.8 1 0.6 0.6 0.6 0.6 0.8 0.8 4 0.6 0.8 0.8 0.6 0.6 0.6 1 0.6 1.2 1.2 0.6 4 1 0.6 0.6 1.2 0.8 0.8 0.8 0.6 0.8 1.2 0.8 0.8 0.6] exemplaires:[50000 50000 50000 2000 50000 50000 2000 2000 2000 50000 2000 2000 50000 2000 2000 100 2000 2000 50000 2000 50000 50000 2000 2000 2000 2000 2000 100 50000 2000 2000 2000 50000 2000 50000 50000 2000 2000 50000 50000 2000]];
console.log(
  "CHALLENGE_TOKEN: '4742a30ca352f31a7002737f2a2f9a53eab6a3caf0f47af7ca17b13ed537bc3288df926eeb95ba09'"
);

// Challenge variables
const exemplaires = [
  50000, 50000, 50000, 2000, 50000, 50000, 2000, 2000, 2000, 50000, 2000, 2000,
  50000, 2000, 2000, 100, 2000, 2000, 50000, 2000, 50000, 50000, 2000, 2000,
  2000, 2000, 2000, 100, 50000, 2000, 2000, 2000, 50000, 2000, 50000, 50000,
  2000, 2000, 50000, 50000, 2000,
];
const cotes = [
  0.8, 0.6, 0.8, 1, 1, 0.8, 0.8, 0.8, 1, 0.6, 0.6, 0.6, 0.6, 0.8, 0.8, 4, 0.6,
  0.8, 0.8, 0.6, 0.6, 0.6, 1, 0.6, 1.2, 1.2, 0.6, 4, 1, 0.6, 0.6, 1.2, 0.8, 0.8,
  0.8, 0.6, 0.8, 1.2, 0.8, 0.8, 0.6,
];

/**
 * Predefined overridings
 */

Array.prototype.sumUp = function () {
  return this.reduce((acc, cur) => acc + cur, 0);
};

function solveProblem() {
  const prixAchat = exemplaires
    .map((e) => (e < 2000 ? 30 : 15))
    .reduce((acc, cur) => acc + cur, 0);
  const prixVente = exemplaires
    .map((e) => (e < 2000 ? 30 : 15))
    .map((e, i) => e * cotes[i])
    .sumUp();
  console.log(prixAchat, prixVente);
  return prixVente - prixAchat;
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

function sumUpArray(arr) {
  return arr.reduce((acc, cur) => acc + cur, 0);
}
