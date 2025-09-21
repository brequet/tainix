init();
test();

// Challenge variables
const shapes = ['square_7', 'square_7', 'hexagon_5', 'triangle_8', 'triangle_3', 'square_8', 'pentagon_5', 'pentagon_5', 'square_6', 'hexagon_7', 'pentagon_4', 'pentagon_2', 'triangle_3', 'square_5', 'square_6', 'pentagon_6', 'pentagon_4'];


function solveProblem(shapes) {

    return shapes.map(shape => {
        [s, size] = shape.split('_')
        return {
            'triangle': 3,
            'square': 4,
            'pentagon': 5,
            'hexagon': 6,
        }[s] * size
    }).sumUp()
}

console.log(`Answer: '${solveProblem(shapes)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
    // [1/4] Un héxagone de côté 3 a un périmètre de 18.
    // [2/4] Un triangle de côté 9 a un périmètre de 27.
    // [3/4] Un héxagone de côté 8 a un périmètre de 48.
    // [4/4] Un héxagone de côté 7 a un périmètre de 42.


    const shapes = ['hexagon_3', 'triangle_9', 'hexagon_8', 'hexagon_7'];

    const expected = '135'

    const result = solveProblem(shapes);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit GEOMETRY_1')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: '5ebcc77a0869c2c66a146974b149c0c156b53a5bbf82982fc481c849bb8b2c2e763feeddcbe5f14a'"
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

    Object.prototype.toEntries = function () {
        return Object.entries(this)
    }

    Array.prototype.arrayOfPairToDict = function () {
        return arrayOfPairToDict(this);
    };

    String.prototype.toDictOfCharOccurrences = function (splitter = "") {
        return stringToDictOfCharOccurrences(this, splitter);
    };

    cl = console.log
}

/**
 * Predefined utility functions
 */

function stringToDictOfCharOccurrences(str, splitter = "") {
    return str.split(splitter).reduce((acc, cur) => {
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
