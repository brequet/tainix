init();
test();

// Challenge variables
const pseudo = 'Aurore Niang';
const list = ['Amelie Gagne', 'Yara Bello', 'Amara Konate', 'Salome Gagnon', 'Leonie Lessard', 'Zoe Caron', 'Sabrina Emond', 'Leila Charbonneau', 'Kenza Lacasse', 'Halima Daigle', 'Linaelle Gosselin', 'Kalina Dupont', 'Yasmin Bello', 'Capucine Lefebvre', 'Lila Parent', 'Tamara Akindele', 'Jamila Gomis', 'Lucie Kone', 'Nala Guay', 'Apolline Lalande', 'Malika Simard', 'Leane Chevalier', 'Anouk Pelletier', 'Ines Bailly', 'Layla Goulet', 'Hafsa Martin', 'Louna Charbonneau', 'Habiba Eboue', 'Nia Liu', 'Zuri Poirier', 'Charlotte Brunet', 'Clemence Ouellet', 'Solene Lee', 'Ayana Babin', 'Oceane Roy', 'Mathilde Caron', 'Rania Akindele', 'Camille Dallaire', 'Leonore Lamoureux', 'Dalia Kaya', 'Carmen Bello', 'Naima Demers', 'Romane Goulet', 'Reina Diop', 'Fatima Pelletier', 'Zainab Plante', 'Louise Brault', 'Marilou Caron', 'Aaliyah Dube', 'Annaelle Girard', 'Coralie Liu', 'Maelys Mendy'];

function computeWeight(name) {
    return name.split("").map(char => {
        if (char == ' ') return 0
        if (char == char.toLowerCase()) return char.charCodeAt(0) - 96
        else return char.toLowerCase().charCodeAt(0) - 96 + 26
    })
        .sumUp()
}

function solveProblem(pseudo, list) {
    return list.map(e => { return { w: computeWeight(e), n: e } })
        .reverse()
        .find(e => e.w == computeWeight(pseudo)).n

}

console.log(`Answer: '${solveProblem(pseudo, list)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
    // [1/4] Yasmin Chung a un poids de 186.
    // [2/4] Ebru Deschamps correspond !
    // [3/4] Anouk Boucher correspond !
    // [4/4] Anouk Boucher est le dernier nom de la liste à correspondre.


    const pseudo = 'Yasmin Chung';
    const list = ['Solene Pilon', 'Capucine Lefebvre', 'Margot Lachance', 'Elise Lemay', 'Louise Langlois', 'Nala Chung', 'Carmen Fortin', 'Thalia Brault', 'Alix Ouellet', 'Apolline Lemieux', 'Manon Kim', 'Malika Ali', 'Ebru Deschamps', 'Oceane Nguyen', 'Camille Poirier', 'Samira Martin', 'Yara Fabre', 'Anouk Boucher', 'Zuri Dube', 'Habiba Lamoureux', 'Mariam Belanger', 'Louna Konate', 'Giselle Kamara', 'Amelie Labonte', 'Farida Chevalier', 'Sariyah Lefebvre', 'Hafsa Desrosiers', 'Zoe Abdullah', 'Selma Gagne', 'Kadija Fabre', 'Mathilde Lacasse', 'Charlotte Abdullah', 'Leonie Langlois', 'Sara Dubois', 'Alice Daigle', 'Aurore Leblanc', 'Lucie Lepage', 'Aisha Gagne', 'Valentina Konate', 'Ayana Kouyate', 'Kamila Gagnon', 'Tamara Durand', 'Mahaut Gosselin', 'Kehinde Gonzalez', 'Maelys Rochon', 'Zara Liu', 'Aaliyah Larose', 'Annaelle Dumont', 'Zainab Barthelemy', 'Dalia Chevalier', 'Suhaila Durand', 'Nia Bello'];

    const expected = 'Anouk Boucher'

    const result = solveProblem(pseudo, list);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit DIGITALART_3')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: '860683ad3a215136bb9b85b9bebb9a81e0c11f2672dbc54a7ec5096f14614d0692d5289880a0610c'"
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
