init();
test();

// Challenge variables
const logs = 'WDDENWHNSPSNNCCCNWWWWWWSEWEWWPWPWSDSSNEWH';
const positionX = 13;
const positionY = 65;


function solveProblem(positionX, positionY, logs) {
    const N = [...logs].filter(e => e === 'N').length
    const S = [...logs].filter(e => e === 'S').length
    const E = [...logs].filter(e => e === 'E').length
    const W = [...logs].filter(e => e === 'W').length

    const dx = E - W
    const dy = N - S

    const xf = positionX - dx
    const yf = positionY - dy

    return xf + "_" + yf
}

console.log(`Answer: '${solveProblem(positionX, positionY, logs)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    const positionX = 78;
    const positionY = 59;
    const logs = 'HEWSCSSWDWW';

    const expected = '81_62'

    const result = solveProblem(positionX, positionY, logs);
    if (result !== expected) {
        throw new Error(`Expected ${expected}, got ${result}`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: '1c33176c88eae5c914338e3e99112689288f9f442fb3f476da2229fa4e2acdda26ff72f5926be5dd'"
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
