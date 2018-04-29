const fs = require('fs')
const express = require('express')
const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

var form = 
`
<form action="/createAccount" method="post">
    Username
   <input name="username"/>
    Password
   <input name="password"/>
   <button type="submit">Submit</button>
</form>
`

app.get('/', (req, res) => res.send(form))

let passwords = { }

app.post('/createAccount', function (req, res) {
    let contents = req.body;
    let username = contents.username;
    let password = contents.password;
    passwords[username] = password;
    fs.writeFileSync('./passwords.json', JSON.stringify(passwords))
    res.send('done')
  })


  app.listen(3000, () => console.log('Example app listening on port 3000!'))
  