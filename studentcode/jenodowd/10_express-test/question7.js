const express = require('express')
const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

var webpage =
`
<form action="/postendpoint" method="POST">
  <input placeholder="name" type="text" name="name"/>
  <input placeholder="password" type="password" name="password"/>
  <input type="submit"/>
</form>
`

app.get('/', (req, res) => res.send(webpage))

app.post('/postendpoint', (req, res) => {

    var input = req.body
    if(input.name.length > 10 && input.password.length > 10) {
        res.send("Success")
    } else{
        res.send("Big fail!")
    }
    
})


app.listen(3000, () => console.log('Example app listening on port 3000!'))