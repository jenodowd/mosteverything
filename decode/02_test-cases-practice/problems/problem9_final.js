var assert = require('assert');

// we need 5 test cases. 
let inputs = [
    "",
    "one",
    "abc ab a",
    "abc def ghi",
    "abcde gf"
]

let outputs = [
  "",
  "one",
  "abc",
  "ghi",
  "abcde"
]

/*
Make this function return the longest word in the input string. If the input string is empty then return an empty string.
If multiple words have the same length, return the last one that matches.
*/

function f(str) {
    var arr = str.split(' ');
    var longest = "";
    for (var i = 0; i <arr.length; i++) {
        if (longest.length <= arr[i].length) {
            longest = arr[i];
        }
    } return longest;
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

