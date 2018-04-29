const express = require('express')
const app = express()

function bigger(a,b) {
    if (a < b) {
        return b;
    } return a;
}

app.get('/question4', (req, res) => res.send(
    '<h1>' + bigger(req.query.foo,req.query.bar) + '</h1>'
))

app.listen(3000)