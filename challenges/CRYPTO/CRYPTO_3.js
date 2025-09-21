init();
test();

// Challenge variables
const letters =
  "7y66ocvxwe5ix9fmv6ksdlghqp83uyd0gz8wflow1f2b7usk9w5cty5obiajkd0eonwqg9z8cl2el2h4i34ux3c71h5wflow1f2b7usk9uqjjpmayksdop3b583i3sc19cybcju2e7ffklo8s5umenrywflow1f2b7usk96mt6nvogsz3pi8293wflow1f2b7usk9pf13jn4vlg72uohwflow1f2b7usk99di26sbd7rgorykwp6y6qhey7mc7cr6p12hob";

function solveProblem(letters) {
  cl("total size", letters.length);
  for (let windowSize = letters.length - 1; windowSize > 8; windowSize--) {
    for (let i = 0; i < letters.length - windowSize + 1; i++) {
      const window = letters.slice(i).slice(0, windowSize);
      let pattern = new RegExp(window, "g");
      window == "u6u2025i4a" &&
        cl(
          "windows size",
          windowSize,
          "i",
          i,
          "window",
          window,
          (letters.match(pattern) || []).length == 4,
          pattern,
          letters.match(pattern)
        );
      if ((letters.match(pattern) || []).length >= 4)
        return window.toUpperCase();
    }
  }
}

console.log(`Answer: '${solveProblem(letters)}'`);

function test() {
  console.log("-".repeat(15) + " Start Test " + "-".repeat(15));

  // STEPS
  // [1/1] La chaîne U6U2025I4A est présente 5 fois dans la chaine "letters"

  const letters =
    "dj3llnp4d2rq7bcoe3zucpv5onv1ksh74p7e3j8saqeyph9u6u2025i4ar5y59fc43qzp6ibfybzamr1yjzvu6u2025i4au99ca2kvc9sbonkpg8v44sc1fa4diu3rzvx5458bnu6u2025i4ab9z522w9cm781o1q0onhugw0xu6u2025i4a39wowk2yjfwudbuvf75u6u2025i4a49rdddqru";

  const expected = "U6U2025I4A";

  const result = solveProblem(letters);
  if (result != expected) {
    console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
  } else {
    console.log(`Test passed ! Got the expected result: ${expected}`);
    console.log("Run the following command to submit:\ntainix submit CRYPTO_3");
  }

  console.log("-".repeat(15) + " End Test " + "-".repeat(15));
}

function init() {
  console.log(
    "CHALLENGE_TOKEN: '13f43dde1c9a44a2759b4593f4c6da8dbf586da2b919e3e72a314d8e9f61752118b1df299420e44f'"
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
