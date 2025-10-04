/**
 * Tainix Challenge: CTC-7-Course-poursuite [DIGITALART_7]
 *
 * Challenge Token: 64a135bd8bbad15b9359673d8b4a56bcf69fa4707c008f67a0cec26db49fb07e3f62fe61d8389e1c
 *
 * Commands:
 * tainix test DIGITALART_7
 * tainix submit DIGITALART_7
 */

const inputData = {
  track:
    "R34_T62_S26_O58_T35_R83_T22_O82_R48_T82_R94_T88_S85_C72_S48_O71_C56_S30_R26_O50_T64",
  delay: 192,
};

type InputData = typeof inputData;

function solve({ delay, track }: InputData): string {
  let targetTimeCount = delay;
  let meTimeCount = 0;

  const segments = track.split("_").map((segment) => {
    const type = segment[0];
    const length = parseInt(segment.slice(1), 10);
    return { type, length };
  });

  for (const segment of segments) {
    const { type, length } = segment;

    const meSegmentTime = timeForSegment(type, length);
    meTimeCount += length;
    targetTimeCount += meSegmentTime;

    console.log(`Target takes ${length}s ; Me takes ${meSegmentTime}s`);

    console.log(
      `Target: ${targetTimeCount}s, Me: ${meTimeCount}s ; Delta: ${
        targetTimeCount - meTimeCount
      }s`
    );

    if (meTimeCount >= targetTimeCount) {
      return `${segment.type}${segment.length}:${targetTimeCount - delay}`;
    }
  }

  return "";
}

function timeForSegment(type: string, length: number): number {
  switch (type) {
    case "R":
      return Math.ceil(length * 0.9);
    case "T":
      return length - 5;
    case "C":
      return length - 10;
    case "S":
      return Math.ceil(length * 0.5);
    case "O":
    default:
      return 0;
  }
}

// --- Tests ---
function test(): void {
  /*
   * Problem Steps:
   * - Une route longue de 44m. Vilain met 44 sec. Ada met 40sec.
   * - Le delta est désormais de 29 sec.
   * - Un carrefour long de 32m. Vilain met 32 sec. Ada met 22sec.
   * - Le delta est désormais de 19 sec.
   * - Une station de métro longue de 28m. Vilain met 28 sec. Ada met 14sec.
   * - Le delta est désormais de 5 sec.
   * - Une route longue de 21m. Vilain met 21 sec. Ada met 19sec.
   * - Le delta est désormais de 3 sec.
   * - Des obstacles sur 35m. Vilain met 35 sec. Ada met 0sec.
   */
  const testingData = {
    delay: 33,
    track: "R44_C32_S28_R21_O35_R27_T67_O92_T94_O64",
  };
  const expected = "O35:95";
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
