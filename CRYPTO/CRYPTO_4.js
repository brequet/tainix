init();
test();

// Challenge variables
const echantillons = ['53385116132413723371398476:zmgro', '832828082585013626479417722365609:gwakfrat', '747359489221226425268604986440824180:nqswwga', '5420863318668617:efgst', '455609188509595587685:vapn'];
const code = '86472939394459282111888378816867692719901';


function solveProblem(code, echantillons) {
    return "";
}

console.log(`Answer: '${solveProblem(code, echantillons)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
	// [1/1] Pas d'indice pour ce challenge... désolé :p


    const echantillons = ['51118683758443761902169835:gmupz', '463014104417636277646:qpak', '563321855343329928890:ojbcy', '52029816060757978428440165:sshsv', '5536101646413261873273847767639:hbbpp'];
const code = '4956805144632803024644362';

    const expected = 'fuoe'

    const result = solveProblem(code, echantillons);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit CRYPTO_4')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: 'cd5495775567537bcd33b0ee7a6a7adb07796fbc3ffe47b740c162c45e52b729516d42ddd5578c87'"
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
    return +(Math.round(num + "e+2")  + "e-2");
}

function isNumeric(str){
    return /^\d+$/.test(str);
}
