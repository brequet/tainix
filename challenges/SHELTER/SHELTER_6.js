/**
 * Tainix Challenge: Bug-out-Shelter-6-Communication-trompeuse [SHELTER_6]
 *
 * Challenge Token: a8bfb1672830d6684f0ed811222a167c559b12a260ffb5be91bd3c06b397a0ba57333ea4f064bbc3
 *
 * Commands:
 * tainix test SHELTER_6
 * tainix submit SHELTER_6
 */
const inputData = {
    "coordinates": [
        "36f_32a",
        "1a0_227",
        "ee_2a9",
        "1ea_b9",
        "2cb_1b8",
        "ae_269"
    ],
    "z1": "223,638",
    "z2": "739,615",
    "z3": "516,381"
};
function solve({ coordinates, z1, z2, z3 }) {
    const coords = coordinates.map(coord => {
        const [xHex, yHex] = coord.split('_');
        return { x: parseInt(xHex, 16), y: parseInt(yHex, 16) };
    });
    const zones = [z1, z2, z3].map(zoneStr => {
        const [xStr, yStr] = zoneStr.split(',');
        return { x: parseInt(xStr, 10), y: parseInt(yStr, 10) };
    });
    for (const coord of coords) {
        const closestZone = zones.reduce((closest, zone) => {
            const distance = calculateDistance(coord.x, coord.y, zone.x, zone.y);
            return distance < closest.distance ? { zone, distance } : closest;
        }, { zone: zones[0], distance: Infinity });
        // Move 100 units away from the closest zone
        const deltaX = coord.x - closestZone.zone.x;
        const deltaY = coord.y - closestZone.zone.y;
        if (deltaX > 0) {
            coord.x += 100;
        }
        else if (deltaX < 0) {
            coord.x -= 100;
        }
        if (deltaY > 0) {
            coord.y += 100;
        }
        else if (deltaY < 0) {
            coord.y -= 100;
        }
    }
    const hexCoords = coords.map(coord => {
        const xHex = coord.x.toString(16);
        const yHex = coord.y.toString(16);
        return `${xHex}_${yHex}`;
    });
    return hexCoords.join("-");
}
function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}
// --- Tests ---
function test() {
    /*
      * Problem Steps:
      * - Première coordonnée : 1e6_fa
      * - Décrypté : 486,250
      * - Zones sensibles :
      * - - z1 : 337,691
      * - - z2 : 717,776
      * - - z3 : 477,324
      * - Calcul des distances :
      * - - z1 : 465.49
      * - - z2 : 574.49
      * - - z3 : 74.55
      * - Zone la plus proche : z3 (477,324)
      * - On se trouve à droite et en dessous de cette zone.
      * - On repousse de 100 vers : 586,150
      * - Crypté : 24a_96
      */
    const testingData = {
        "coordinates": [
            "1e6_fa",
            "e6_345",
            "19e_249",
            "2e5_303",
            "21b_293",
            "173_134"
        ],
        "z1": "337,691",
        "z2": "717,776",
        "z3": "477,324"
    };
    const expected = "24a_96-82_3a9-202_1e5-349_29f-27f_22f-10f_d0";
    const result = solve(testingData);
    if (result !== expected) {
        console.log(`❌ Test failed:
        - Expected: '${expected}'
        - Got:      '${result}'
    `);
    }
    else {
        console.log(`✅ Test passed! Got the expected result: ${expected}`);
    }
}
// --- Utility Functions ---
/**
 * Creates a dictionary of character occurrences from a string.
 * This function is case-sensitive.
 *
 * @param str The input string to process.
 * @returns A record mapping each character to its occurrence count.
 */
function stringToDictOfCharOccurrences(str) {
    return str.split("").reduce((acc, char) => {
        acc[char] = (acc[char] ?? 0) + 1;
        return acc;
    }, {});
}
/**
 * Converts a dictionary with numeric values into an array of [key, value] pairs,
 * sorted in descending order based on the values.
 *
 * @param dict The dictionary object to sort.
 * @returns A new array of [key, value] tuples, sorted descending by value.
 */
function dictionaryToSortedDescArray(dict) {
    return Object.entries(dict).sort(([, valA], [, valB]) => valB - valA);
}
/**
 * Converts an array of key-value pairs (tuples) into a dictionary object.
 *
 * @param pairs An array of [key, value] tuples.
 * @returns A new dictionary object created from the pairs.
 */
function arrayOfPairToDict(pairs) {
    return pairs.reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
    }, {});
}
/**
 * Calculates the sum of all numbers in an array.
 *
 * @param numbers An array of numbers.
 * @returns The total sum of the numbers.
 */
function sumUp(numbers) {
    return numbers.reduce((acc, cur) => acc + cur, 0);
}
/**
 * Logs an array to the console with an optional descriptive name.
 * Returns the array unchanged to allow for method chaining.
 *
 * @param arr The array to log.
 * @param arrName An optional name for the array to display in the log.
 * @returns The original array.
 */
function logArray(arr, arrName) {
    const label = arrName ? `Logging array ${arrName}:` : "Logging array:";
    console.log(label, arr);
    return arr;
}
/**
 * Sorts an array of numbers in ascending order.
 * This function does not mutate the original array.
 *
 * @param arr The array of numbers to sort.
 * @returns A new array sorted in ascending order.
 */
function sortAsc(arr) {
    return [...arr].sort((a, b) => a - b);
}
/**
 * Sorts an array of numbers in descending order.
 * This function does not mutate the original array.
 *
 * @param arr The array of numbers to sort.
 * @returns A new array sorted in descending order.
 */
function sortDesc(arr) {
    return [...arr].sort((a, b) => b - a);
}
/**
 * Logs any object to the console with an optional descriptive name.
 * Returns the object unchanged to allow for method chaining.
 *
 * @param obj The object to log.
 * @param objName An optional name for the object to display in the log.
 * @returns The original object.
 */
function logObject(obj, objName) {
    const label = objName ? `Logging ${objName}:` : "Logging:";
    console.log(label, obj);
    return obj;
}
/**
 * Splits a string into an array of substrings, where each substring consists of
 * consecutive identical characters from the original string.
 * For example, "aaabbc" becomes ["aaa", "bb", "c"].
 *
 * @param input The input string to split.
 * @returns An array of substrings with consecutive identical characters.
 */
function splitOnCharChange(input) {
    return input.match(/(.)\1*/g) || [];
}


const result = solve({ coordinates, z1, z2, z3 });
console.log(result);
