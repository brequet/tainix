init();
test();

// Challenge variables
const weight = 6;
const formula = '3G7';
const foods = 'GRGGFRWFRFRFWFRGGRRRGGRFG';


function solveProblem(weight, formula, foods) {
    const f = { a: parseInt(formula[0]), b: parseInt(formula[2]), t: formula[1] }
    return weight + (f.a * 1 + f.b) * foods.toDictOfCharOccurrences().log()[f.t]
}

console.log(`Answer: '${solveProblem(weight, formula, foods)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
    // [1/11] La formule du monstre est : 3 * 1 + 8 lorsque le monstre rencontre une nourriture de type R.
    // [2/11] F => Le monstre ne mange pas et ne grossit pas.
    // [3/11] W => Le monstre ne mange pas et ne grossit pas.
    // [4/11] R => Le monstre peut manger et gagne 11 de poids.
    // [5/11] R => Le monstre peut manger et gagne 11 de poids.
    // [6/11] F => Le monstre ne mange pas et ne grossit pas.
    // [7/11] W => Le monstre ne mange pas et ne grossit pas.
    // [8/11] G => Le monstre ne mange pas et ne grossit pas.
    // [9/11] R => Le monstre peut manger et gagne 11 de poids.
    // [10/11] G => Le monstre ne mange pas et ne grossit pas.
    // [11/11] F => Le monstre ne mange pas et ne grossit pas.


    const weight = 9;
    const formula = '3R8';
    const foods = 'FWRRFWGRGF';

    const expected = '42'

    const result = solveProblem(weight, formula, foods);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit MONSTERS_1')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: 'b7f48eb84a4b740763f5a7201fc49bcd620ee2b5f3c9937eb65a91af0900114d257e69ee2b2238f5'"
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
