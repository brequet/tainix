init();
test();

// Challenge variables
const island = ['WZEYTWEEWWZYWEERYWFW', 'WRFZZWTFWFYWEF', 'RAEY__FFFYTWE_TY', 'TA__YAZAZZWZA', 'ZR_FZYRZA', 'YERWAWEZATZW_', 'W_FFRWWFZTW', 'FTFWWTFZYWT', 'AAWFWYYWAWWZY', 'FA_EYTT_TF'];
const thirst = 15;
const hunger = 19;
const shape = 60;


function solveProblem(island, thirst, hunger, shape) {
    for (let i = 0; i < island.length; i++) {
        if (thirst * hunger * shape <= 0) break;

        const region = island[i];
        cl("Exploring", region)
        let [nt, nh, ns] = [thirst, hunger, shape]
        for (let j = 0; j < region.length; j++) {
            if (thirst * hunger * shape <= 0) break;

            const c = region[j];
            if (c == "_") {
                shape -= 3
            } else if (c == "W") {
                thirst++
                shape--
            } else if (c == "F") {
                hunger++
                shape--
            } else {
                shape--
            }
        }
        cl("Finished exploring, gained:", hunger - nh, thirst - nt, shape - ns)
        cl("dodo, gaining", Math.trunc((thirst + hunger) / 2))
        shape += Math.trunc((thirst + hunger) / 2)
        thirst -= 5
        hunger -= 5
    }


    return Math.max(thirst, 1) * Math.max(hunger, 1) * Math.max(shape, 1)
}

console.log(`Answer: '${solveProblem(island, thirst, hunger, shape)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
    // [1/16] Début de l'exploration de la section : EWEZA_FER
    // [2/16] Fin de l'exploration de la section : 1 pt(s) de nourriture gagné(s), 1 pt(s) d'eau gagné(s), 11 pt(s) de forme utilisé(s)
    // [3/16] C'est la nuit... on se repose... 17 pt(s) de forme récupéré(s)
    // [4/16] Début de l'exploration de la section : ERYAWWYTYF_F
    // [5/16] Fin de l'exploration de la section : 2 pt(s) de nourriture gagné(s), 2 pt(s) d'eau gagné(s), 14 pt(s) de forme utilisé(s)
    // [6/16] C'est la nuit... on se repose... 14 pt(s) de forme récupéré(s)
    // [7/16] Début de l'exploration de la section : ZWYWFATWTF
    // [8/16] Fin de l'exploration de la section : 2 pt(s) de nourriture gagné(s), 3 pt(s) d'eau gagné(s), 10 pt(s) de forme utilisé(s)
    // [9/16] C'est la nuit... on se repose... 11 pt(s) de forme récupéré(s)
    // [10/16] Début de l'exploration de la section : EWEEWZW
    // [11/16] Fin de l'exploration de la section : 3 pt(s) d'eau gagné(s), 7 pt(s) de forme utilisé(s)
    // [12/16] C'est la nuit... on se repose... 8 pt(s) de forme récupéré(s)
    // [13/16] Début de l'exploration de la section : Y_TFTYWF
    // [14/16] Fin de l'exploration de la section : 2 pt(s) de nourriture gagné(s), 1 pt(s) d'eau gagné(s), 10 pt(s) de forme utilisé(s)
    // [15/16] C'est la nuit... on se repose... 4 pt(s) de forme récupéré(s)
    // [16/16] Une des caractéristiques est tombé à zéro, fin de l'exploration...


    const thirst = 14;
    const hunger = 18;
    const shape = 54;
    const island = ['EWEZA_FER', 'ERYAWWYTYF_F', 'ZWYWFATWTF', 'EWEEWZW', 'Y_TFTYWF', 'WAYEEWWEY', 'YRAFZZEYWT_'];

    const expected = '56'

    const result = solveProblem(island, thirst, hunger, shape);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit SURVIVAL_2')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: '7667d67c4de7027421e3c811e34accdf27bb95ef9c22a13c26d6bf08664aed89ba7d7f457daafd42'"
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
