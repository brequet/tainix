init();
test();

// Challenge variables
const spells = ['Colalimaflifli', 'Sonokedatrummobi', 'Desboumwadiboumvra', 'Zyricorpubadalima', 'Oqudiyocialima', 'Firiboumfixiowadi', 'Cracorpuboumboumbada', 'Colokoulamamobikeda', 'Endoveraylegratrummobi', 'Craviofinitara', 'Serlegrakoufixio', 'Feralegramusivra', 'Aloviofiaciabada', 'Desproboumpro', 'Ivaviokoufinitum', 'Colofliboumciabada'];


function solveProblem(spells) {
    return spells.map(spell =>
        spell.split('').reduce((acc, cur) => {
            if ('aeyuio'.includes(cur.toLowerCase())) {
                acc['v']++;
            } else {
                acc['c']++;
            }
            return acc;
        }, { c: 0, v: 0, word: spell }))
        .map(s => {
            res = 'aeyuio'.includes(s.word[0].toLowerCase()) ? 10 : 0
            if (s.c > s.v) res += 5
            if (s.c == s.v) res += 10
            if (s.c < s.v) res += 15
            return res
        }).sumUp()

}

console.log(`Answer: '${solveProblem(spells)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
    // [1/5] Le sort Ivafinikedafixiovra vaut 25 pts.
    // [2/5] Le sort Ivawadibadamusfixio vaut 25 pts.
    // [3/5] Le sort Ulucuriwadifixiodina vaut 25 pts.
    // [4/5] Le sort Endocorpumotolimatrum vaut 15 pts.
    // [5/5] Le sort Serviocuriboum vaut 10 pts.


    const spells = ['Ivafinikedafixiovra', 'Ivawadibadamusfixio', 'Ulucuriwadifixiodina', 'Endocorpumotolimatrum', 'Serviocuriboum'];

    const expected = '100'

    const result = solveProblem(spells);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit HARRY_POTTER_2')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: 'ad4355f7568b21cb3bda2885689a22eceeb7a873d422f1208a5dc7bef48d7c3bc4927e1e7b1b9958'"
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
