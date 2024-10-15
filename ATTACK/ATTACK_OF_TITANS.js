init();
test();

// Challenge variables
const gaz = 1569;
const titans = [
  "6;9;491",
  "24;10;2167",
  "3;8;221",
  "12;10;1084",
  "10;5;459",
  "25;9;2027",
];
const habitations = ["8;28", "23;30", "13;22"];

function chooseHabitation(habitations, titan) {
  return habitations.filter((hab) => hab.h >= titan.h).length > 0
    ? habitations.filter((hab) => hab.h >= titan.h).at(-1)
    : habitations[0];
}

function solveProblem(habitations, gaz, titans) {
  titans = titans
    .map((e) => {
      let [size, speed, pv] = e.split(";").map(Number);
      return {
        size,
        speed,
        pv,
      };
    })
    .sort((a, b) => b.size - a.size);
  habitations = habitations
    .map((e) => {
      let [h, dist] = e.split(";").map(Number);
      return { h, dist };
    })
    .sort((a, b) => b.h - a.h);

  let point = 0;

  let titanToAttack = null;
  let habitation = null;
  while (true) {
    let titanToAttack = titans.filter((t) => t.pv > 0)[0] ?? null;
    if (titanToAttack == null) {
      cl("No alive titan left!");
      break;
    }

    cl("Targeting titan", titanToAttack);
    let newHabitation = chooseHabitation(habitations, titanToAttack);
    if (newHabitation != habitation) {
      habitation = newHabitation;
      if (habitation.h > gaz) {
        cl(
          "cannot go to habitation, not enough gaz left",
          `${habitation.h}/${gaz}`
        );
        break;
      }
      gaz -= habitation.h;
      cl(
        "Choosing habitation",
        habitation,
        "consuming gaz",
        `${habitation.h}/${gaz}`
      );
    }
    let hitGazPrice = Math.abs(
      habitation.h - titanToAttack.size + habitation.dist
    );

    if (hitGazPrice > gaz) {
      cl("Cannot hit the target, not enough gaz left", `${hitGazPrice}/${gaz}`);
      break;
    }
    gaz -= hitGazPrice;
    let hitPoint =
      habitation.dist * 2 -
      titanToAttack.speed +
      Math.abs(habitation.h - titanToAttack.size) *
        (habitation.h > titanToAttack.size ? 10 : 5);
    titanToAttack.pv -= hitPoint;
    point++;
    cl(
      "Hitting titan for points (+1 pt)",
      hitPoint,
      "hp left",
      titanToAttack.pv,
      "cost in gaz",
      hitGazPrice
    );
  }

  return point + titans.filter((t) => t.pv <= 0).length * 100;
}

console.log(`Answer: '${solveProblem(habitations, gaz, titans)}'`);

function test() {
  console.log("-".repeat(15) + " Start Test " + "-".repeat(15));

  // STEPS
  // [1/24] Je commence par attaquer le Titan 2
  // [2/24] Je m'envole sur l'habitation 0. Ca me coute 26 de gaz.
  // [3/24] Je frappe le Titan avec mes épées, il perd 103 PV (+ 1pt). Cette frappe me coute 51 de gaz.
  // [4/24] Je frappe le Titan avec mes épées, il perd 103 PV (+ 1pt). Cette frappe me coute 51 de gaz.
  // [5/24] Je frappe le Titan avec mes épées, il perd 103 PV (+ 1pt). Cette frappe me coute 51 de gaz.
  // [6/24] Je frappe le Titan avec mes épées, il perd 103 PV (+ 1pt). Cette frappe me coute 51 de gaz.
  // [7/24] Je frappe le Titan avec mes épées, il perd 103 PV (+ 1pt). Cette frappe me coute 51 de gaz.
  // [8/24] Je frappe le Titan avec mes épées, il perd 103 PV (+ 1pt). Cette frappe me coute 51 de gaz.
  // [9/24] Je frappe le Titan avec mes épées, il perd 103 PV (+ 1pt). Cette frappe me coute 51 de gaz.
  // [10/24] Je frappe le Titan avec mes épées, il perd 103 PV (+ 1pt). Cette frappe me coute 51 de gaz.
  // [11/24] Je frappe le Titan avec mes épées, il perd 103 PV (+ 1pt). Cette frappe me coute 51 de gaz.
  // [12/24] Je frappe le Titan avec mes épées, il perd 103 PV (+ 1pt). Cette frappe me coute 51 de gaz.
  // [13/24] Je frappe le Titan avec mes épées, il perd 103 PV (+ 1pt). Cette frappe me coute 51 de gaz.
  // [14/24] Je frappe le Titan avec mes épées, il perd 103 PV (+ 1pt). Cette frappe me coute 51 de gaz.
  // [15/24] Je frappe le Titan avec mes épées, il perd 103 PV (+ 1pt). Cette frappe me coute 51 de gaz.
  // [16/24] Je frappe le Titan avec mes épées, il perd 103 PV (+ 1pt). Cette frappe me coute 51 de gaz.
  // [17/24] Je frappe le Titan avec mes épées, il perd 103 PV (+ 1pt). Cette frappe me coute 51 de gaz.
  // [18/24] Je frappe le Titan avec mes épées, il perd 103 PV (+ 1pt). Cette frappe me coute 51 de gaz.
  // [19/24] Le Titan 2 est vaincu ! (+ 100pts)
  // [20/24] Je vais maintenant attaquer le Titan 1
  // [21/24] Je reste sur l'habitation 0
  // [22/24] Je frappe le Titan avec mes épées, il perd 163 PV (+ 1pt). Cette frappe me coute 57 de gaz.
  // [23/24] Je n'ai plus assez de gaz pour frapper le Titan
  // [24/24] L'attaque des Titans m'a rapporté 117 pts.

  const gaz = 913;
  const titans = ["3;10;278", "19;7;1202", "25;7;1576"];
  const habitations = ["26;50", "10;37"];

  const expected = "117";

  const result = solveProblem(habitations, gaz, titans);
  if (result != expected) {
    console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
  } else {
    console.log(`Test passed ! Got the expected result: ${expected}`);
    console.log(
      "Run the following command to submit:\ntainix submit ATTACK_OF_TITANS"
    );
  }

  console.log("-".repeat(15) + " End Test " + "-".repeat(15));
}

function init() {
  console.log(
    "CHALLENGE_TOKEN: 'df6c6b293b4451f8597e12aa1d6e37e5147e6ab4bb8818ac3a8d9dab880220cc23fb048c181f85e3'"
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
