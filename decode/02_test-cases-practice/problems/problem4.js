var assert = require('assert');

// we need 8 test cases. I've provided the first 2
let inputs = [
  ["hello", 4],
  ["", 2]
]

let outputs = [
  "o",
  undefined
]

/*
Make this function return the letter at the specified position in the string. If no such letter exists, it should return undefined.
For example:
f(["hello", 1]); // e
f(["", 4]); // undefined
f(["abc", 0]); // a
*/

// function f(arr) {
// arr = arr[0].charAt(arr[1])
// return arr;
// }



function f(arr) {
var str = arr[0];
if (arr[1]) {
  return str.charAt(arr[1]);  
} else return undefined;
}



function runTest(i) {
    var expected = outputs[i];
    console.log("expected: " + expected);
    var input = inputs[i];
    //console.log("input: " + input);
    var actual = f(input);
    console.log("actual: " + actual);
    //assert.deepEqual(actual, expected);
}

runTest(0);
//runTest(1);
// runTest(2);
// runTest(3);
// runTest(4);
// runTest(5);
// runTest(6);
// runTest(7);
//console.log("test cases passed");