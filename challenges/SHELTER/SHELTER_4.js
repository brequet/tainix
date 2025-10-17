/**
 * Tainix Challenge: Bug-out-Shelter-4-Silence-vital [SHELTER_4]
 *
 * Challenge Token: 99ec71cb3e7cdf45f81397be02816eb7a85de5b9bebdeb767123215cb230b5db7f24be72d30ac2e7
 *
 * Commands:
 * tainix test SHELTER_4
 * tainix submit SHELTER_4
 */
const inputData = {
    "control": 55,
    "equipements": [
        "GR:23",
        "JY:43",
        "OL:42",
        "AF:75",
        "JL:81",
        "VM:66",
        "TQ:74",
        "HT:38",
        "OW:77",
        "BH:29",
        "QN:46",
        "YT:53",
        "YL:72",
        "EI:90",
        "XM:79"
    ]
};
function solve({ control, equipements }) {
    const filteredEquipments = equipements
        .map(equipementStr => {
        const [name, levelStr] = equipementStr.split(':');
        const level = parseInt(levelStr, 10);
        return { name, level };
    })
        .filter(equipement => equipement.level > control);
    const totalReduction = filteredEquipments
        .map(equipement => equipement.level - control)
        .reduce((acc, cur) => acc + cur, 0);
    const problematicEquipments = filteredEquipments.map(equipement => equipement.name).join('');
    return `${problematicEquipments}_${totalReduction}`;
}
// --- Tests ---
function test() {
    /*
      * Problem Steps:
      * - Niveau sonore de contrôle : 52
      * - ⚠️ Équipement NQ : niveau 64 (dépasse de 12)
      * - ⚠️ Équipement UC : niveau 81 (dépasse de 29)
      * - ⚠️ Équipement DY : niveau 53 (dépasse de 1)
      * - ⚠️ Équipement LY : niveau 81 (dépasse de 29)
      * - ⚠️ Équipement VJ : niveau 71 (dépasse de 19)
      * - ✓ Équipement NI : niveau 32 (OK)
      * - ✓ Équipement IV : niveau 44 (OK)
      * - ✓ Équipement EK : niveau 51 (OK)
      * - ⚠️ Équipement DI : niveau 78 (dépasse de 26)
      * - ⚠️ Équipement PP : niveau 97 (dépasse de 45)
      * - ⚠️ Équipement KB : niveau 95 (dépasse de 43)
      * - ⚠️ Équipement AA : niveau 83 (dépasse de 31)
      * - ⚠️ Équipement XU : niveau 66 (dépasse de 14)
      * - ✓ Équipement HQ : niveau 47 (OK)
      * - ✓ Équipement QO : niveau 52 (OK)
      * - Résultat : 10 équipements problématiques - Réduction totale nécessaire : 249
      */
    const testingData = {
        "control": 52,
        "equipements": [
            "NQ:64",
            "UC:81",
            "DY:53",
            "LY:81",
            "VJ:71",
            "NI:32",
            "IV:44",
            "EK:51",
            "DI:78",
            "PP:97",
            "KB:95",
            "AA:83",
            "XU:66",
            "HQ:47",
            "QO:52"
        ]
    };
    const expected = "NQUCDYLYVJDIPPKBAAXU_249";
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


const result = solve({ control, equipements });
console.log(result);
