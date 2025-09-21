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

function solveProblem() {
  return "";
}

console.log(`Answer: '${solveProblem()}'`);

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

  return items
}

function validateAccForKey(acc, key) {
  if (!(key in acc)) acc[key] = 0;
}
