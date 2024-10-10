init();
test();

// Challenge variables
const ennemis = ['x:32 pv:106', 'x:36 pv:72', 'x:14 pv:24', 'x:8 pv:23', 'x:17 pv:25', 'x:37 pv:93', 'x:18 pv:98', 'x:6 pv:125', 'x:10 pv:56', 'x:16 pv:16', 'x:20 pv:24'];


function solveProblem(ennemis) {
    ennemis.map(e => e.split(" "))
        .map(e => { return { x: e[0].split(":")[1], pv: e[1].split(":")[1] } })
        .sort((a, b) => a.x - b.x)
        .log()
    return "";
}

console.log(`Answer: '${solveProblem(ennemis)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
    // [1/10] Je me Déplace de 13 pour viser l'ennemi à la position 13
    // [2/10] Je fais Feu 2 fois pour vaincre l'ennemi qui a 13 PV
    // [3/10] Je me Déplace de 1 pour viser l'ennemi à la position 14
    // [4/10] Je fais Feu 2 fois pour vaincre l'ennemi qui a 12 PV
    // [5/10] Je me Déplace de 7 pour viser l'ennemi à la position 21
    // [6/10] Je fais Feu 1 fois pour vaincre l'ennemi qui a 10 PV
    // [7/10] Je me Déplace de 6 pour viser l'ennemi à la position 27
    // [8/10] Je fais Feu 5 fois pour vaincre l'ennemi qui a 46 PV
    // [9/10] Je me Déplace de 12 pour viser l'ennemi à la position 39
    // [10/10] Je fais Feu 2 fois pour vaincre l'ennemi qui a 19 PV


    const ennemis = ['x:13 pv:13', 'x:14 pv:12', 'x:39 pv:19', 'x:27 pv:46', 'x:21 pv:10'];

    const expected = 'DDDDDDDDDDDDDFFDFFDDDDDDDFDDDDDDFFFFFDDDDDDDDDDDDFF'

    const result = solveProblem(ennemis);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit BATMAN_1')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: 'f0566050d4b84afe911137f2c76ea7518768ed2f83492f2f61b319c0eebb54aed7dc3ccada325f99'"
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
