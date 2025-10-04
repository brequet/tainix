/**
 * Tainix Challenge: Pixels-de-couleurs [PAINT]
 *
 * Challenge Token: 42854d988056777ed34ad50cff66c7d75bb58efdf1b15ac63d05b6b8ae1333b6dfaf39ce88c38aa4
 *
 * Commands:
 * tainix test PAINT
 * tainix submit PAINT
 */

const inputData = {
  map: [
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "r",
    "w",
    "w",
    "w",
    "w",
    "w",
    "r",
    "r",
    "w",
    "w",
    "r",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "r",
    "r",
    "w",
    "w",
    "w",
    "r",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "r",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "r",
    "w",
    "w",
    "w",
    "w",
    "r",
    "w",
    "w",
    "w",
    "w",
    "w",
    "r",
    "w",
    "w",
    "r",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "w",
    "r",
    "w",
    "w",
    "w",
    "r",
    "w",
    "w",
    "r",
    "r",
    "w",
  ],
};

type InputData = typeof inputData;

function solve({ map }: InputData): string {
  // make 10x10 grid
  const chunkSize = 10;
  const grid = [];

  for (let i = 0; i < map.length; i += chunkSize) {
    const chunk = map.slice(i, i + chunkSize);
    grid.push(chunk);
  }

  console.log("Init Grid:");
  printGrid(grid);

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const cell = grid[row][col];
      if (cell === "r") {
        fillAround(grid, row, col);
      }
    }
  }

  console.log("Modified Grid:");
  printGrid(grid);

  return grid
    .flat()
    .filter((cell) => cell === "b")
    .length.toString();
}

function printGrid(grid: string[][]): void {
  for (const row of grid) {
    console.log(row.join(" "));
  }
}

function fillAround(grid: string[][], row: number, col: number): void {
  const directions = [
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
      grid[newRow][newCol] === "w"
    ) {
      grid[newRow][newCol] = "b";
    }
  }
}

// --- Tests ---
function test(): void {
  /*
   * Problem Steps:
   * No steps found for this challenge.
   */
  const testingData = {
    map: [
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "r",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "r",
      "w",
      "w",
      "r",
      "w",
      "r",
      "w",
      "r",
      "w",
      "w",
      "r",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "r",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "r",
      "w",
      "w",
      "w",
      "w",
      "r",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
      "w",
    ],
  };
  const expected = "25";
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
