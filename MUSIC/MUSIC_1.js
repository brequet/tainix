init();
test();

// Challenge variables
const notes = ['Mi', 'Si', 'Re', 'La', 'Fa', 'Sol', 'Do'];
const music = 'Si,Si,Sol,Re,Do,Do,Sol,Si,Re,Sol,La,Sol,La,La,Do,La,Re,La,Mi,Si,Re,Sol,Si,Sol,Re,Sol,Si,La,Si,Sol,Do,Si,Mi,La,Re,Mi,Sol,Mi,Si,Sol,Si';


function solveProblem(notes, music) {
    occ = music.toDictOfCharOccurrences(",")
    return notes.map(note => occ[note] ?? 0).join(",")
}

console.log(`Answer: '${solveProblem(notes, music)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
    // [1/7] Il y a 2 Fa.
    // [2/7] Il y a 2 Do.
    // [3/7] Il y a 2 Mi.
    // [4/7] Il y a 0 Sol.
    // [5/7] Il y a 2 Re.
    // [6/7] Il y a 1 Si.
    // [7/7] Il y a 2 La.


    const notes = ['Fa', 'Do', 'Mi', 'Sol', 'Re', 'Si', 'La'];
    const music = 'La,Fa,La,Mi,Re,Do,Mi,Do,Si,Fa,Re';

    const expected = '2,2,2,0,2,1,2'

    const result = solveProblem(notes, music);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit MUSIC_1')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: '4adbbd7595de809135bd9aec6007a2a10c5f1ab47578911e7c63fd5bf934dadae94748e47d8271c3'"
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
