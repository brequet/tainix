init();
test();

// Challenge variables
const piments = ['piment-carolina-reaper:3', 'piment-anaheim:12', 'piment-komodo-dragon:3', 'poivron:11', 'piment-carolina-reaper:2', 'pepper-x:2', 'cayenne:19', 'piment-scotch-bonnet:6', 'poivron:20', 'piment-cayenne-thailandais:11', 'piment-anaheim:17', 'cayenne:15', 'piment-7-pot-douglah:4', 'piment-7-pot-douglah:2', 'pepper-x:2', 'piment-bhut-jolokia:5', 'piment-cayenne-thailandais:18'];
const grammes = 760;


function solveProblem(piments, grammes) {
    const data = {
        "poivron": 0,
        "piment-anaheim": 1500,
        "piment-poblano": 1500,
        "piment-banane": 250,
        "piment-cubanelle": 550,
        "jalapeno": 5250,
        "piment-serrano": 16500,
        "cayenne": 40000,
        "piment-tabasco": 40000,
        "piment-cayenne-thailandais": 75000,
        "piment-madagascar": 125000,
        "piment-habanero": 225000,
        "piment-scotch-bonnet": 225000,
        "piment-bhut-jolokia": 950000,
        "piment-7-pot-douglah": 1400000,
        "piment-komodo-dragon": 1800000,
        "piment-trinidad-moruga-scorpion": 1600000,
        "piment-carolina-reaper": 1800000,
        "piment-dragons-breath": 2480000,
        "pepper-x": 3180000,
    }
    return piments.map(e => {
        let [p, w] = e.split(":")
        return Math.ceil(data[p] * parseInt(w) / grammes)
    })
        .sumUp()
}

console.log(`Answer: '${solveProblem(piments, grammes)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
    // [1/5] Les 16 g de "piment-serrano" rapportent 858 pts sur l'échelle de Scoville.
    // [2/5] Les 11 g de "piment-serrano" rapportent 590 pts sur l'échelle de Scoville.
    // [3/5] Les 2 g de "piment-carolina-reaper" rapportent 11689 pts sur l'échelle de Scoville.
    // [4/5] Les 3 g de "piment-dragons-breath" rapportent 24156 pts sur l'échelle de Scoville.
    // [5/5] Les 12 g de "piment-tabasco" rapportent 1559 pts sur l'échelle de Scoville.


    const piments = ['piment-serrano:16', 'piment-serrano:11', 'piment-carolina-reaper:2', 'piment-dragons-breath:3', 'piment-tabasco:12'];
    const grammes = 308;

    const expected = '38852'

    const result = solveProblem(piments, grammes);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit SCOVILLE_1')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: '05e2263492b8d522b9eccfba3a585d989ce1bed9eaec69bfdaaf212fb6c1ca842e26d065a86b6cd0'"
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
