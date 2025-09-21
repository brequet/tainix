init();
test();

// Challenge variables
const y = -1;
const moves = ['y:2', 'x:7', 'y:2', 'x:7', 'y:7', 'y:10', 'y:4', 'y:-1', 'y:-10', 'y:6', 'y:9', 'x:5', 'y:5', 'x:-10', 'y:-6', 'y:6', 'y:6', 'x:3', 'x:2', 'y:-3', 'y:9', 'y:-10', 'x:-3', 'x:-5', 'y:-5', 'y:9'];
const names = ['Ambre', 'Anne', 'Catherine', 'John', 'Chloe', 'Stephane', 'Raphael', 'Alix', 'Rachida', 'Amelie', 'Samir', 'Walim'];
const x = 0;


function solveProblem(y, moves, names, x) {
    let { dx, dy } = moves.map(m => m.split(":")).reduce((acc, cur) => {
        if (cur[0] == 'x') acc.dx += parseInt(cur[1])
        if (cur[0] == 'y') acc.dy += parseInt(cur[1])
        return acc
    }, { dx: 0, dy: 0 })
        .log()
    return `SOS:${names.map(n => n[0]).join('')}_PLACE:${x + dx};${y + dy}`;
}

console.log(`Answer: '${solveProblem(y, moves, names, x)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
    // [1/9] Les initiales sont MSAPLJ.
    // [2/9] L'avion démarre en 1;-4
    // [3/9] Déplacement de -8 sur l'axe x.
    // [4/9] Déplacement de 8 sur l'axe y.
    // [5/9] Déplacement de -4 sur l'axe y.
    // [6/9] Déplacement de 6 sur l'axe x.
    // [7/9] Déplacement de 2 sur l'axe x.
    // [8/9] Déplacement de 2 sur l'axe x.
    // [9/9] Déplacement de 4 sur l'axe y.


    const moves = ['x:-8', 'y:8', 'y:-4', 'x:6', 'x:2', 'x:2', 'y:4'];
    const names = ['Martine', 'Samir', 'Anne', 'Pierre', 'Louise', 'Jack'];
    const x = 1;
    const y = -4;

    const expected = 'SOS:MSAPLJ_PLACE:3;4'

    const result = solveProblem(y, moves, names, x);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit CODE_LANTA')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: '303a42d4cb70728f561dc308968d3958cec09ed13d1799f1599e4bc8f20ef00ba438b64b20fc578d'"
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
