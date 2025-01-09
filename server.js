//console.log(__dirname)

// use express by requiring it
const express = require('express')
const app = express()

//listens on port 3000
app.listen(3000, function() {
    console.log('listening on 3000')
})

//browsers perform a READ operation upon visitin a website
//app.get(endpoint,callback)
//  the endpoint value is what comes after the domain name
//  localhost:3000 is really localhost:3000/
//callback tells server what to do when endpoint matches value
//(request, respond) object
app.get('/', (req, res) => {
    //send is a callback
    res.sendFile(__dirname + '/index.html')
    //__dirname is current directory
})