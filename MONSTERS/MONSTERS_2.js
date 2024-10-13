init();
test();

// Challenge variables
const monsters = ['Pela77:8:3W6', 'Drex79:2:3R9', 'Plor73:9:3G6', 'Vrip43:6:3F3', 'Luno49:3:2R5', 'Zorp57:9:2F8', 'Flix82:5:2F3', 'Clur53:4:2R9', 'Vlox57:9:4F3', 'Moxa59:1:3W7', 'Drex81:9:3F7', 'Sliz56:5:4R4', 'Vexo20:6:4G6', 'Plor10:3:2F3', 'Qubo81:6:3F2', 'Prio17:6:3F7', 'Plip53:1:3F8', 'Frez29:5:2G3', 'Grib13:7:4G6', 'Plor18:1:3G7', 'Kron70:7:3W5'];
const foods = 'R5G6R8G2G6R1G3R5G8W6F5W4W7G9F6G3W5R8W1R4F6G9R2G9R1W4R2R1W8F5F7G5R3F4F2';


function solveProblem(monsters, foods) {
    let m = {}
    monsters.forEach(e => {
        let [name, w, f] = e.split(":")
        m[name] = {
            w: parseInt(w),
            a: parseInt(f[0]), b: parseInt(f[2]), t: f[1]
        }

    })
    foods.match(/\w\d/g).forEach(food => {
        [type, count] = food.split("")
        sel = m.toEntries().filter(e => e[1].t == type)
            .sort((a, b) => -b[1].w + a[1].w)[0]
        m[sel[0]].w += sel[1].a * count + sel[1].b
    })

    return m.toEntries().sort((a, b) => b[1].w - a[1].w).map(e => e[0] + ":" + e[1].w)[0];
}

console.log(`Answer: '${solveProblem(monsters, foods)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
    // [1/21] W => C'est Grib30 qui mange. Il passe de 9 à 45.
    // [2/21] F => C'est Sliz84 qui mange. Il passe de 2 à 17.
    // [3/21] F => C'est Telo33 qui mange. Il passe de 5 à 33.
    // [4/21] F => C'est Sliz84 qui mange. Il passe de 17 à 40.
    // [5/21] W => C'est Grib30 qui mange. Il passe de 45 à 53.
    // [6/21] R => C'est Vizo77 qui mange. Il passe de 7 à 16.
    // [7/21] W => C'est Grib30 qui mange. Il passe de 53 à 77.
    // [8/21] R => C'est Zela52 qui mange. Il passe de 9 à 32.
    // [9/21] G => C'est Drip49 qui mange. Il passe de 1 à 17.
    // [10/21] W => C'est Grib30 qui mange. Il passe de 77 à 117.
    // [11/21] F => C'est Telo33 qui mange. Il passe de 33 à 65.
    // [12/21] R => C'est Vizo77 qui mange. Il passe de 16 à 27.
    // [13/21] G => C'est Kron18 qui mange. Il passe de 3 à 24.
    // [14/21] W => C'est Grib30 qui mange. Il passe de 117 à 157.
    // [15/21] G => C'est Frez17 qui mange. Il passe de 5 à 18.
    // [16/21] F => C'est Sliz84 qui mange. Il passe de 40 à 71.
    // [17/21] W => C'est Grib30 qui mange. Il passe de 157 à 197.
    // [18/21] W => C'est Grib30 qui mange. Il passe de 197 à 233.
    // [19/21] G => C'est Prio82 qui mange. Il passe de 6 à 24.
    // [20/21] R => C'est Vizo77 qui mange. Il passe de 27 à 36.
    // [21/21] Le plus gros monstre à la fin est Grib30 avec un poids de 233.


    const foods = 'W8F2F5F4W1R4W5R9G5W9F6R5G4W9G1F6W9W8G4R4';
    const monsters = ['Grib30:9:4W4', 'Zela52:9:2R5', 'Drip49:1:2G6', 'Telo33:5:4F8', 'Frez17:5:4G9', 'Kron18:3:3G9', 'Sliz84:2:4F7', 'Vizo77:7:2R1', 'Prio82:6:4G2'];

    const expected = 'Grib30:233'

    const result = solveProblem(monsters, foods);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit MONSTERS_2')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: 'd56039b5ca4d5e81ca0a48acd6a2434917b75e8e097357c796a9a0b92a7a713e9284822a869190ab'"
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
