init();
test();

// Challenge variables
const planetes = ['EJV155:continental, continental cool, pluvieux', 'AME517:chaud', 'FWF952:tropical jungle', 'GGH270:continental', 'FQY639:aride sans vie', 'OWA838:tropical jungle', 'ZOI594:tropical jungle', 'ITS464:continental cool, polaire glacial, pluvieux averses, aride', 'MPK997:aride sans vie, continental cool, chaud', 'KZR297:continental', 'NWP485:aride', 'VTS960:continental', 'XGR567:pluvieux averses', 'APP634:continental cool', 'ELN373:humide', 'ITS239:continental cool', 'EVV714:froid, polaire glacial', 'WLU214:continental', 'PFO104:froid, pluvieux, polaire, aride', 'ILS623:chaud fournaise', 'QEU311:humide et moite', 'AEH122:humide, froid venteux', 'OHR025:aride', 'STS141:continental cool', 'WJC568:tropical'];
const climat = 'continental';


function solveProblem(planetes, climat) {
    return planetes.map(e => e.split(":"))
        .map(e => { return { name: e[0], climats: e[1].split(', ') } })
        .filter(e => e.climats.includes(climat))
        .map(e => e.name.split(/\d/)[0])
        .join('')
        ?? 'NOPLANET'
}

console.log(`Answer: '${solveProblem(planetes, climat)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
    // [1/1] La planète SII582 a le climat correspondant.


    const climat = 'pluvieux';
    const planetes = ['XXT866:continental', 'UIE359:aride sans vie, polaire, froid venteux', 'KMA101:polaire', 'QRP374:humide, froid venteux, tropical jungle', 'WXX780:polaire, aride sans vie, tropical jungle, chaud fournaise', 'PUZ490:chaud, humide', 'UAA487:chaud fournaise', 'ALX215:chaud', 'IVC951:polaire', 'UMV458:froid', 'ROP329:continental, aride', 'SII582:humide, pluvieux', 'XSN891:aride'];

    const expected = 'SII'

    const result = solveProblem(planetes, climat);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit EXPLORER_1')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: 'a2e5301603b68fcc54455d4f4398a1f57b08e0fb60ab8752f80a3b118f502028a1dcea863127e5eb'"
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

    cl = console.log
}

/**
 * Predefined utility functions
 */

function stringToDictOfCharOccurrences(str) {
    return str.split("").reduce((acc, cur) => {
        if (!(cur in acc)) acc[cur] = 0;
        acc[cur]++;
        return acc;
    }, {});
}
