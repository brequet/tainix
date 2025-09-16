init();
test();

// Challenge variables
const keys = [
  "t573iu789c7",
  "md7311s34n45",
  "i733p4ccp7l43",
  "8jenk6487of55",
  "5q6a596in923",
  "v37whz363p3",
  "c8d5kss7y913",
  "22om24fe682r3p",
];

function isInt(value) {
  return (
    !isNaN(value) &&
    parseInt(Number(value)) == value &&
    !isNaN(parseInt(value, 10))
  );
}

function dec2bin(dec) {
  return (dec >>> 0).toString(2);
}

function compose(k1, k2) {
  let res = "";
  for (let i = 0; i < k1.length; i++) {
    if (k1.toString()[i] == k2.toString()[i]) res += "1";
    else res += 0;
  }
  return res;
}

function solveProblem(keys) {
  let bins = keys
    .map((key) =>
      key
        .split("")
        .map((char) => {
          if (isInt(char)) {
            return parseInt(char);
          } else {
            return char.charCodeAt(0) - 97 + 10;
          }
        })
        .sumUp()
    )
    .map(dec2bin);
  let comps = [];
  for (let i = 0; i < bins.length - 1; i++) {
    for (let j = i + 1; j < bins.length; j++) {
      let composition = compose(bins[i], bins[j]);
      comps.push(composition);
    }
  }

  return comps
    .map((e) => parseInt(e, 2))
    .sort((a, b) => a - b)
    .log("bits sort")
    .map((e) => e % 36)
    .log()
    .map((e) => {
      if (e < 10) return e.toString();
      else return String.fromCharCode(e - 10 + 97);
    })
    .log()
    .join("");
}

console.log(`Answer: '${solveProblem(keys)}'`);

function test() {
  console.log("-".repeat(15) + " Start Test " + "-".repeat(15));

  // STEPS
  // [1/6] --------- Extrait système ----------
  // [2/6] Composition des clés 148g9mi6q9k5 et 6b135kdu29i9k
  // [3/6] Les valeurs numériques sont 144 et 147
  // [4/6] Les valeurs binaires sur 8 bits sont 10010000 et 10010011
  // [5/6] La composition est 11111100
  // [6/6] -------- Fin extrait système -------

  const keys = [
    "148g9mi6q9k5",
    "6b135kdu29i9k",
    "26q9gj6p7vv3",
    "19n69n5til2",
    "5lrn64e5525",
    "vs1346a4b5gi",
    "1v663ye1o1t",
    "z22r8d36k28h",
  ];

  const expected = "35opqsrfh012488abcdeexxyz012";

  const result = solveProblem(keys);
  if (result != expected) {
    console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
  } else {
    console.log(`Test passed ! Got the expected result: ${expected}`);
    console.log(
      "Run the following command to submit:\ntainix submit GREENOID_7"
    );
  }

  console.log("-".repeat(15) + " End Test " + "-".repeat(15));
}

function init() {
  console.log(
    "CHALLENGE_TOKEN: '7aea95ef3cbbf0da7c6eb3540686e912ea44e15bd017a062bea772f1d4a329d6a170c1bd84c3a06d'"
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
