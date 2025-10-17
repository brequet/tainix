/**
 * Tainix Challenge: Bug-out-Shelter-8-Assaut-final [SHELTER_8]
 * 
 * Challenge Token: aa41d4ecac514a78b141b8ea9e752e2bda6a0d176ee5d18226c42b24c0a9332d372d1e7c0d8ab9cf
 * 
 * Commands:
 * tainix test SHELTER_8
 * tainix submit SHELTER_8
 */

const systems = ['A:3:000110100000', 'B:3:000000000000', 'C:4:011000000100', 'D:2:000001000100', 'E:4:001010000000', 'F:3:000000000011', 'G:3:010100101010', 'H:3:000000011010', 'I:2:001000000000', 'J:3:000000001100', 'K:3:100100000000', 'L:2:000000110000'];


const inputData = {
  "systems": [
    "A:2:000001000100",
    "B:4:100010000010",
    "C:5:100010111011",
    "D:2:000000101001",
    "E:2:001001000010",
    "F:3:010000010000",
    "G:4:100001101110",
    "H:4:101110000110",
    "I:4:000000010101",
    "J:4:000110000100",
    "K:3:010000000000",
    "L:2:000101000001"
  ]
};


type InputData = typeof inputData;

const BINARY_GOAL = "111111111111"

interface System {
  name: string;
  power: number;
  activableTimestamp: string;
}

function solve({ systems }: InputData): string {
  const systemData: System[] = systems.map(systemStr => {
    const [name, powerStr, activableTimestampStr] = systemStr.split(':');
    return { name, power: parseInt(powerStr, 10), activableTimestamp: activableTimestampStr };
  }).sort((a, b) => a.power - b.power);

  console.log(JSON.stringify(systemData, null, 2));

  const bestCombination = findBestCombination([], systemData);

  console.log('Best combination found:', bestCombination);

  return bestCombination.map(s => s.name).join('');
}

function binaryOr(a: string, b: string): string {
  let result = '';
  for (let i = 0; i < a.length; i++) {
    result += (a[i] === '1' || b[i] === '1') ? '1' : '0';
  }
  return result;
}

function reduceSystems(systemData: System[]): string {
  let result = '000000000000';
  for (const system of systemData) {
    result = binaryOr(result, system.activableTimestamp);
  }

  if (result === BINARY_GOAL) {
    // console.log("FOOUUUUND", systemData.map(s => s.name).join(''))
  }

  return result;
}

function findBestCombination(choosenSystems: System[], remainableSystems: System[]): System[] {
  if (choosenSystems.length >= 4) {
    return []
  }

  if (reduceSystems(choosenSystems) === BINARY_GOAL) {
    return choosenSystems;
  }

  if (remainableSystems.length === 0) {
    return [];
  }

  const visitedOptions = [];
  for (const system of remainableSystems) {
    const newChoosenSystems = [...choosenSystems, system];
    const newRemainableSystems = remainableSystems.filter(s => s !== system);
    const option = findBestCombination(newChoosenSystems, newRemainableSystems);
    if (reduceSystems(option) === BINARY_GOAL && option.length < 4) {
      visitedOptions.push(option);
    }
  }

  const leastPowerOption = visitedOptions
    .reduce((best, current) => {
      const bestPower = best.reduce((sum, s) => sum + s.power, 0);
      const currentPower = current.reduce((sum, s) => sum + s.power, 0);
      return currentPower < bestPower ? current : best;
    }, remainableSystems);

  return leastPowerOption;
}

// --- Tests ---
function test(): void {
  /*
    * Problem Steps:
    * - Tu peux débloquer des aides depuis la Sandbox si tu le souhaites.
    */
  const testingData = {
    "systems": [
      "A:4:011000010100",
      "B:4:010101001001",
      "C:4:001000000001",
      "D:6:111001001010",
      "E:4:100000000100",
      "F:6:101010101111",
      "G:4:010110110011",
      "H:3:010101000110",
      "I:3:000010000000",
      "J:4:010101001000",
      "K:2:000001000000",
      "L:2:000000010101"
    ]
  };
  const expected = "La réponse attendue est dynamique et non unique.Indice : 11";
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
  const result = solve({ systems });
  console.log(`Challenge result is: ${result}`);
}
