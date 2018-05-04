const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require("fs")
app.use(bodyParser.raw({ type: "*/*" }))

let serverState = {
    messages: []
}

let info = {}

let sessionInfo = {}

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
        let sessionID = Math.floor(Math.random() * 10000000);
        sessionInfo[sessionID] = username;
        res.send(JSON.stringify({sessionID: sessionID}))
    } else {
        res.send('failure');
    }
})


app.get('/messages', (req, res) => {
    res.send(JSON.stringify(serverState.messages));
})


app.post('/sendmsgs', (req, res) => {
    let parsed = JSON.parse(req.body.toString());
    let sessionID = parsed.sessionID;

    if (sessionID) {
        let newMsg = {username: parsed.username, contents: parsed.contents}
        serverState.messages.push(newMsg)
        res.send('success');
    }
    else { res.send('fail')};
})

app.post('/welcome', (req, res) => {
    let bod = req.body.toString();
    serverState.messages.push(JSON.parse(bod))
    res.send("success");
})


app.listen(4000, () => console.log("all good on 4000"))