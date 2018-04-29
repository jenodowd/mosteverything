// Instructions: run this file like so:
// node problem1.js
// Don't forget that the assert npm package needs to be installed

var assert = require('assert');
var age = { "jane": 28, "jack": 32 }
var address = {"jane": "123 elm street", "jack": "12 elm street"}
var both = {}

for (var k in address) {
    both[k] = { address: address[k], age: age[k] };
}

assert(both["jack"].age == 32)
assert(both.jane["address"] == "123 elm street")