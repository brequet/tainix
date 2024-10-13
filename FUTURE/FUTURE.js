init();
test();

// Challenge variables
const depart = 1985;
const anniversaire = '11-15';
const sauts = ['1998-05-19', '1970-01-10', '1974-07-02', '1992-07-19', '1982-02-23', '1980-04-07', '1981-08-20', '1992-10-14', '1970-06-19', '2004-10-04', '1983-08-11', '1976-09-21', '2014-06-29', '1988-08-16', '1976-07-28', '1995-02-12', '2013-12-17'];


function solveProblem(depart, anniversaire, sauts) {
    return "";
}

console.log(`Answer: '${solveProblem(depart, anniversaire, sauts)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
	// [1/6] Me voilà dans le futur... En 2007... Avant le 02/08. Je ne compte donc pas l'année, soit 21 année(s) de décalage
	// [2/6] Me voilà dans le futur... En 1994... Après le 02/08. Je compte donc bien l'année, soit 9 année(s) de décalage
	// [3/6] Me voilà dans le futur... En 1994... Avant le 02/08. Je ne compte donc pas l'année, soit 8 année(s) de décalage
	// [4/6] Me voilà dans le passé... En 1980... Après le 02/08. Je ne compte donc pas l'année, soit 4 année(s) de décalage
	// [5/6] Me voilà dans le futur... En 1987... Avant le 02/08. Je ne compte donc pas l'année, soit 1 année(s) de décalage
	// [6/6] Après tous ces sauts dans le temps, j'ai vécu un décalage de 35 année(s).


    const depart = 1985;
const anniversaire = '08-02';
const sauts = ['2007-04-22', '1994-08-25', '1994-04-30', '1980-12-27', '1987-03-05'];

    const expected = '35'

    const result = solveProblem(depart, anniversaire, sauts);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit FUTURE')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: '1bff7b60defbf6170ba63a28f7ddb62d2031165b2d98572adad1930c20e8c7e72db28d6e3b66ee1a'"
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
