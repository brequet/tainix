init();
test();

// Challenge variables
const map = [
  "r",
  "w",
  "w",
  "w",
  "r",
  "r",
  "w",
  "w",
  "w",
  "w",
  "w",
  "w",
  "w",
  "w",
  "w",
  "w",
  "w",
  "w",
  "w",
  "w",
  "r",
  "w",
  "w",
  "r",
  "r",
  "w",
  "w",
  "w",
  "w",
  "w",
  "w",
  "w",
  "w",
  "w",
  "w",
  "r",
  "w",
  "w",
  "w",
  "w",
  "w",
  "w",
  "r",
  "w",
  "w",
  "w",
  "w",
  "w",
  "w",
  "w",
  "w",
  "w",
  "r",
  "w",
  "w",
  "w",
  "w",
  "r",
  "w",
  "w",
  "w",
  "r",
  "w",
  "w",
  "w",
  "w",
  "w",
  "w",
  "w",
  "w",
  "r",
  "w",
  "r",
  "w",
  "w",
  "w",
  "w",
  "w",
  "w",
  "w",
  "w",
  "r",
  "r",
  "w",
  "w",
  "w",
  "w",
  "w",
  "r",
  "w",
  "w",
  "w",
  "w",
  "r",
  "w",
  "w",
  "w",
  "w",
  "w",
  "w",
];

function solveProblem(map) {
  let grid = [];
  let chunkSize = 10;
  for (let i = 0; i < map.length / chunkSize; i++) {
    grid.push(map.slice(i * chunkSize, (i + 1) * chunkSize));
  }

  let reds = [];
  for (let i = 0; i < grid.length; i++) {
    let row = grid[i];
    for (let j = 0; j < row.length; j++) {
      if (row[j] === "r") {
        reds.push([i, j]);
      }
    }
  }
  reds.log("reds");

  let blues = {};

  reds.forEach(([i, j]) => {
    cl("debug", [i, j]);
    i < chunkSize - 1 && !([i + 1, j] in reds) && (blues[[i + 1, j]] = 1);
    i > 0 && !([i - 1, j] in reds) && (blues[[i - 1, j]] = 1);
    j < chunkSize - 1 && !([i, j + 1] in reds) && (blues[[i, j + 1]] = 1);
    j > 0 && !([i, j - 1] in reds) && (blues[[i, j - 1]] = 1);
  });

  blues.log("blues");

  return blues.toEntries().length;
}

console.log(`Answer: '${solveProblem(map)}'`);

function test() {
  console.log("-".repeat(15) + " Start Test " + "-".repeat(15));

  // STEPS

  const map = [
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "r",
    "w",
    "w",
    "w",
    "r",
    "w",
    "w",
    "r",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "r",
    "w",
    "r",
    "w",
    "r",
    "w",
    "w",
    "w",
    "w",
    "r",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "r",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
  ];

  const expected = "23";

  const result = solveProblem(map);
  if (result != expected) {
    console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
  } else {
    console.log(`Test passed ! Got the expected result: ${expected}`);
    console.log("Run the following command to submit:\ntainix submit PAINT");
  }

  console.log("-".repeat(15) + " End Test " + "-".repeat(15));
}

function init() {
  console.log(
    "CHALLENGE_TOKEN: '42e3597d83ca1af03220de288a39f5970a0b24dbc5dd0203df53eac57ce10f44fef992ce0ab9797f'"
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
