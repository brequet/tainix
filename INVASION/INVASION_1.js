init();
test();

// Challenge variables
const waves = ['DASSASDSSS', 'DADADDASAAB', 'AAABAAABDD', 'DBAABBSDSDBB', 'BSADBDSASASABS', 'DABBBDSABBS', 'BDBSBDSBBSDD', 'ADDBSDAADADB', 'DAABDDASDDAB', 'ABDSSADDSA', 'BBDSBBABDSS', 'BAADAASDSADB', 'DSADSBBSBAAS', 'ASDSDBABBDSAD', 'DDSBAADDDADS', 'BDDBABDBAAD', 'ASBABDSDDAA', 'SASASADBDB', 'DDDDBSDDDDDA', 'DSBABAABBBBS', 'SDDABBBAASBAAS', 'ASSDDSASDDA'];


function solveProblem(waves) {
    return waves.map(wave => {
        let { A, D, S, B } = wave.toDictOfCharOccurrences()
        let bonus = wave.match(/[A]{2,}|[B]{2,}/g)?.map(e => parseInt(e.length) - 1)?.sumUp() ?? 0
        cl(wave, bonus, A, D, S, B)
        return parseInt(A ?? 0) * 5 + parseInt(D ?? 0) * 3 + parseInt(S ?? 0) * 2 + parseInt(B ?? 0) * 8 + bonus
    })
        .max()
}

console.log(`Answer: '${solveProblem(waves)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
    // [1/7] Puissance de la vague DSASDDDDBBS : 42 +1
    // [2/7] Puissance de la vague DDBBDBSBADBS : 61 +1
    // [3/7] Puissance de la vague ASABSADSDAB : 48
    // [4/7] Puissance de la vague ABBSBDBADBS : 60 +1
    // [5/7] Puissance de la vague BDBSABSADAAAS : 61 +2
    // [6/7] Puissance de la vague AAAABBDSSBDS : 56 +4
    // [7/7] Puissance de la vague SBDASSSBSS : 36


    const waves = ['DSASDDDDBBS', 'DDBBDBSBADBS', 'ASABSADSDAB', 'ABBSBDBADBS', 'BDBSABSADAAAS', 'AAAABBDSSBDS', 'SBDASSSBSS'];

    const expected = '63'

    const result = solveProblem(waves);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit INVASION_1')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: 'b826dada2775705b3d335957f31701b5cb1068a098e9e3d4d71ff9a4e046f0222549e7f75d15fd13'"
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
