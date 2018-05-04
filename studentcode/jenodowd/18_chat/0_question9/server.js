const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require("fs")
app.use(bodyParser.raw({ type: "*/*" }))

let serverState = {
    messages: []
}

let info = {}

let sessionID = {}

try {
    info = JSON.parse(fs.readFileSync('../info.json').toString())
  } catch(err) {
  }

app.post('/createaccount', (req, res) => {
    let parsed = JSON.parse(req.body.toString());
    let username = parsed.username;
    let password = parsed.password;
    if (info[username] === password) {
        res.send('failure')
    } else {
        info[username] = password;
    }

    fs.writeFileSync('../info.json', JSON.stringify(info))
    res.send('form submitted')
})

app.post('/login', (req, res) => {
    let parsed = JSON.parse(req.body.toString());
    let username = parsed.username;
    let password = parsed.password;
    if (info[username] === password) {
        res.send('success')
    } else {
        res.send('failure');
    }
})

app.get('/messages', (req, res) => {
    res.send(JSON.stringify(serverState.messages));
})


app.post('/sendmsgs', (req, res) => {
    let bod = req.body.toString();
    serverState.messages.push(JSON.parse(bod))
    res.send("success");
})

app.post('/welcome', (req, res) => {
    let bod = req.body.toString();
    serverState.messages.push(JSON.parse(bod))
    res.send("success");
})


app.listen(4000, () => console.log("all good on 4000"))