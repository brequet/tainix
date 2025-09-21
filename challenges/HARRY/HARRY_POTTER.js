init();
test();

// Challenge variables
const petale_rose = 27;
const nuage_tenebreux = 26;
const poussiere_fee = 20;
const eau_jouvence = 25;
const bave_crapaud = 22;
const queue_lezard = 19;
const oreille_souris = 29;


function solveProblem(bave_crapaud, queue_lezard, oreille_souris, petale_rose, nuage_tenebreux, poussiere_fee, eau_jouvence) {
    let degat = 0

    let foudre = Math.min(Math.trunc(nuage_tenebreux / 2), poussiere_fee)
    nuage_tenebreux -= foudre * 2
    poussiere_fee -= foudre
    degat += foudre * 3

    let acide = Math.min(Math.trunc(queue_lezard / 3), Math.trunc(oreille_souris / 2), petale_rose)
    queue_lezard -= acide * 3
    oreille_souris -= acide * 2
    petale_rose -= acide
    degat += acide * 2

    let givre = Math.min(Math.trunc(eau_jouvence / 3), bave_crapaud)
    degat += givre

    return degat
}

console.log(`Answer: '${solveProblem(bave_crapaud, queue_lezard, oreille_souris, petale_rose, nuage_tenebreux, poussiere_fee, eau_jouvence)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
    // [1/3] Harry et ses amis ont créé 8 potions de foudre, pour un total de 24 pt(s) de dégâts.
    // [2/3] Harry et ses amis ont créé 5 potions d'acide, pour un total de 10 pt(s) de dégâts.
    // [3/3] Harry et ses amis ont créé 5 potions de givre, pour un total de 5 pt(s) de dégâts.


    const oreille_souris = 11;
    const petale_rose = 10;
    const nuage_tenebreux = 17;
    const poussiere_fee = 12;
    const eau_jouvence = 17;
    const bave_crapaud = 12;
    const queue_lezard = 16;

    const expected = '39'

    const result = solveProblem(bave_crapaud, queue_lezard, oreille_souris, petale_rose, nuage_tenebreux, poussiere_fee, eau_jouvence);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit HARRY_POTTER')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: '4180dd7f633734647eabc5e294f1ed1e76b229e0a034d73619724d3cd6f30e7c5975a814e8ee5559'"
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
