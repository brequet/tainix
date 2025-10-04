/**
 * Tainix Challenge: AlgoPark-2-la-grande-Roue [ALGOPARK_2]
 *
 * Challenge Token: 6576dde8905447476e3ab01107cda08060ff3060369b1310e0293cc33c2f95e9aa1bf1740359a100
 *
 * Commands:
 * tainix test ALGOPARK_2
 * tainix submit ALGOPARK_2
 */

const inputData = {
  groups: [3, 2, 2, 3, 1, 3, 1, 4, 2, 2, 4, 2, 3],
};

type InputData = typeof inputData;

function solve({ groups }: InputData): string {
  let currentGondolaOccupation = 0;

  const gondolas: number[] = [];

  for (const groupSize of groups) {
    if (currentGondolaOccupation + groupSize > 4) {
      // Start a new gondola
      gondolas.push(currentGondolaOccupation);
      currentGondolaOccupation = groupSize;
    } else {
      // Add to the current gondola
      currentGondolaOccupation += groupSize;
    }
  }
  if (currentGondolaOccupation > 0) {
    gondolas.push(currentGondolaOccupation);
  }

  const totalGondolas = gondolas.length;
  const lastGondolaOccupancy = gondolas.at(-1) ?? 0;

  return `${totalGondolas}_${lastGondolaOccupancy}`;
}

// --- Tests ---
function test(): void {
  /*
   * Problem Steps:
   * - Groupes à faire passer : 1, 2, 1, 4, 4, 1, 1
   * - Attribution des nasselles (4 places maximum par nasselle) :
   * - Groupe 1 de 1 personne(s) → Nouvelle nasselle 1 (total: 1/4)
   * - Groupe 2 de 2 personne(s) → Nasselle 1 (total: 3/4)
   * - Groupe 3 de 1 personne(s) → Nasselle 1 (total: 4/4)
   * - Groupe 4 de 4 personne(s) → Nouvelle nasselle 2 (total: 4/4)
   * - Groupe 5 de 4 personne(s) → Nouvelle nasselle 3 (total: 4/4)
   * - Groupe 6 de 1 personne(s) → Nouvelle nasselle 4 (total: 1/4)
   * - Groupe 7 de 1 personne(s) → Nasselle 4 (total: 2/4)
   * - Nombre total de nasselles utilisées : 4
   * - Nasselle 1 : 4/4 personnes
   * - Nasselle 2 : 4/4 personnes
   * - Nasselle 3 : 4/4 personnes
   * - Nasselle 4 : 2/4 personnes
   * - Réponse : 4 nasselles, 2 personnes dans la dernière nasselle
   */
  const testingData = {
    groups: [1, 2, 1, 4, 4, 1, 1],
  };
  const expected = "4_2";
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
