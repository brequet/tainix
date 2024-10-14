init();
test();

// Challenge variables
const sangoku = 'HP:13000 F:147 S:440';
const vegeta = 'HP:13000 F:141 S:642';

function toPerso(str) {
    [hpStr, fpStr, spStr] = str.split(' ');
    return {
        hp: parseInt(hpStr.split(":")[1]),
        f: parseInt(fpStr.split(":")[1]),
        s: parseInt(spStr.split(":")[1]),
        specialCount: 0,
        lostHpAcc: 0
    }
}

function solveProblem(sangoku, vegeta) {
    let san = toPerso(sangoku);
    let veg = toPerso(vegeta);

    let i = 1
    while (true) {
        let [vegDidSpecial, sanDidSpecial] = [false, false];
        if (veg.lostHpAcc >= 1000) {
            san.hp -= veg.s

            veg.lostHpAcc = 0
            veg.specialCount++
            vegDidSpecial = true;
        }
        if (!vegDidSpecial) {
            if (san.lostHpAcc >= 1000) {
                veg.hp -= san.s

                san.lostHpAcc = 0
                san.specialCount++
                sanDidSpecial = true;
            }

            if (!sanDidSpecial) {
                san.hp -= veg.f
                san.lostHpAcc += veg.f

                veg.hp -= san.f
                veg.lostHpAcc += san.f
            }
        }


        if (san.hp <= 0 && veg.hp <= 0) {
            return `DRAW_${i}`
        } else if (san.hp <= 0) {
            return `VEGETA_${i}_${veg.specialCount}`
        } else if (veg.hp <= 0) {
            return `SANGOKU_${i}_${san.specialCount}`
        }
        i++
    }
}

console.log(`Answer: '${solveProblem(sangoku, vegeta)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
    // [1/67] Sangoku : 10000 --- Végéta : 10000
    // [2/67] Sangoku : 9809 --- Végéta : 9883
    // [3/67] Sangoku : 9618 --- Végéta : 9766
    // [4/67] Sangoku : 9427 --- Végéta : 9649
    // [5/67] Sangoku : 9236 --- Végéta : 9532
    // [6/67] Sangoku : 9045 --- Végéta : 9415
    // [7/67] Sangoku : 8854 --- Végéta : 9298
    // [8/67] Coup spécial de Sangoku !
    // [9/67] Sangoku : 8854 --- Végéta : 8628
    // [10/67] Sangoku : 8663 --- Végéta : 8511
    // [11/67] Sangoku : 8472 --- Végéta : 8394
    // [12/67] Sangoku : 8281 --- Végéta : 8277
    // [13/67] Coup spécial de Végéta !
    // [14/67] Sangoku : 7805 --- Végéta : 8277
    // [15/67] Sangoku : 7614 --- Végéta : 8160
    // [16/67] Sangoku : 7423 --- Végéta : 8043
    // [17/67] Sangoku : 7232 --- Végéta : 7926
    // [18/67] Coup spécial de Sangoku !
    // [19/67] Sangoku : 7232 --- Végéta : 7256
    // [20/67] Sangoku : 7041 --- Végéta : 7139
    // [21/67] Sangoku : 6850 --- Végéta : 7022
    // [22/67] Sangoku : 6659 --- Végéta : 6905
    // [23/67] Sangoku : 6468 --- Végéta : 6788
    // [24/67] Sangoku : 6277 --- Végéta : 6671
    // [25/67] Sangoku : 6086 --- Végéta : 6554
    // [26/67] Coup spécial de Végéta !
    // [27/67] Sangoku : 5610 --- Végéta : 6554
    // [28/67] Coup spécial de Sangoku !
    // [29/67] Sangoku : 5610 --- Végéta : 5884
    // [30/67] Sangoku : 5419 --- Végéta : 5767
    // [31/67] Sangoku : 5228 --- Végéta : 5650
    // [32/67] Sangoku : 5037 --- Végéta : 5533
    // [33/67] Sangoku : 4846 --- Végéta : 5416
    // [34/67] Sangoku : 4655 --- Végéta : 5299
    // [35/67] Sangoku : 4464 --- Végéta : 5182
    // [36/67] Coup spécial de Sangoku !
    // [37/67] Sangoku : 4464 --- Végéta : 4512
    // [38/67] Sangoku : 4273 --- Végéta : 4395
    // [39/67] Sangoku : 4082 --- Végéta : 4278
    // [40/67] Sangoku : 3891 --- Végéta : 4161
    // [41/67] Coup spécial de Végéta !
    // [42/67] Sangoku : 3415 --- Végéta : 4161
    // [43/67] Sangoku : 3224 --- Végéta : 4044
    // [44/67] Sangoku : 3033 --- Végéta : 3927
    // [45/67] Sangoku : 2842 --- Végéta : 3810
    // [46/67] Coup spécial de Sangoku !
    // [47/67] Sangoku : 2842 --- Végéta : 3140
    // [48/67] Sangoku : 2651 --- Végéta : 3023
    // [49/67] Sangoku : 2460 --- Végéta : 2906
    // [50/67] Sangoku : 2269 --- Végéta : 2789
    // [51/67] Sangoku : 2078 --- Végéta : 2672
    // [52/67] Sangoku : 1887 --- Végéta : 2555
    // [53/67] Sangoku : 1696 --- Végéta : 2438
    // [54/67] Coup spécial de Végéta !
    // [55/67] Sangoku : 1220 --- Végéta : 2438
    // [56/67] Coup spécial de Sangoku !
    // [57/67] Sangoku : 1220 --- Végéta : 1768
    // [58/67] Sangoku : 1029 --- Végéta : 1651
    // [59/67] Sangoku : 838 --- Végéta : 1534
    // [60/67] Sangoku : 647 --- Végéta : 1417
    // [61/67] Sangoku : 456 --- Végéta : 1300
    // [62/67] Sangoku : 265 --- Végéta : 1183
    // [63/67] Sangoku : 74 --- Végéta : 1066
    // [64/67] Coup spécial de Sangoku !
    // [65/67] Sangoku : 74 --- Végéta : 396
    // [66/67] Sangoku : 0 --- Végéta : 279
    // [67/67] Végéta a gagné ! Il y a eu 54 tours et Végéta a réalisé 4 attaques spéciales.


    const vegeta = 'HP:10000 F:191 S:476';
    const sangoku = 'HP:10000 F:117 S:670';

    const expected = 'VEGETA_54_4'

    const result = solveProblem(sangoku, vegeta);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit DBZ_3')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: '220ec5b991a94aca3796e001b30d9d9d27dac7f7b73503251da260050a8552903b28ef6c20c772b8'"
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
