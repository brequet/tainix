/**
 * Tainix Challenge: Bug-out-Shelter-2-Premiers-indices [SHELTER_2]
 *
 * Challenge Token: 6fa9809c35952c85edb5cc379aba65db6b33bd59ae397fdb996d30ffa06a2515266178d9f740a221
 *
 * Commands:
 * tainix test SHELTER_2
 * tainix submit SHELTER_2
 */

const inputData = {
  message:
    "ruhtrA|erbmA|miraK|eilemA|demahoM|ifoK|anelE|assI|aeL|evE|yerduA|seluJ|sinA",
  registre: [
    "Anis",
    "Liam",
    "Guillaume",
    "Rose",
    "Kofi",
    "Ambre",
    "Audrey",
    "Lea",
  ],
};

type InputData = typeof inputData;

function solve({ message, registre }: InputData): string {
  const names = message
    .split("|")
    .map((name) => name.split("").reverse().join(""));
  const filteredNames = names.filter((name) => registre.includes(name));

  return filteredNames.join("|");
}

// --- Tests ---
function test(): void {
  /*
   * Problem Steps:
   * - Kendji n'est pas dans le registre.
   * - Martine est dans le registre.
   * - Leo est dans le registre.
   * - Manon n'est pas dans le registre.
   * - Mila n'est pas dans le registre.
   * - Ambre est dans le registre.
   * - Audrey n'est pas dans le registre.
   * - Anis n'est pas dans le registre.
   * - Lucas n'est pas dans le registre.
   * - Issa n'est pas dans le registre.
   * - Rachid n'est pas dans le registre.
   * - David n'est pas dans le registre.
   * - Gabin est dans le registre.
   * - Tiago n'est pas dans le registre.
   * - Mariama est dans le registre.
   */
  const testingData = {
    message:
      "ijdneK|enitraM|oeL|nonaM|aliM|erbmA|yerduA|sinA|sacuL|assI|dihcaR|divaD|nibaG|ogaiT|amairaM",
    registre: [
      "Martine",
      "Rose",
      "Fatou",
      "Louis",
      "Ambre",
      "Mariama",
      "Leo",
      "Gabin",
    ],
  };
  const expected = "Martine|Leo|Ambre|Gabin|Mariama";
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

/**
 * Splits a string into an array of substrings, where each substring consists of
 * consecutive identical characters from the original string.
 * For example, "aaabbc" becomes ["aaa", "bb", "c"].
 *
 * @param input The input string to split.
 * @returns An array of substrings with consecutive identical characters.
 */
export function splitOnCharChange(input: string): string[] {
  return input.match(/(.)\1*/g) || [];
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
