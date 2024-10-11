init();
test();

// Challenge variables
const plates = [
  "DQ-138-JD",
  "AF-750-FQ",
  "PX-831-XR",
  "PH-131-GP",
  "GX-112-RJ",
  "BY-404-LE",
  "PA-525-OY",
  "QO-989-FU",
  "SM-500-WB",
  "HM-907-AF",
  "SV-595-QK",
  "II-901-XU",
  "RG-618-EG",
  "QM-868-CQ",
  "QS-151-BY",
  "DB-172-DY",
  "ZG-797-BZ",
  "LT-168-NV",
  "HM-696-QL",
  "FS-308-DV",
  "HB-781-FP",
  "JW-145-GB",
];

function solveProblem(plates) {
  return plates
    .map((plate) => {
      let count = 0;
      for (let i = 0; i < (plate.length - 1) / 2; i++) {
        if (plate[i] != "-" && plate[i] == plate[plate.length - i - 1]) {
          count++;
        }
      }
      return count;
    })
    .log()
    .map((n) => Math.pow(10, n))
    .log()
    .sumUp();
}

console.log(`Answer: '${solveProblem(plates)}'`);

function test() {
  console.log("-".repeat(15) + " Start Test " + "-".repeat(15));

  // STEPS
  // [1/7] Pas de symétrie sur la plaque : OY-663-TT
  // [2/7] Pas de symétrie sur la plaque : QO-488-RF
  // [3/7] Symétrie de 1 caractère sur la plaque : TG-389-VT
  // [4/7] Symétrie de 1 caractère sur la plaque : CF-818-ZL
  // [5/7] Pas de symétrie sur la plaque : MF-882-CA
  // [6/7] Pas de symétrie sur la plaque : HE-509-DT
  // [7/7] Pas de symétrie sur la plaque : LH-158-UO

  const plates = [
    "OY-663-TT",
    "QO-488-RF",
    "TG-389-VT",
    "CF-818-ZL",
    "MF-882-CA",
    "HE-509-DT",
    "LH-158-UO",
  ];

  const expected = "25";

  const result = solveProblem(plates);
  if (result != expected) {
    console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
  } else {
    console.log(`Test passed ! Got the expected result: ${expected}`);
    console.log("Run the following command to submit:\ntainix submit CARS_1");
  }

  console.log("-".repeat(15) + " End Test " + "-".repeat(15));
}

function init() {
  console.log(
    "CHALLENGE_TOKEN: '392901afe71d00dfaa045510a37ecb988b39a2ca45fbdb2a30a9b9335732bc63acc41df4c579b847'"
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
