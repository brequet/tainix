init();
test();

// Challenge variables
const kids = ['Rachida_4', 'Noe_8', 'Emma_3', 'Raphael_8', 'Thomas_9', 'Aaron_6', 'Lea_9', 'Rose_1', 'Kevin_9', 'Leon_9', 'Emma_1', 'Alix_6', 'John_8', 'Juliette_9', 'Audrey_9', 'Anna_5', 'Lina_10', 'Icham_5', 'Ambre_9'];
const fear = 7;
const time = 38;


function solveProblem(kids, fear, time) {
    res = ""
    let t = 0
    for (let i = 0; i < kids.length; i++) {
        let [name, f] = kids[i].split("_")
        r = f < fear ? 3 : 5
        if (t + r > time) break
        t += r
        if (f < fear) res += name[0]
    }

    return res.length > 0 ? res : "GRINCH"
}

console.log(`Answer: '${solveProblem(kids, fear, time)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
    // [1/7] Tom a été effrayé(e).
    // [2/7] Tiago n'a pas été effrayé(e).
    // [3/7] Hugo a été effrayé(e).
    // [4/7] Mael a été effrayé(e).
    // [5/7] Leon a été effrayé(e).
    // [6/7] Kendji n'a pas été effrayé(e).
    // [7/7] Paul n'a pas été effrayé(e).


    const kids = ['Tom_1', 'Tiago_9', 'Hugo_3', 'Mael_5', 'Leon_5', 'Kendji_10', 'Paul_8'];
    const fear = 7;
    const time = 35;

    const expected = 'THML'

    const result = solveProblem(kids, fear, time);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit NOEL_2023_2')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: '1d04f2b185401bdf84d97bb5b195e1168e1b9abe3352e6371c7225bb98dc14b13c4597826bd5f1cc'"
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
