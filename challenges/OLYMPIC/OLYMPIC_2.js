init();
test();

// Challenge variables
const actions = ['defend', 'miss', 'miss', 'hit', 'defend', 'miss', 'hit', 'miss', 'miss', 'miss', 'miss', 'miss', 'hit', 'miss', 'miss', 'miss', 'defend', 'miss', 'defend', 'defend', 'miss', 'hit', 'hit', 'defend', 'hit', 'miss', 'miss', 'hit', 'defend', 'miss', 'hit', 'miss', 'hit', 'hit', 'miss', 'hit', 'defend', 'hit', 'hit', 'defend', 'miss', 'defend', 'miss', 'hit', 'defend', 'hit', 'miss', 'miss', 'hit', 'miss', 'defend', 'hit', 'defend', 'hit', 'miss', 'defend', 'hit', 'hit', 'miss', 'defend', 'defend', 'miss', 'defend', 'hit', 'defend', 'defend', 'miss', 'defend', 'miss', 'defend', 'miss', 'defend', 'miss', 'miss', 'hit', 'miss', 'miss', 'defend', 'defend', 'hit', 'hit', 'miss', 'defend', 'defend', 'defend', 'defend', 'hit', 'miss'];


function solveProblem(actions) {
    return actions.map(w => w[0]).join("").match(/[h]+/g).map(e => parseInt(e.length)).max();
}

console.log(`Answer: '${solveProblem(actions)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
    // [1/25] Le coup n'a pas touché. On remet le compteur à 0.
    // [2/25] Le coup n'a pas touché. On remet le compteur à 0.
    // [3/25] Le coup a touché. On augmente le compteur de 1.
    // [4/25] Le coup a touché. On augmente le compteur de 1.
    // [5/25] Le coup n'a pas touché. On remet le compteur à 0.
    // [6/25] Le coup a touché. On augmente le compteur de 1.
    // [7/25] Le coup n'a pas touché. On remet le compteur à 0.
    // [8/25] Le coup n'a pas touché. On remet le compteur à 0.
    // [9/25] Le coup n'a pas touché. On remet le compteur à 0.
    // [10/25] Le coup n'a pas touché. On remet le compteur à 0.
    // [11/25] Le coup n'a pas touché. On remet le compteur à 0.
    // [12/25] Le coup n'a pas touché. On remet le compteur à 0.
    // [13/25] Le coup n'a pas touché. On remet le compteur à 0.
    // [14/25] Le coup a touché. On augmente le compteur de 1.
    // [15/25] Le coup n'a pas touché. On remet le compteur à 0.
    // [16/25] Le coup a touché. On augmente le compteur de 1.
    // [17/25] Le coup a touché. On augmente le compteur de 1.
    // [18/25] Le coup n'a pas touché. On remet le compteur à 0.
    // [19/25] Le coup n'a pas touché. On remet le compteur à 0.
    // [20/25] Le coup n'a pas touché. On remet le compteur à 0.
    // [21/25] Le coup n'a pas touché. On remet le compteur à 0.
    // [22/25] Le coup n'a pas touché. On remet le compteur à 0.
    // [23/25] Le coup n'a pas touché. On remet le compteur à 0.
    // [24/25] Le coup a touché. On augmente le compteur de 1.
    // [25/25] Le plus grand nombre de touches consécutives est de 2.


    const actions = ['defend', 'defend', 'hit', 'hit', 'defend', 'hit', 'defend', 'miss', 'miss', 'miss', 'miss', 'miss', 'defend', 'hit', 'defend', 'hit', 'hit', 'defend', 'defend', 'miss', 'defend', 'defend', 'miss', 'hit'];

    const expected = '2'

    const result = solveProblem(actions);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit OLYMPIC_2')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: '9956cf2394cbcca5a4f3ddb593fa807258f199345aa62fed39960439ba6fd015319816076a2186eb'"
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
