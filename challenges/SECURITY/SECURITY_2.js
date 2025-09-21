init();
test();

// Challenge variables
const keys = [7, 25];
const words = [
  "coffrait",
  "usinasse",
  "empese",
  "diffamai",
  "complexe",
  "miterais",
  "galbasse",
  "retracer",
  "imprimai",
];

function solveProblem(keys, words) {
  function toPassword(txt) {
    return txt
      .split("")
      .map((c) =>
        String.fromCharCode(
          97 + (((c.charCodeAt(0) - 97) * keys[0] + keys[1]) % 26)
        )
      )
      .join("");
  }
  return words.map((w) => toPassword(w)).join("-");
}

console.log(`Answer: '${solveProblem(keys, words)}'`);

function test() {
  console.log("-".repeat(15) + " Start Test " + "-".repeat(15));

  // STEPS
  // [1/6] caries => vjufhn
  // [2/6] grisante => tufnjwgh
  // [3/6] voilures => spfkzuhn
  // [4/6] nudismes => wzofndhn
  // [5/6] tiendrez => gfhwouhq
  // [6/6] ponction => ipwvgfpw

  const words = [
    "caries",
    "grisante",
    "voilures",
    "nudismes",
    "tiendrez",
    "ponction",
  ];
  const keys = [19, 9];

  const expected = "vjufhn-tufnjwgh-spfkzuhn-wzofndhn-gfhwouhq-ipwvgfpw";

  const result = solveProblem(keys, words);
  if (result != expected) {
    console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
  } else {
    console.log(`Test passed ! Got the expected result: ${expected}`);
    console.log(
      "Run the following command to submit:\ntainix submit SECURITY_2"
    );
  }

  console.log("-".repeat(15) + " End Test " + "-".repeat(15));
}

function init() {
  console.log(
    "CHALLENGE_TOKEN: '5ff730b50ce3c5aac1479a9c9a3ea312466f971fd44b32ecd6389c8e4849dc9d0b87103aa81c8052'"
  );

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

  Object.prototype.log = function (arrName = null) {
    if (arrName == null) console.log("Logging:", this);
    else console.log(`Logging ${arrName}:`, this);
    return this;
  };

  Object.prototype.toSortedDescList = function () {
    return dictionnaryToSortedDescArray(this);
  };

  String.prototype.toDictOfCharOccurrences = function () {
    return stringToDictOfCharOccurrences(this);
  };

  cl = console.log;
}

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

function dictionnaryToSortedDescArray(dict) {
  var items = Object.keys(dict).map(function (key) {
    return [key, dict[key]];
  });

  // Sort the array based on the second element
  items.sort(function (first, second) {
    return second[1] - first[1];
  });

  return items;
}

function validateAccForKey(acc, key) {
  if (!(key in acc)) acc[key] = 0;
}
