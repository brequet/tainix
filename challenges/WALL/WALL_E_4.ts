/**
 * Tainix Challenge: WALL-E-4-un-peu-de-rangement [WALL_E_4]
 *
 * Challenge Token: 723630cb746b75c704eaf4296ad39a711467b20767dc2bc375bde0b84783e06d25a9d778ee8e8d1b
 *
 * Commands:
 * tainix test WALL_E_4
 * tainix submit WALL_E_4
 */

const inputData = {
  blocs:
    "YYYYYYYYZZZZZZZZZRRRRRRRRRFFFFFFFFSSTTTTMMMMXXXXXWWWWWWWWYYYZZZZRRRRRRRRRFFFFFFFSSSSSTTTTTTTMMMMMMMMMXXXWWWWYYYYZZZRRRRRRRRRFFSSSSSTTTTTTTTTMMMM",
};

type InputData = typeof inputData;

function solve({ blocs }: InputData): string {
  const groupedBlocks = splitOnCharChange(blocs);

  return groupedBlocks
    .map((blockGroup) =>
      blockGroup.length % 2 === 1 ? blockGroup.charAt(0) : null
    )
    .filter((char): char is string => char !== null)
    .join("");
}

function splitOnCharChange(input: string): string[] {
  return input.match(/(.)\1*/g) || [];
}

// --- Tests ---
function test(): void {
  /*
   * Problem Steps:
   * - Il y a 7 blocs B. Il faut donc en retirer un.
   * - Il y a 4 blocs L. Rien à retirer.
   * - Il y a 6 blocs Z. Rien à retirer.
   * - Il y a 4 blocs N. Rien à retirer.
   * - Il y a 2 blocs P. Rien à retirer.
   * - Il y a 9 blocs Y. Il faut donc en retirer un.
   * - Il y a 8 blocs B. Rien à retirer.
   * - Il y a 6 blocs L. Rien à retirer.
   * - Il y a 7 blocs Z. Il faut donc en retirer un.
   * - Il y a 4 blocs N. Rien à retirer.
   * - Il y a 2 blocs P. Rien à retirer.
   * - Il y a 6 blocs Y. Rien à retirer.
   * - Il y a 5 blocs B. Il faut donc en retirer un.
   * - Il y a 5 blocs L. Il faut donc en retirer un.
   * - Il y a 9 blocs Z. Il faut donc en retirer un.
   * - Il y a 5 blocs N. Il faut donc en retirer un.
   * - Il y a 7 blocs P. Il faut donc en retirer un.
   * - Il y a 7 blocs Y. Il faut donc en retirer un.
   * - Il y a 3 blocs B. Il faut donc en retirer un.
   * - Il y a 7 blocs L. Il faut donc en retirer un.
   * - Il y a 8 blocs Z. Rien à retirer.
   * - Il y a 5 blocs N. Il faut donc en retirer un.
   */
  const testingData = {
    blocs:
      "BBBBBBBLLLLZZZZZZNNNNPPYYYYYYYYYBBBBBBBBLLLLLLZZZZZZZNNNNPPYYYYYYBBBBBLLLLLZZZZZZZZZNNNNNPPPPPPPYYYYYYYBBBLLLLLLLZZZZZZZZNNNNN",
  };
  const expected = "BYZBLZNPYBLN";
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
