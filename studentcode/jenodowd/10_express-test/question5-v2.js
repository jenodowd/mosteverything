const express = require('express')
const app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.raw({ type: '*/*' }))

app.post('/question5', (req, res) => {

    var input = (JSON.parse(req.body.toString()))

    if(input.username.length > 1 && input.password.length > 1){
        res.send("Success")
    }else{
        res.send("Big fail!")
    }
    
})


app.listen(3000, function() {
    console.log('App listening on port 3000!')
})