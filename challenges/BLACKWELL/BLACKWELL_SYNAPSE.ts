/**
 * Tainix Challenge: Affaire-BL4CKWELL-Docteur-Synapse [BLACKWELL_SYNAPSE]
 * 
 * Challenge Token: f2c6d4ea1f3ae17cba7e0e93d7f17dd1cdfc4f04b2152be1657cc4548904b5c5391593156f8a7ee6
 * 
 * Commands:
 * tainix test BLACKWELL_SYNAPSE
 * tainix submit BLACKWELL_SYNAPSE
 */

const inputData = {
  "timestamps": [
    1746655200,
    1746655239,
    1746655278,
    1746655317,
    1746655356,
    1746655403,
    1746655442,
    1746655481,
    1746655520,
    1746655559,
    1746655598,
    1746655637,
    1746655683,
    1746655722,
    1746655761,
    1746655800,
    1746655839,
    1746655878,
    1746655922,
    1746655961,
    1746656000,
    1746656039
  ]
};

type InputData = typeof inputData;

function solve({ timestamps }: InputData): string {
  return "";
}

// --- Tests ---
function test(): void {
 /*
   * Problem Steps:
   * - Timestamp 1755122554 ne respecte pas l'intervalle de 22 secondes.
   * - Timestamp 1755122758 ne respecte pas l'intervalle de 22 secondes.
   */
  const testingData = {
  "timestamps": [
    1755122400,
    1755122422,
    1755122444,
    1755122466,
    1755122488,
    1755122510,
    1755122532,
    1755122554,
    1755122582,
    1755122604,
    1755122626,
    1755122648,
    1755122670,
    1755122692,
    1755122714,
    1755122736,
    1755122758,
    1755122789,
    1755122811,
    1755122833,
    1755122855,
    1755122877,
    1755122899,
    1755122921,
    1755122943
  ]
};
  const expected = "1755122582_1755122789";
  const result = solve(testingData);

  if (result !== expected) {
    console.log(`❌ Test failed:
        - Expected: '${expected}'
        - Got:      '${result}'
    `);
  } else {
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
export function stringToDictOfCharOccurrences(
  str: string
): Record<string, number> {
  return str.split("").reduce((acc, char) => {
    acc[char] = (acc[char] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}

/**
 * Converts a dictionary with numeric values into an array of [key, value] pairs,
 * sorted in descending order based on the values.
 *
 * @param dict The dictionary object to sort.
 * @returns A new array of [key, value] tuples, sorted descending by value.
 */
export function dictionaryToSortedDescArray(
  dict: Record<string, number>
): [string, number][] {
  return Object.entries(dict).sort(([, valA], [, valB]) => valB - valA);
}

/**
 * Converts an array of key-value pairs (tuples) into a dictionary object.
 *
 * @param pairs An array of [key, value] tuples.
 * @returns A new dictionary object created from the pairs.
 */
export function arrayOfPairToDict<T>(pairs: [string, T][]): Record<string, T> {
  return pairs.reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {} as Record<string, T>);
}

/**
 * Calculates the sum of all numbers in an array.
 *
 * @param numbers An array of numbers.
 * @returns The total sum of the numbers.
 */
export function sumUp(numbers: number[]): number {
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
export function logArray<T>(arr: T[], arrName?: string): T[] {
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
export function sortAsc(arr: number[]): number[] {
  return [...arr].sort((a, b) => a - b);
}

/**
 * Sorts an array of numbers in descending order.
 * This function does not mutate the original array.
 *
 * @param arr The array of numbers to sort.
 * @returns A new array sorted in descending order.
 */
export function sortDesc(arr: number[]): number[] {
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
export function logObject<T>(obj: T, objName?: string): T {
  const label = objName ? `Logging ${objName}:` : "Logging:";
  console.log(label, obj);
  return obj;
}

// --- Command Handling ---
type Command = "test" | "run";

function getCommandFromArgs(): Command {
  if (process.argv.length < 3) {
    return "run";
  }

  const cmd = process.argv[2];
  const validCommands: Command[] = ["test", "run"];

  if (validCommands.includes(cmd)) {
    return cmd as Command;
  }

  console.log(`Invalid command: '${cmd}'. Defaulting to 'run'.`);
  return "run";
}

const command = getCommandFromArgs();

if (command === "test") {
  test();
} else {
  const result = solve(inputData);
  console.log(`Challenge result is: ${result}`);
}
