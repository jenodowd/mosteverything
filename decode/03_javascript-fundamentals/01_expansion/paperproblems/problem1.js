function square(x) {
    return x * x;
}

function decrement(x) {
    return x - 1;
}

function duplicateString(x) {
    return x.concat(x);
}
function reverseString(str) {
  var splitString = str.split(""); // var splitString = "hello".split("");
 
    var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
 
    return reverseArray.join(""); // var joinArray = ["o", "l", "l", "e", "h"].join("");
    
}
// Expand each of the following and get the result of the expression
// #1

// console.log(square(decrement(square(decrement(3)))))

//     console.log("decrement function: " + decrement(3))
//     console.log("square function: " + square(2))
//     console.log("decrement function: " + decrement(4))
//     console.log("square function: " + square(3))
       
       //Answer: 9

// #2

// console.log(decrement(decrement(square(square(3)))))
    
//     console.log("square function: " + square(3))
//     console.log("square function: " + square(9))
//     console.log("decrement function: " + decrement(81))
//     console.log("decrement function: " + decrement(80))

        //Answer: 79

// #3

// console.log(duplicateString(reverseString("hello")))

//     console.log("reverse string: " + reverseString("hello"))
//     console.log("duplicate string: " + duplicateString("olleh"))

// #4

// console.log(reverseString(duplicateString(duplicateString("foo"))))

//     console.log("duplicate string: " + duplicateString("foo"))
//     console.log("duplicate string: " + duplicateString("foofoo"))
//     console.log("reverse string: " + reverseString("foofoofoofoo"))