init();
test();

// Challenge variables
{{.ChallengeVariables }}

function solveProblem({{.ChallengeParams}}) {
    return "";
}

console.log(`Answer: '${solveProblem({{.ChallengeParams}})}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    {{.ChallengeDemoSteps}}

    {{.ChallengeTestVariables}}
    const expected = {{.ChallengeTestExpectedValue}}

    const result = solveProblem({{.ChallengeParams}});
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit {{.ChallengeCode}}')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: '{{.ChallengeToken}}'"
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
