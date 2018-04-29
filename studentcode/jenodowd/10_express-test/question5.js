const express = require('express')
const app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.raw({ type: '*/*' }))

var webpage =
   `
<form action="/postendpoint" method="POST">
  <input type="text" name="somename"/>
  <input type="submit"/>
</form>
`

app.post('/', (req, res) => {

    var c = (req.body)
    var b = ((req.body.toString()))
    var a = (JSON.parse(req.body.toString()))
    //console.log(JSON.parse(req.body.toString()))
    console.log('c',c)
    console.log('b',b)
    console.log('a',a)
    console.log(a.username)
    if(a.username.length < 1){

        res.send("Success")
    }else{

        res.send("Big fail!")
    }
})

// app.get('/question5', (req, res) => {
//    res.send('{name : jen}')
// })

app.listen(3000, function() {
    console.log('App listening on port 3000!')
})
