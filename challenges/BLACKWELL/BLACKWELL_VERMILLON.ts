/**
 * Tainix Challenge: Affaire-BL4CKWELL-Senateur-Vermillon [BLACKWELL_VERMILLON]
 *
 * Challenge Token: 3614b89a1d865e9ab53111d7df8462a0efe425af29385683784651db9c70132757cdb4644315ae55
 *
 * Commands:
 * tainix test BLACKWELL_VERMILLON
 * tainix submit BLACKWELL_VERMILLON
 */

const inputData = {
  recording: [
    "ordre",
    "sacrifice",
    "eveil",
    "confiance",
    "honneur",
    "resolution",
    "unite",
    "fermete",
    "dialogue",
    "defi",
    "avenir",
    "opinion",
    "respect",
    "chemin",
    "defense",
    "devoir",
    "peur",
    "resolution",
    "realite",
    "lucidite",
    "lumiere",
    "constat",
    "territoire",
    "affirmation",
    "honneur",
    "initiative",
    "unite",
    "respect",
    "refus",
    "doute",
  ],
  originals: [
    "resistance",
    "sacrifice",
    "eveil",
    "confiance",
    "honneur",
    "resolution",
    "unite",
    "fermete",
    "solidite",
    "defi",
    "avenir",
    "opinion",
    "respect",
    "chemin",
    "defense",
    "devoir",
    "peur",
    "resolution",
    "realite",
    "danger",
    "choix",
    "respect",
    "interet",
    "affirmation",
    "honneur",
    "initiative",
    "unite",
    "respect",
    "refus",
    "dialogue",
  ],
};

type InputData = typeof inputData;

function solve({ originals, recording }: InputData): string {
  let result = "";

  for (let i = 0; i < originals.length; i++) {
    if (originals[i] !== recording[i]) {
      result += recording[i][0] + originals[i][0];
    }
  }

  return result;
}

// --- Tests ---
function test(): void {
  /*
   * Problem Steps:
   * - Erreur sur le mot 4: constat au lieu de subversion
   * - Erreur sur le mot 5: progres au lieu de repercussion
   * - Erreur sur le mot 9: solidarite au lieu de chemin
   * - Erreur sur le mot 11: respect au lieu de dialogue
   * - Erreur sur le mot 12: avenir au lieu de courage
   * - Erreur sur le mot 17: decision au lieu de lumiere
   * - Erreur sur le mot 24: avertissement au lieu de realite
   * - Erreur sur le mot 31: discipline au lieu de voix
   * - Erreur sur le mot 35: interet au lieu de respect
   */
  const testingData = {
    originals: [
      "respect",
      "repercussion",
      "clarification",
      "subversion",
      "repercussion",
      "horizon",
      "interet",
      "unite",
      "chemin",
      "respect",
      "dialogue",
      "courage",
      "refus",
      "exigence",
      "subversion",
      "dialogue",
      "lumiere",
      "honneur",
      "defi",
      "menace",
      "modele",
      "front",
      "chemin",
      "realite",
      "urgence",
      "discipline",
      "verite",
      "persistance",
      "republique",
      "defi",
      "voix",
      "engagement",
      "priorite",
      "engagement",
      "respect",
    ],
    recording: [
      "respect",
      "repercussion",
      "clarification",
      "constat",
      "progres",
      "horizon",
      "interet",
      "unite",
      "solidarite",
      "respect",
      "respect",
      "avenir",
      "refus",
      "exigence",
      "subversion",
      "dialogue",
      "decision",
      "honneur",
      "defi",
      "menace",
      "modele",
      "front",
      "chemin",
      "avertissement",
      "urgence",
      "discipline",
      "verite",
      "persistance",
      "republique",
      "defi",
      "discipline",
      "engagement",
      "priorite",
      "engagement",
      "interet",
    ],
  };
  const expected = "csprscrdacdlardvir";
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
