const express = require('express')
const app = express()
const fs = require('fs')

//console.log(fs.readFileSync('./question3.txt').toString().split("\n").map(Number).reduce((a,b) => a+b, 0))

app.get('/', (req, res) => {
    res.send("<div>" + fs.readFileSync('./question3.txt').toString().split("\n").map(Number).reduce((a,b) => a+b, 0) + "</div>")
})

app.listen(3000, () => console.log('working'))

