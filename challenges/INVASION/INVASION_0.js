init();
test();

// Challenge variables
const waves = ['SBSBBSSBAADBASD', 'SSSDSADABDDBSS', 'AAASSBSBSBB', 'DSBDASDBABD', 'BAAAASSBDBBAD', 'DADDSSBSBB', 'BDAASSSSDA', 'BSSADAAADDBA', 'BDABSDABBBD', 'BSADADDSAB', 'BDBASSDDSSBB', 'SBSSBBBASDSA', 'DBASABDDBADDB', 'ADASSBBABD', 'DBDBASSABSBD', 'ABASASABSD', 'DSDDASADASAAA', 'BBADDDSBBSA', 'BSBADDSBBSBB', 'ADASAADBBABS', 'BSBDABDSBSAS', 'ASSDSSSAASS', 'BDBDABSBDD'];


function solveProblem(waves) {
    return waves.map(e => e.toDictOfCharOccurrences()['D'] ?? 0).sumUp();
}

console.log(`Answer: '${solveProblem(waves)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
    // [1/10] Il y a 4 défense(s) dans la vague DDBDDSBASAAS
    // [2/10] Il y a 2 défense(s) dans la vague DBASDSBBSAAS
    // [3/10] Il y a 4 défense(s) dans la vague DASBDSDASSABD
    // [4/10] Il y a 1 défense(s) dans la vague SSBBSSDBSSSBBB
    // [5/10] Il y a 5 défense(s) dans la vague SBBDADBBSDABDD
    // [6/10] Il y a 3 défense(s) dans la vague DDBDABAASAA
    // [7/10] Il y a 4 défense(s) dans la vague DDADSSSSDBS
    // [8/10] Il y a 5 défense(s) dans la vague DSDBDAABDDASA
    // [9/10] Il y a 4 défense(s) dans la vague DSBBAAADDBADB
    // [10/10] Il y a 3 défense(s) dans la vague ABDSBADBASD


    const waves = ['DDBDDSBASAAS', 'DBASDSBBSAAS', 'DASBDSDASSABD', 'SSBBSSDBSSSBBB', 'SBBDADBBSDABDD', 'DDBDABAASAA', 'DDADSSSSDBS', 'DSDBDAABDDASA', 'DSBBAAADDBADB', 'ABDSBADBASD'];

    const expected = '35'

    const result = solveProblem(waves);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit INVASION_0')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: '627d9ae9a521ab82be46a34464c7c46060b01f04dd55e32e3bcf3228fbec9cc4f27917f2647060da'"
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
