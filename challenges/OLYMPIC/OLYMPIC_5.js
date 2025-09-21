init();
test();

// Challenge variables
const shots = [34, 43, 40, 15, 44, 30, 17, 29, 28, 43, 5, 21, 22, 20, 38, 14, 7, 28, 24, 17, 44];


function solveProblem(shots) {
    return shots.map(s => {
        if (s <= 5.75) return 10
        else if (s <= 13.75) return 9
        else if (s <= 21.75) return 8
        else if (s <= 29.75) return 7
        else if (s <= 37.75) return 6
        else if (s <= 45.75) return 5
    })
        .sumUp()
}

console.log(`Answer: '${solveProblem(shots)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
    // [1/10] 15mm : Le tir est dans le cercle entre 13,75mm et 21,75mm de rayon, c'est un 8 !
    // [2/10] 15mm : Le tir est dans le cercle entre 13,75mm et 21,75mm de rayon, c'est un 8 !
    // [3/10] 41mm : Le tir est dans le cercle entre 37,75mm et 45,75mm de rayon, c'est un 5 !
    // [4/10] 23mm : Le tir est dans le cercle entre 21,75mm et 29,75mm de rayon, c'est un 7 !
    // [5/10] 13mm : Le tir est dans le cercle entre 5,75mm et 13,75mm de rayon, c'est un 9 !
    // [6/10] 15mm : Le tir est dans le cercle entre 13,75mm et 21,75mm de rayon, c'est un 8 !
    // [7/10] 29mm : Le tir est dans le cercle entre 21,75mm et 29,75mm de rayon, c'est un 7 !
    // [8/10] 26mm : Le tir est dans le cercle entre 21,75mm et 29,75mm de rayon, c'est un 7 !
    // [9/10] 3mm : Le tir est dans le centre (avant 5,75mm de rayon), c'est un 10 !
    // [10/10] 41mm : Le tir est dans le cercle entre 37,75mm et 45,75mm de rayon, c'est un 5 !


    const shots = [15, 15, 41, 23, 13, 15, 29, 26, 3, 41];

    const expected = '74'

    const result = solveProblem(shots);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit OLYMPIC_5')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: '418d6cdf8fd39f4fa3d96e902265775068b9d616c2de69ffdaaedd489ff260de0f97d85881b13345'"
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
