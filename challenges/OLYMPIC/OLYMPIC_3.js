init();
test();

// Challenge variables
const notes = [6, 9.5, 6.5, 9, 8.5, 8.5, 6.5, 3, 9.5];
const difficulty = 4.3;


function solveProblem(notes, difficulty) {
    let ns = ((notes) => {
        if (notes.length == 5) return notes.slice(1, 4)
        if (notes.length == 7) return notes.slice(2, 5)
        if (notes.length == 9) return notes.slice(3, 6)
    })(notes.sortDesc()).log()
    return (ns.sumUp() / 3 * difficulty).toFixed(2);
}

console.log(`Answer: '${solveProblem(notes, difficulty)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
    // [1/3] Il y a 5 notes, on enlève donc la plus basse et la plus haute.
    // [2/3] Les notes retenues pour la moyenne sont : 7 - 7.5 - 8.5
    // [3/3] On oublie pas de multiplier par le degré de difficulté !


    const notes = [8.5, 7.5, 9.5, 7, 4];
    const difficulty = 4.3;

    const expected = '32.97'

    const result = solveProblem(notes, difficulty);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit OLYMPIC_3')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: 'd5352105897ee1743cf20becae20cc209e86e13ee63386109c2efe1a4b06928c37e40c72789b1347'"
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
