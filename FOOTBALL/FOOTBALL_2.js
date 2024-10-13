init();
test();

// Challenge variables
const postes = ['G', 'A', 'D', 'A', 'D', 'D', 'M', 'M', 'M', 'D', 'A', 'D', 'M', 'A', 'A', 'M', 'D', 'M', 'A', 'M', 'M', 'G', 'D', 'D', 'M', 'D', 'M', 'D', 'M', 'M', 'M'];
const dispositif = '4-5-1';
const forces = [58, 28, 10, 21, 51, 31, 37, 36, 3, 18, 46, 43, 38, 34, 45, 14, 29, 2, 56, 35, 11, 8, 44, 13, 53, 25, 32, 30, 26, 20, 49];


function solveProblem(dispositif, forces, postes) {
    let joueurs = { 'G': [], 'A': [], 'D': [], 'M': [] }
    for (let i = 0; i < postes.length; i++) {
        joueurs[postes[i]].push({
            force: forces[i],
            i: i
        })
    }
    joueurs['G'] = joueurs['G'].sort((a, b) => b.force - a.force)
    joueurs['A'] = joueurs['A'].sort((a, b) => b.force - a.force)
    joueurs['D'] = joueurs['D'].sort((a, b) => b.force - a.force)
    joueurs['M'] = joueurs['M'].sort((a, b) => b.force - a.force)

    let [dc, mc, ac] = dispositif.split("-")

    return [
        joueurs['G'][0],
        ...joueurs['A'].slice(0, +ac),
        ...joueurs['D'].slice(0, +dc),
        ...joueurs['M'].slice(0, +mc),
    ]
        .sort((a, b) => b.force - a.force)
        .map(e => e.i)
        .join("-")
}

console.log(`Answer: '${solveProblem(dispositif, forces, postes)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
    // [1/45] Groupe des Gardiens : [0:14]
    // [2/45] [17:34]
    // [3/45] Groupe des Défenseurs : [2:24]
    // [4/45] [5:39]
    // [5/45] [7:25]
    // [6/45] [11:30]
    // [7/45] [13:28]
    // [8/45] [19:21]
    // [9/45] Groupe des Milieux : [1:1]
    // [10/45] [9:23]
    // [11/45] [10:19]
    // [12/45] [14:10]
    // [13/45] [18:35]
    // [14/45] [20:20]
    // [15/45] Groupe des Attaquants : [3:38]
    // [16/45] [4:3]
    // [17/45] [6:18]
    // [18/45] [8:37]
    // [19/45] [12:33]
    // [20/45] [15:31]
    // [21/45] [16:40]
    // [22/45] Tous les groupes disposent d'assez de joueurs
    // [23/45] Groupe des Gardiens triés : [17:34]
    // [24/45] Groupe des Défenseurs triés : [5:39]
    // [25/45] [11:30]
    // [26/45] [13:28]
    // [27/45] [7:25]
    // [28/45] [2:24]
    // [29/45] Groupe des Milieux triés : [18:35]
    // [30/45] [9:23]
    // [31/45] [20:20]
    // [32/45] [10:19]
    // [33/45] Groupe des Attaquants triés : [16:40]
    // [34/45] On regroupe tous les joueurs dans un même groupe et on les trie dans l'ordre des forces décroissantes, pour ne garder que les numéros des joueurs
    // [35/45] Groupe complet : [16:40]
    // [36/45] [5:39]
    // [37/45] [18:35]
    // [38/45] [17:34]
    // [39/45] [11:30]
    // [40/45] [13:28]
    // [41/45] [7:25]
    // [42/45] [2:24]
    // [43/45] [9:23]
    // [44/45] [20:20]
    // [45/45] [10:19]


    const dispositif = '5-4-1';
    const forces = [14, 1, 24, 38, 3, 39, 18, 25, 37, 23, 19, 30, 33, 28, 10, 31, 40, 34, 35, 21, 20];
    const postes = ['G', 'M', 'D', 'A', 'A', 'D', 'A', 'D', 'A', 'M', 'M', 'D', 'A', 'D', 'M', 'A', 'A', 'G', 'M', 'D', 'M'];

    const expected = '16-5-18-17-11-13-7-2-9-20-10'

    const result = solveProblem(dispositif, forces, postes);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit FOOTBALL_2')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: 'b444d81735c663dc89b5f06ec7141f2d82f1e2c761d2d2623473eeea34f6b1a4ebacdb83261eb60a'"
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
