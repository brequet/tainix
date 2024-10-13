init();
test();

// Challenge variables
const force = 18;
const vitesse = 13;
const batterie = 100;
const dechets = [14, 10, 17, 8, 5, 28, 10, 14, 19, 18, 10, 25, 6, 22, 12, 16, 6, 34, 12, 10];


function solveProblem(force, vitesse, batterie, dechets) {
    return "";
}

console.log(`Answer: '${solveProblem(force, vitesse, batterie, dechets)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
	// [1/6] Le Robot traite le déchet 0 qui pèse 27 pour 32% de batterie, il lui reste 40% de batterie.
	// [2/6] Le Robot traite le déchet 1 qui pèse 15 pour 8% de batterie, il lui reste 32% de batterie.
	// [3/6] Le Robot traite le déchet 2 qui pèse 5 pour 1% de batterie, il lui reste 31% de batterie.
	// [4/6] Le Robot traite le déchet 3 qui pèse 15 pour 8% de batterie, il lui reste 23% de batterie.
	// [5/6] Le Robot traite le déchet 4 qui pèse 5 pour 1% de batterie, il lui reste 22% de batterie.
	// [6/6] Il lui reste 22% de batterie


    const dechets = [27, 15, 5, 15, 5];
const force = 11;
const vitesse = 14;
const batterie = 72;

    const expected = '22'

    const result = solveProblem(force, vitesse, batterie, dechets);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit WALL_E')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: '1f4c7b81f0a676136d82093494eb8907b6db40515be2a2bc7203b3fdfe2671ee1d28af180d5b935a'"
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
        return this.sortDesc()[0]
    }

    Object.prototype.log = function (arrName = null) {
        if (arrName == null) console.log("Logging:", this);
        else console.log(`Logging ${arrName}:`, this);
        return this;
    };

    Object.prototype.toSortedDescList = function () {
        return dictionnaryToSortedDescArray(this);
    };

    Object.prototype.toEntries = function () {
      return Object.entries(this)
    }

    Array.prototype.arrayOfPairToDict = function () {
      return arrayOfPairToDict(this);
    };

    String.prototype.toDictOfCharOccurrences = function (splitter = "") {
        return stringToDictOfCharOccurrences(this, splitter);
    };

    cl = console.log
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

    return items
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
    return +(Math.round(num + "e+2")  + "e-2");
}
