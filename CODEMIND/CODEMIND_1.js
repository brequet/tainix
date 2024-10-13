init();
test();

// Challenge variables
const positives = ['Joie', 'Euphorie', 'Gratitude', 'Affection'];
const negatives = ['Frustration', 'Culpabilité', 'Stress', 'Impatience'];
const emotions = ['Joie', 'Frustration', 'Neutralité', 'Gratitude', 'Réalisme', 'Affection', 'Gratitude', 'Réalisme', 'Gratitude', 'Gratitude', 'Réalisme', 'Impatience', 'Concentration', 'Gratitude', 'Réalisme', 'Impatience', 'Réalisme', 'Joie', 'Concentration', 'Gratitude', 'Euphorie', 'Stress', 'Frustration'];


function solveProblem(positives, negatives, emotions) {
    return `${emotions.filter(e => positives.includes(e)).length}_${emotions.filter(e => negatives.includes(e)).length}`
}

console.log(`Answer: '${solveProblem(positives, negatives, emotions)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
    // [1/6] Optimisme est une émotion positive.
    // [2/6] Dégoût est une émotion négative.
    // [3/6] Indifférence est une émotion négative.
    // [4/6] Dégoût est une émotion négative.
    // [5/6] Indifférence est une émotion négative.
    // [6/6] Dégoût est une émotion négative.


    const positives = ['Optimisme', 'Espoir'];
    const negatives = ['Dégoût', 'Indifférence'];
    const emotions = ['Optimisme', 'Dégoût', 'Indifférence', 'Dégoût', 'Indifférence', 'Dégoût'];

    const expected = '1_5'

    const result = solveProblem(positives, negatives, emotions);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit CODEMIND_1')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: '71be30bb0c8bfecb4d701835f0f05eb273ac34bf14803f8c7f253f039e6b068ab0f37eaca43e1fdd'"
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
