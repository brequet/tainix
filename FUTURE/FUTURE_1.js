init();
test();

// Challenge variables
const depart = 1985;
const anniversaire = "04-20";
const sauts = [
  "1997-12-22",
  "2008-11-29",
  "2009-03-31",
  "1995-04-09",
  "2012-07-15",
  "1999-10-02",
  "1988-03-02",
  "1975-08-10",
  "1973-12-26",
  "2006-12-27",
  "1988-03-03",
  "1980-07-21",
  "1970-01-22",
  "1988-06-21",
  "1973-09-23",
  "1970-12-24",
  "2010-05-20",
];

function solveProblem(depart, anniversaire, sauts) {
  return sauts
    .map((e) => {
      let [y, m, d] = e.split("-").map(Number);
      let [ma, ja] = anniversaire.split("-").map(Number);
      let diff = y - depart;
      cl(
        `date ${e}, diff ${diff}, '${m}-${d}' < ${anniversaire}:`,
        d + 1000 * m < ja + ma * 1000,
        d + 1000 * m >= ja + ma * 1000
      );
      if (diff < 0) {
        if (d + 1000 * m < ja + ma * 1000) {
          return diff;
        } else {
          return diff + 1;
        }
      } else {
        if (d + 1000 * m >= ja + ma * 1000) {
          return diff;
        } else {
          return diff - 1;
        }
      }
    })
    .log()
    .sumUp();
}

console.log(`Answer: '${solveProblem(depart, anniversaire, sauts)}'`);

function test() {
  console.log("-".repeat(15) + " Start Test " + "-".repeat(15));

  // STEPS
  // [1/6] Me voilà dans le passé... En 1982... Avant le 25/03. Je compte donc bien l'année, soit 3 année(s) de décalage
  // [2/6] Me voilà dans le futur... En 1986... Après le 25/03. Je compte donc bien l'année, soit 1 année(s) de décalage
  // [3/6] Me voilà dans le passé... En 1975... Après le 25/03. Je ne compte donc pas l'année, soit 9 année(s) de décalage
  // [4/6] Me voilà dans le futur... En 2000... Après le 25/03. Je compte donc bien l'année, soit 15 année(s) de décalage
  // [5/6] Me voilà dans le futur... En 2013... Après le 25/03. Je compte donc bien l'année, soit 28 année(s) de décalage
  // [6/6] Après tous ces sauts dans le temps, j'ai vécu un décalage de 32 année(s).

  const depart = 1985;
  const anniversaire = "03-25";
  const sauts = [
    "1982-02-17",
    "1986-10-07",
    "1975-07-28",
    "2000-06-11",
    "2013-12-07",
  ];

  const expected = "32";

  const result = solveProblem(depart, anniversaire, sauts);
  if (result != expected) {
    console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
  } else {
    console.log(`Test passed ! Got the expected result: ${expected}`);
    console.log("Run the following command to submit:\ntainix submit FUTURE");
  }

  console.log("-".repeat(15) + " End Test " + "-".repeat(15));
}

function init() {
  console.log(
    "CHALLENGE_TOKEN: '308101415f3abb3da1b0b084be41de044a7f4465d10ef2d9405f2ad4f1663036a53eef4a0d174b6c'"
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
