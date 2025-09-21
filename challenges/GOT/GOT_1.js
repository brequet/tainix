init();
test();

// Challenge variables
const armee = 6171;


function solveProblem(armee) {
    let dragonCount = Math.trunc(armee / (3 * 1000))
    let dothrakiCount = Math.min(200, Math.trunc(((armee - dragonCount * 1000) / 2) / (15)))
    let rest = armee - dragonCount * 1000 - dothrakiCount * 15
    return `${dragonCount}_${dothrakiCount}_${rest}`;
}

console.log(`Answer: '${solveProblem(armee)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
    // [1/3] Daenerys fait appel à 2 dragon(s) pour combattre 2000 vilains tout moches. Il reste 6194 vilains tout moches à combattre.
    // [2/3] Daenerys convoque 200 immaculé(s) pour combattre 3000 vilains tout hideux. Il reste 3194 vilains tout hideux à combattre.
    // [3/3] Daenerys sollicite 3194 dothraki(s) pour combattre 3194 vilains tout laids. Il ne reste plus personne à combattre ! VICTOIRE !


    const armee = 6168;

    const expected = '2_138_2098'

    const result = solveProblem(armee);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit GOT_1')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: 'c8a42015406c16f2c3643eb1af024d1f03da897fe5f18456cea607ca776c2fbc33a8fab89ef69760'"
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
