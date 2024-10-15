init();
test();

// Challenge variables
const serial = '196739431335';


function solveProblem(serial) {
    return serial.split("").map(e => e % 2 === 0 ? 'R' : 'L').join("")
}

console.log(`Answer: '${solveProblem(serial)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    const serial = '944141222';

    const expected = 'LRRLRLRRR'

    const result = solveProblem(serial);
    if (result !== expected) {
        console.log(`WRONG RESULT: Expected ${expected}, got ${result}`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit GREENOID_1')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: '9516c64a6530dea08a63817ae180c45e2eaa7ca09a8da42026f5fa95b5922f3feedcde78ccde3cb7'"
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
