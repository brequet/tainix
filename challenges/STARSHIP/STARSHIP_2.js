init();
test();

// Challenge variables
const starship = '0:4';
const meteorites = ['4:0#11', '2:0#17', '4:6#50', '7:3#48', '0:6#48', '6:2#17', '1:4#15'];
const instructions = 'TBBBTTTRLRTBLBBRLRLTTRTBLRRTRLBLTB';

function compute(m, x, y) {
    let power = 0
    if (`${x}:${y}` in m) {
        power = m[`${x}:${y}`]
        // cl("checking case", x, y, "found power:", power)
    }
    return power
}

function solveProblem(instructions, starship, meteorites) {
    let m = meteorites.reduce((acc, cur) => {
        let [coord, size] = cur.split('#')
        acc[coord] = Math.ceil(size / 5)
        return acc
    }, {}).log()

    let [x, y] = starship.split(":").map(e => parseInt(e))
    let power = 0

    cl("starting on x, y:", x, y)

    instructions.split('').forEach((instruction) => {
        power += compute(m, x + 1, y)
        power += compute(m, x - 1, y)
        power += compute(m, x, y + 1)
        power += compute(m, x, y - 1)

        if (instruction == 'T') y++
        if (instruction == 'B') y--
        if (instruction == 'R') x++
        if (instruction == 'L') x--

        // cl("moving using", instruction, "new coordinates:", x, y)


        power++
    })
    return power;
}

console.log(`Answer: '${solveProblem(instructions, starship, meteorites)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
    // [1/42] Le vaisseau démarre en X:3, Y:1
    // [2/42] Le vaisseau rencontre une météorite à proximité, il active son bouclier et ajoute 5 d'énergie
    // [3/42] B : Le vaisseau se déplace vers le bas.
    // [4/42] L : Le vaisseau se déplace vers la gauche.
    // [5/42] Le vaisseau rencontre une météorite à proximité, il active son bouclier et ajoute 5 d'énergie
    // [6/42] R : Le vaisseau se déplace vers la droite.
    // [7/42] L : Le vaisseau se déplace vers la gauche.
    // [8/42] Le vaisseau rencontre une météorite à proximité, il active son bouclier et ajoute 5 d'énergie
    // [9/42] R : Le vaisseau se déplace vers la droite.
    // [10/42] T : Le vaisseau se déplace vers le haut.
    // [11/42] Le vaisseau rencontre une météorite à proximité, il active son bouclier et ajoute 5 d'énergie
    // [12/42] R : Le vaisseau se déplace vers la droite.
    // [13/42] B : Le vaisseau se déplace vers le bas.
    // [14/42] T : Le vaisseau se déplace vers le haut.
    // [15/42] B : Le vaisseau se déplace vers le bas.
    // [16/42] T : Le vaisseau se déplace vers le haut.
    // [17/42] R : Le vaisseau se déplace vers la droite.
    // [18/42] R : Le vaisseau se déplace vers la droite.
    // [19/42] Le vaisseau rencontre une météorite à proximité, il active son bouclier et ajoute 4 d'énergie
    // [20/42] B : Le vaisseau se déplace vers le bas.
    // [21/42] T : Le vaisseau se déplace vers le haut.
    // [22/42] Le vaisseau rencontre une météorite à proximité, il active son bouclier et ajoute 4 d'énergie
    // [23/42] L : Le vaisseau se déplace vers la gauche.
    // [24/42] R : Le vaisseau se déplace vers la droite.
    // [25/42] Le vaisseau rencontre une météorite à proximité, il active son bouclier et ajoute 4 d'énergie
    // [26/42] L : Le vaisseau se déplace vers la gauche.
    // [27/42] L : Le vaisseau se déplace vers la gauche.
    // [28/42] T : Le vaisseau se déplace vers le haut.
    // [29/42] L : Le vaisseau se déplace vers la gauche.
    // [30/42] R : Le vaisseau se déplace vers la droite.
    // [31/42] T : Le vaisseau se déplace vers le haut.
    // [32/42] L : Le vaisseau se déplace vers la gauche.
    // [33/42] B : Le vaisseau se déplace vers le bas.
    // [34/42] L : Le vaisseau se déplace vers la gauche.
    // [35/42] Le vaisseau rencontre une météorite à proximité, il active son bouclier et ajoute 5 d'énergie
    // [36/42] R : Le vaisseau se déplace vers la droite.
    // [37/42] T : Le vaisseau se déplace vers le haut.
    // [38/42] T : Le vaisseau se déplace vers le haut.
    // [39/42] L : Le vaisseau se déplace vers la gauche.
    // [40/42] T : Le vaisseau se déplace vers le haut.
    // [41/42] B : Le vaisseau se déplace vers le bas.
    // [42/42] B : Le vaisseau se déplace vers le bas.


    const meteorites = ['4:2#14', '0:6#40', '4:0#49', '5:0#36', '7:1#37', '2:2#44', '0:2#31'];
    const instructions = 'TTLBBRRBBBBRRLRRTBTLTLTBLLRRLLRBTRLB';
    const starship = '2:5';

    const expected = 159

    const result = solveProblem(instructions, starship, meteorites);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit STARSHIP_2')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: '1063a3bf101cafeec819b587d29571ea7579e897014b7d9e8612d27e8d87c1aa8b6e60c101ee96b7'"
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

function isNumeric(str) {
    return /^\d+$/.test(str);
}
