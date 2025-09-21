init();
test();

// Challenge variables
const repartition = ['1:364', '2:364', '3:52', '4:390', '5:78', '6:338', '7:182', '8:208', '9:494'];
const positions = ['1L', '5O', '4U', '6Z', '6K', '2I', '1T', '3F', '5R', '8X', '1L', '2L', '3P', '2B', '2H', '1T', '4R'];


function solveProblem(repartition, positions) {
    let p = repartition.map(e => parseInt(e.split(":")[1]) / 26)
    return positions.map(e => p[parseInt(e[0]) - 1]).sumUp()
}

console.log(`Answer: '${solveProblem(repartition, positions)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
    // [1/9] Le requin pointe le bout de son aileron dans le couloir 4 et y dévore 17 athlètes.
    // [2/9] Le requin pointe le bout de son aileron dans le couloir 3 et y dévore 13 athlètes.
    // [3/9] Le requin pointe le bout de son aileron dans le couloir 5 et y dévore 11 athlètes.
    // [4/9] Le requin pointe le bout de son aileron dans le couloir 4 et y dévore 17 athlètes.
    // [5/9] Le requin pointe le bout de son aileron dans le couloir 2 et y dévore 2 athlètes.
    // [6/9] Le requin pointe le bout de son aileron dans le couloir 3 et y dévore 13 athlètes.
    // [7/9] Le requin pointe le bout de son aileron dans le couloir 6 et y dévore 17 athlètes.
    // [8/9] Le requin pointe le bout de son aileron dans le couloir 9 et y dévore 7 athlètes.
    // [9/9] Le requin pointe le bout de son aileron dans le couloir 6 et y dévore 17 athlètes.


    const positions = ['4G', '3G', '5E', '4I', '2D', '3R', '6U', '9K', '6K'];
    const repartition = ['1:312', '2:52', '3:338', '4:442', '5:286', '6:442', '7:338', '8:468', '9:182'];

    const expected = '114'

    const result = solveProblem(repartition, positions);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit SHARK_1')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: '07e8b689bb9db30a81f1370679f4effeff8ea6a069d3db7304212ac7f39245b5766e282a1cb64ea7'"
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
