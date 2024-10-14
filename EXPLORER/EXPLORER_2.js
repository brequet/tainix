init();
test();

// Challenge variables
const scores = "canyons 7:volcans 2:marais 3:champs 4:deserts 1";
const planetes = [
  "BMM755:champs 89:volcans 56",
  "EZU746:lacs 15:mers 35:volcans 39:marais 98:jungles 20",
  "VQK032:forets 39:grottes 56:jungles 79:deserts 67",
  "TRJ033:volcans 40:montagnes 80:marais 63:lacs 64",
  "LJQ927:champs 37:volcans 30",
  "KDZ807:montagnes 45:canyons 30:marais 82",
  "IRN454:grottes 10:lacs 73:champs 14:volcans 61:montagnes 60",
  "VFC105:canyons 26:mers 18:champs 60:plaines 62:volcans 67",
  "FBW210:grottes 35:montagnes 62:champs 12:marais 53:deserts 69",
  "XZD511:montagnes 69:forets 82:canyons 31",
  "CVZ431:lacs 14:volcans 46:canyons 49:mers 42:marais 96:plaines 23",
  "DTO275:plaines 58:jungles 95:mers 69:deserts 93",
  "IFQ217:marais 22:montagnes 76:champs 78:plaines 90",
  "TXJ681:volcans 25:lacs 76",
  "TLN643:marais 49:lacs 33:volcans 13:champs 35",
  "AZI991:deserts 28:champs 20",
  "WXH407:plaines 60:jungles 51",
  "NBM235:grottes 85:mers 31:montagnes 26:marais 33",
  "WTE172:champs 33:grottes 79",
  "DZI203:jungles 83:lacs 51",
  "JXV464:jungles 68:champs 70:deserts 53:forets 26:volcans 86:canyons 58",
];

function solveProblem(planetes, scores) {
  let allS = {};
  scores.split(":").forEach((e) => {
    let [n, score] = e.split(" ");
    allS[n] = parseInt(score);
  });
  return planetes
    .map((planete) => {
      let [name, ...rest] = planete.split(":");
      s = rest
        .map((e) => {
          let [n, score] = e.split(" ");
          return [n, parseInt(score)];
        })
        .filter((e) => e[0] in allS)
        .map((e) => allS[e[0]] * e[1])
        .sumUp();
      return { name: name, s: s };
    })
    .sort((a, b) => b.s - a.s)[0].s;
}

console.log(`Answer: '${solveProblem(planetes, scores)}'`);

function test() {
  console.log("-".repeat(15) + " Start Test " + "-".repeat(15));

  // STEPS
  // [1/9] La planète VHF267 a un score de 0...
  // [2/9] La planète YVY527 a un score de 1410.
  // [3/9] La planète BDZ374 a un score de 49.
  // [4/9] La planète IIW026 a un score de 560.
  // [5/9] La planète NEL975 a un score de 780.
  // [6/9] La planète YMD466 a un score de 0...
  // [7/9] La planète NYQ984 a un score de 370.
  // [8/9] La planète GTT915 a un score de 95.
  // [9/9] La planète FPQ175 a un score de 730.

  const planetes = [
    "VHF267:volcans 33:champs 54",
    "YVY527:mers 69:champs 34:plaines 98:canyons 87:grottes 24:lacs 43",
    "BDZ374:montagnes 49:champs 90",
    "IIW026:lacs 56:grottes 65:mers 53:volcans 94:jungles 37",
    "NEL975:grottes 92:lacs 78:deserts 67",
    "YMD466:jungles 26:deserts 47",
    "NYQ984:volcans 10:plaines 37:grottes 65:marais 75:canyons 34",
    "GTT915:canyons 76:marais 85:mers 43:grottes 60:montagnes 95:jungles 58",
    "FPQ175:lacs 73:deserts 43:grottes 91",
  ];
  const scores = "forets 1:plaines 10:lacs 10:montagnes 1";

  const expected = "1410";

  const result = solveProblem(planetes, scores);
  if (result != expected) {
    console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
  } else {
    console.log(`Test passed ! Got the expected result: ${expected}`);
    console.log(
      "Run the following command to submit:\ntainix submit EXPLORER_2"
    );
  }

  console.log("-".repeat(15) + " End Test " + "-".repeat(15));
}

function init() {
  console.log(
    "CHALLENGE_TOKEN: 'c5e948b74deba816d2447af3b9f33a06ec7a1b1e255cdefb2434950f094d9acc20ee0282d8af3753'"
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
