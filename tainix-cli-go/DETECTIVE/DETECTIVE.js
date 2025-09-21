init();
test();

// Challenge variables
const indices = ['poids_not_enrobe', 'poids_is_costaud', 'yeux_is_bleus', 'yeux_not_vairons', 'taille_not_geant', 'taille_is_moyen', 'taille_not_petit', 'poids_not_moyen', 'cheveux_not_vert', 'yeux_not_noir', 'cheveux_is_rouge', 'cheveux_not_bruns', 'taille_not_grand', 'yeux_not_verts'];
const suspects = ['nom:Paul,yeux:noir,cheveux:bleu,taille:moyen,poids:enrobe', 'nom:Alice,yeux:vairons,cheveux:noirs,taille:geant,poids:mince', 'nom:Arthur,yeux:gris,cheveux:blanc,taille:grand,poids:mince', 'nom:Ambre,yeux:vairons,cheveux:roux,taille:geant,poids:mince', 'nom:Anna,yeux:noir,cheveux:vert,taille:grand,poids:mince', 'nom:Beatrice,yeux:vairons,cheveux:chatain,taille:grand,poids:enrobe', 'nom:Fatou,yeux:marrons,cheveux:roux,taille:geant,poids:enrobe', 'nom:Sylvie,yeux:vairons,cheveux:bleu,taille:geant,poids:moyen', 'nom:Jade,yeux:marrons,cheveux:blonds,taille:geant,poids:moyen', 'nom:Leon,yeux:vairons,cheveux:blanc,taille:moyen,poids:mince', 'nom:Tom,yeux:noir,cheveux:blonds,taille:grand,poids:mince', 'nom:Adam,yeux:bleus,cheveux:rouge,taille:moyen,poids:costaud', 'nom:Henri,yeux:gris,cheveux:noirs,taille:moyen,poids:enrobe', 'nom:Emma,yeux:noir,cheveux:chatain,taille:moyen,poids:mince', 'nom:Pauline,yeux:noir,cheveux:bleu,taille:moyen,poids:costaud', 'nom:Thomas,yeux:marrons,cheveux:chatain,taille:grand,poids:moyen', 'nom:Icham,yeux:marrons,cheveux:chatain,taille:geant,poids:enrobe', 'nom:Louis,yeux:noir,cheveux:noirs,taille:petit,poids:costaud', 'nom:Lena,yeux:gris,cheveux:noirs,taille:geant,poids:costaud', 'nom:Walim,yeux:marrons,cheveux:roux,taille:grand,poids:costaud'];


function solveProblem(indices, suspects) {
    return "";
}

console.log(`Answer: '${solveProblem(indices, suspects)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
	// [1/5] Indice n°: 1
	// [2/5] On enlève Mila car sa caractéristique de type cheveux n'est pas roux
	// [3/5] On enlève Kendji car sa caractéristique de type cheveux n'est pas roux
	// [4/5] On enlève Julia car sa caractéristique de type cheveux n'est pas roux
	// [5/5] On enlève Omar car sa caractéristique de type cheveux n'est pas roux


    const indices = ['cheveux_is_roux', 'taille_is_petit', 'poids_is_enrobe', 'yeux_is_noir', 'yeux_not_marrons'];
const suspects = ['nom:Ethan,yeux:noir,cheveux:roux,taille:petit,poids:enrobe', 'nom:Mila,yeux:bleus,cheveux:bruns,taille:moyen,poids:costaud', 'nom:Kendji,yeux:gris,cheveux:chatain,taille:grand,poids:costaud', 'nom:Julia,yeux:vairons,cheveux:bleu,taille:petit,poids:enrobe', 'nom:Omar,yeux:noir,cheveux:chatain,taille:moyen,poids:costaud'];

    const expected = 'Ethan_1'

    const result = solveProblem(indices, suspects);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit DETECTIVE')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: '8623588afefa3c7e4632c752edd9ef8ffce9508e8241d973e1e5541397cb233d4370065eef2ce386'"
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
