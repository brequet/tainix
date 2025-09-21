init();
test();

// Challenge variables
const ships = [395, 550, 7984, 3231, 6665, 2456, 7607, 5400, 125, 54, 33, 93, 106, 40, 8167, 88, 310, 478, 373, 19, 24, 7983, 278, 8747, 51, 334, 81, 3071, 8080, 152, 563, 9068, 59, 3896];


function solveProblem(ships) {
    return ships.map(ship => {
        if (ship < 100) {
            return Math.ceil(ship / 10)
        } else if (ship < 1000) {
            return 3 * Math.ceil(ship / 100) + 25
        } else if (ship < 10000) {
            return 5 * Math.ceil(ship / 1000) + 80
        }
    }).sumUp()
}

console.log(`Answer: '${solveProblem(ships)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
    // [1/13] Résistance du vaisseau : 7511. Puissance nécessaire : 120
    // [2/13] Résistance du vaisseau : 73. Puissance nécessaire : 8
    // [3/13] Résistance du vaisseau : 253. Puissance nécessaire : 34
    // [4/13] Résistance du vaisseau : 1523. Puissance nécessaire : 90
    // [5/13] Résistance du vaisseau : 88. Puissance nécessaire : 9
    // [6/13] Résistance du vaisseau : 355. Puissance nécessaire : 37
    // [7/13] Résistance du vaisseau : 922. Puissance nécessaire : 55
    // [8/13] Résistance du vaisseau : 84. Puissance nécessaire : 9
    // [9/13] Résistance du vaisseau : 68. Puissance nécessaire : 7
    // [10/13] Résistance du vaisseau : 418. Puissance nécessaire : 40
    // [11/13] Résistance du vaisseau : 77. Puissance nécessaire : 8
    // [12/13] Résistance du vaisseau : 6956. Puissance nécessaire : 115
    // [13/13] Résistance du vaisseau : 9240. Puissance nécessaire : 130


    const ships = [7511, 73, 253, 1523, 88, 355, 922, 84, 68, 418, 77, 6956, 9240];

    const expected = '662'

    const result = solveProblem(ships);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit STARSHIP_1')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: '8c3975a54f54405dd6f321b3f9b9824d5d8d593a46541105811832f7e6dfb47857da17a0bdf0e376'"
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

    Object.prototype.toEntries = function () {
        return Object.entries(this)
    }

    Array.prototype.arrayOfPairToDict = function () {
        return arrayOfPairToDict(this);
    };

    String.prototype.toDictOfCharOccurrences = function () {
        return stringToDictOfCharOccurrences(this);
    };

    cl = console.log
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
