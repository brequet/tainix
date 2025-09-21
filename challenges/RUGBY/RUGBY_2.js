init();
test();

// Challenge variables
const actions = 'PDDPTETETDDEETDDETPPTETDDEDDPPPETP';


function solveProblem(actions) {
    p = {
        E: 5,
        T: 2,
        P: 3,
        D: 3
    }
    return actions.replaceAll(/([^E])T/g, "$1")
        .toDictOfCharOccurrences()
        .toEntries()
        .map(e => p[e[0]] * e[1])
        .sumUp()
}

console.log(`Answer: '${solveProblem(actions)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
    // [1/7] Essai ! Ton équipe marque 5 points !
    // [2/7] Transformation ! Ton équipe marque 2 points !
    // [3/7] On indique une transformation mais il n'y a pas eu d'essai avant, ça ne compte pas donc !
    // [4/7] Pénalité ! Ton équipe marque 3 points !
    // [5/7] Essai ! Ton équipe marque 5 points !
    // [6/7] Essai ! Ton équipe marque 5 points !
    // [7/7] Transformation ! Ton équipe marque 2 points !


    const actions = 'ETTPEET';

    const expected = '22'

    const result = solveProblem(actions);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit RUGBY_2')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: '52aa1ce806ccb57ce8be9807de685eee69fe4740b2d30f448eec7bc08bba17a7768f52bc10a5c46e'"
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
