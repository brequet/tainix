init();
test();

// Challenge variables
const cours = [
  "TETE",
  "ETTP",
  "TTTT",
  "EEEP",
  "TETT",
  "TPTE",
  "PETT",
  "EETE",
  "EETE",
  "EEPT",
  "DETE",
  "TTTE",
  "TTTT",
  "TEEE",
  "TDEE",
  "DPTT",
  "PEEE",
  "TPEE",
  "TTTE",
  "ETTT",
  "EETT",
];

function solveProblem(cours) {
  students = new Array(cours[0].length).fill(null).map(() => {
    return { max: 20, current: 12 };
  });

  cours.forEach((e, i) => {
    e.split("").forEach((action, j) => {
      if (
        ["T", "E"].includes(action) &&
        students[j].current < 20 &&
        students[j].current + 1 < students[j].max
      ) {
        students[j].current++;
      }
      if (action == "P" && students[j].current > 0) {
        students[j].current--;
        if (students[j].max > 10) students[j].max--;
      }
      if (action == "D" && students[j].current > 1) {
        students[j].current -= 2;
        if (students[j].max > 11) students[j].max -= 2;
      }
    });
  });

  let mean =
    students
      .log()
      .map((e) => e.max)
      .sumUp() / students.length;
  return +(Math.round(mean + "e+1") + "e-1");
}

console.log(`Answer: '${solveProblem(cours)}'`);

function test() {
  console.log("-".repeat(15) + " Start Test " + "-".repeat(15));

  // STEPS
  // [1/6] L'étudiant 0 a une note finale de 20
  // [2/6] L'étudiant 1 a une note finale de 15
  // [3/6] L'étudiant 2 a une note finale de 10
  // [4/6] L'étudiant 3 a une note finale de 14
  // [5/6] L'étudiant 4 a une note finale de 17
  // [6/6] La moyenne de cette classe de 5 élèves est de 15.2

  const cours = [
    "EEPTT",
    "TTETT",
    "ETDET",
    "TEPEP",
    "ETEET",
    "TTDTT",
    "TEPPE",
    "TDPDE",
    "EPETE",
    "EPETP",
    "TEETT",
    "TTEEE",
    "TETDE",
    "TPEET",
    "TTEEP",
    "TTETE",
    "ETEPT",
    "EEDTE",
    "TTEET",
  ];

  const expected = "15.2";

  const result = solveProblem(cours);
  if (result != expected) {
    console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
  } else {
    console.log(`Test passed ! Got the expected result: ${expected}`);
    console.log("Run the following command to submit:\ntainix submit PROF_1");
  }

  console.log("-".repeat(15) + " End Test " + "-".repeat(15));
}

function init() {
  console.log(
    "CHALLENGE_TOKEN: '4dfd9e2a4e6c25fe4b0e2d431097a977901d26e862e3710d2fdd70f1071a48524762e5dfd36fd8e0'"
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
