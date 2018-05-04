const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require("fs")
app.use(bodyParser.raw({ type: "*/*" }))

let serverState = {
    messages: []
}

let info = {}

try {
    info = JSON.parse(fs.readFileSync('./info.json').toString())
  } catch(err) {
  }


app.post('/createaccount', (req, res) => {
    let parsed = JSON.parse(req.body.toString());
    let username = parsed.username;
    let password = parsed.password;
    console.log("A2",parsed)
    info[username] = password;
    // //fs.writeFileSync('./info.json', JSON.stringify(info))
    // fs.writeFile('./info.json', JSON.stringify(info), 'utf8', function(err) {
    //     if (err) console.log(err);//reject(err);
    //     else console.log("SUCCESS");
    // })
    console.log("A3", parsed)
    res.send('form submitted')
})

app.post('/login', (req, res) => {
    let parsed = JSON.parse(req.body.toString());
    let username = parsed.username;
    let password = parsed.password;
    if (username === "jen" && password === "123") {
        res.send('success')
    } else {
        res.send('failure');
    }
})

app.get('/messages', (req, res) => {
    //console.log("B2")
    //console.log("B3",serverState)
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