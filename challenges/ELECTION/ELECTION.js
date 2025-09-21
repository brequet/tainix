init();
test();

// Challenge variables
const candidates = 'YGMPDOVK';
const votes = 'PVZTGDKPXYGGPVOKYOMGJVYJGEOOXOVDOKGOMKMPJPYOYKGOVJOYOGOYPGVVVJMDOTXYOOOTVPYOTPTGOGYMODEMOPEOMKTPYYGTPVMYDVDVYGVPPOZVOMPVVYZTTXKYYOOMGP';


function solveProblem(votes, candidates) {
    let c = candidates.split("").reduce((acc, cur) => {
        if (!(cur in acc)) acc[cur] = 0;
        return acc
    }, {})
    votes.toDictOfCharOccurrences().toEntries()
        .forEach(e => e[0] in c && (c[e[0]] += e[1]))

    let total = c.toEntries().map(e => e[1]).sumUp()

    let [first, second] = c.toSortedDescList().slice(0, 2)
    return `${first[0]}${round(first[1] / total * 100, 1)}-${second[0]}${round(second[1] / total * 100, 1)}`
}

console.log(`Answer: '${solveProblem(votes, candidates)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
    // [1/4] Il y a 104 votes au total.
    // [2/4] Il y a 23 votes blancs à retirer du décompte.
    // [3/4] Le ou la candidat(e) W a eu 24 voix.
    // [4/4] Le ou la candidat(e) I a eu 22 voix.


    const candidates = 'NKWOI';
    const votes = 'WIOKIWIKLNWOTWOWIWKNIONKKKOLNIWLKOIWLKLOOWLISWWOZOWIIINLOIOIHWWIIWOZZWWLIOLWWSIOOKILKORWMWWWOLIHLOOWIITI';

    const expected = 'W29.6-I27.2'

    const result = solveProblem(votes, candidates);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit ELECTION')
    }



    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: 'bd456f4b9c459bcb3d38ef9af96945eba58e89c13d19a1a68dea7fa440025e132fba8cb4a355d3ce'"
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

function round(num, precision = 2) {
    return +(Math.round(num + `e+${precision}`) + `e-${precision}`);
}

function isNumeric(str) {
    return /^\d+$/.test(str);
}
