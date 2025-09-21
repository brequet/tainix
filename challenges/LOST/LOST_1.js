init();
test();

// Challenge variables
const nombres = [4, 8, 15, 16, 23, 42];
const codes = ['1 4 4 - 6 2 4', '4 6 4 - 6 4 4', '1 3 5 - 4 5 1 2', '3 1 4 - 5 2 1', '5 2 - 5 4 3', '1 3 6 1 2 5 + 4', '1 5 + 6 1 5', '5 6 6 6 + 1', '3 2 6 + 6 3'];


function solveProblem(nombres, codes) {
    return codes.map(code => {
        let ops = code.match(/(\d [\-+] \d)/g)
        ops?.forEach(op => code = code.replace(op, ""))

        let rests = code.match(/(\d)/g)
        // .map(e => nombres[parseInt(e)+1])

        let formulaBefore = rests.concat(ops?.map(e => `(${e})`) ?? []).join(" * ")

        let formulaAfter = ""
        formulaBefore.split("").forEach(char => {
            if (isNumeric(char)) {
                formulaAfter += nombres[parseInt(char) - 1]
            } else {
                formulaAfter += char
            }
        })

        console.log(formulaBefore, '====', formulaAfter)
        return eval(formulaAfter)
    })
        .log()
        .sumUp()
}

console.log(`Answer: '${solveProblem(nombres, codes)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
    // [1/4] La ligne 1 donne la valeur : 114816
    // [2/4] La ligne 2 donne la valeur : 14717203200
    // [3/4] La ligne 3 donne la valeur : -3059
    // [4/4] La somme de chaque ligne est de : 14717314957


    const codes = ['4 5 4 + 5 2', '2 5 6 3 4 5 3 5', '5 1 - 5 5 - 4'];
    const nombres = [4, 8, 15, 16, 23, 42];

    const expected = '14717314957'

    const result = solveProblem(nombres, codes);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit LOST_1')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: '35180a0a31021b10de4a9bba27240b63c4e301b885d7e46223f8baaea3a22f8300602082546bcae6'"
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
