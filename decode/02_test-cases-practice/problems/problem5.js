var assert = require('assert');

// we need 5 test cases. 
let inputs = [
  [2, 4],
  [3, 3],
  [1, 2],
  [6, "a"],
  [true, 1]
]

let outputs = [
  8,
  9,
  2,
  undefined,
  undefined
]

/*
Make this function return the product of the two numbers that are passed to it. If one of the numbers is not passed, or if anything other than numbers are passed, return undefined.
*/
// function f(arr) {
//     arr = arr[0] * arr[1]
//     return arr;
// }

function f(arr) {

  if (typeof arr[0] === "number" && typeof arr[1] === "number") {
    return arr[0] * arr[1]
  }
  return undefined;

  }


function runTest(i) {
    if(i > inputs.length) throw new Error("You do not have enough test cases");
    var expected = outputs[i];
    console.log("expected: " + expected);
    var actual = f(inputs[i]);
    console.log("actual: " + actual);
    assert.deepEqual(actual, expected);
}

runTest(0);
runTest(1);
runTest(2);
runTest(3);
runTest(4);
console.log("test cases passed");