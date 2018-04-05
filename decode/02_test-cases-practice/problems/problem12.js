var assert = require('assert');

// we need 5 test cases. 
let inputs = [
    [[3, 1, 2, 0], [1, 3, 4, 5]],
    [[1, 2, 3], [1, 2, 3]],
    [[2, 3, 4], [2, 3]],
    [[2, 3], "string"],
    [[1, 2], 123]
]

let outputs = [
    [0, 2, 4, 5],
    [],
    [4],
    undefined,
    undefined
]

/*
Make this function return the elements that are unique to array1 and array2.
If there are no unique elements return an empty array.
If the inputs are anything other than arrays, return undefined. 
For example:
uniqueElements([0,1,2,3], [1,3,4,5]); // [0,2,4,5]
uniqueElements([[1,2,3], [1,2,3]]); // []
uniqueElements([2,3]); // undefined, not arrays



*/
function f(arr1, arr2) {
    //    [[10,11,22,33], [11,30,44,55]],
    outputArray = []
    for (var i = 0; i < arr1.length; i++) {
        // i = 0
        // arr1.includes(0)
        if (!arr2.includes(arr1[i])) {
            outputArray.push(arr1[i])
        } 
    }
    for (var i = 0; i < arr2.length; i++) {
        // i = 0
        // arr1.includes(0)
        if (!arr1.includes(arr2[i])) {
            outputArray.push(arr2[i])
        } 
    }
    console.log('output',outputArray)
    return outputArray
}


    function runTest(i) {
        if (i > inputs.length) throw new Error("You do not have enough test cases");
        var expected = outputs[i];
        //console.log("expected: " + expected)
        var input = inputs[i];
        //console.log("input :" + input)
        var actual = f(input[0], input[1]);
        //console.log("actual :" + actual)
        //assert.deepEqual(actual, expected);
    }

    runTest(0);
// runTest(1);
// runTest(2);
// runTest(3);
// runTest(4);

//console.log("test cases passed");