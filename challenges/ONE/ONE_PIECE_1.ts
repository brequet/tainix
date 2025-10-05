/**
 * Tainix Challenge: one-piece-marineford [ONE_PIECE_1]
 *
 * Challenge Token: a063fe19744b3e2425fef873c45eba30038f628cec6d1896e8636bff5b591b36e6de7a29115b83c2
 *
 * Commands:
 * tainix test ONE_PIECE_1
 * tainix submit ONE_PIECE_1
 */

const inputData = {
  allies: ["BOA_2", "JMB_4", "MRC_5", "BGY_1"],
  enemies: ["SMK_5", "AKJ_8", "AKU_9", "KZR_7", "MHK_3", "GRP_4", "KBY_1"],
};

type InputData = typeof inputData;

const LUFFY_POWER = 3;
const HEALER_ALLY = "IVK";

function solve({ allies, enemies }: InputData): string {
  const alliesParsed = allies
    .map(parseCharacter)
    .sort((a, b) => a.power - b.power);
  const enemiesParsed = enemies.map(parseCharacter);

  const results: string[] = [];

  for (const enemy of enemiesParsed) {
    console.log("Facing enemy:", enemy);
    if (LUFFY_POWER >= enemy.power) {
      console.log("Luffy can handle this one alone.");
      results.push("LFY");
    } else {
      const allyIndex = alliesParsed.findIndex(
        (ally) => ally.power + LUFFY_POWER >= enemy.power
      );
      if (allyIndex !== -1) {
        const ally = alliesParsed.splice(allyIndex, 1)[0];
        console.log(`Ally ${ally.id} comes to help Luffy.`);
        results.push(`${ally.id}`);
      } else {
        console.log("No ally can help Luffy, he is KO and needs healing.");
        results.push(HEALER_ALLY);
      }
    }
  }

  return results.join("_");
}

function parseCharacter(character: string): { id: string; power: number } {
  const [id, powerStr] = character.split("_");
  return { id, power: parseInt(powerStr, 10) };
}

// --- Tests ---
function test(): void {
  /*
   * Problem Steps:
   * - Mihawk a une puissance de 7. Marco vient prêter main forte à Luffy.
   * - Smoker a une puissance de 3. Luffy se bat seul.
   * - Aokiji a une puissance de 4. Baggy vient prêter main forte à Luffy.
   * - Akainu a une puissance de 8. Boa Hancock vient prêter main forte à Luffy.
   * - Kizaru a une puissance de 9. Aucun allié n'est assez fort pour aider Luffy, il est mis KO et doit être soigné.
   * - Garp a une puissance de 5. Jimbe vient prêter main forte à Luffy.
   * - Kobby a une puissance de 1. Luffy se bat seul.
   */
  const testingData = {
    allies: ["BOA_5", "BGY_1", "JMB_2", "MRC_4"],
    enemies: ["MHK_7", "SMK_3", "AKJ_4", "AKU_8", "KZR_9", "GRP_5", "KBY_1"],
  };
  const expected = "MRC_LFY_BGY_BOA_IVK_JMB_LFY";
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
