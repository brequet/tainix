init();
test();

// Challenge variables
const informations = ['e%v550e9793.b239l337a485n9006ch794a894r%d430@271h282o242t690m430a:5il5412.i738o963', '8am=e462l:i,e117.,6ro777u715s;2s3el%@334y3624ah5409oo136.6379es;', '6ag345a726t156h?6e6.m456a843l5823le654t1044@y222o5495pm;a%i913l=.518c5767o9m', 'r!3os,9e.984m8714a4ss6298o5n7@t2902ai174n%i843x619.9351co=m141', '1aa4609ro!n5248.b828r?7et4168on936@211h*e617y7987.1c2o', '8em,m558a680.4546si262l961v624a=2@g351o5225og872l768e:.7593e6u', 'c816a655t!h272e717r1943i8ne640.7348l8an881g*l*o6853is459@3554o1u1tl6817oo6229k.216o539r7388g', '8pa314u3896l.822m%u9589l2le586r2779@g4631m1ai,l9796.9or8163g', 'h760u5573go339.810b823o569y833e:r796@549t%a;i422n152i220x=.1545fr988', 'p?i9837er;r103e758.:r6064o3bi883n2424@a=7o4l9.b787e753', 'e=5t5h4an981.624t313e747s147s164i204e520r853@691c344a925r1544am653a215i428l352.556f6715r', 'j*2oh937n934.890l,o;5pe*9z8@4ov%h459.304o192r2424g'];
const choices = [2, 3, 8];


function solveProblem(informations, choices) {
    mails = informations.map(info => info.replaceAll(/\d|[^\w\.@]/gi, ""))
    return choices.map(c => mails[c]).join(",")
}

console.log(`Answer: '${solveProblem(informations, choices)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
    // [1/11] 7m4ar4942ie978.2274we648b637e472r!@999g304m4145ai;9l.;c516o4859m => marie.weber@gmail.com
    // [2/11] 3le288o:.311f4074e4rn%8a2n4de832z849@724o311v1422h.6154d9e => leo.fernandez@ovh.de
    // [3/11] 2in905e,s%.254p7764er3572r1ot2951@o1008u8tl2162oo743k300.305e%6s => ines.perrot@outlook.es
    // [4/11] m7162ar117i*a:.820l527e9038ro6437y@=3g2oo935g6197le,.=e704u* => maria.leroy@google.eu
    // [5/11] 9le618o%1n5.b;a944i718l:l986y;@582o1085vh761.706o614r943g! => leon.bailly@ovh.org
    // [6/11] k1308en3428dj7296i.7573du877p526u?y191@748o371u889t:l733o7987ok=.!o*r352g166 => kendji.dupuy@outlook.org
    // [7/11] 9n3o4la490n2823.7me:y182e747r959@879o999v4561h.469b3306e => nolan.meyer@ovh.be
    // [8/11] 9mi:l!a2616.6f1er7542n4an?d537e373z252@384o6924v4h3.6ne!t: => mila.fernandez@ovh.net
    // [9/11] On choisit le mail d'index 3
    // [10/11] On choisit le mail d'index 5
    // [11/11] On choisit le mail d'index 4


    const informations = ['7m4ar4942ie978.2274we648b637e472r!@999g304m4145ai;9l.;c516o4859m', '3le288o:.311f4074e4rn%8a2n4de832z849@724o311v1422h.6154d9e', '2in905e,s%.254p7764er3572r1ot2951@o1008u8tl2162oo743k300.305e%6s', 'm7162ar117i*a:.820l527e9038ro6437y@=3g2oo935g6197le,.=e704u*', '9le618o%1n5.b;a944i718l:l986y;@582o1085vh761.706o614r943g!', 'k1308en3428dj7296i.7573du877p526u?y191@748o371u889t:l733o7987ok=.!o*r352g166', '9n3o4la490n2823.7me:y182e747r959@879o999v4561h.469b3306e', '9mi:l!a2616.6f1er7542n4an?d537e373z252@384o6924v4h3.6ne!t:'];
    const choices = [3, 5, 4];

    const expected = 'maria.leroy@google.eu,kendji.dupuy@outlook.org,leon.bailly@ovh.org'

    const result = solveProblem(informations, choices);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit SECURITY_3')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: 'b623f4ecfcca7edc2cbe85cf75cea949bb5283b76c968db39d0ddae85dcf7f30b1a349324eca8a04'"
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
