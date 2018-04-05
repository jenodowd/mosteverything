var assert = require('assert');

// we need 7 test cases. 
let inputs = [
  ["hey", 2],
  ["jen", 4],
  ["wooo", 3],
  ["hello", -1],
  ["world", 1],
  ["bonjour", 0],
  ["hi", 5]
]

let outputs = [
  "heyhey",
  "jenjenjenjen",
  "wooowooowooo",
  undefined,
  "world",
  undefined,
  "hihihihihi"
]

/*
Make this function return the input string repeated as many times as specified. 
If a negative number or zero is specified, return an empty string. If any invalid parameters are supplied return undefined.

For example:

f(["foo", 3]) // "foofoofoo"
f(["fo", 3]) // "fofofo"
f(["foo", -1]) // undefined
*/

function f(arr) {
    var str = arr[0]; 
    if(arr[1] >= 1) {
        return str.repeat(arr[1])
    } else return undefined;
}

function runTest(i) {
    if(i > inputs.length) throw new Error("You do not have enough test cases");
    var expected = outputs[i];
    console.log("expected: " + expected)
    var actual = f(inputs[i]);
    console.log("actual :" + actual)
    assert.deepEqual(actual, expected);
}

runTest(0);
runTest(1);
runTest(2);
runTest(3);
runTest(4);
runTest(5);
runTest(6);

