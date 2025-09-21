init();
test();

// Challenge variables
const types = [
  "Feu",
  "Herbe",
  "Eau",
  "Feu",
  "Eau",
  "Eau",
  "Herbe",
  "Herbe",
  "Psychique",
  "Eau",
  "Eau",
  "Feu",
  "Insecte",
  "Feu",
  "Feu",
  "Herbe",
  "Psychique",
  "Herbe",
  "Herbe",
  "Herbe",
  "Eau",
  "Herbe",
  "Feu",
  "Air",
  "Poison",
  "Glace",
  "Eau",
  "Insecte",
  "Herbe",
  "Air",
  "Eau",
];

function solveProblem(types) {
  let baseCounter = 0;
  "Feu" in types && baseCounter++;
  "Herbe" in types && baseCounter++;
  "Eau" in types && baseCounter++;
  return baseCounter;
}

console.log(`Answer: '${solveProblem(types)}'`);

function test() {
  console.log("-".repeat(15) + " Start Test " + "-".repeat(15));

  // STEPS
  // [1/2] Je peux faire 2 équipes de Pokemons de base.
  // [2/2] J'ai à disposition 2 Pokemons rares.

  const types = [
    "Eau",
    "Herbe",
    "Herbe",
    "Herbe",
    "Eau",
    "Herbe",
    "Eau",
    "Eau",
    "Air",
    "Feu",
    "Herbe",
    "Herbe",
    "Eau",
    "Eau",
    "Psychique",
    "Feu",
  ];

  const expected = "2";

  const result = solveProblem(types);
  if (result != expected) {
    console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
  } else {
    console.log(`Test passed ! Got the expected result: ${expected}`);
    console.log(
      "Run the following command to submit:\ntainix submit POKEMON_1"
    );
  }

  console.log("-".repeat(15) + " End Test " + "-".repeat(15));
}

function init() {
  console.log(
    "CHALLENGE_TOKEN: 'b0f79dfff3dc1b59d5040a7d24ad2e3f20e9d9631cae7ff2ae51c2a1d16e54dbc7b1b2a0144338be'"
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
