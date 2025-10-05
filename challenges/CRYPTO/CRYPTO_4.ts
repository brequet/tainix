/**
 * Tainix Challenge: Code-secret-et-enonce-secret [CRYPTO_4]
 *
 * Challenge Token: f7ed89643dee3cf5e71973867131dc04b1a60085f49bdce3ec5ed2f8992832ebab4bf4aab5aefb0f
 *
 * Commands:
 * tainix test CRYPTO_4
 * tainix submit CRYPTO_4
 */

/*

Mission

Un code secret à déchiffrer…

Aucune explication, mais quelques exemples dans la donnée « échantillons » qui doivent te permettre de comprendre l’algorithme mis en place pour déchiffrer le code ! Chaque échantillon est construit comme ça :

code:code_dechiffré
Règles

Pour compléter ce challenge, tu dois retourner la chaîne de caractères qui correspond au décryptage du code.

(Pas besoin de brute force pour résoudre ce challenge)
*/

const inputData = {
  echantillons: [
    "8170294573261351656802419:oibbngwd",
    "417211748627659691502:ziai",
    "7691896332281755703973481375918401180137623:kbnpkaf",
    "6779347671433101248:zjvrxo",
    "49261865226682172:fuqo",
  ],
  code: "5474431924400314",
};

type InputData = typeof inputData;

function solve({ code }: InputData): string {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const decryptedLength = parseInt(code[0], 10);
  if (isNaN(decryptedLength) || decryptedLength === 0) {
    return "";
  }

  const payload = code.substring(1);
  if (payload.length === 0) {
    return "";
  }

  const chunkSize = Math.floor(payload.length / decryptedLength);

  let result = "";

  for (let i = 0; i < decryptedLength; i++) {
    const chunkStart = i * chunkSize;
    const chunkEnd = chunkStart + chunkSize;
    const chunk = payload.substring(chunkStart, chunkEnd);

    const chunkAsInt = parseInt(chunk, 10);
    const charIndex = chunkAsInt % 26;
    result += alphabet[charIndex];
  }

  return result;
}

// --- Tests ---
function test(): void {
  /*
   * Problem Steps:
   * - Pas d'indice pour ce challenge... désolé :p
   */
  const testingData = {
    code: "570177791167924758790",
    echantillons: [
      "4614060751102372092684064:soge",
      "4963943220671:bhmv",
      "579085216654145746198:eqpyk",
      "515111597418210289809:dlwoh",
      "537668612664988237204:wgtjc",
    ],
  };
  const expected = "xrpfc";
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
