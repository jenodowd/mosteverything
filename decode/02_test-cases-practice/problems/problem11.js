var assert = require('assert');

// we need 5 test cases. 
let inputs = [
  [1, 3, 5],
  [],
  [2, 2, "a"],
  [7, 10, 1],
  ["a", 1, 2]

]

let outputs = [
  9,
  0,
  "skip",
  18,
  "skip"
]

/*
Make this function return the sum of all the numbers in the input array. If any element in the array is not a number, skip it. If the array is empty, return zero.
*/

// for (var i = 0; i<inputs.length; i++) {
//     if (inputs[i] * 1 === "NaN") {
//         console.log(inputs[i] = 0)
//     }
// }


// function f(arr) {
//     var sum = 0;
//     for (var i = 0; i<arr.length; i++) {
//         if (typeof arr[i] === "number") {
//         sum = sum + arr[i]; 
//         }
//     } return sum;
// }


function f(arr) {

    var sum = arr.reduce(add, 0);

    function add(a, b) {
        return a + b;
    };

    if (arr.length < 1) {
        return 0;
    } else if (typeof sum !== "number") {
        return "skip";
    }

    return sum;

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