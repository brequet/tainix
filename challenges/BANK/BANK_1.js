init();
test();

// Challenge variables
const time = 273;
const actions = "BBBBBBBBBBBBBBBBIIIIIIIIIIIIIMMMMMMMMMMMMMMMMEEEEEEEEEEEE";
const references = "B:6 I:3 M:2 E:9";

function solveProblem(time, actions, references) {
  const refs = references
    .split(" ")
    .map((pair) => pair.split(":"))
    .arrayOfPairToDict();
  let res = actions
    .toDictOfCharOccurrences()
    .toEntries()
    .map((e) => refs[e[0]] * e[1])
    .sumUp();
  return res < time ? `ESCAPE${time - res}` : `PRISON${res - time}`;
}

console.log(`Answer: '${solveProblem(time, actions, references)}'`);

function test() {
  console.log("-".repeat(15) + " Start Test " + "-".repeat(15));

  // STEPS
  // [1/6] Il faut 56 de temps pour les actions "Break".
  // [2/6] Il faut 64 de temps pour les actions "IT".
  // [3/6] Il faut 18 de temps pour les actions "Money".
  // [4/6] Il faut 64 de temps pour les actions "Prepare".
  // [5/6] Ils ont donc besoin de 202 de temps et la police arrive dans 227.
  // [6/6] Ils peuvent s'échapper ! Il leur restait 25 de temps.

  const time = 227;
  const actions = "BBBBBBBBIIIIIIIIMMMMMMMMMEEEEEEEE";
  const references = "B:7 I:8 M:2 E:8";

  const expected = "ESCAPE25";

  const result = solveProblem(time, actions, references);
  if (result != expected) {
    console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
  } else {
    console.log(`Test passed ! Got the expected result: ${expected}`);
    console.log("Run the following command to submit:\ntainix submit BANK_1");
  }

  console.log("-".repeat(15) + " End Test " + "-".repeat(15));
}

function init() {
  console.log(
    "CHALLENGE_TOKEN: '74784f257ac6188f468872d395c8a8bcb2b96af488d071d8abf803f5d2ee677b2c9d3130c53e1a4f'"
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

  Object.prototype.toEntries = function () {
    return Object.entries(this);
  };

  Array.prototype.arrayOfPairToDict = function () {
    return arrayOfPairToDict(this);
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

function arrayOfPairToDict(arrayOfPairs) {
  const dict = {};
  arrayOfPairs.forEach((pair) => {
    const [key, value] = pair;
    dict[key] = value;
  });
  return dict;
}
