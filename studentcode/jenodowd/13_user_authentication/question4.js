const fs = require('fs')
const express = require('express')
const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
var sha1 = require('sha1')


var form =
  `
<form action="/createAccount" method="post">
    Signup
    <br />
    Username:
   <input name="username"/>
    Favourite animal:
   <input name="animal"/>
   <button type="submit">Submit</button>
</form>
<form action="/login" method="post">
    Login
    <br />
    Username:
   <input name="username"/>
    Favourite animal:
   <input name="animal"/>
   <button type="submit">Submit</button>
</form>
`


app.get('/', (req, res) => {
  res.send(form);
});

var info = {}
try {
  info = JSON.parse(fs.readFileSync('./passwords.json').toString())
} catch(err) {
}

app.post('/createAccount', function (req, res) {
  let contents = req.body;
  let username = contents.username;
  console.log('-----------------',req.body)
  console.log(contents)
  console.log(contents.animal)
  let password = sha1(contents.animal);
  info[username] = password;
  console.log(1,info)
  fs.writeFileSync('./passwords.json', JSON.stringify(info))
  res.send('form submitted')
})

app.post('/login', function (req, res) {
  let contents = req.body;
  let username = contents.username;
  console.log(req.body)
  console.log(contents)
  console.log(contents.animal)
  let password = sha1(contents.animal);
  if (info[username] === password) {
    res.send('Welcome back ' + username)
  } else {
    res.send('Login failed')
  }
})


app.listen(3000, () => console.log('Example app listening on port 3000!'))
