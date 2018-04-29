// Instructions: run this file like so:
// node problem2.js
// Don't forget that the assert npm package needs to be installed

var assert = require('assert');
var price = { 123: 10}
var description = { 123: "a nice racket", 456: "a luxurious purse"}
var both = {}

for (var k in description) {
    both[k] = { description: description[k], price: price[k] };
}

assert(both[123]["description"] == "a nice racket")
assert(both[456].description == "a luxurious purse")