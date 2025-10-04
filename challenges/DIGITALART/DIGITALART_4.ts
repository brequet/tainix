/**
 * Tainix Challenge: CTC-4-Le-jeu-des-dames [DIGITALART_4]
 *
 * Challenge Token: 5642b2bd51a3a51b3fdd5590ec9e9bc18d52367e936e5d2ee9906148e1975e48176e1f4848895bdc
 *
 * Commands:
 * tainix test DIGITALART_4
 * tainix submit DIGITALART_4
 */

const inputData = {
  map: [
    "N",
    "C",
    "N",
    "PF",
    "N",
    "PH",
    "N",
    "N",
    "PO",
    "N",
    "N",
    "N",
    "N",
    "N",
    "PQ",
    "N",
    "N",
    "PK",
    "PN",
    "C",
    "N",
    "PG",
    "N",
    "N",
    "PA",
    "N",
    "PB",
    "N",
    "N",
    "N",
    "PL",
    "C",
    "N",
    "N",
    "N",
    "N",
    "N",
    "PU",
    "N",
    "N",
    "N",
    "N",
    "N",
    "N",
    "C",
    "N",
    "N",
    "PT",
    "N",
    "N",
    "N",
    "N",
    "N",
    "N",
    "N",
    "N",
    "N",
    "N",
    "N",
    "PE",
    "N",
    "N",
    "PJ",
    "N",
    "N",
    "C",
    "N",
    "C",
    "N",
    "N",
    "N",
    "N",
    "N",
    "N",
    "N",
    "N",
    "N",
    "N",
    "PD",
    "N",
    "N",
    "N",
    "N",
    "N",
    "N",
    "PM",
    "N",
    "N",
    "N",
    "N",
    "N",
    "N",
    "N",
    "N",
    "PS",
    "PP",
    "C",
    "N",
    "N",
    "N",
  ],
};

type InputData = typeof inputData;

function solve({ map }: InputData): string {
  const chunkSize = 10;
  const grid = [];

  for (let i = 0; i < map.length; i += chunkSize) {
    const chunk = map.slice(i, i + chunkSize);
    grid.push(chunk);
  }

  let reachablePeople: string[] = [];

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const cell = grid[row][col];
      if (cell !== "C" && cell !== "N") {
        if (!isCameraAroundPoint(grid, row, col)) {
          reachablePeople.push(cell);
        }
      }
    }
  }

  reachablePeople.sort();

  return reachablePeople.join("");
}

function isCameraAroundPoint(
  grid: string[][],
  row: number,
  col: number
): boolean {
  const directions = [
    [-1, -1], // up-left
    [-1, 1], // up-right
    [1, -1], // down-left
    [1, 1], // down-right
    [-1, 0], // up
    [1, 0], // down
    [0, -1], // left
    [0, 1], // right
  ];

  for (const [dRow, dCol] of directions) {
    const newRow = row + dRow;
    const newCol = col + dCol;

    if (
      newRow >= 0 &&
      newRow < grid.length &&
      newCol >= 0 &&
      newCol < grid[newRow].length &&
      grid[newRow][newCol] === "C"
    ) {
      return true;
    }
  }
  return false;
}

// --- Tests ---
function test(): void {
  /*
   * Problem Steps:
   * - Ci-dessous les positions des caméras et de chaque personne :
   */
  const testingData = {
    map: [
      "N",
      "C",
      "N",
      "N",
      "N",
      "N",
      "N",
      "N",
      "N",
      "N",
      "N",
      "N",
      "N",
      "C",
      "N",
      "C",
      "PK",
      "PO",
      "N",
      "PA",
      "C",
      "N",
      "N",
      "PB",
      "N",
      "N",
      "C",
      "N",
      "N",
      "N",
      "PJ",
      "N",
      "N",
      "N",
      "N",
      "N",
      "N",
      "N",
      "N",
      "N",
      "N",
      "N",
      "N",
      "N",
      "N",
      "N",
      "N",
      "PQ",
      "C",
      "N",
      "PC",
      "N",
      "N",
      "N",
      "N",
      "N",
      "N",
      "PL",
      "N",
      "N",
      "PN",
      "N",
      "N",
      "N",
      "N",
      "PH",
      "N",
      "PU",
      "PD",
      "N",
      "PP",
      "N",
      "C",
      "PT",
      "N",
      "C",
      "PM",
      "N",
      "PI",
      "PG",
      "N",
      "N",
      "N",
      "N",
      "N",
      "N",
      "N",
      "N",
      "N",
      "PF",
      "N",
      "PR",
      "N",
      "N",
      "N",
      "PS",
      "N",
      "N",
      "N",
      "N",
    ],
  };
  const expected = "PAPCPDPFPGPIPNPPPRPSPU";
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
