/**
 * Tainix Challenge: Environnement-1 [ENVIRONMENT_1]
 *
 * Challenge Token: 9adbe457ebe1868af852a72f0b486b6ba088d22dfa0a88af9d2c4192464032e29875eea105e51a3b
 *
 * Commands:
 * tainix test ENVIRONMENT_1
 * tainix submit ENVIRONMENT_1
 */

const inputData = {
  vehicles: [
    "Honda-Civic_Ville_8_837_EGR BP",
    "Mercedes-CClass_Autoroute_14_853",
    "Chevrolet-Tahoe_Campagne_9_100",
    "Honda-CRV_Campagne_13_880_EGR BP_IECC_EHRS",
    "Porsche-Cayman_Autoroute_13_255",
    "Porsche-Macan_Ville_11_790_IECC_EHRS",
    "Mercedes-EClass_Campagne_8_953_EGR BP_IECC_EHRS",
    "Porsche-Cayenne_Ville_9_451_EGR BP_IECC_EHRS",
    "Ford-Explorer_Ville_13_281_IECC",
    "Ford-Explorer_Campagne_11_776_EGR BP_IECC_EHRS",
    "Mercedes-GLE_Ville_5_916",
    "Mercedes-GLE_Autoroute_12_994_EHRS",
    "Chevrolet-Silverado_Ville_14_280_EGR BP_IECC_EHRS",
    "Audi-Q5_Campagne_5_671_EGR BP",
    "Chevrolet-Corvette_Ville_7_115_EGR BP_IECC",
    "Mercedes-CClass_Autoroute_11_335_EGR BP_IECC_EHRS",
    "Mercedes-CClass_Campagne_13_835",
    "BMW-3Series_Ville_5_880_EGR BP_IECC_EHRS",
    "Honda-Civic_Campagne_11_101_EGR BP_IECC_EHRS",
    "Volkswagen-Tiguan_Autoroute_14_310",
    "Audi-A6_Campagne_9_483",
    "Ford-Mustang_Ville_13_501",
    "Audi-A4_Autoroute_5_843",
    "Chevrolet-Camaro_Autoroute_15_713_EGR BP_IECC",
    "Toyota-Camry_Autoroute_10_660_IECC_EHRS",
  ],
};

type InputData = typeof inputData;

const CO2_PER_LITER = 2392; // in grams

function solve({ vehicles }: InputData): string {
  const cars = vehicles.map(parseToCar);

  const totalCo2Savings = cars
    .map(calculateCarCo2Savings)
    .reduce((acc, cur) => acc + cur, 0);

  return totalCo2Savings.toString();
}

function parseToCar(vehicleStr: string) {
  const parts = vehicleStr.split("_");
  const [makeModel, roadType, consumptionStr, distanceStr, ...equipmentParts] =
    parts;

  return {
    makeModel,
    roadType,
    consumption: parseInt(consumptionStr),
    distance: parseInt(distanceStr),
    equipment: equipmentParts,
  };
}

function calculateCarCo2Savings(car: ReturnType<typeof parseToCar>): number {
  /* 
  
    EHRS :
        Autoroute : réduit la consommation de 4%
        Campagne : réduit la consommation de 5%
        Ville : réduit la consommation de 1%
    IECC :
        Autoroute : réduit la consommation de 7%
        Campagne : réduit la consommation de 15%
        Ville : réduit la consommation de 5%
    EGR BP :
        Autoroute : réduit la consommation de 4%
        Campagne : réduit la consommation de 6%
        Ville : réduit la consommation de 2%
*/
  let reductionWithEquipments = [];
  for (const equipment of car.equipment) {
    if (equipment === "EHRS") {
      if (car.roadType === "Autoroute") {
        reductionWithEquipments.push(4);
      } else if (car.roadType === "Campagne") {
        reductionWithEquipments.push(5);
      } else if (car.roadType === "Ville") {
        reductionWithEquipments.push(1);
      }
    } else if (equipment === "IECC") {
      if (car.roadType === "Autoroute") {
        reductionWithEquipments.push(7);
      } else if (car.roadType === "Campagne") {
        reductionWithEquipments.push(15);
      } else if (car.roadType === "Ville") {
        reductionWithEquipments.push(5);
      }
    } else if (equipment === "EGR BP") {
      if (car.roadType === "Autoroute") {
        reductionWithEquipments.push(4);
      } else if (car.roadType === "Campagne") {
        reductionWithEquipments.push(6);
      } else if (car.roadType === "Ville") {
        reductionWithEquipments.push(2);
      }
    }
  }

  let consumptionWithEquipments = car.consumption;
  for (const reduction of reductionWithEquipments) {
    consumptionWithEquipments *= (100 - reduction) / 100;
  }

  consumptionWithEquipments = Math.round(consumptionWithEquipments * 100) / 100;

  let initialEmission = Math.round(
    (car.consumption * car.distance * CO2_PER_LITER) / 100
  );
  let emissionWithEquipments = Math.round(
    (consumptionWithEquipments * car.distance * CO2_PER_LITER) / 100
  );
  let savings = initialEmission - emissionWithEquipments;

  console.log(
    `Car ${car.makeModel} has a consumption of ${car.consumption}L/100km, and with equipments, it consumes ${consumptionWithEquipments}L/100km.`
  );
  console.log(
    `  -> For a distance of ${car.distance}km, the vehicle ${car.makeModel} emits ${initialEmission}g of CO2, and with the equipments, it emits ${emissionWithEquipments}g of CO2. Soit un gain de ${savings}g de CO2.`
  );

  return savings;
}

// --- Tests ---
function test(): void {
  /*
   * Problem Steps:
   * - Le vehicule Toyota-Camry a une consommation de 6L/100km, et avec les équipements, il consomme 5.76L/100km.
   * - Pour une distance de 981km, le vehicule Toyota-Camry emet 140793g de CO2, et avec les équipements, il emet 135161g de CO2. Soit un gain de 5632g de CO2.
   * - Le vehicule Chevrolet-Tahoe a une consommation de 5L/100km, et avec les équipements, il consomme 3.8L/100km.
   * - Pour une distance de 931km, le vehicule Chevrolet-Tahoe emet 111348g de CO2, et avec les équipements, il emet 84624g de CO2. Soit un gain de 26724g de CO2.
   * - Le vehicule Mercedes-EClass a une consommation de 8L/100km, et avec les équipements, il consomme 7.52L/100km.
   * - Pour une distance de 211km, le vehicule Mercedes-EClass emet 40377g de CO2, et avec les équipements, il emet 37954g de CO2. Soit un gain de 2423g de CO2.
   * - Le vehicule Chevrolet-Camaro n'a pas d'équipements. Il n'y a donc pas de gain.
   * - Le vehicule Volkswagen-Touareg n'a pas d'équipements. Il n'y a donc pas de gain.
   * - Le vehicule Porsche-Cayman a une consommation de 13L/100km, et avec les équipements, il consomme 11.98L/100km.
   * - Pour une distance de 646km, le vehicule Porsche-Cayman emet 200880g de CO2, et avec les équipements, il emet 185119g de CO2. Soit un gain de 15761g de CO2.
   * - Le vehicule Ford-Explorer a une consommation de 9L/100km, et avec les équipements, il consomme 8.73L/100km.
   * - Pour une distance de 120km, le vehicule Ford-Explorer emet 25834g de CO2, et avec les équipements, il emet 25059g de CO2. Soit un gain de 775g de CO2.
   * - Le vehicule Honda-Accord a une consommation de 6L/100km, et avec les équipements, il consomme 4.55L/100km.
   * - Pour une distance de 141km, le vehicule Honda-Accord emet 20236g de CO2, et avec les équipements, il emet 15346g de CO2. Soit un gain de 4890g de CO2.
   * - Le vehicule Porsche-Cayman a une consommation de 14L/100km, et avec les équipements, il consomme 13.44L/100km.
   * - Pour une distance de 818km, le vehicule Porsche-Cayman emet 273932g de CO2, et avec les équipements, il emet 262975g de CO2. Soit un gain de 10957g de CO2.
   * - Le vehicule Honda-CRV a une consommation de 15L/100km, et avec les équipements, il consomme 12.11L/100km.
   * - Pour une distance de 512km, le vehicule Honda-CRV emet 183706g de CO2, et avec les équipements, il emet 148312g de CO2. Soit un gain de 35394g de CO2.
   * - Le vehicule Audi-A8 n'a pas d'équipements. Il n'y a donc pas de gain.
   * - Le vehicule Porsche-911 a une consommation de 7L/100km, et avec les équipements, il consomme 6.58L/100km.
   * - Pour une distance de 559km, le vehicule Porsche-911 emet 93599g de CO2, et avec les équipements, il emet 87983g de CO2. Soit un gain de 5616g de CO2.
   * - Le vehicule Porsche-Macan n'a pas d'équipements. Il n'y a donc pas de gain.
   * - Le gain total est de 108172g de CO2.
   */
  const testingData = {
    vehicles: [
      "Toyota-Camry_Autoroute_6_981_EGR BP",
      "Chevrolet-Tahoe_Campagne_5_931_EGR BP_IECC_EHRS",
      "Mercedes-EClass_Campagne_8_211_EGR BP",
      "Chevrolet-Camaro_Autoroute_13_574",
      "Volkswagen-Touareg_Autoroute_7_134",
      "Porsche-Cayman_Autoroute_13_646_EGR BP_EHRS",
      "Ford-Explorer_Ville_9_120_EGR BP_EHRS",
      "Honda-Accord_Campagne_6_141_EGR BP_IECC_EHRS",
      "Porsche-Cayman_Autoroute_14_818_EGR BP",
      "Honda-CRV_Campagne_15_512_IECC_EHRS",
      "Audi-A8_Ville_5_695",
      "Porsche-911_Campagne_7_559_EGR BP",
      "Porsche-Macan_Autoroute_6_136",
    ],
  };
  const expected = "108172";
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
