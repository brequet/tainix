init();
test();

// Challenge variables
const map = [
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
  "r",
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
  "r",
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
];

function solveProblem(map) {
  const chunkSize = 10;
  const table = map.reduce((acc, _, i) => {
    if (i % chunkSize === 0) acc.push(map.slice(i, i + chunkSize));
    return acc;
  }, []);

  const dejaBleuCount = map.filter((e) => e == "b").length;

  let coordsToWhite = {};

  table.forEach((row, i) => {
    row.forEach((e, j) => {
      if (e == "w") {
        coordsToWhite[i + "," + j] = true;
      }
    });
  });

  table.forEach((row, i) => {
    row.forEach((e, j) => {
      if (e == "r") {
        if (i > 0 && table[i - 1][j] == "w") {
          coordsToWhite[i - 1 + "," + j] = false;
        }
        if (i < table.length - 1 && table[i + 1][j] == "w") {
          coordsToWhite[i + 1 + "," + j] = false;
        }
        if (j > 0 && table[i][j - 1] == "w") {
          coordsToWhite[i + "," + j - 1] = false;
        }
        if (j < table.length - 1 && table[i][j + 1] == "w") {
          coordsToWhite[i + "," + j + 1] = false;
        }
      }
    });
  });

  return (
    dejaBleuCount +
    coordsToWhite.toEntries().filter((e) => e[1] == false).length
  );
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
    "r",
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
    "r",
    "w",
    "w",
  ];

  const expected = "28";

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
    "CHALLENGE_TOKEN: 'ff7022424eb3710f57eb3e2e460a35b053e334994670ec52ab8ca82a2b133bd23dea465a89863817'"
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
