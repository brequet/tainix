init();
test();

// Challenge variables
const force = 12;
const vitesse = 10;
const batterie = 81;
const dechets = [
  12, 9, 11, 22, 35, 10, 8, 12, 5, 13, 15, 26, 18, 7, 15, 9, 14, 7, 12, 23,
];

function solveProblem(batterie, dechets, force, vitesse) {
  let i = 0;
  while (true) {
    if (batterie < 20) {
      cl(`Battery is low ${batterie}, recharging to ${100 - vitesse}`);
      batterie = 100 - vitesse;
    }

    if (i >= dechets.length) break;

    let dechet = dechets[i];

    if (force >= dechet) {
      batterie--;
      cl(
        `Handling dechet ${i} with weight ${dechet} for 1%, batterie is: ${batterie}`
      );
      i++;
    } else {
      let missingForce = dechet - force;
      let missingBattery = 2 * missingForce;
      if (missingBattery > batterie / 2) {
        batterie -= 2;
        cl(
          `Not enough battery to handle ${dechet} (missing ${missingBattery}%), loosing 2% -> ${batterie}`
        );
        i++;
        continue;
      }
      batterie -= missingBattery;
      cl(
        `Handling dechet ${i} with weight ${dechet} for ${missingBattery}%, batterie is: ${batterie}`
      );
      i++;
    }
  }
  return batterie >= 0 ? batterie : "KO";
}

console.log(`Answer: '${solveProblem(batterie, dechets, force, vitesse)}'`);

function test() {
  console.log("-".repeat(15) + " Start Test " + "-".repeat(15));

  // STEPS
  // [1/6] Le Robot traite le déchet 0 qui pèse 25 pour 16% de batterie, il lui reste 83% de batterie.
  // [2/6] Le Robot traite le déchet 1 qui pèse 7 pour 1% de batterie, il lui reste 82% de batterie.
  // [3/6] Le Robot traite le déchet 2 qui pèse 15 pour 1% de batterie, il lui reste 81% de batterie.
  // [4/6] Le Robot traite le déchet 3 qui pèse 15 pour 1% de batterie, il lui reste 80% de batterie.
  // [5/6] Le Robot traite le déchet 4 qui pèse 11 pour 1% de batterie, il lui reste 79% de batterie.
  // [6/6] Il lui reste 79% de batterie

  const force = 13;
  const vitesse = 12;
  const batterie = 89;
  const dechets = [29, 9, 32, 7, 12];

  const expected = "52";

  const result = solveProblem(batterie, dechets, force, vitesse);
  if (result != expected) {
    console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
  } else {
    console.log(`Test passed ! Got the expected result: ${expected}`);
    console.log("Run the following command to submit:\ntainix submit WALL_E");
  }

  console.log("-".repeat(15) + " End Test " + "-".repeat(15));
}

function init() {
  console.log(
    "CHALLENGE_TOKEN: '7daed3e1482137f881d38ceb86971c713719985376e1200b21f4f680bd518cc2ddd8b7cc4cedebcf'"
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
