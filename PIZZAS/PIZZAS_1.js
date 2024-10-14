init();
test();

// Challenge variables
const ingredients = ['tomates:1', 'champignons:3', 'mozzarella:3', 'jambon:3', 'serrano:5', 'chevre:2', 'oeuf:3', 'chorizo:5', 'saumon:5', 'basilic:2', 'oignons:2', 'poivron:1', 'salade:2', 'anchois:2', 'olive:2', 'ananas:3'];
const pizzas = ['olive,anchois,ananas,serrano,olive', 'basilic,champignons,oignons', 'jambon,champignons,salade,basilic,chevre', 'oeuf,poivron,saumon', 'mozzarella,tomates,chorizo,jambon,anchois', 'mozzarella,anchois,oeuf,olive,salade,poivron', 'champignons,serrano,saumon,chevre', 'basilic,salade,olive,salade,saumon,saumon', 'saumon,jambon,tomates,jambon,ananas', 'serrano,basilic,chevre,oignons', 'anchois,serrano,saumon,chevre,chevre,chorizo', 'serrano,chevre,oignons,jambon,tomates', 'champignons,oeuf,serrano,olive,chevre', 'basilic,serrano,ananas,ananas,chorizo,salade', 'champignons,serrano,ananas,salade,oignons', 'salade,oeuf,saumon,chorizo,chevre,champignons', 'anchois,ananas,salade', 'anchois,tomates,olive,anchois', 'oignons,oeuf,saumon,basilic,jambon,tomates', 'salade,basilic,oignons', 'tomates,champignons,mozzarella', 'jambon,olive,oignons,chorizo,oignons', 'olive,oeuf,anchois,chevre,chevre', 'oignons,olive,anchois,oignons,salade,basilic', 'mozzarella,basilic,poivron,jambon,jambon,oignons'];
const pizzaiolos = ['donatello', 'leonardo', 'donatello', 'michelangelo', 'michelangelo', 'raphael', 'donatello', 'michelangelo', 'donatello', 'donatello', 'raphael', 'michelangelo', 'michelangelo', 'donatello', 'donatello', 'raphael', 'raphael', 'raphael', 'donatello', 'donatello', 'raphael', 'michelangelo', 'leonardo', 'leonardo', 'donatello'];


function solveProblem(ingredients, pizzas, pizzaiolos) {
    let ings = ingredients.reduce((acc, curr) => {
        let [ing, qty] = curr.split(':')
        acc[ing] = parseInt(qty)
        return acc
    }, {})
    return pizzas.map((pizza, i) => {
        let is = pizza.split(',').map(ing => ings[ing]).sortDesc()
        if (pizzaiolos[i] == 'leonardo') {
            return is.sumUp()
        } else if (pizzaiolos[i] == 'donatello') {
            return is[0] * 5
        } else if (pizzaiolos[i] == 'michelangelo') {
            return is.slice(0, 2).sumUp() * 3
        } else if (pizzaiolos[i] == 'raphael') {
            return 10 + (is[0] + is.at(-1))
        }
    }).sumUp();
}

console.log(`Answer: '${solveProblem(ingredients, pizzas, pizzaiolos)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS
    // [1/13] Donatello compte 20€ pour la pizza composée de : ananas,champignons,oignons,anchois
    // [2/13] Raphael compte 16€ pour la pizza composée de : olive,tomates,ananas,serrano,ananas,champignons
    // [3/13] Raphael compte 17€ pour la pizza composée de : oignons,chorizo,champignons,poivron,salade,anchois
    // [4/13] Leonardo compte 13€ pour la pizza composée de : anchois,chevre,oeuf,chevre,anchois
    // [5/13] Leonardo compte 10€ pour la pizza composée de : serrano,champignons,anchois,basilic
    // [6/13] Michelangelo compte 18€ pour la pizza composée de : chevre,salade,jambon
    // [7/13] Raphael compte 15€ pour la pizza composée de : salade,saumon,basilic,poivron,olive
    // [8/13] Michelangelo compte 30€ pour la pizza composée de : anchois,ananas,anchois,oignons,ananas,chorizo
    // [9/13] Michelangelo compte 21€ pour la pizza composée de : poivron,salade,salade,ananas,salade
    // [10/13] Raphael compte 14€ pour la pizza composée de : oignons,salade,chevre,anchois
    // [11/13] Michelangelo compte 27€ pour la pizza composée de : chevre,oeuf,oignons,chorizo,jambon
    // [12/13] Leonardo compte 17€ pour la pizza composée de : mozzarella,ananas,oignons,chorizo,chevre,oignons
    // [13/13] Donatello compte 20€ pour la pizza composée de : oignons,serrano,chevre,basilic,champignons


    const ingredients = ['tomates:2', 'champignons:2', 'mozzarella:2', 'jambon:3', 'serrano:4', 'chevre:3', 'oeuf:3', 'chorizo:6', 'saumon:4', 'basilic:2', 'oignons:1', 'poivron:1', 'salade:3', 'anchois:2', 'olive:2', 'ananas:4'];
    const pizzas = ['ananas,champignons,oignons,anchois', 'olive,tomates,ananas,serrano,ananas,champignons', 'oignons,chorizo,champignons,poivron,salade,anchois', 'anchois,chevre,oeuf,chevre,anchois', 'serrano,champignons,anchois,basilic', 'chevre,salade,jambon', 'salade,saumon,basilic,poivron,olive', 'anchois,ananas,anchois,oignons,ananas,chorizo', 'poivron,salade,salade,ananas,salade', 'oignons,salade,chevre,anchois', 'chevre,oeuf,oignons,chorizo,jambon', 'mozzarella,ananas,oignons,chorizo,chevre,oignons', 'oignons,serrano,chevre,basilic,champignons'];
    const pizzaiolos = ['donatello', 'raphael', 'raphael', 'leonardo', 'leonardo', 'michelangelo', 'raphael', 'michelangelo', 'michelangelo', 'raphael', 'michelangelo', 'leonardo', 'donatello'];

    const expected = '238'

    const result = solveProblem(ingredients, pizzas, pizzaiolos);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit PIZZAS')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: 'd7ad0cdcb718c4d95f2d909fe60488691e0ff3984bd6141c7910636ab7577e0d646acb4b0d248ad0'"
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

function isNumeric(str) {
    return /^\d+$/.test(str);
}
