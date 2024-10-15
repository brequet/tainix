init();
test();

// Challenge variables
const table = [
  "NZL : Bronze,Gold,Bronze,Bronze,Silver",
  "ETH : Silver,Silver,Gold,Silver,Gold",
  "UKR : Gold,Silver,Gold,Bronze,Bronze,Bronze,Bronze,Bronze,Gold",
  "FIN : Bronze,Silver,Gold,Bronze,Bronze,Silver,Bronze,Bronze,Bronze,Bronze,Gold,Silver",
  "TUR : Bronze,Gold,Bronze,Bronze,Gold",
  "KOR : Bronze,Bronze,Gold,Bronze,Silver,Bronze",
  "GER : Bronze,Silver,Bronze,Bronze,Bronze,Gold,Silver,Bronze,Bronze,Bronze",
  "KEN : Silver,Gold,Bronze,Bronze,Bronze,Bronze,Bronze",
  "FRA : Gold,Silver,Gold,Bronze,Bronze,Bronze,Bronze,Silver,Bronze,Silver,Gold",
];

function solveProblem(table) {
  let p = {
    Gold: 10,
    Silver: 5,
    Bronze: 2,
  };
  return table
    .map((e) => {
      let [country, medals] = e.split(" : ");

      let points = medals
        .split(",")
        .map((e) => p[e])
        .sumUp();
      return [country, points];
    })
    .sort((a, b) => b[1] - a[1])[0]
    .join("_");
}

console.log(`Answer: '${solveProblem(table)}'`);

function test() {
  console.log("-".repeat(15) + " Start Test " + "-".repeat(15));

  // STEPS
  // [1/6] Le pays NZL a 37 points grâce à ses médailles.
  // [2/6] Le pays SWE a 26 points grâce à ses médailles.
  // [3/6] Le pays TUR a 25 points grâce à ses médailles.
  // [4/6] Le pays FIN a 35 points grâce à ses médailles.
  // [5/6] Le pays JPN a 33 points grâce à ses médailles.
  // [6/6] Le pays UKR a 27 points grâce à ses médailles.

  const table = [
    "NZL : Bronze,Bronze,Silver,Bronze,Bronze,Silver,Bronze,Bronze,Silver,Silver,Silver",
    "SWE : Bronze,Silver,Silver,Bronze,Bronze,Gold",
    "TUR : Bronze,Bronze,Bronze,Bronze,Silver,Bronze,Bronze,Bronze,Bronze,Bronze,Bronze",
    "FIN : Silver,Bronze,Bronze,Bronze,Silver,Bronze,Bronze,Silver,Gold",
    "JPN : Bronze,Bronze,Silver,Gold,Bronze,Bronze,Bronze,Bronze,Bronze,Bronze,Bronze",
    "UKR : Silver,Bronze,Bronze,Silver,Silver,Bronze,Bronze,Bronze,Bronze",
  ];

  const expected = "NZL_37";

  const result = solveProblem(table);
  if (result != expected) {
    console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
  } else {
    console.log(`Test passed ! Got the expected result: ${expected}`);
    console.log(
      "Run the following command to submit:\ntainix submit OLYMPIC_1"
    );
  }

  console.log("-".repeat(15) + " End Test " + "-".repeat(15));
}

function init() {
  console.log(
    "CHALLENGE_TOKEN: 'f51b2c6a13a48987f072773c336f66d91b4efdec39de07ac2377c0c13ab6a2774a85b60023e805fe'"
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
