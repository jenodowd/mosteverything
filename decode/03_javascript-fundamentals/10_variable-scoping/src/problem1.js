// Fix this function.
// It should return a different number every time it is called
// The first time it is called it returns 1
// Every call thereafter returns a number one greater than the last

var x = 0; 

function f() {
    //var x = 0;  
    x = x + 1;
    return x;
}

module.exports = f;