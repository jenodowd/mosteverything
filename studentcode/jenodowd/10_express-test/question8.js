const express = require('express')
const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

var webpage =
`
<form action="/submitForm" method="POST">
  Name: <input placeholder="name" type="text" name="name"/>
  Password: <input placeholder="password" type="password" name="password"/>
  Re-enter Password: <input placeholder="re-enter password" type="password" name="repassword"/>
  <input type="submit"/>
</form>
`

app.get('/', (req, res) => res.send(webpage))

app.post('/submitForm', (req, res) => {

    var input = req.body
    if(input.name.length > 1 && input.password.length > 1 && input.password === input.repassword) {
        res.send("Success")
    } else{
        res.send("Big fail!")
    }
    
})


app.listen(3000, () => console.log('Example app listening on port 3000!'))