const fs = require('fs')
const express = require('express')
const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

var form =
  `
<form action="/favanimal" method="post">
    Signup
    <br />
    Username:
   <input name="username"/>
    Favourite animal:
   <input name="animal"/>
   <button type="submit">Submit</button>
</form>
`

let info = {}

app.get('/', (req, res) => {
  if(Object.keys(info).length === 0){
    res.send(form)
  }else{
    res.send("I LIKE " + Object.values(info)[0])
  }
})


app.post('/favanimal', function (req, res) {
  let contents = req.body;
  let username = contents.username;
  let animal = contents.animal;
  info[username] = animal;
  fs.writeFileSync('./passwords.json', JSON.stringify(info))
  res.send('form submitted')
})


app.listen(3000, () => console.log('Example app listening on port 3000!'))
