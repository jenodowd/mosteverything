const express = require('express')
const app = express()

let counter = 0;

function random() {
    return Math.floor(Math.random() * 255); 
}

setInterval(random, 500)

app.get('/count', function (req, res) {
    res.send('<html><body>' + counter++ + '</body</html>')
})

app.get('/color', function (req, res) {
    res.send('<html><style>body {background-color: rgb(' + random() + "," + random() + "," + random() +');}</style><body><h1>Hello World</h1></body</html>')
})

app.listen(3000, function() {
    console.log('App listening on port 3000!')
})

