const express = require('express')
const app = express()
const fs = require('fs')

var num = '';
var numTxt = ''

for (var i = 1; i < 101; i ++) {
    num = '<div>' + num + i + '<div>';
    numTxt =  numTxt + i + '\n';
}

app.get('/getit', (req, res) => {
    fs.writeFileSync('./question1.txt', numTxt);
    res.send("<div>" + num + "</div>")
})

app.listen(3000, () => console.log('working'))