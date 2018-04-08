var assert = require('assert');

// we need 5 test cases. 
let inputs = [
  "RADAR",
  "javascript",
  "nan",
  "WEW",
  "no n"
]

let outputs = [
 true,
 false,
 true,
 true,
 false
]

/*
Make this function return true if the input string is a palindrome, and false otherwise. A palindrome is simply a string that is the same if you reverse it.

RADAR -> Yes
JAVASCRIPT -> No
*/
function f(str) {
    var checkStr = str.split('').reverse().join('');
    if (str === checkStr) {
        return true;
    } else return false;
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

