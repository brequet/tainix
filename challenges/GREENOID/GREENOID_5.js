init();
test();

// Challenge variables
const sequences = [
  "HCPHCHPDHD",
  "CPPHCDHHDHP",
  "CDHPCHDHDDC",
  "HCPDHDPHCHPD",
  "CPPPHPHHHH",
  "DPHCDCDCCC",
  "CHHCPDPDPCD",
  "DPHPHDCDHCDC",
  "HCDPDHDPPPHH",
  "PPDPCDPCHP",
];
const storages = ["DPPH", "PPHC", "DPHCD", "DPHPPP", "HCCD"];

function solveProblem(sequences, storages) {
  let mapp = {
    P: 1,
    H: 2,
    C: 3,
    D: 4,
  };
  let mseq = sequences
    .map((sequence) => {
      let { P, H, C, D } = sequence.toDictOfCharOccurrences();
      return [
        sequence,
        (P ?? 0) * mapp.P +
          (D ?? 0) * mapp.D +
          (H ?? 0) * mapp.H +
          (C ?? 0) * mapp.C,
      ];
    })
    .sort((a, b) => b[1] - a[1])[0];
  let stor = storages
    .map((storage) => {
      let { P, H, C, D } = storage.toDictOfCharOccurrences();
      return [
        storage,
        (P ?? 0) * mapp.P +
          (D ?? 0) * mapp.D +
          (H ?? 0) * mapp.H +
          (C ?? 0) * mapp.C,
      ];
    })
    .sort((a, b) => b[1] - a[1])[0];
  return `${mseq[0]}${stor[0]}_${mseq[1] + stor[1]}`;
}

console.log(`Answer: '${solveProblem(sequences, storages)}'`);

function test() {
  console.log("-".repeat(15) + " Start Test " + "-".repeat(15));

  // STEPS
  // [1/16] La séquence HCPPCHCPCDD nécessite 27 minutes de calcul.
  // [2/16] La séquence PPHCPPCCCH nécessite 20 minutes de calcul.
  // [3/16] La séquence DCHHPCDHPD nécessite 26 minutes de calcul.
  // [4/16] La séquence DHHDDCHCPDC nécessite 32 minutes de calcul.
  // [5/16] La séquence HHCPHCHDPC nécessite 23 minutes de calcul.
  // [6/16] La séquence PDCDHDHHHHH nécessite 28 minutes de calcul.
  // [7/16] La séquence CPDCHDHCCDDH nécessite 35 minutes de calcul.
  // [8/16] La séquence HHCPPPDCDD nécessite 25 minutes de calcul.
  // [9/16] La séquence HPPHHPHDPPD nécessite 21 minutes de calcul.
  // [10/16] La séquence CHHPDCPHDDC nécessite 29 minutes de calcul.
  // [11/16] La séquence stockée PCHD nécessite 10 minutes de calcul.
  // [12/16] La séquence stockée PCHCC nécessite 12 minutes de calcul.
  // [13/16] La séquence stockée PDHH nécessite 9 minutes de calcul.
  // [14/16] La séquence stockée CDCDD nécessite 18 minutes de calcul.
  // [15/16] La séquence stockée HCHHH nécessite 11 minutes de calcul.
  // [16/16] La séquence complète la + longue à analyser est CPDCHDHCCDDHCDCDD avec 53 minutes de calcul

  const sequences = [
    "HCPPCHCPCDD",
    "PPHCPPCCCH",
    "DCHHPCDHPD",
    "DHHDDCHCPDC",
    "HHCPHCHDPC",
    "PDCDHDHHHHH",
    "CPDCHDHCCDDH",
    "HHCPPPDCDD",
    "HPPHHPHDPPD",
    "CHHPDCPHDDC",
  ];
  const storages = ["PCHD", "PCHCC", "PDHH", "CDCDD", "HCHHH"];

  const expected = "CPDCHDHCCDDHCDCDD_53";

  const result = solveProblem(sequences, storages);
  if (result != expected) {
    console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
  } else {
    console.log(`Test passed ! Got the expected result: ${expected}`);
    console.log(
      "Run the following command to submit:\ntainix submit GREENOID_5"
    );
  }

  console.log("-".repeat(15) + " End Test " + "-".repeat(15));
}

function init() {
  console.log(
    "CHALLENGE_TOKEN: '0f6aefcec731f31c08e559d0d64d679f5add677f718ae54ab53f5c4c86155f8de778857a67944a82'"
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
