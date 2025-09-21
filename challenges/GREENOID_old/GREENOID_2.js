init();
test();

// Challenge variables
const positionX = 18;
const positionY = 40;
const logs = "ENSWNPSCSSWSPEWSEEWENWNENNDWDSWSWEWEPWNNW";

function solveProblem(positionX, positionY, logs) {
  let { N, E, W, S } = logs.toDictOfCharOccurrences();
  return `${positionX - (E - W)}_${positionY - (S - N)}`;
}

console.log(`Answer: '${solveProblem(positionX, positionY, logs)}'`);

function test() {
  console.log("-".repeat(15) + " Start Test " + "-".repeat(15));

  // STEPS
  // [1/11] Le robot est allé vers le Nord (N), donc je rebrousse chemin vers le Sud, (Y - 1)
  // [2/11] Le robot est allé vers l'Est (E), donc je rebrousse chemin vers l'Ouest, (X - 1)
  // [3/11] Le robot est allé vers l'Ouest (W), donc je rebrousse chemin vers l'Est, (X + 1)
  // [4/11] H n'est pas un déplacement, je ne sais pas ce qu'a fait le robot...
  // [5/11] Le robot est allé vers le Sud (S), donc je rebrousse chemin vers le Nord, (Y + 1)
  // [6/11] Le robot est allé vers le Sud (S), donc je rebrousse chemin vers le Nord, (Y + 1)
  // [7/11] Le robot est allé vers l'Ouest (W), donc je rebrousse chemin vers l'Est, (X + 1)
  // [8/11] Le robot est allé vers l'Est (E), donc je rebrousse chemin vers l'Ouest, (X - 1)
  // [9/11] Le robot est allé vers l'Ouest (W), donc je rebrousse chemin vers l'Est, (X + 1)
  // [10/11] Le robot est allé vers l'Ouest (W), donc je rebrousse chemin vers l'Est, (X + 1)
  // [11/11] Le robot est allé vers le Nord (N), donc je rebrousse chemin vers le Sud, (Y - 1)

  const positionX = 76;
  const positionY = 87;
  const logs = "NEWHSSWEWWN";

  const expected = "78_87";

  const result = solveProblem(positionX, positionY, logs);
  if (result != expected) {
    console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
  } else {
    console.log(`Test passed ! Got the expected result: ${expected}`);
    console.log(
      "Run the following command to submit:\ntainix submit GREENOID_2"
    );
  }

  console.log("-".repeat(15) + " End Test " + "-".repeat(15));
}

function init() {
  console.log(
    "CHALLENGE_TOKEN: '0cfd3dfbd713f85551ed37f6d5a8a010117c9b0395e344db9f1c93e3bdb41b928d310ada026bb990'"
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
