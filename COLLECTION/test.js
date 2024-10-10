init();
test();

// Challenge variables
const exemplaires = [
    50000, 50000, 50000, 2000, 50000, 50000, 2000, 2000, 2000, 50000, 2000, 2000,
    50000, 2000, 2000, 100, 2000, 2000, 50000, 2000, 50000, 50000, 2000, 2000,
    2000, 2000, 2000, 100, 50000, 2000, 2000, 2000, 50000, 2000, 50000, 50000,
    2000, 2000, 50000, 50000, 2000,
];
const cotes = [
    0.8, 0.6, 0.8, 1, 1, 0.8, 0.8, 0.8, 1, 0.6, 0.6, 0.6, 0.6, 0.8, 0.8, 4, 0.6,
    0.8, 0.8, 0.6, 0.6, 0.6, 1, 0.6, 1.2, 1.2, 0.6, 4, 1, 0.6, 0.6, 1.2, 0.8, 0.8,
    0.8, 0.6, 0.8, 1.2, 0.8, 0.8, 0.6,
];

function solveProblem(exemplaires, cotes) {
    const prixAchat = exemplaires
        .map((e) => (e < 2000 ? 30 : 15))
        .sumUp();
    const prixVente = exemplaires
        .map((e) => (e < 2000 ? 30 : 15))
        .map((e, i) => e * cotes[i])
        .sumUp();
    console.log(prixAchat, prixVente);
    return prixVente - prixAchat;
}

console.log(`Answer: '${solveProblem(exemplaires, cotes)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    const exemplaires = [50000, 2000, 50000, 2000, 2000, 2000, 50000, 2000, 2000, 2000, 50000, 2000, 50000, 500, 2000, 50000, 2000];
    const cotes = [0.8, 1, 0.6, 0.8, 0.8, 0.6, 1, 0.8, 0.8, 0.8, 1, 0.6, 0.6, 1.2, 1, 0.8, 1.2];

    const expected = -36

    const result = solveProblem(exemplaires, cotes);
    if (result !== expected) {
        throw new Error(`Expected ${expected}, got ${result}`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: '4742a30ca352f31a7002737f2a2f9a53eab6a3caf0f47af7ca17b13ed537bc3288df926eeb95ba09'"
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
