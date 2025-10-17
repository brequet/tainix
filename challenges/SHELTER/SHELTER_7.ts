/**
 * Tainix Challenge: Bug-out-Shelter-7-Defense-silencieuse [SHELTER_7]
 * 
 * Challenge Token: 031fa9265a774ba251a90dc22fa89f44de5de647039368d1fd1d1c3862cd30766897043867fdd52e
 * 
 * Commands:
 * tainix test SHELTER_7
 * tainix submit SHELTER_7
 */

const inputData = {
  "detections": [
    "1760462228:48",
    "1760459842:46",
    "1760465633:26",
    "1760460189:49",
    "1760464533:50",
    "1760457912:42",
    "1760461261:20",
    "1760465779:46",
    "1760466765:41",
    "1760461397:10",
    "1760459110:19",
    "1760458797:45",
    "1760461082:43",
    "1760459547:35",
    "1760461650:47",
    "1760463969:11",
    "1760458365:41",
    "1760462410:49",
    "1760465803:23",
    "1760460905:47",
    "1760460779:46",
    "1760465238:21",
    "1760463068:28",
    "1760460914:32",
    "1760463498:37",
    "1760458002:19",
    "1760466557:19",
    "1760461020:10",
    "1760463401:31",
    "1760461086:23",
    "1760458585:40",
    "1760464897:19",
    "1760459658:44",
    "1760458081:33",
    "1760461280:38"
  ],
  "latency": 203,
  "threshold": 90,
  "windows": [
    "1760464331_1760464816",
    "1760458631_1760458895",
    "1760463486_1760463764",
    "1760461438_1760461893",
    "1760465789_1760466383",
    "1760460246_1760460818",
    "1760458071_1760458508",
    "1760460899_1760461284",
    "1760462912_1760463359",
    "1760466475_1760466743",
    "1760462401_1760462744",
    "1760457600_1760457972",
    "1760459074_1760459390",
    "1760461948_1760462272",
    "1760463942_1760464260",
    "1760464921_1760465238",
    "1760465278_1760465691",
    "1760459532_1760460084"
  ]
};

type InputData = typeof inputData;

function solve({ detections, latency, threshold, windows }: InputData): string {
  const parsedWindows = windows.map(windowStr => {
    const [startStr, endStr] = windowStr.split('_');
    return { start: parseInt(startStr, 10), end: parseInt(endStr, 10) };
  });

  const noises = detections.map(detectionsStr => {
    const [timeStr, intensityStr] = detectionsStr.split(':');
    return { time: parseInt(timeStr, 10), intensity: parseInt(intensityStr, 10) };
  });

  const okWindows: ({
    totalIntensity: number;
    start: number;
    end: number;
  })[] = []
  for (const window of parsedWindows) {
    let totalIntensity = 0;
    for (const noise of noises) {
      if (noise.time >= window.start && noise.time <= window.end) {
        totalIntensity += noise.intensity;
      }
    }

    if (totalIntensity <= threshold) {
      console.log(`Valid windows found: ${window.start} to ${window.end} with total intensity ${totalIntensity}`);
      okWindows.push({ ...window, totalIntensity });
    }
  }

  console.log("Number of valid", okWindows.length)
  console.log(JSON.stringify(okWindows))

  const sortedWindows = okWindows.sort((a, b) => a.start - b.start);

  const lastWindows = [sortedWindows[0]];
  for (let i = 1; i < sortedWindows.length; i++) {
    const lastEnd = lastWindows[lastWindows.length - 1].end;

    const currentWindow = sortedWindows[i];
    const currentStart = currentWindow.start;
    if (currentStart - lastEnd >= latency) {
      console.log(`OK fin à ${lastEnd} et début du suivant à ${currentStart} (latence de ${currentStart - lastEnd} secondes)`);
      lastWindows.push(currentWindow);
    } else {
      console.log(`KO fin à ${lastEnd} et début du suivant à ${currentStart} (latence de ${currentStart - lastEnd} secondes)`);
    }
  }

  const windowsIntensityTotal = lastWindows.reduce((sum, window) => sum + window.totalIntensity, 0);

  return `${lastWindows.length}:${windowsIntensityTotal}`;
}

// --- Tests ---
function test(): void {
  /*
    * Problem Steps:
    * - Exemple intensité OK : Le créneau qui commence à 1760457600 et termine à 1760457815 a une intensité totale de 29 et est donc, pour le moment, retenu.
    * - Exemple intensité KO : Le créneau qui commence à 1760462020 et termine à 1760462608 a une intensité totale de 86 et n'est donc PAS retenu.
    * - Nombre de créneaux valides par rapport à l'intensité : 16
    * - Exemple créneaux qui ne peuvent pas être retenus : fin à 1760457815 et début du suivant à 1760457858 (latence de 43 secondes)
    * - Exemple créneaux qui peuvent être retenus : fin à 1760457815 et début du suivant à 1760458257 (latence de 442 secondes)
    */
  const testingData = {
    "detections": [
      "1760460802:44",
      "1760462579:42",
      "1760465972:22",
      "1760463300:25",
      "1760461530:31",
      "1760460108:15",
      "1760465516:14",
      "1760459307:16",
      "1760463871:20",
      "1760458858:49",
      "1760465175:29",
      "1760459585:22",
      "1760461460:47",
      "1760461976:45",
      "1760462474:44",
      "1760464875:28",
      "1760462738:18",
      "1760466713:43",
      "1760466385:16",
      "1760457627:29",
      "1760457893:25",
      "1760466234:24",
      "1760458659:40",
      "1760464310:27",
      "1760465013:17",
      "1760465182:16"
    ],
    "latency": 145,
    "threshold": 65,
    "windows": [
      "1760457600_1760457815",
      "1760463149_1760463533",
      "1760459433_1760459686",
      "1760461662_1760461977",
      "1760466371_1760466700",
      "1760457858_1760458125",
      "1760465158_1760465559",
      "1760462020_1760462608",
      "1760459797_1760460372",
      "1760462680_1760463058",
      "1760465654_1760466214",
      "1760460528_1760460977",
      "1760458984_1760459343",
      "1760458257_1760458805",
      "1760463584_1760464119",
      "1760464613_1760464987",
      "1760461065_1760461597",
      "1760464174_1760464517"
    ]
  };
  const expected = "11:330";
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
