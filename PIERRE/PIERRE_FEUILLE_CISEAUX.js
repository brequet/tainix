// INPUT = map[coups:CCPCFCFPFCPPFCFPFPCPC];
console.log(
  "CHALLENGE_TOKEN: '02e370bc47cecb2e0ae9722a872a61671e65679b90656bfefdbd587c7cbfefcdfa804180cd427645'"
);

// Challenge variables
const coups = "CCPCFCFPFCPPFCFPFPCPC";

function solveProblem() {
  corres = {
    P: "F",
    F: "C",
    C: "P",
  };
  return coups
    .split("")
    .map((c) => corres[c])
    .join("");
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
