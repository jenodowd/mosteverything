var assert = require('assert');

// we need 5 test cases.
let inputs = [
"abc",
"xyz",
"jen",
"hey",
""
]

let outputs = [
"c",
"z",
"n",
"y",
undefined
]

// Make this function return the last letter of the string that is passed to it. If the string does not have a last letter, return undefined

function f(str) {
    if (str == "") {
        return console.log(undefined)
    } else {
    //console.log(str)
    str = str.charAt(str.length-1)
    //console.log(str)
    return str;
    }
}

function runTest(i) {
    var expected = outputs[i];
    console.log("expected: " + expected)
    var actual = f(inputs[i]);
    console.log("actual: " + actual)
    assert.deepEqual(actual, expected);
}

runTest(0);
runTest(1);
runTest(2);
runTest(3);
runTest(4);
