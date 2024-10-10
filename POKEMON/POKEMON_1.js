// INPUT = map[types:[Eau Feu Feu Feu Eau Feu Glace Poison Feu Herbe Herbe Poison Herbe Herbe Feu Feu Feu Feu Eau Feu Eau Herbe Herbe Herbe Eau Herbe Herbe Feu Feu Eau Herbe]];
console.log(
  "CHALLENGE_TOKEN: 'b9b4dd2b306b67c72a461cabfbce3cfabd2e810cac58aaab54d7eafb18434abe7e3c0917fe84ccea'"
);

// Challenge variables
const types = [
  "Eau",
  "Feu",
  "Feu",
  "Feu",
  "Eau",
  "Feu",
  "Glace",
  "Poison",
  "Feu",
  "Herbe",
  "Herbe",
  "Poison",
  "Herbe",
  "Herbe",
  "Feu",
  "Feu",
  "Feu",
  "Feu",
  "Eau",
  "Feu",
  "Eau",
  "Herbe",
  "Herbe",
  "Herbe",
  "Eau",
  "Herbe",
  "Herbe",
  "Feu",
  "Feu",
  "Eau",
  "Herbe",
];

function solveProblem() {
  const bases = ["Eau", "Feu", "Herbe"];
  const rares = ["Air", "Poison", "Glace", "Psychique", "Insecte"];
  return "0";
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
