var assert = require('assert');

// we need 5 test cases. 
let inputs = [
    ["hey there"],
    ["MY NAME IS JEN"],
    ["wooo HOO"],
    ["hello World"],
    ["Hello world"]
]

let outputs = [
  "Hey There",
  "My Name Is Jen",
  "Wooo Hoo",
  "Hello World",
  "Hello World"
]

/*
Make this function return the input string, capitalized. You must use a for loop. For example:

f("hello world"); // Hello World
f("ALL YOUR BASE ARE BELONG"); // All Your Base Are Belong

*/


function f(str) {
    var newStr = "";
    for (var i = 0; i<str.length; i++) {
        newStr = str[i].toLowerCase().split(" ")
    } 
    for (var x = 0; x < newStr.length; x++) {
        newStr[x] = newStr[x].charAt(0).toUpperCase() + newStr[x].slice(1); 
    } return newStr.join(' ');
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