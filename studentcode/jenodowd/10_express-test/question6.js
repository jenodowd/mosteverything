const express = require('express')
const app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.raw({ type: '*/*' }))

app.post('/question6', (req, res) => {

    var input = (JSON.parse(req.body.toString()))

    if(input.username === "foo" && input.password === "bar"){
        res.send("Success")
    }else{
        res.send("Big fail!")
    }
})


app.listen(3000, function() {
    console.log('App listening on port 3000!')
})