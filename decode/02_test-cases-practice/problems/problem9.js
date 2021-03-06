var assert = require('assert');

// we need 5 test cases. 
let inputs = [
    ["hello", "you"],
    ["jen", "jennifer"],
    ["helloworld", "hello"],
    ["wooo", "hoo"],
    ["hello", ""]
]

let outputs = [
  "hello",
  "jennfer",
  "helloworld",
  "wooo",
  "hello"
]

/*
Make this function return the longest word in the input string. If the input string is empty then return an empty string.
If multiple words have the same length, return the last one that matches.
*/

function f(arr){
    if (arr[0].length > arr[1].length) {
        return arr[0];
    } else return arr[1];
}



function runTest(i) {
    if(i > inputs.length) throw new Error("You do not have enough test cases");
    var expected = outputs[i];
    console.log("expected: " + expected)
    var actual = f(inputs[i]);
    console.log("actual :" + actual)
    //assert.deepEqual(actual, expected);
}

runTest(0);
runTest(1);
runTest(2);
runTest(3);
runTest(4);

