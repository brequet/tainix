init();
test();

// Challenge variables
const events = [3, 3, 12, 2, 2, 6, 8, 4, 4, 6, 14, 12, 10, 12, 9, 11, 10, 10, 4, 3, 3];


function solveProblem(events) {
    res = ""
    score = 0
    for (let i = 0; i < events.length; i++) {
        score += events[i]
        if (score >= 20) {
            res += 'Y'
            score -= 12
        } else if (score >= 15) {
            res += 'M'
            score -= 9
        } else if (score >= 10) {
            res += 'R'
            score -= 6
        }
    }
    return res;
}

console.log(`Answer: '${solveProblem(events)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
    // [1/7] Niveau émotionnel à 0.
    // [2/7] Niveau émotionnel à 11 je démarre une séance de RESPIRATION, je redescends à 5.
    // [3/7] Niveau émotionnel à 7 tout va bien :)
    // [4/7] Niveau émotionnel à 15 je démarre une séance de MEDITATION, je redescends à 6.
    // [5/7] Niveau émotionnel à 21 je démarre une séance de YOGA, je redescends à 9.
    // [6/7] Niveau émotionnel à 14 je démarre une séance de RESPIRATION, je redescends à 8.
    // [7/7] Niveau émotionnel à 18 je démarre une séance de MEDITATION, je redescends à 9.


    const events = [11, 2, 8, 15, 5, 10];

    const expected = 'RMYRM'

    const result = solveProblem(events);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit CODEMIND_2')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: '36421e322ba6a737bcee8f86ae45690ba850d8def819a0a6c91255ecd50db74e3cb45ddd7a07486d'"
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
