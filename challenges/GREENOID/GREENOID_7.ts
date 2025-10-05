/**
 * Tainix Challenge: Greenoid-7 [GREENOID_7]
 *
 * Challenge Token: d7832d9ff2d531c708e3fb6e011972d9daa47a9bee8e6d9f28a78b4e76c39bda32feb33eca9176f3
 *
 * Commands:
 * tainix test GREENOID_7
 * tainix submit GREENOID_7
 */

const inputData = {
  keys: [
    "7mn35c871gkl",
    "vuw6221gm62w6",
    "x9x64g7x1h247",
    "11j45z47ep",
    "t6hb4342x73",
    "vk72st2q9238",
    "bt778y65x251",
    "1t5h576zeq67",
  ],
};

type InputData = typeof inputData;

function solve({ keys }: InputData): string {
  const firstTransformations = keys.map((key) =>
    sumUp(key.split("").map(charToValue))
  );

  // console.log(firstTransformations);

  const to8bitsBynaryArray = firstTransformations.map((num) =>
    num.toString(2).padStart(8, "0")
  );

  // console.log(to8bitsBynaryArray);

  const compositions = new Set<string>();
  for (let i = 0; i < to8bitsBynaryArray.length - 1; i++) {
    for (let j = i + 1; j < to8bitsBynaryArray.length; j++) {
      compositions.add(compose(to8bitsBynaryArray[i], to8bitsBynaryArray[j]));
    }
  }

  // console.log(compositions);

  const ascSortedCompositions = Array.from(compositions)
    .sort()
    .map((bin) => parseInt(bin, 2))
    .map((num) => num % 36)
    .map(valueToChar);
  // console.log(ascSortedCompositions);

  return ascSortedCompositions.join("");
}

function charToValue(char: string): number {
  if (char >= "0" && char <= "9") {
    return parseInt(char, 10);
  } else if (char >= "a" && char <= "z") {
    return char.charCodeAt(0) - "a".charCodeAt(0) + 10;
  }
  throw new Error(`Invalid character: ${char}`);
}

function valueToChar(value: number): string {
  if (value >= 0 && value <= 9) {
    return value.toString();
  } else if (value >= 10 && value <= 35) {
    return String.fromCharCode(value - 10 + "a".charCodeAt(0));
  }
  throw new Error(`Invalid value: ${value}`);
}

function compose(binA: string, binB: string): string {
  const res = [];
  for (let i = 0; i < binA.length; i++) {
    res.push(binA[i] === binB[i] ? 1 : 0);
  }
  return res.join("");
}

// --- Tests ---
function test(): void {
  /*
   * Problem Steps:
   * - --------- Extrait système ----------
   * - Composition des clés 84gu3k5p31 et pgg8zp15g986
   * - Les valeurs numériques sont 115 et 170
   * - Les valeurs binaires sur 8 bits sont 01110011 et 10101010
   * - La composition est 00100110
   * - -------- Fin extrait système -------
   */
  const testingData = {
    keys: [
      "84gu3k5p31",
      "pgg8zp15g986",
      "h935745wia9",
      "5sci3434g7",
      "ayn5pi3949359",
      "f4a618l28z88",
      "25a77u6xd92",
      "e67e9a39g664",
    ],
  };
  const expected = "6ahlsuy257dpk8cdfghjkoqrsuz1";
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
