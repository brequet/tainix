/**
 * Tainix Challenge: {{ data.details.challenge_name }} [{{ data.details.challenge_code }}]
 *
 * Problem:
 * You can find the problem description on the Tainix website.
 *
{%- if data.details.steps %}
 * Steps:
{%- for step in data.details.steps %}
 * - {{ step }}
{%- endfor %}
{%- else %}
 * No steps found for this challenge.
{%- endif %}
 */

// Example of the data you will receive:
const exampleData = {{ example_input | safe }};

// --- Your implementation below ---

function solve(data: typeof exampleData): string | number {
  console.log('Received data:', data);
  
  // TODO: Implement your solution here
  const result = 0;
  
  return result;
}

// --- Tests ---

const result = solve(exampleData);
console.log(`Your result is: ${result}`);

const expectedOutput = `{{ data.details.expected_output | default(value="") }}`;
console.log(`Expected output is: ${expectedOutput}`);

if (String(result) === String(expectedOutput)) {
    console.log("✅ Success!");
} else {
    console.log("❌ Failed!");
}
