/**
 * Tainix Challenge: Bug-out-Shelter-5-Surveillance-externe [SHELTER_5]
 * 
 * Challenge Token: ff3326adc6c202346763e2133f9725d707ca85f671fd72ba81c8d4090a6265a7ab2885a0a1488fa4
 * 
 * Commands:
 * tainix test SHELTER_5
 * tainix submit SHELTER_5
 */

const inputData = {
  "lines": [
    "1:9,25,42,57,76,89,106,126,140,156",
    "15:11,28,48,65,79",
    "26:8,20,34,46,57,70,85",
    "44:3,17,27,43,60,73,83,102,112,130",
    "61:13,28,46,65,76"
  ],
  "x": 59,
  "y": 47
};

type InputData = typeof inputData;

function solve({ lines, x, y }: InputData): string {
  const shelters = lines.map(line => {
    const [y, xs] = line.split(':');
    const xValues = xs.split(',').map(Number);
    return { y: Number(y), xValues };
  })

  const sheltersInRange = [];
  for (const shelter of shelters) {
    for (const xShelter of shelter.xValues) {
      const distance = calculateDistance(x, y, xShelter, shelter.y);
      if (distance <= 20) {
        // console.log(`Found shelter ${shelter.y},${xShelter} at distance ${distance.toFixed(1)} km`);
        sheltersInRange.push({ x: xShelter, y: shelter.y, distance });
      }
    }

  }

  return `${sheltersInRange.length}:${sheltersInRange.map(s => s.x).sort((a, b) => a - b).join(',')}`;
}

function calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

// --- Tests ---
function test(): void {
  /*
    * Problem Steps:
    * - Abri trouvé aux coordonnées 59,64 à une distance de 8.6 km de la station militaire
    * - Abri trouvé aux coordonnées 59,78 à une distance de 8.6 km de la station militaire
    */
  const testingData = {
    "lines": [
      "4:3,21,31,43,56,72,86,106",
      "16:7,26,38,53,69,88",
      "30:12,28,44,63,75,95,112,128,147,161",
      "43:14,33,50,67,78,97,107,119,131",
      "59:10,29,49,64,78,91"
    ],
    "x": 71,
    "y": 64
  };
  const expected = "2:64,78";
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
