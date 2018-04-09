// You are not allowed to use a for loop or a while loops for any of these questions. Instead, use filter, map, etc...

function removeEvens(lst) {
    // lst is an array of numbers
    // Returns a new list with all the even numbers of lst removed
    return lst.filter(x => x % 2)
}

function keepLong(lst) {
    // lst is an array of strings
    // Returns a new list with all the elements of lst that are length greater than 5
    return lst.filter(x => x.length > 5)
}

function greet(lst) {
    // lst is an array of strings
    // Adds "Hello " to every element of greet
    // For example: greet(["bob", "eric"]) returns ["Hello bob", "Hello eric"]
    return lst.map(x => "Hello " + x);
}

function greetLong(lst) {
    // lst is an array of strings
    // Only greet people who's names have length at least 4.
    // Otherwise ignore them completely.
    // For example: greeLong(["bob", "daniel"]) returns ["Hello daniel"]
    return lst.filter(x => x.length >= 4).map(x => "Hello " + x)
}

function allLong(lst) {
    // lst is an array of strings
    // Returns true if every element of lst is of length at least 5. Otherwise returns false.

    //FILTER:

    // console.log('test0',lst)
    // console.log('test1',lst.filter(x => x.length >= 5))
    // console.log('test2',lst.filter(x => x.length >= 5).length === lst.length)
    // //                  

    // if (lst.filter(x => x.length >= 5).length === lst.length) {
    //     return true;
    // } return false;

    return lst.every(x => x.length >= 5)

}

module.exports = {removeEvens, keepLong, greet, greetLong, allLong};
