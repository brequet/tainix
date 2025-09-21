init();
test();

// Challenge variables
const words = ['YQOUISKOCL', 'WUMMRSKEXC', 'WBMARYAELC', 'PBMSYSDELC', 'WMVDRSKELC', 'KBMDRPKPVM', 'WBLWIDIECN', 'LBMDCSGEDC', 'WBMDRSOELC', 'BBBDRCZELP', 'JIXDCEOKVC', 'LBTDRSVELC', 'WNMDREGELC', 'KBVDRSKEHC', 'YGMDUBKELC', 'WPMDRSFEYC', 'UBVDRSKTLE', 'WBYDDSGGLV', 'IIMDSKGKLC', 'WBMQYSWELC', 'JBTDATKELC', 'UBFBYSKELC', 'WBSURSGELB', 'GBHDRSKKPX', 'MBCPRSKQLC', 'EBMZPPYELC', 'LQXDGTHECS', 'WHWDITSFVC', 'WBMMXYKDQC', 'JNYJWMKDWC', 'WIMDRXPKLC', 'WTMAVSKQLC', 'WSMDRDJELC', 'YBXDYIKEVC', 'WBTHGSMVLC', 'WBMDXSLILB', 'MGRDLSKCLC', 'HBRDRSTELC', 'VHGORDKEWC', 'QBMURSKFZZ'];


function solveProblem(words) {
    let v = Array(words[0].length).fill("")
    for (let j = 0; j < words[0].length; j++) {
        for (let i = 0; i < words.length; i++) {
            v[j] += words[i][j]
        }
    }
    return v.map(e => stringToDictOfCharOccurrences(e).toSortedDescList()[0][0])
        .log()
        .join("")
}

console.log(`Answer: '${solveProblem(words)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
    // [1/4] La lettre à la position 0 qui revient le + souvent est la lettre : V
    // [2/4] La lettre à la position 1 qui revient le + souvent est la lettre : R
    // [3/4] La lettre à la position 2 qui revient le + souvent est la lettre : Y
    // [4/4] La lettre à la position 3 qui revient le + souvent est la lettre : U


    const words = ['BCFU', 'GRYG', 'LRMF', 'VLYP', 'DRYO', 'SCYU', 'VRZY', 'NAFU', 'IQYB', 'TBTS'];

    const expected = 'VRYU'

    const result = solveProblem(words);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit CRYPTO_1')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: '6199998129b2116ea247bcea4cdac73ecff6c3baaa9d991a45bab0479afc618d15a3f808eb12a2ae'"
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

    cl = console.log
}

/**
 * Predefined utility functions
 */

function stringToDictOfCharOccurrences(str) {
    return str.split("").reduce((acc, cur) => {
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
