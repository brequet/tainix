/**
 * Tainix Challenge: Braquage-du-coffre-2 [BANK_1]
 * 
 * Challenge Token: 256ecb840d80e8ee6611564e441e88ee1c69e1c74b78da25edc81030e7378e84bb29b7740ae9d0f8
 */

const inputData = {
  "time": 284,
  "actions": "BBBBBBBBBBBBBIIIIIIIIIIMMMMMMMMMMEEEEEEEEEEE",
  "references": "B:9 I:4 M:1 E:9"
};

type InputData = typeof inputData;

// INSTRUCTIONS: use vars to destructure the input data
function solve({ actions, references, time }: InputData): string {
  const result = "";
  return result;
}

// --- Tests ---
function test(): void {
 /*
   * Problem Steps:
   * - Il faut 56 de temps pour les actions "Break".
   * - Il faut 50 de temps pour les actions "IT".
   * - Il faut 16 de temps pour les actions "Money".
   * - Il faut 63 de temps pour les actions "Prepare".
   * - Ils ont donc besoin de 185 de temps et la police arrive dans 329.
   * - Ils peuvent s'échapper ! Il leur restait 144 de temps.
   */
  const testingData = {
  "actions": "BBBBBBBIIIIIIIIIIMMMMMMMMEEEEEEE",
  "references": "B:8 I:5 M:2 E:9",
  "time": 329
};
  const expected = "ESCAPE144"; // Already a JSON string from Rust
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

// --- Command Handling ---
// The 'Command' type is dynamically generated from the list provided by Rust.
type Command = "test" | "run";

function getCommandFromArgs(): Command {
  if (process.argv.length < 3) {
    return "run"; // Default command
  }

  const cmd = process.argv[2];
  const validCommands: Command[] = ["test", "run"];

  // Best Practice: Check if the command is valid in a dynamic way.
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
