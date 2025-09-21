init();
test();

// Challenge variables
const points = 'DNNDNDNDNNDNNNNNNDNDNNNDNDNNNNNDNNNNDNNNDDDNDNDDNDDDNDDNNNDNNDDNDNDNDNNDNNNDNDDDDDNDDDDNNDDNDNDNNNNNNNNDNNNNNNNNNNDNNNNNNNNDND';


function solveProblem(points) {
    let [jeux1, jeux2, point1, point2] = [0, 0, 0, 0]
    for (let i = 0; i < points.length; i++) {
        let char = points[i]
        if (char == 'D') {
            point1++
        } else {
            point2++
        }

        if (point1 == 4) {
            jeux1++
            cl("D gagne le jeu, il y a", [jeux1, jeux2].join(":"))
            point1 = 0
            point2 = 0
        }
        if (point2 == 4) {
            jeux2++
            cl("N gagne le jeu, il y a", [jeux1, jeux2].join(":"))
            point1 = 0
            point2 = 0
        }
        if (jeux1 == 6 || jeux2 == 6) {
            cl("SET GAGNE", jeux1, jeux2)
            jeux1 = 0
            jeux2 = 0
            point1 = 0
            point2 = 0
        }
    }
    let corres = {
        0: 0,
        1: 15,
        2: 30,
        3: 40
    }
    return [jeux1, jeux2, corres[point1], corres[point2]].join(":")
}

console.log(`Answer: '${solveProblem(points)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
    // [1/4] Le joueur N gagne le JEU, il y a 0:1
    // [2/4] Le joueur D gagne le JEU, il y a 1:1
    // [3/4] Le joueur D gagne le JEU, il y a 2:1
    // [4/4] Le joueur D gagne le JEU, il y a 3:1


    const points = 'NDNNNDDDNNNDDNDDNDNDDNDDDD';

    const expected = '3:1:30:0'

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
        "CHALLENGE_TOKEN: '69860bc7b4396d724e111bc7058daf17b2eed40210bd8bd33a33e57be458be022f80c2642e09249e'"
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

    Array.prototype.max = function () {
        return this.sortDesc()[0]
    }

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

function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}
