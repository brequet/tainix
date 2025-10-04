/**
 * Tainix Challenge: WALL-E-5-retrouve-EVE [WALL_E_5]
 *
 * Challenge Token: 4c669c76c8a2de829da51660e7d991e4c8f786cfc05b6290e040613335a98c4173e7ae9367b9ce2c
 *
 * Commands:
 * tainix test WALL_E_5
 * tainix submit WALL_E_5
 */

const inputData = {
  shots: [2, 5, 8, 5, 8, 3, 6, 5, 2, 7, 6, 8, 5, 2, 4, 4, 7],
};

type InputData = typeof inputData;

function solve({ shots }: InputData): string {
  let totalDistance = 0;
  let currentSpeed = 0;

  for (const targetSpeed of shots) {
    const speedDiff = targetSpeed - currentSpeed;
    const acceleration = speedDiff > 0;
    let newDistance = 0;
    if (acceleration) {
      newDistance = 3.14 * targetSpeed;
    } else {
      newDistance = (2 * 3.14 * targetSpeed) / 3;
    }
    console.log(
      `From ${currentSpeed} to ${targetSpeed} (${
        acceleration ? "accélération" : "décélération"
      }) => ${newDistance}`
    );
    // Fix the newDistance to 2 decimal places before adding to totalDistance
    totalDistance += parseFloat(newDistance.toFixed(2));
    currentSpeed = targetSpeed;
  }

  return totalDistance.toFixed(2);
}

// --- Tests ---
function test(): void {
  /*
   * Problem Steps:
   * - Accélération (0 =&gt; 9) avancée de 28.26 m.
   * - Décélération (9 =&gt; 3) avancée de 6.28 m.
   * - Accélération (3 =&gt; 8) avancée de 25.12 m.
   * - Décélération (8 =&gt; 6) avancée de 12.56 m.
   */
  const testingData = {
    shots: [9, 3, 8, 6],
  };
  const expected = "72.22";
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
