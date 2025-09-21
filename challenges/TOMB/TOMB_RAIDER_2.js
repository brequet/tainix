init();
test();

// Challenge variables
const words = ['saccules', 'binaires', 'exondiez'];
const translations = { 'saccules': 'ztddfxnz', 'binaires': 'ukwtkpnz', 'exondiez': 'nomwhkne' };
const secret = 'hndkht';


function solveProblem(words, translations, secret) {
    let letterMap = {}
    translations.toEntries().log().forEach(pair => {
        [value, key] = pair
        for (let i = 0; i < value.length; i++) {
            letterMap[key[i]] = value[i]
        }
    })
    letterMap.log()
    return secret.split("").map(c => letterMap[c]).join("")
}
console.log(`Answer: '${solveProblem(words, translations, secret)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
    // [1/14] Le mot à traduire est: nrcnzn
    // [2/14] La lettre "c", veut dire: "p"
    // [3/14] La lettre "f", veut dire: "u"
    // [4/14] La lettre "x", veut dire: "l"
    // [5/14] La lettre "z", veut dire: "s"
    // [6/14] La lettre "k", veut dire: "i"
    // [7/14] La lettre "m", veut dire: "o"
    // [8/14] La lettre "w", veut dire: "n"
    // [9/14] La lettre "t", veut dire: "a"
    // [10/14] La lettre "d", veut dire: "c"
    // [11/14] La lettre "r", veut dire: "m"
    // [12/14] La lettre "n", veut dire: "e"
    // [13/14] La lettre "o", veut dire: "x"
    // [14/14] nrcnzn veut dire: empese


    const words = ['pulsions', 'accusais', 'complexe'];
    const translations = { 'pulsions': 'cfxzkmwz', 'accusais': 'tddfztkz', 'complexe': 'dmrcxnon' };
    const secret = 'nrcnzn';

    const expected = 'empese'

    const result = solveProblem(words, translations, secret);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit TOMB_RAIDER_2')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: '8df5df667eca9a254e58fee8a246d1e0da83633897efad7910dc69b0e9de8a6e57367f7e9c80a51a'"
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
