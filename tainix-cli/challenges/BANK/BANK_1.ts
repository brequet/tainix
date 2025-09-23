/**
 * Tainix Challenge: Braquage-du-coffre-2 [BANK_1]
 */

const inputData = {
  "references": "B:9 I:3 M:1 E:9",
  "actions": "BBBBBBBBBBBBBBBIIIIIIIIMMMMMMMMMMMEEEEEEEEE",
  "time": 191
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
   * No steps found for this challenge.
   */
  const testingData = {
  "actions": "BBBBBIIIIIIIIMMMMMEEEEEE",
  "references": "B:6 I:3 M:3 E:9",
  "time": 133
};
  const expected = "ESCAPE10"; // Already a JSON string from Rust
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
  if ((validCommands as readonly string[]).includes(cmd)) {
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
