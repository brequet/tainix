init();
test();

// Challenge variables
const pokemons = ['Eau:47', 'Herbe:32', 'Eau:43', 'Feu:36', 'Poison:26', 'Poison:30', 'Feu:24', 'Herbe:29', 'Eau:40', 'Feu:27', 'Feu:26', 'Herbe:35', 'Feu:32', 'Insecte:97', 'Air:58', 'Eau:46', 'Herbe:33', 'Feu:21', 'Herbe:19', 'Herbe:31'];


function solveProblem(pokemons) {
    let s = pokemons.map(e => e.split(":"))
        .map(e => { return { type: e[0], power: Number(e[1]) } })
        .sort((a, b) => b.power - a.power)
    return ['Eau', 'Feu', 'Herbe'].map(e => s.find(e2 => e2.type == e).power).sumUp() + s.find(e => !['Eau', 'Feu', 'Herbe'].includes(e.type)).power
}

console.log(`Answer: '${solveProblem(pokemons)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
    // [1/4] Le meilleur Pokemon Eau a une puissance de 48
    // [2/4] Le meilleur Pokemon Feu a une puissance de 37
    // [3/4] Le meilleur Pokemon Herbe a une puissance de 35
    // [4/4] Le meilleur Pokemon Rare (Glace) a une puissance de 100


    const pokemons = ['Eau:13', 'Air:80', 'Glace:84', 'Glace:100', 'Air:82', 'Feu:14', 'Herbe:29', 'Feu:37', 'Glace:99', 'Herbe:33', 'Herbe:35', 'Eau:48'];

    const expected = '220'

    const result = solveProblem(pokemons);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit POKEMON_2')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: '8d96ab178fe3ef678a6ddc0137ee02318cc03e0e9867dfafa7479d22baf07dd309a93065a5312041'"
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
