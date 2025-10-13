/**
 * Tainix Challenge: Bug-out-Shelter-3-Connexion-a-distance [SHELTER_3]
 * 
 * Challenge Token: 5ab60288f061615d60704a8f62113d4962883829fec013f90256fa2ddc5dc802c076e6e06307f3b4
 * 
 * Commands:
 * tainix test SHELTER_3
 * tainix submit SHELTER_3
 */

const inputData = {
  "shelters": [
    "IAM_E:12_N:15_S:20",
    "FLA_E:25_N:3_S:27",
    "PRO_E:35_N:38_S:33",
    "FJU_E:22_N:1_S:13",
    "FMJ_E:6_N:5_S:23",
    "TVL_E:27_N:4_S:11",
    "IRL_E:5_N:8_S:29",
    "SES_E:20_N:11_S:10",
    "IVX_E:22_N:2_S:14",
    "GBE_E:5_N:1_S:5"
  ]
};

type InputData = typeof inputData;

function solve({ shelters }: InputData): string {
  const parsedShelters = shelters.map(shelterStr => {
    const [name, equipmentStr, foodStr, healthStr] = shelterStr.split('_');
    const equipment = parseInt(equipmentStr.split(':')[1], 10);
    const food = parseInt(foodStr.split(':')[1], 10);
    const health = parseInt(healthStr.split(':')[1], 10);

    const bonus1 = (equipment >= 15 && food >= 15 && health >= 15) ? 8 : 0;

    const malus1 = (food <= 10 || health <= 10) ? 10 : 0;

    const score = Math.floor((equipment * 0.25 + food * 0.4 + health * 0.35) * 2.25) + bonus1 - malus1;
    console.log(`Shelter ${name}: E=${equipment}, N=${food}, S=${health} => Score: ${score}`);
    return { name, equipment, food, health, score: Math.min(Math.max(score, 0), 100) };
  });

  const bestShelter = parsedShelters.reduce((best, current) => current.score > best.score ? current : best, parsedShelters[0]);

  const averageScore = Math.floor(parsedShelters.reduce((sum, shelter) => sum + shelter.score, 0) / parsedShelters.length);

  return `${bestShelter.name}_${bestShelter.score}_${averageScore}`;
}

// --- Tests ---
function test(): void {
  /*
    * Problem Steps:
    * - Abri PRO : E=33, N=30, S=35 =&gt; Score: 81
    * - Abri AQN : E=19, N=15, S=17 =&gt; Score: 45
    * - Abri YFM : E=9, N=12, S=22 =&gt; Score: 33
    * - Abri FBA : E=30, N=14, S=9 =&gt; Score: 26
    * - Abri ZVS : E=20, N=12, S=24 =&gt; Score: 40
    * - Abri ZID : E=14, N=9, S=25 =&gt; Score: 25
    * - Abri NZF : E=9, N=8, S=19 =&gt; Score: 17
    * - Meilleur abri : PRO avec un score de 81 (moyenne: 38)
    */
  const testingData = {
    "shelters": [
      "PRO_E:33_N:30_S:35",
      "AQN_E:19_N:15_S:17",
      "YFM_E:9_N:12_S:22",
      "FBA_E:30_N:14_S:9",
      "ZVS_E:20_N:12_S:24",
      "ZID_E:14_N:9_S:25",
      "NZF_E:9_N:8_S:19"
    ]
  };
  const expected = "PRO_81_38";
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
