init();
test();

// Challenge variables
const points = 'NDDDNNDNNDDDNDDDNDDDNDDNNDNNNDDNDNNDNNDNNDDNDDDNNDDDDDNNNDNNDDDNNDDDNDNDNDDNDDDDNDDDDNNDDNNDNDNDDNDDDNNDNNNNNDDDDDNNDNDDNDNNNNDNDDDDNNDNNDN';


function solveProblem(points) {
    return "";
}

console.log(`Answer: '${solveProblem(points)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
	// [1/5] Le joueur D gagne le JEU, il y a 1:0
	// [2/5] Le joueur D gagne le JEU, il y a 2:0
	// [3/5] Le joueur N gagne le JEU, il y a 2:1
	// [4/5] Le joueur D gagne le JEU, il y a 3:1
	// [5/5] Le joueur D gagne le JEU, il y a 4:1


    const points = 'DDNNDDDNDDDNDNDNNDDNDDDDDDDNNND';

    const expected = '4:1:30:40'

    const result = solveProblem(points);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit TENNIS_1')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: '979cbe238f091f4eff44c959fa382c23dbb9dde64d2cd28ec99118eaa96418519e50b355db9b5d73'"
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
