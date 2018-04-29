const fs = require('fs')

let str = fs.readFileSync('./question3.txt').toString().split("\n").reverse().join('\n');
console.log(str);
fs.writeFileSync('./question4.txt', str);
