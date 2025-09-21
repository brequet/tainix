init();
test();

// Challenge variables
const monsters = ['W', 'F', 'W', 'R', 'G', 'F', 'W', 'R', 'R', 'W', 'R', 'F', 'W', 'W', 'F', 'G', 'F', 'G', 'R', 'W', 'G', 'F', 'G', 'F', 'G', 'W', 'R', 'W', 'G', 'W', 'W', 'R'];


function solveProblem(monsters) {
    let { W, F, R, G } = monsters.join("").toDictOfCharOccurrences()
    return Math.min(F, R) * Math.min(W, G) + ((W + F + R + G) - 2 * (Math.min(F, R) + Math.min(W, G)))
}

console.log(`Answer: '${solveProblem(monsters)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
    // [1/4] On peut faire 2 couple(s) entre les types Fruits et Rock.
    // [2/4] Il reste 3 monstre(s) de type Fruits seul(s).
    // [3/4] On peut faire 3 couple(s) entre les types Wood et Grass.
    // [4/4] Il reste 2 monstre(s) de type Wood seul(s).


    const monsters = ['W', 'F', 'F', 'R', 'F', 'G', 'F', 'W', 'W', 'R', 'W', 'F', 'G', 'G', 'W'];

    const expected = '11'

    const result = solveProblem(monsters);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit MONSTERS_4')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: 'a75e649bc2281f695d86e0fd8a55f8a8935ad7ae803fcf472ffd8c2d8b436e98ef5046fdc823cd97'"
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
