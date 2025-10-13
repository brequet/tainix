/**
 * Tainix Challenge: Braquage-du-coffre-2 [BANK_1]
 *
 * Problem:
 * You can find the problem description on the Tainix website.
 *
 * No steps found for this challenge.
 */

// Example of the data you will receive:
const exampleData = { "time": 261, "actions": "BBBBBBBBBBIIIIIIIIMMMMMMEEEEEEEEEE", "references": "B:5 I:8 M:4 E:9" };

// --- Your implementation below ---

function solve(data: typeof exampleData): string | number {
  console.log('Received data:', data);

  // Best practice: Destructure the data object for easier access.
  // The available properties for this challenge are: actions, references, time.
  // Example: const { actions, references, time } = data;

  // TODO: Implement your solution here
  const result = 0;

  return result;
}

// --- Tests ---

const result = solve(exampleData);
console.log(`Your result is: ${result}`);

const expectedOutput = `ESCAPE158`;
console.log(`Expected output is: ${expectedOutput}`);

if (String(result) === String(expectedOutput)) {
  console.log("✅ Success!");
} else {
  console.log("❌ Failed!");
}
