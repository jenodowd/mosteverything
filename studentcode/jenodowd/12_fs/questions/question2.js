const express = require('express')
const app = express()
const fs = require('fs')

var num = '';
var numTxt = ''

for (var i = 0; i < 10; i ++) {
    num = '<div>' + num + Math.floor((Math.random() * 100) + 1) + '<div>';
    numTxt =  numTxt + Math.floor((Math.random() * 100) + 1) + '\n';
}

app.get('/', (req, res) => {
    fs.writeFileSync('./question2.txt', numTxt);
    res.send("<div>" + num + "</div>")
})

app.listen(3000, () => console.log('working'))

Math.floor((Math.random() * 100) + 1)