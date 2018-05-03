const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.raw({ type: "*/*" }))

let serverState = {
    messages: []
}

app.post('/login', (req, res) => {
    let parsed = JSON.parse(req.body.toString());
    let username = parsed.username;
    let password = parsed.password;
    if ( username === "jen" && password === "123") {
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

app.post('/newuser', (req, res) => {
    let bod = req.body.toString();
    serverState.messages.push(JSON.parse(bod))
    res.send("success");
})

app.listen(4000, () => console.log("all good on 4000"))