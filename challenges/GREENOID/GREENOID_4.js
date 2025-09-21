init();
test();

// Challenge variables
const co2 = [59, 85, 85, 63, 60, 80, 82, 81, 75, 83];
const water = [966, 569, 683, 791, 363, 413, 669, 578, 879, 574, 640, 681];
const deforestation = [6424, 6466, 7380, 5769, 5370, 9479, 8767, 6724, 5123];
const agricultural = [9, 9, 7, 10, 14, 10, 6, 13, 8, 7];
const plastic = [2024, 1662, 2687, 1178, 1601, 2114, 2920, 1555, 3196];
const renewable = [13, 17, 6, 14, 7, 19, 18, 15, 18];

function moyenne(tab) {
  return Math.trunc(
    tab
      .sortDesc()
      .slice(1, tab.length - 1)
      .sumUp() /
      (tab.length - 2)
  );
}

function solveProblem(
  co2,
  water,
  deforestation,
  agricultural,
  plastic,
  renewable
) {
  //   moyenne(co2).log("moyenne");

  let meanco2 = moyenne(co2);
  let meanwater = moyenne(water);
  let meandeforestation = moyenne(deforestation);
  let meanagricultural = moyenne(agricultural);
  let meanplastic = moyenne(plastic);
  let meanrenewable = moyenne(renewable);

  cl("co2", meanco2);
  cl("water", meanwater);
  cl("deforestation", meandeforestation);
  cl("agricultural", meanagricultural);
  cl("plastic", meanplastic);
  cl("renewable", meanrenewable);

  let P = Math.trunc(
    ((meanco2 + meanplastic / 1000) / 2) * (1 - meanrenewable / 100)
  );
  let R = Math.trunc(
    (100 -
      meanwater / 10 +
      (100 - meandeforestation / 100) +
      meanagricultural +
      meanrenewable) /
      4
  );
  return `${R}_${P}`;
}

console.log(
  `Answer: '${solveProblem(
    co2,
    water,
    deforestation,
    agricultural,
    plastic,
    renewable
  )}'`
);

function test() {
  console.log("-".repeat(15) + " Start Test " + "-".repeat(15));

  // STEPS
  // [1/8] La moyenne de CO2 est de 72
  // [2/8] La moyenne de consommation d'eau est de 793
  // [3/8] La moyenne de déforestation est de 6632
  // [4/8] La moyenne d'utilisation de terres agricoles est de 11
  // [5/8] La moyenne de production de plastique est de 1998
  // [6/8] La moyenne d'énergie renouvelable est de 14
  // [7/8] L'indicateur de pollution est de 31
  // [8/8] L'indicateur de ressources terrestres disponibles est de 19

  const deforestation = [
    9743, 5992, 7114, 6610, 6105, 5028, 6688, 5778, 5063, 9011, 7331,
  ];
  const agricultural = [15, 6, 7, 15, 5, 14, 12, 15, 12];
  const plastic = [1071, 3216, 2260, 2268, 2416, 1967, 2430, 1557, 1092];
  const renewable = [14, 20, 13, 16, 7, 15, 13, 9, 15, 17];
  const co2 = [71, 52, 90, 77, 88, 68, 79, 77, 50, 78, 81, 50];
  const water = [909, 714, 413, 948, 643, 615, 790, 936, 965];

  const expected = "19_31";

  const result = solveProblem(
    co2,
    water,
    deforestation,
    agricultural,
    plastic,
    renewable
  );
  if (result != expected) {
    console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
  } else {
    console.log(`Test passed ! Got the expected result: ${expected}`);
    console.log(
      "Run the following command to submit:\ntainix submit GREENOID_4"
    );
  }

  console.log("-".repeat(15) + " End Test " + "-".repeat(15));
}

function init() {
  console.log(
    "CHALLENGE_TOKEN: '6424ea9c17db2f670f6423189fb81e926fb60ac80d4f4be0ef53d7d44970486b3260fca5b3ac6c10'"
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
