init();
test();

// Challenge variables
const tweets = ['23791;ArtisticJunkie,MangaMuse,MangaMinion', '45223;MangaMonster,ArtisticJunkie,DigitalDynamo,ArtisticChameleon', '10975;ArtisticProdigy,ArtisticChameleon,MangaMarvel', '7205;ArtisticJunkie,ArtisticInsight', '30164;ArtisticConnoisseur,MangaMuse,DigitalDynamo', '19348;ArtisticConnoisseur,ArtisticScribbler,FunkyArtFanatic,ArtisticWizard,ArtisticProdigy', '35537;ArtisticOtaku,MangaMastermind,ArtisticAce,ArtisticInsight,DigitalDynamo', '26005;ArtisticProdigy,ArtisticWizard', '25169;ArtisticProdigy,MangaMastermind,MangaMonster,MangaMuse,MangaMinion', '9315;FunkyArtFanatic,ArtisticOtaku,MangaMinion', '43688;ArtisticNinja,DigitalDiva', '14294;ArtisticAdventurer,ArtisticWizard', '16976;ArtisticScribbler,ArtisticInsight,ArtisticProdigy', '41029;MangaMuse,ArtisticChameleon', '25283;MangaMonster,ArtisticOtaku,PopCulturePhenom', '12207;ArtisticOtaku,ArtisticInsight', '24026;MangaMuse,ArtisticAdventurer,MangaMastermind,DigitalDynamo', '44330;ArtisticProdigy,MangaMuse', '31099;PopCulturePhenom,MangaMastermind,ArtisticInsight,MangaMarvel,ArtisticNinja', '42541;ArtisticChameleon,DigitalDynamo', '15088;MangaMinion,PopCulturePhenom,ArtisticJunkie,ArtisticProdigy', '43194;ArtisticNinja,ArtisticInsight,DigitalDiva,ArtisticAce,ArtisticWizard', '10212;ArtisticJunkie,ArtisticScribbler,MangaMuse,FunkyArtFanatic,PopCulturePhenom', '41764;ArtisticAdventurer,MangaMuse', '19153;ArtisticWizard,MangaMinion,MangaMarvel', '35808;PopCulturePhenom,ArtisticAce', '28051;MangaMonster,DigitalDiva,ArtisticWizard', '33658;ArtisticOtaku,MangaMonster,ArtisticAce', '49815;ArtisticJunkie,MangaMastermind,MangaMuse,PopCulturePhenom', '23341;FunkyArtFanatic,DigitalDynamo,ArtisticNinja,DigitalDiva,MangaMuse', '25916;ArtisticScribbler,MangaMuse,MangaMonster,PopCulturePhenom,ArtisticInsight', '12820;MangaMarvel,DigitalDiva,ArtisticInsight', '7049;DigitalDynamo,ArtisticScribbler,MangaMuse,ArtisticConnoisseur', '1000;MangaMonster,MangaMuse', '33435;ArtisticAdventurer,MangaMinion,MangaMuse,MangaMastermind,ArtisticOtaku', '46561;MangaMinion,MangaMastermind,DigitalDiva,DigitalDynamo,ArtisticNinja', '28585;ArtisticConnoisseur,MangaMastermind,MangaMinion', '25434;ArtisticNinja,DigitalDiva,ArtisticAdventurer,ArtisticOtaku,ArtisticChameleon', '15298;DigitalDynamo,MangaMuse', '11077;MangaMastermind,FunkyArtFanatic', '39694;MangaMinion,MangaMastermind,ArtisticJunkie', '12912;ArtisticChameleon,MangaMinion,MangaMuse,DigitalDiva,MangaMarvel', '42224;FunkyArtFanatic,ArtisticScribbler,ArtisticConnoisseur', '34029;ArtisticJunkie,ArtisticConnoisseur', '13002;ArtisticConnoisseur,ArtisticAce', '1408;ArtisticNinja,ArtisticChameleon,ArtisticScribbler,ArtisticProdigy', '15715;ArtisticProdigy,ArtisticScribbler', '44537;ArtisticOtaku,ArtisticConnoisseur,ArtisticJunkie,ArtisticScribbler,PopCulturePhenom', '37688;ArtisticChameleon,ArtisticAdventurer,ArtisticProdigy', '10619;MangaMonster,ArtisticNinja,MangaMinion', '47035;ArtisticNinja,ArtisticAce', '3679;MangaMuse,PopCulturePhenom,ArtisticNinja', '23360;MangaMastermind,ArtisticAce', '22123;ArtisticConnoisseur,ArtisticAdventurer,ArtisticScribbler,FunkyArtFanatic', '11090;ArtisticNinja,MangaMuse,ArtisticAdventurer', '27681;ArtisticWizard,MangaMonster,ArtisticProdigy,MangaMarvel', '37949;ArtisticProdigy,MangaMuse,ArtisticNinja', '45584;DigitalDiva,ArtisticAce,ArtisticScribbler,DigitalDynamo', '3508;ArtisticScribbler,DigitalDiva', '38051;DigitalDynamo,DigitalDiva', '3688;ArtisticOtaku,MangaMonster', '9738;MangaMinion,PopCulturePhenom,ArtisticChameleon,ArtisticAdventurer', '25629;MangaMuse,PopCulturePhenom', '42500;MangaMuse,DigitalDynamo,ArtisticWizard,ArtisticInsight'];


function solveProblem(tweets) {
    return tweets.map(tweet => {
        [reach, c] = tweet.split(';')
        return {
            reach: parseInt(reach),
            accounts: c.split(',')
        }
    }).reduce((acc, cur) => {
        cur.accounts.forEach(a => acc[a] = (acc[a] || 0) + cur.reach)
        return acc
    }, {})
        .toSortedDescList()[0].join(":")
}

console.log(`Answer: '${solveProblem(tweets)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
    // [1/37] Chacun de ces comptes ont été vus par 19894 followers : DigitalArtistHub, PopCultureExplorer, ArtisticAdventurer.
    // [2/37] Chacun de ces comptes ont été vus par 18252 followers : ArtisticInkling, DigitalMarketingMaestro, FunkyArtisticSoul, ArtisticWanderer.
    // [3/37] Chacun de ces comptes ont été vus par 7393 followers : DigitalDabbler, PopCultureGuru, ArtisticInkling, ArtisticInsight.
    // [4/37] Chacun de ces comptes ont été vus par 6503 followers : MangaMaven, PopCultureGuru, PopCulturePioneer, ArtisticAdventurer, PopCultureAddict.
    // [5/37] Chacun de ces comptes ont été vus par 18469 followers : ArtisticWanderer, PopCultureAddict.
    // [6/37] Chacun de ces comptes ont été vus par 3507 followers : PopCultureExplorer, DigitalMarketingMaestro, ArtisticInkling.
    // [7/37] Chacun de ces comptes ont été vus par 7867 followers : FunkyArtDevotee, MangaMaster, DigitalDabbler, FunkyArtisticSoul.
    // [8/37] Chacun de ces comptes ont été vus par 46712 followers : ArtisticNerd, ArtisticInsight, PopCultureAddict, MangaMagic.
    // [9/37] Chacun de ces comptes ont été vus par 3694 followers : FunkyArtisticSoul, PopCultureFanatic.
    // [10/37] Chacun de ces comptes ont été vus par 26504 followers : FunkyArtisticSoul, PopCultureGuru, ArtisticAdventurer, ArtisticWanderer.
    // [11/37] Chacun de ces comptes ont été vus par 26938 followers : ArtisticAdventurer, MangaMaster, PopCultureAddict, PopCulturePioneer.
    // [12/37] Chacun de ces comptes ont été vus par 26088 followers : PopCultureAddict, PopCultureGuru.
    // [13/37] Chacun de ces comptes ont été vus par 5063 followers : ArtisticWanderer, MangaMagic, DigitalMarketingMaestro.
    // [14/37] Chacun de ces comptes ont été vus par 2978 followers : MangaMaster, ArtisticAdventurer, DigitalDiva.
    // [15/37] Chacun de ces comptes ont été vus par 22069 followers : PopCultureFanatic, DigitalDiva, DigitalMarketingMaestro.
    // [16/37] Chacun de ces comptes ont été vus par 25622 followers : MangaMaven, MangaMagic.
    // [17/37] Chacun de ces comptes ont été vus par 21498 followers : ArtisticInkling, ArtisticWanderer, DigitalDabbler, DigitalMarketingMaestro, ArtisticNerd.
    // [18/37] Chacun de ces comptes ont été vus par 43246 followers : PopCultureAddict, MangaMagic, ArtisticNerd, DigitalDabbler, PopCultureExplorer.
    // [19/37] Chacun de ces comptes ont été vus par 10909 followers : ArtisticNerd, MangaMaster.
    // [20/37] Chacun de ces comptes ont été vus par 7415 followers : FunkyArtDevotee, PopCultureGuru.
    // [21/37] Chacun de ces comptes ont été vus par 20852 followers : PopCultureAddict, PopCultureExplorer.
    // [22/37] Chacun de ces comptes ont été vus par 6687 followers : ArtisticNerd, MangaMaven, DigitalMarketingMaestro, MangaMaster.
    // [23/37] Chacun de ces comptes ont été vus par 32441 followers : MangaMaster, PopCultureFanatic, ArtisticAdventurer, DigitalDabbler, DigitalMarketingMaestro.
    // [24/37] Chacun de ces comptes ont été vus par 21270 followers : DigitalDabbler, DigitalArtistHub.
    // [25/37] Chacun de ces comptes ont été vus par 2995 followers : PopCultureGuru, MangaMaven, DigitalDesignNinja.
    // [26/37] Chacun de ces comptes ont été vus par 48333 followers : MangaMaven, PopCulturePioneer, PopCultureAddict, PopCultureFanatic, DigitalDiva.
    // [27/37] Chacun de ces comptes ont été vus par 11147 followers : ArtisticInkling, PopCulturePioneer, DigitalMarketingMaestro, ArtisticAdventurer, MangaMagic.
    // [28/37] Chacun de ces comptes ont été vus par 25551 followers : PopCultureFanatic, DigitalDiva, FunkyArtDevotee, MangaMagic, ArtisticWanderer.
    // [29/37] Chacun de ces comptes ont été vus par 23785 followers : PopCultureFanatic, DigitalDabbler.
    // [30/37] Chacun de ces comptes ont été vus par 8211 followers : DigitalDabbler, MangaMaster, ArtisticNerd, MangaMaven, PopCultureAddict.
    // [31/37] Chacun de ces comptes ont été vus par 39118 followers : FunkyArtDevotee, DigitalMarketingMaestro, MangaMaven, PopCultureExplorer.
    // [32/37] Chacun de ces comptes ont été vus par 8131 followers : DigitalDabbler, ArtisticInsight, MangaMaster, DigitalDesignNinja, PopCultureExplorer.
    // [33/37] Chacun de ces comptes ont été vus par 41387 followers : ArtisticAdventurer, PopCulturePioneer, DigitalDabbler, MangaMaven, FunkyArtDevotee.
    // [34/37] Chacun de ces comptes ont été vus par 35240 followers : DigitalDabbler, DigitalDiva, ArtisticInkling.
    // [35/37] Chacun de ces comptes ont été vus par 3814 followers : ArtisticAdventurer, MangaMaster, PopCultureFanatic, DigitalMarketingMaestro.
    // [36/37] Chacun de ces comptes ont été vus par 12907 followers : ArtisticInsight, PopCulturePioneer.
    // [37/37] Après avoir fait les sommes, c'est le compte DigitalDabbler qui a été le + vu... par 250469 followers.


    const tweets = ['19894;DigitalArtistHub,PopCultureExplorer,ArtisticAdventurer', '18252;ArtisticInkling,DigitalMarketingMaestro,FunkyArtisticSoul,ArtisticWanderer', '7393;DigitalDabbler,PopCultureGuru,ArtisticInkling,ArtisticInsight', '6503;MangaMaven,PopCultureGuru,PopCulturePioneer,ArtisticAdventurer,PopCultureAddict', '18469;ArtisticWanderer,PopCultureAddict', '3507;PopCultureExplorer,DigitalMarketingMaestro,ArtisticInkling', '7867;FunkyArtDevotee,MangaMaster,DigitalDabbler,FunkyArtisticSoul', '46712;ArtisticNerd,ArtisticInsight,PopCultureAddict,MangaMagic', '3694;FunkyArtisticSoul,PopCultureFanatic', '26504;FunkyArtisticSoul,PopCultureGuru,ArtisticAdventurer,ArtisticWanderer', '26938;ArtisticAdventurer,MangaMaster,PopCultureAddict,PopCulturePioneer', '26088;PopCultureAddict,PopCultureGuru', '5063;ArtisticWanderer,MangaMagic,DigitalMarketingMaestro', '2978;MangaMaster,ArtisticAdventurer,DigitalDiva', '22069;PopCultureFanatic,DigitalDiva,DigitalMarketingMaestro', '25622;MangaMaven,MangaMagic', '21498;ArtisticInkling,ArtisticWanderer,DigitalDabbler,DigitalMarketingMaestro,ArtisticNerd', '43246;PopCultureAddict,MangaMagic,ArtisticNerd,DigitalDabbler,PopCultureExplorer', '10909;ArtisticNerd,MangaMaster', '7415;FunkyArtDevotee,PopCultureGuru', '20852;PopCultureAddict,PopCultureExplorer', '6687;ArtisticNerd,MangaMaven,DigitalMarketingMaestro,MangaMaster', '32441;MangaMaster,PopCultureFanatic,ArtisticAdventurer,DigitalDabbler,DigitalMarketingMaestro', '21270;DigitalDabbler,DigitalArtistHub', '2995;PopCultureGuru,MangaMaven,DigitalDesignNinja', '48333;MangaMaven,PopCulturePioneer,PopCultureAddict,PopCultureFanatic,DigitalDiva', '11147;ArtisticInkling,PopCulturePioneer,DigitalMarketingMaestro,ArtisticAdventurer,MangaMagic', '25551;PopCultureFanatic,DigitalDiva,FunkyArtDevotee,MangaMagic,ArtisticWanderer', '23785;PopCultureFanatic,DigitalDabbler', '8211;DigitalDabbler,MangaMaster,ArtisticNerd,MangaMaven,PopCultureAddict', '39118;FunkyArtDevotee,DigitalMarketingMaestro,MangaMaven,PopCultureExplorer', '8131;DigitalDabbler,ArtisticInsight,MangaMaster,DigitalDesignNinja,PopCultureExplorer', '41387;ArtisticAdventurer,PopCulturePioneer,DigitalDabbler,MangaMaven,FunkyArtDevotee', '35240;DigitalDabbler,DigitalDiva,ArtisticInkling', '3814;ArtisticAdventurer,MangaMaster,PopCultureFanatic,DigitalMarketingMaestro', '12907;ArtisticInsight,PopCulturePioneer'];

    const expected = 'DigitalDabbler:250469'

    const result = solveProblem(tweets);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit DIGITALART_2')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: 'e702c34133dc706a65cdaba099c5ac1469fe8b924f1194e61339dd08859077f023b863b150bd3f54'"
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
