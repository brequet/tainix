/**
 * Tainix Challenge: Web-And-Cow [WAC_1]
 *
 * Challenge Token: c9cab801c74d20cee005eca42e1ebdcc218a76d7e8d67813ee64536a8fddee8f30511dbe9c647ebe
 *
 * Commands:
 * tainix test WAC_1
 * tainix submit WAC_1
 */

const inputData = {
  members: ["CDP", "DEV", "DEV", "DEV", "DIR", "DEV", "CDP"],
};

type InputData = typeof inputData;

function solve({ members }: InputData): string {
  const roleCounts = members.reduce((acc, role) => {
    acc[role] = (acc[role] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const dirChocolateCount = (roleCounts["DIR"] ?? 0) * (2 * 20 + 2 * 8 * 3);
  const cdpChocolateCount = (roleCounts["CDP"] ?? 0) * (20 + 2 * 6 * 3);
  const devChocolateCount = (roleCounts["DEV"] ?? 0) * (20 + 2 * 4 * 3);

  return (
    (
      ((dirChocolateCount + cdpChocolateCount + devChocolateCount) * 45) /
      1000
    ).toFixed(2) + "kg"
  );
}

// --- Tests ---
function test(): void {
  /*
   * Problem Steps:
   * - El Jefe del Cacao déguste à l'année 3.96kg de chocolat.
   * - Il y a 4 chef.fe.s de projet qui savourent à l'année 10.08kg de chocolat.
   * - Il y a 4 développeur.se.s qui apprécient à l'année 7.92kg de chocolat.
   */
  const testingData = {
    members: ["DEV", "CDP", "DEV", "DIR", "DEV", "CDP", "DEV", "CDP", "CDP"],
  };
  const expected = "21.96kg";
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
