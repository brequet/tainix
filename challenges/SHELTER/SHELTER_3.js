/**
 * Tainix Challenge: Bug-out-Shelter-3-Connexion-a-distance [SHELTER_3]
 *
 * Challenge Token: 7a0bbd26995b9c45bd02174da06048ddab065aa884853cac8483be1d92fd5355e3642e9f4fa3f142
 *
 * Commands:
 * tainix test SHELTER_3
 * tainix submit SHELTER_3
 */
const inputData = {
    "shelters": [
        "MBT_E:18_N:2_S:17",
        "IPB_E:26_N:8_S:17",
        "TMN_E:26_N:12_S:17",
        "GLL_E:2_N:7_S:10",
        "PPW_E:30_N:2_S:26",
        "JAO_E:3_N:3_S:19",
        "LYS_E:15_N:16_S:16",
        "ZUO_E:7_N:7_S:5",
        "YPW_E:28_N:3_S:11",
        "PRO_E:34_N:40_S:31"
    ]
};
function solve({ shelters }) {
    const parsedShelters = shelters.map(shelterStr => {
        const [name, equipmentStr, foodStr, healthStr] = shelterStr.split('_');
        const equipment = parseInt(equipmentStr.split(':')[1], 10);
        const food = parseInt(foodStr.split(':')[1], 10);
        const health = parseInt(healthStr.split(':')[1], 10);
        const bonus1 = (equipment >= 15 && food >= 15 && health >= 15) ? 8 : 0;
        const malus1 = (food <= 10 || health <= 10) ? 10 : 0;
        const score = Math.floor((equipment * 0.25 + food * 0.4 + health * 0.35) * 2.25) + bonus1 - malus1;
        console.log(`Shelter ${name}: E=${equipment}, N=${food}, S=${health} => Score: ${score}`);
        return { name, equipment, food, health, score: Math.min(Math.max(score, 0), 100) };
    });
    const bestShelter = parsedShelters.reduce((best, current) => current.score > best.score ? current : best, parsedShelters[0]);
    const averageScore = Math.floor(parsedShelters.reduce((sum, shelter) => sum + shelter.score, 0) / parsedShelters.length);
    return `${bestShelter.name}_${bestShelter.score}_${averageScore}`;
}
// --- Tests ---
function test() {
    /*
      * Problem Steps:
      * - Abri LRV : E=4, N=8, S=20 =&gt; Score: 15
      * - Abri IVA : E=2, N=7, S=13 =&gt; Score: 7
      * - Abri PRO : E=40, N=36, S=37 =&gt; Score: 92
      * - Abri NSX : E=16, N=6, S=20 =&gt; Score: 20
      * - Abri TJR : E=8, N=8, S=23 =&gt; Score: 19
      * - Abri CJC : E=15, N=4, S=20 =&gt; Score: 17
      * - Abri GPL : E=4, N=4, S=22 =&gt; Score: 13
      * - Meilleur abri : PRO avec un score de 92 (moyenne: 26)
      */
    const testingData = {
        "shelters": [
            "LRV_E:4_N:8_S:20",
            "IVA_E:2_N:7_S:13",
            "PRO_E:40_N:36_S:37",
            "NSX_E:16_N:6_S:20",
            "TJR_E:8_N:8_S:23",
            "CJC_E:15_N:4_S:20",
            "GPL_E:4_N:4_S:22"
        ]
    };
    const expected = "PRO_92_26";
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


const result = solve({ shelters });
console.log(result);
