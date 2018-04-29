const express = require('express')
const app = express()

app.get('/home', (req, res) => res.send('<h1>' + req.query.foo + '</h1>'))

app.listen(3000)