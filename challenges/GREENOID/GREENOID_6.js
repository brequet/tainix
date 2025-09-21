init();
test();

// Challenge variables
const flux = ["V1A:2252", "V1B:1206", "V1C:1420"];
const network = [
  "V1A:V2D,V2B",
  "V1B:V2A,V2B,V2D",
  "V1C:V2B,V2A,V2D",
  "V2A:V3B,V3F,V3D",
  "V2B:V3C,V3B,V3A,V3D",
  "V2C:V3G,V3F,V3D,V3A",
  "V2D:V3B,V3A,V3E",
  "V3A:V4F,V4K,V4B,V4A,V4L",
  "V3B:V4C,V4H,V4J,V4B",
  "V3C:V4F,V4G,V4E,V4D,V4H,V4A",
  "V3D:V4H,V4F,V4A,V4I,V4B",
  "V3E:V4G,V4H,V4B,V4D",
  "V3F:V4K,V4E,V4H,V4D,V4F",
  "V3G:V4E,V4D,V4I,V4G",
];

function solveProblem(flux, network) {
  flux = flux.reduce((acc, e) => {
    let [v, val] = e.split(":");
    acc[v] = parseInt(val);
    return acc;
  }, {});
  network
    .map((e) => {
      let [v, vals] = e.split(":");
      return [v, vals.split(",")];
    })
    .forEach((vanne) => {
      let [vanneName, vals] = vanne;
      let fluxEntrant = Math.trunc((flux[vanneName] ?? 0) / vals.length);
      vals.forEach((sousVanne) => {
        if (!(sousVanne in flux)) flux[sousVanne] = 0;
        flux[sousVanne] += fluxEntrant;
      });
    });
  flux = flux
    .toEntries()
    .filter((f) => f[0][1] == 4)
    .sort((a, b) => b[1] - a[1]);
  let maxFlux = flux[0];
  let res = flux.filter((f) => f[1] == maxFlux[1]);
  return `${res[0][1]}_${res.map((r) => r[0]).join("")}`;
}

console.log(`Answer: '${solveProblem(flux, network)}'`);

function test() {
  console.log("-".repeat(15) + " Start Test " + "-".repeat(15));

  // STEPS
  // [1/6] --------- Extrait système ----------
  // [2/6] La vanne V2A a un flux de 2691 L/s en entrée et 538 L/s en sortie vers chacun de ses "enfants"
  // [3/6] La vanne V2B a un flux de 717 L/s en entrée et 179 L/s en sortie vers chacun de ses "enfants"
  // [4/6] La vanne V2C a un flux de 1338 L/s en entrée et 267 L/s en sortie vers chacun de ses "enfants"
  // [5/6] La vanne V2D a un flux de 1353 L/s en entrée et 270 L/s en sortie vers chacun de ses "enfants"
  // [6/6] -------- Fin extrait système -------

  const flux = ["V1A:2151", "V1B:1243", "V1C:2706"];
  const network = [
    "V1A:V2C,V2A,V2B",
    "V1B:V2C,V2A",
    "V1C:V2D,V2A",
    "V2A:V3F,V3D,V3G,V3C,V3B",
    "V2B:V3D,V3A,V3F,V3C",
    "V2C:V3G,V3B,V3E,V3A,V3D",
    "V2D:V3B,V3E,V3D,V3C,V3A",
    "V3A:V4I,V4A,V4D,V4K",
    "V3B:V4L,V4D,V4G,V4F,V4K",
    "V3C:V4B,V4J,V4D,V4A,V4L,V4E",
    "V3D:V4I,V4A,V4D,V4C,V4B,V4G",
    "V3E:V4C,V4F,V4G,V4I,V4H,V4A",
    "V3F:V4J,V4G,V4C,V4L",
    "V3G:V4A,V4G,V4I,V4D",
  ];

  const expected = "968_V4D";

  const result = solveProblem(flux, network);
  if (result != expected) {
    console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
  } else {
    console.log(`Test passed ! Got the expected result: ${expected}`);
    console.log(
      "Run the following command to submit:\ntainix submit GREENOID_6"
    );
  }

  console.log("-".repeat(15) + " End Test " + "-".repeat(15));
}

function init() {
  console.log(
    "CHALLENGE_TOKEN: 'b7979432cca66fa6961d96bcc87c9f4a3d4fc8861812c84521ae8a2de1d5f393ca90c24cf2f3563f'"
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
