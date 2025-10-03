/**
 * Tainix Challenge: {{ details.challenge_name }} [{{ details.challenge_code }}]
 * 
 * Challenge Token: {{ input_data.token }}
 */

const inputData = {{ input | safe }};

type InputData = typeof inputData;

// INSTRUCTIONS: use vars to destructure the input data
function solve({ {{ data_keys | join(sep=", ") }} }: InputData): string {
  const result = "";
  return result;
}

// --- Tests ---
function test(): void {
 /*
   * Problem Steps:
   {%- if details.steps %}
   {%- for step in details.steps %}
   * - {{ step }}
   {%- endfor %}
   {%- else %}
   * No steps found for this challenge.
   {%- endif %}
   */
  const testingData = {{ example_input | safe }};
  const expected = {{ expected_output | safe }}; // Already a JSON string from Rust
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
type Command = {% for command in commands %}"{{ command }}"{% if not loop.last %} | {% endif %}{% endfor %};

function getCommandFromArgs(): Command {
  if (process.argv.length < 3) {
    return "run"; // Default command
  }

  const cmd = process.argv[2];
  const validCommands: Command[] = [{% for command in commands %}"{{ command }}"{% if not loop.last %}, {% endif %}{% endfor %}];

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
