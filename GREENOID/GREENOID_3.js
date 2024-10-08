// INPUT = map[robots:PCDPDDHDDCCHDPPDDDDDDDDCDDHDDDHHDDCDDHDDHDCDHDDHPDDPDDDHCPCPDPDPCDHDDPDDDDHDHDCHDDCDCHDDHDD];
console.log(
  "CHALLENGE_TOKEN: 'c2ae8e456549684b72cf64e85b5c3b10911484eaec2df0f9e7d9696413ef1713f31d4669c0cea3b0'"
);

// Challenge variables
const robots =
  "PCDPDDHDDCCHDPPDDDDDDDDCDDHDDDHHDDCDDHDDHDCDHDDHPDDPDDDHCPCPDPDPCDHDDPDDDDHDHDCHDDCDCHDDHDD";

function solveProblem(robots) {
  const dict = stringToDictOfCharOccurrences(robots);

  console.debug("debugging", dict.length);

  const maxKeyValue = Object.entries(dict).reduce(
    (max, current) => {
      return current[1] > max[1] ? current : max;
    },
    [null, -Infinity]
  );

  const ans = {
    C: "CREATE",
    H: "HEAL",
    P: "PRESERVE",
    D: "DESTROY",
  };

  return `${ans[maxKeyValue[0]]}_${maxKeyValue[1]}`;
}

console.log(`Answer: '${solveProblem(robots)}'`);
test();

function test() {
  const robots = "DHPDDDDDCHCPDHCPPPDPHDDDDDDHCDDCDDDDHDDCDCCHDHCDDHCDHHCDDPHDCDPCHHDPPHDDHDDDDHDDCPPDDCDCHDCCCDPDH"

  const result = solveProblem(robots);

  const expected = "DESTROY_46"

  if (result !== expected) {
    throw new Error(`Expected ${expected}, got ${result}`);
  } else {
    console.log("Test passed !");
  }

}

/**
 * Predefined utility functions
 */

function stringToDictOfCharOccurrences(str) {
  return str.split("").reduce((acc, cur) => {
    if (!(cur in acc)) acc[cur] = 0;
    acc[cur]++;
    return acc;
  }, {});
}

const cl = console.log
