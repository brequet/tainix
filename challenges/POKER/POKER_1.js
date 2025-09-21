init();
test();

// Challenge variables
const mains = ['dame as roi 5 3', '4 10 8 roi roi', '6 as 3 10 valet', 'as 8 as 9 dame', '5 as valet 2 7', '10 valet valet 8 as', '6 10 as 5 9', '10 7 2 6 4', '4 4 5 10 valet', 'valet 10 valet 4 2', 'as dame as 5 6', '8 3 6 roi valet', 'dame 7 4 6 valet', 'valet dame 10 6 5', '6 as 3 4 roi', '10 7 9 as roi', '6 7 4 as 5', '2 8 5 7 9', 'valet 2 5 2 8', '2 as valet dame valet', 'valet 8 8 8 8', 'valet as as 3 7', '9 roi 2 2 as'];

function solveProblem(mains) {
    return mains.map(main => main.split(" ").reduce((acc, cur) => {
        if (!(cur in acc)) acc[cur] = 0;
        acc[cur]++;
        return acc;
    }, {})
    )
        .map(m => {
            const sorted = m.toSortedDescList()
            let isCarre = sorted[0][1] == 4
            let isFull = sorted[0][1] == 3 && sorted[1][1] == 2
            let isBrelan = sorted[0][1] == 3 && sorted[1][1] == 1
            let doublePair = sorted[0][1] == 2 && sorted[1][1] == 2
            let onePair = sorted[0][1] == 2

            if (isCarre) return 200

            if (isFull) return 50

            if (isBrelan) return 20

            if (doublePair) return 10

            if (onePair) return 5

            return 1
        })
        .log()
        .sumUp()
}

console.log(`Answer: '${solveProblem(mains)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
    // [1/8] La main (3 valet 8 4 6) contient "rien" et rapporte donc 1 pt(s).
    // [2/8] La main (3 10 10 3 9) contient "2 paires" et rapporte donc 10 pt(s).
    // [3/8] La main (3 roi 9 8 9) contient "1 paire" et rapporte donc 5 pt(s).
    // [4/8] La main (valet 8 dame 4 5) contient "rien" et rapporte donc 1 pt(s).
    // [5/8] La main (dame 9 dame 9 9) contient "full" et rapporte donc 50 pt(s).
    // [6/8] La main (valet 4 roi 6 dame) contient "rien" et rapporte donc 1 pt(s).
    // [7/8] La main (4 2 valet valet 4) contient "2 paires" et rapporte donc 10 pt(s).
    // [8/8] La main (valet 6 2 2 roi) contient "1 paire" et rapporte donc 5 pt(s).


    const mains = ['3 valet 8 4 6', '3 10 10 3 9', '3 roi 9 8 9', 'valet 8 dame 4 5', 'dame 9 dame 9 9', 'valet 4 roi 6 dame', '4 2 valet valet 4', 'valet 6 2 2 roi'];

    const expected = '83'

    const result = solveProblem(mains);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit POKER_1')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: '4cd9f5467c09539e17d5f3079040d3591e602886945625ff76b928284493ace42557c225541ba64d'"
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
