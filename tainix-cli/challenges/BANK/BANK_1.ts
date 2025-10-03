/**
 * Tainix Challenge: Braquage-du-coffre-2 [BANK_1]
 *
 * Challenge Token: 548216a56c0a88ab7a1611f6c8629ff74411dbe00513adedaa098f7609f1a6db308d658de4f7979a
 */

const inputData = {
  time: 238,
  actions: "BBBBBBBBBBBBBBBIIIIIIIIIIIIIIMMMMMMEEEEEEE",
  references: "B:5 I:3 M:1 E:7",
};

type InputData = typeof inputData;

function solve({ actions, references, time }: InputData): string {
  const pairs = references.split(" ").map((pair) => pair.split(":"));

  const refs = arrayOfPairToDict(
    pairs.map((p) => [p[0], parseInt(p[1], 10)] as [string, number])
  );

  const charCounts = stringToDictOfCharOccurrences(actions);

  const weightedValues = Object.entries(charCounts).map(([letter, count]) => {
    const refValue = refs[letter] ?? 0;
    return refValue * count;
  });

  let res = sumUp(weightedValues);

  return res < time ? `ESCAPE${time - res}` : `PRISON${res - time}`;
}

// --- Tests ---
function test(): void {
  /*
   * Problem Steps:
   * - Il faut 81 de temps pour les actions "Break".
   * - Il faut 25 de temps pour les actions "IT".
   * - Il faut 40 de temps pour les actions "Money".
   * - Il faut 35 de temps pour les actions "Prepare".
   * - Ils ont donc besoin de 181 de temps et la police arrive dans 324.
   * - Ils peuvent s'échapper ! Il leur restait 143 de temps.
   */
  const testingData = {
    actions: "BBBBBBBBBIIIIIMMMMMMMMMMEEEEE",
    references: "B:9 I:5 M:4 E:7",
    time: 324,
  };
  const expected = "ESCAPE143";
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
