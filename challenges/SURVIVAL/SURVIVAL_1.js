init();
test();

// Challenge variables
const islandX = 38;
const islandY = 59;
const planes = ['P:96,87C:ANB', 'P:95,93C:GSU', 'P:100,57C:XCL', 'P:16,89C:JFG', 'P:100,76C:XQO', 'P:12,10C:MXX', 'P:85,92C:RHY', 'P:22,5C:IPX', 'P:8,12C:XNX', 'P:98,98C:KIN'];


function solveProblem(islandX, islandY, planes) {
    return planes.map(e => {
        const [p1, cValue] = e.split('C:');
        const [x, y] = p1.split('P:')[1].split(',');
        return {
            P: {
                x: x,
                y: y
            },
            distanceToIsland: (Math.sqrt(Math.pow(islandX - x, 2) + Math.pow(islandY - y, 2))).toFixed(2),
            C: cValue
        }
    })
        .sort((a, b) => a.distanceToIsland - b.distanceToIsland)
        .log()
        .slice(0, 3)
        .map(e => e.C)
        .join('')
}

console.log(`Answer: '${solveProblem(islandX, islandY, planes)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
    // [1/3] L'avion NEP se trouve à une distance de 37.48 de l'île.
    // [2/3] L'avion BQC se trouve à une distance de 48.1 de l'île.
    // [3/3] L'avion YWG se trouve à une distance de 50.49 de l'île.


    const islandX = 59;
    const islandY = 59;
    const planes = ['P:86,33C:NEP', 'P:40,7C:GFR', 'P:94,92C:BQC', 'P:16,92C:EQW', 'P:52,9C:YWG', 'P:0,87C:MFX', 'P:99,93C:PXC'];

    const expected = 'NEPBQCYWG'

    const result = solveProblem(islandX, islandY, planes);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit SURVIVAL_1')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: 'd91d5c4ae6c70cba6f8dc9c780a963584fc1f5d259ccf446d0aa3a432d8ba2afeb0230a5e27ddde9'"
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

    Array.prototype.arrayOfPairToDict = function () {
        return arrayOfPairToDict(this);
    };

    String.prototype.toDictOfCharOccurrences = function () {
        return stringToDictOfCharOccurrences(this);
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

function arrayOfPairToDict(arrayOfPairs) {
    const dict = {};
    arrayOfPairs.forEach((pair) => {
        const [key, value] = pair;
        dict[key] = value;
    });
    return dict;
}
