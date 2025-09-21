init();
test();

// Challenge variables
const platforms = 'P__P__P_P___P___P__P____P_____P_____P_____P_____P';


function solveProblem(platforms) {
    let numberOf3seen = 0
    return platforms.split('P').map(e => e.length)
        .filter(e => e > 0)
        .map(e => {
            if (e < 3) return 'M'
            else if (e > 3) return 'P'
            else {
                numberOf3seen++
                return numberOf3seen % 2 == 1 ? 'P' : 'M'
            }
        })
        .join("")
}

console.log(`Answer: '${solveProblem(platforms)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
    // [1/10] Le saut est de 4 c'est pour Peach.
    // [2/10] Le saut est de 2 c'est pour Mario.
    // [3/10] Le saut est de 1 c'est pour Mario.
    // [4/10] Le saut est de 5 c'est pour Peach.
    // [5/10] Le saut est de 5 c'est pour Peach.
    // [6/10] Le saut est de 5 c'est pour Peach.
    // [7/10] Le saut est de 2 c'est pour Mario.
    // [8/10] Le saut est de 1 c'est pour Mario.
    // [9/10] Le saut est de 4 c'est pour Peach.
    // [10/10] Le saut est de 1 c'est pour Mario.


    const platforms = 'P____P__P_P_____P_____P_____P__P_P____P_P';

    const expected = 'PMMPPPMMPM'

    const result = solveProblem(platforms);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit MARIO_1')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: 'fcbf32d638cec198d565c07babd91181666a3d021991ce3a0d534b24a5e4940642cf4515ba73cf6d'"
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
