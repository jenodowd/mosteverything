// fix all the errors
// function c(g, h) {
//     var x = g(6);
//     var y = h(8);
//     return [x, y];
// }

// function t() {
//     return c(function (x) {return y + 1}, function (y) {return x * 2});
// }

// module.exports = t;

function c (g, h) { // g = function (y) {return y + 1}, h = function (x) {return x * 2}
    var x = g(6); // 7
    var y = h(8); // 16
    return [x, y]; // [7, 16]
}

function t () {
    return c(function (y) {return y + 1}, function (x) {return x * 2}); // [7, 16]
}


module.exports = t;