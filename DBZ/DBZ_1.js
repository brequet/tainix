init();
test();

// Challenge variables
const ennemis = [399, 756, 882, 908, 989, 1022, 1228, 1233, 1335, 1412, 1420, 1421, 1442];
const force_vegeta = 157;


function solveProblem(force_vegeta, ennemis) {
    return "";
}

console.log(`Answer: '${solveProblem(force_vegeta, ennemis)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
	// [1/9] L'adversaire de puissance 221 est trop fort ! Je monte d'un niveau !
	// [2/9] L'adversaire de puissance 221 est finalement défait. La puissance de végéta passe à 366
	// [3/9] L'adversaire de puissance 509 est trop fort ! Je monte d'un niveau !
	// [4/9] L'adversaire de puissance 509 est finalement défait. La puissance de végéta passe à 699
	// [5/9] L'adversaire de puissance 512 est défait facilement. La puissance de végéta passe à 852
	// [6/9] L'adversaire de puissance 1439 est trop fort ! Je monte d'un niveau !
	// [7/9] L'adversaire de puissance 1439 est trop fort ! Je monte d'un niveau !
	// [8/9] L'adversaire de puissance 1439 est trop fort ! Je monte d'un niveau !
	// [9/9] L'adversaire de puissance 1439 est finalement défait. La puissance de végéta passe à 2562


    const ennemis = [221, 509, 512, 1439];
const force_vegeta = 161;

    const expected = '2562'

    const result = solveProblem(force_vegeta, ennemis);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit DBZ_1')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: '955ee6a786f63fdbcc0bd967777571499e0f9e27342a72e52e92e47a4354b76132185d91ca370436'"
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
