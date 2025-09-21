init();
test();

// Challenge variables
const decalage = -7;
const mot_crypte = 'xgotlbxs';


function solveProblem(decalage, mot_crypte) {
    var caesarShift = function (str, amount) {
        // Wrap the amount
        if (amount < 0) {
            return caesarShift(str, amount + 26);
        }

        // Make an output variable
        var output = "";

        // Go through each character
        for (var i = 0; i < str.length; i++) {
            // Get the character we'll be appending
            var c = str[i];

            // If it's a letter...
            if (c.match(/[a-z]/i)) {
                // Get its code
                var code = str.charCodeAt(i);

                // Uppercase letters
                if (code >= 65 && code <= 90) {
                    c = String.fromCharCode(((code - 65 + amount) % 26) + 65);
                }

                // Lowercase letters
                else if (code >= 97 && code <= 122) {
                    c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
                }
            }

            // Append
            output += c;
        }

        // All done!
        return output;
    };
    return caesarShift(mot_crypte, -decalage);
}

console.log(`Answer: '${solveProblem(decalage, mot_crypte)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    const decalage = -8;
    const mot_crypte = 'zwyajw';

    const expected = 'hegire'

    const result = solveProblem(decalage, mot_crypte);
    if (result !== expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit SECRET_1')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: 'e388c1be121c8eaa7c6c2810e23718adc27a53ae682dceee9f56a04dbce22a20dc73bf47db7de65a'"
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

cl = console.log
