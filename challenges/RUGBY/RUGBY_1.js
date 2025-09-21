init();
test();

// Challenge variables
const line1 = ['101:32', '101:67', '99:82'];
const line2 = ['85:36', '99:72', '103:82', '85:37'];
const line3 = ['106:23'];


function solveProblem(line3, line1, line2) {
    return Math.trunc(line1.map(e => {
        [w, f] = e.split(":")
        return w * f
    }).sumUp() * 1.5) + Math.trunc(line2.map(e => {
        [w, f] = e.split(":")
        return w * f
    }).sumUp() * 1) + Math.trunc(line3.map(e => {
        [w, f] = e.split(":")
        return w * f
    }).sumUp() * 0.75)
}

console.log(`Answer: '${solveProblem(line3, line1, line2)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
    // [1/8] Ligne 1, joueur 1, impact : 3510
    // [2/8] Ligne 1, joueur 2, impact : 12589
    // [3/8] Ligne 1, joueur 3, impact : 3627
    // [4/8] Ligne 2, joueur 1, impact : 2976
    // [5/8] Ligne 2, joueur 2, impact : 3104
    // [6/8] Ligne 2, joueur 3, impact : 7760
    // [7/8] Ligne 2, joueur 4, impact : 1302
    // [8/8] Ligne 3, joueur 1, i   mpact : 2126


    const line1 = ['117:20', '109:77', '93:26'];
    const line2 = ['96:31', '97:32', '97:80', '93:14'];
    const line3 = ['81:35'];

    const expected = '36994'

    const result = solveProblem(line3, line1, line2);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit RUGBY_1')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: '039b35344f91bd2fb71f2cc634707726a244887f469814d0d1a34f9b8bb706a6222abfbf806fffce'"
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
