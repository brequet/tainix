/**
 * Tainix Challenge: Wade-Wilson-part-en-mission [DEADPOOL]
 *
 * Challenge Token: b3816445ad8d035230c3a6fc6f125a295bbe70c9d6cf7d2aa970342d09aae2d933c9c13261309561
 *
 * Commands:
 * tainix test DEADPOOL
 * tainix submit DEADPOOL
 */

const inputData = {
  steps: "H__T__E_SHE_TS__SSTS_",
};

type InputData = typeof inputData;

function solve({ steps }: InputData): string {
  let hp = 100;
  let time = 0; // in seconds

  for (const action of steps) {
    switch (action) {
      case "_":
        time += 10;
        hp = Math.min(hp + 5, 100);
        break;
      case "S":
        time += 10;
        hp -= 10;
        break;
      case "H":
        time += 30;
        hp -= 25;
        break;
      case "T":
        time += 120;
        hp -= 50;
        break;
      case "E":
        hp -= 100;
        break;
    }

    if (hp <= 0) {
      time += 60 * 5;
      hp = 100;
    }
  }

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return `${minutes}min_${seconds}sec_${hp}hp`;
}

// --- Tests ---
function test(): void {
  /*
   * Problem Steps:
   * - BOUUUMMMM UNE EXPLOSION !!! 100hp de moins en 0sec.
   * - Il est temps de se reposer pour reprendre des forces.
   * - Rien ne s'est passé, tu récupères 5hp en 10sec.
   * - Des armes lourdes, plus compliqué, mais pas impossible, 25hp de moins en 30sec.
   * - Ce ne serait pas un tank ?! 50hp de moins en 120sec.
   * - Rien ne s'est passé, tu récupères 5hp en 10sec.
   */
  const testingData = {
    steps: "E_HT_",
  };
  const expected = "7min_50sec_30hp";
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
