init();
test();

// Challenge variables
const distance = 2637;
const events = 'T_T__P__NN__P__N_T';


function solveProblem(distance, events) {
    let { T, P, N } = events.toDictOfCharOccurrences()
        .log()
    let gareDist = ((T - 2) * 10 + 10)
    let gareTemps = gareDist / 50 * 3600

    let powerDist = (P ?? 0) * 10
    let powerTemps = powerDist / 5 * 3600

    let naturalDist = (N ?? 0) * 5
    let naturalTemps = naturalDist / 10 * 3600

    let restDist = distance - gareDist - powerDist - naturalDist
    let restTemps = restDist / 200 * 3600

    return gareTemps + powerTemps + naturalTemps + restTemps
}

console.log(`Answer: '${solveProblem(distance, events)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
    // [1/4] Les gares nécessitent 50kms à 50km/h, soit 60 min (3600 secondes).
    // [2/4] Pas de coupure de courant.
    // [3/4] Pas d'incident naturel
    // [4/4] Il reste donc 1079kms à 200km/h, soit environ 324 min (19422 secondes exactement).


    const distance = 1129;
    const events = 'T_T__T__T__T_T';

    const expected = '23022'

    const result = solveProblem(distance, events);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit TRAIN_1')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: '524693f01d982c225519bd24f9722d155211d790f16b9ad6649466e052f90a14c19ddf4f32965335'"
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
    return +(Math.round(num + "e+2") + "e-2");
}

function isNumeric(str) {
    return /^\d+$/.test(str);
}
