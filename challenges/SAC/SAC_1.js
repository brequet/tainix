init();
test();

// Challenge variables
const sac = 861;
const objets = [78, 69, 70, 39, 29, 38, 54, 55, 59, 61, 51, 11, 65, 74, 84, 76, 33, 53, 67, 85, 16, 40, 80, 86, 44, 41, 23, 77, 21, 79, 72, 30, 75, 58, 89, 82, 15, 37, 48, 19, 73, 43, 62, 20, 68, 45, 42, 71, 52, 81, 46, 14];


function solveProblem(sac, objets) {
    let remainingSize = sac
    sorted = objets.sortDesc().slice(0, 10).concat(objets.sortAsc().slice(0, 10)).log()
    let i = 0
    while (remainingSize > 0) {
        if (remainingSize < sorted[i]) break
        cl(i, objets[i], remainingSize)
        remainingSize -= sorted[i]
        i++
    }
    return sac - remainingSize;
}

console.log(`Answer: '${solveProblem(sac, objets)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    const sac = 962;
    const objets = [87, 30, 15, 44, 70, 86, 29, 73, 33, 69, 82, 64, 80, 38, 14, 63, 53, 31, 58, 52, 67];

    const expected = '931'

    const result = solveProblem(sac, objets);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit SAC_1')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: 'd8ef3d263896d016af640ccf3422aeb8fcc6fafc958ec21642846c9872f3aac50bd6f2acbab69407'"
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
