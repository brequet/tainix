init();
test();

// Challenge variables
const time = 202;
const actions = "BBBBBBBBBBBBBBBBIIIIIIIIIIIIIMMMMMMMMMEEEEE";
const references = "B:10 I:6 M:2 E:7";

function solveProblem(time, actions, references) {
  return "";
}

console.log(`Answer: '${solveProblem(time, actions, references)}'`);

function test() {
  console.log("-".repeat(15) + " Start Test " + "-".repeat(15));

  // STEPS
  // [1/6] Il faut 30 de temps pour les actions "Break".
  // [2/6] Il faut 28 de temps pour les actions "IT".
  // [3/6] Il faut 8 de temps pour les actions "Money".
  // [4/6] Il faut 90 de temps pour les actions "Prepare".
  // [5/6] Ils ont donc besoin de 156 de temps et la police arrive dans 221.
  // [6/6] Ils peuvent s'échapper ! Il leur restait 65 de temps.

  const actions = "BBBBBBIIIIIIIMMMMMMMMEEEEEEEEEE";
  const references = "B:5 I:4 M:1 E:9";
  const time = 221;

  const expected = "ESCAPE65";

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
    "CHALLENGE_TOKEN: '3fc23bf47b7949ddfaf17a53dc1d323e614b08af0e6942788000352075817ecbc21d9fc73f968b41'"
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

  Array.prototype.max = function () {
    return this.sortDesc()[0];
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

  String.prototype.toDictOfCharOccurrences = function (splitter = "") {
    return stringToDictOfCharOccurrences(this, splitter);
  };

  cl = console.log;
}

/**
 * Predefined utility functions
 */

function stringToDictOfCharOccurrences(str, splitter = "") {
  return str.split(splitter).reduce((acc, cur) => {
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

function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
}

function isNumeric(str) {
  return /^\d+$/.test(str);
}
