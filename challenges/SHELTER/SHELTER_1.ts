/**
 * Tainix Challenge: Bug-out-Shelter-1-Le-signal [SHELTER_1]
 *
 * Challenge Token: 77aa03ba00d7e583a13d1268d4bd23233bccc9ae46d755b7f9f096c40a63953e2ee629d48c88dedb
 *
 * Commands:
 * tainix test SHELTER_1
 * tainix submit SHELTER_1
 */

const inputData = {
  message_x:
    "Tango Romeo Oscar India Sierra Space Zulu Echo Romeo Oscar Space Delta Echo Uniform X-ray Space Sierra Echo Papa Tango",
  message_y:
    "November Echo Uniform Foxtrot Space Quebec Uniform Alpha Tango Romeo Echo Space Hotel Uniform India Tango Space Quebec Uniform Alpha Tango Romeo Echo",
};

type InputData = typeof inputData;

function solve({ message_x, message_y }: InputData): string {
  return `${messageToNumber(message_x)}_${messageToNumber(message_y)}`;
}

function messageToNumber(message: string): string {
  const numberStringToNumber: Record<string, number> = {
    ZERO: 0,
    UN: 1,
    DEUX: 2,
    TROIS: 3,
    QUATRE: 4,
    CINQ: 5,
    SIX: 6,
    SEPT: 7,
    HUIT: 8,
    NEUF: 9,
  };

  const letters = message.split(" Space ").map((subMessage) =>
    subMessage
      .split(" ")
      .map((word) => word[0])
      .join("")
  );

  return letters
    .map((numberString) => numberStringToNumber[numberString])
    .join("");
}

// --- Tests ---
function test(): void {
  /*
   * Problem Steps:
   * - Si tu es perdu.e, demande à Jack Bauer un peu d'aide.
   */
  const testingData = {
    message_x:
      "Quebec Uniform Alpha Tango Romeo Echo Space Delta Echo Uniform X-ray Space Delta Echo Uniform X-ray Space Sierra India X-ray",
    message_y:
      "Uniform November Space Hotel Uniform India Tango Space Charlie India November Quebec Space Zulu Echo Romeo Oscar",
  };
  const expected = "4226_1850";
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
