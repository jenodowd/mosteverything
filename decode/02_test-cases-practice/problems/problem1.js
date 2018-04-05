var assert = require('assert');

// we need 5 test cases. I provided 1 input
let inputs = [
  "abc",
  "xyz",
  "jen",
  "hey",
  ""
]

let outputs = [
  "a",
  "x",
  "j",
  "h",
  undefined
]

// Make this function return the first letter of the string that is passed to it. If the string does not have a first letter, return undefined

// function f(str){
//   var newArray = [];
//   for (var i = 0; i < str.length; i++) {
//     //console.log(str[i].charAt(0));
//     newArray.push(str[i].charAt(0));
//   } return newArray;
// }

function f(str) {
  console.log(str)
  str = str[0]
  console.log(str)
  return str;
}


function runTest(i) {
    var expected = outputs[i];
    var actual = f(inputs[i]);
    assert.deepEqual(actual, expected);
}

runTest(0);
runTest(1);
runTest(2);
runTest(3);
runTest(4);

