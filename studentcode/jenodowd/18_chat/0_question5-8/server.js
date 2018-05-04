const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require("fs")
app.use(bodyParser.raw({ type: "*/*" }))

let serverState = {
    messages: []
}

//let info = {}
let info = {
    // "jen": "12",
    // "sim": "13"
}


// try {
//     info = JSON.parse(fs.readFileSync('./info.json').toString())
//   } catch(err) {
//   }

app.post('/createaccount', (req, res) => {
    let parsed = JSON.parse(req.body.toString());
    let username = parsed.username;
    let password = parsed.password;
    if (info[username] === password) {
        res.send('failure')
    } else {
        info[username] = password;
    }
    // //fs.writeFileSync('./info.json', JSON.stringify(info))
    // fs.writeFile('./info.json', JSON.stringify(info), 'utf8', function(err) {
    //     if (err) console.log(err);//reject(err);
    //     else console.log("SUCCESS");
    // })
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
    //console.log(serverState.messages)
})


app.post('/sendmsgs', (req, res) => {
    let bod = req.body.toString();
    serverState.messages.push(JSON.parse(bod))
    //console.log(serverState.messages)
    res.send("success");
})

app.post('/welcome', (req, res) => {
    let bod = req.body.toString();
    serverState.messages.push(JSON.parse(bod))
    res.send("success");
})


app.listen(4000, () => console.log("all good on 4000"))