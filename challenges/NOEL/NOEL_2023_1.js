init();
test();

// Challenge variables
const orders = ['72,blanc,piment,chocolat_brule', '67,melange,cannelle,epice_surprise', '72,noir,piment', '65,au_lait,muscade,tasse_froide', '67,noir,cannelle', '65,au_lait,muscade,epice_surprise', '73,au_lait,muscade,tasse_froide', '75,blanc,vanille', '74,melange,vanille,chocolat_brule', '70,au_lait,vanille', '69,noir,muscade', '70,melange,piment', '71,blanc,vanille,epice_surprise', '69,blanc,piment,tasse_froide', '70,melange,vanille', '76,melange,piment,tasse_froide', '67,au_lait,cannelle,chocolat_brule'];


function solveProblem(orders) {
    return Math.ceil(orders.map(order => {
        let v = order.split(",")
        let temp = parseInt(v[0])
        let choc = v[1]
        let epices = v.slice(2)
        let malus = null;
        if (epices.at(-1).includes("_")) {
            malus = epices.pop()
        }

        switch (choc) {
            case "noir":
                temp += 5
                break;
            case "au_lait":
                temp += 10
                break;
            case "blanc":
                temp += 15
                break;
            case "melange":
                temp += 12
                break;
        }

        epices.forEach(e => {
            switch (e) {
                case "cannelle":
                    temp += 4
                    break
                case "muscade":
                    temp += 7
                    break
                case "piment":
                    temp += 9
                    break
                case "vanille":
                    temp += 1
                    break
            }
        })

        switch (malus) {
            case "chocolat_brule":
                temp -= 10
                break
            case "epice_surprise":
                temp += 10
                break
            case "tasse_froide":
                temp *= 2
                break
        }

        return temp
    })
        .log()
        .sumUp() / orders.length)
}

console.log(`Answer: '${solveProblem(orders)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
    // [1/5] La commande nécessite une température de 75°C pour une préparation optimale !
    // [2/5] La commande nécessite une température de 87°C pour une préparation optimale !
    // [3/5] La commande nécessite une température de 158°C pour une préparation optimale !
    // [4/5] La commande nécessite une température de 83°C pour une préparation optimale !
    // [5/5] La commande nécessite une température de 81°C pour une préparation optimale !


    const orders = ['62,melange,vanille', '78,noir,cannelle', '66,melange,vanille,tasse_froide', '77,noir,vanille', '62,melange,muscade'];

    const expected = '97'

    const result = solveProblem(orders);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit NOEL_2023_1')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: '84181d595a574abfd3c77ab8ff36d05d3d851921d74886a23226ab8e13922b688668a809e6c5faf5'"
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
