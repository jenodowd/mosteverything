const express = require('express')
const app = express()
const fs = require('fs')
const bodyParser = require('body-parser')

app.use(bodyParser.raw({ type: '*/*' }))


// The following two endpoints are so that the browser can load the HTML and Javascript
app.get('/', (req, res) => res.send(fs.readFileSync('./public/index.html').toString()))
app.get('/app.js', (req, res) => res.send(fs.readFileSync('./public/app.js').toString()))

// 
let serverState = {
    items: {}
}


app.post('/clear', (req, res) => {
    //console.log(serverState)
    //console.log(parsedBody.listName)
    let parsedBody = JSON.parse(req.body.toString())
    serverState.items[parsedBody.listName] = []

    res.send(JSON.stringify(communication = "SUCCESS"));
})

app.post('/reverse', (req, res) => {
    console.log(serverState)

    let parsedBody = JSON.parse(req.body.toString())
    serverState.items[parsedBody.listName] = serverState.items[parsedBody.listName].reverse()

    res.send(JSON.stringify(communication = "SUCCESS"));
})

app.post('/items', (req, res) => {
    let parsedBody = JSON.parse(req.body.toString())
    let listName = parsedBody.listName;
    let items = serverState.items[listName];
    if(!items) items = []
    console.log(serverState)
    res.send(JSON.stringify(items));
})

app.post('/addItem', (req, res) => {
    // Remember: the body of an HTTP response is just a string.
    // You need to convert it to a javascript object
    let parsedBody = JSON.parse(req.body.toString())
    // This is just a convenience to save some typing later on
    let listName = parsedBody.listName;
    // If the list doesn't exist, create it
    if(!serverState.items[listName]) { serverState.items[listName] = [] }
    // The following could be rewritten in a shorter way using push.
    // Try rewriting it. It will help you understand it better.
    serverState.items[listName] = serverState.items[listName].concat(parsedBody.item)
    console.log(serverState)
    res.send(JSON.stringify(serverState.items[listName]));
})


app.listen(3000, () => console.log('Example app listening on port 3000!'))
