//console.log(__dirname)

// use express by requiring it
const express = require('express')
const app = express()
//MongoDB code
const MongoClient = require('mongodb').MongoClient
require('dotenv').config(); //dotenv help loads .env file
const connectionString = process.env.API_KEY; //"mongodb+srv://edwardmao2:q1sOWMXOsCZ0vXus@cluster0.fkc3g.mongodb.net/"
//embedded javascript is the template engine required to generate HTML
app.set('view engine', 'ejs') //must place before app.use/get/post

//Make sure to place this before CRUD handlers
app.use(express.urlencoded({ extended: true }))
//urlencoded method extracts data from form and adds to body property in request object
app.use(express.static('public')) //tell express to make public folder accessible
app.use(express.json()) //express json middlewhere
//listens on port 3000
app.listen(3000, function() {
  console.log('listening on 3000')
})

MongoClient.connect(connectionString).then(client => {
        console.log('Connected to Database');
        const db = client.db('star-wars-quotes')
        const quotesCollection = db.collection('quotes')
        app.post('/quotes', (req, res) => {
            quotesCollection
                .insertOne(req.body)
                .then(result => {
                    //console.log(result)
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })

        app.get('/', (req, res) => {
            db.collection('quotes')
              .find()
              .toArray()
              .then(results => {
                //console.log(results)
                res.render('index.ejs', {quotes:results})
              })
              .catch(error => console.error(error))
            })
        
        app.put('/quotes', (req, res) => {
            quotesCollection.findOneAndUpdate(
              { name: 'Yoda' },
              {
                $set: {
                  name: req.body.name,
                  quote: req.body.quote,
                },
              },
              {
                upsert: true,
              }
            )
            .then(result => {
              console.log('Successfully sent PUT request')
            })
            .catch(error => console.error(error))
        })    
        
        app.delete('/quotes', (req, res) =>{
          quotesCollection
          .deleteOne({ name: req.body.name })
          .then(result => {
            if(result.deletedCount === 0){
              return res.json('No quote to delete')
            }
            res.json(`Deleted Darth Vader's quote`)
          })
          .catch(error => console.error(error))
        })
          
})



// app.put('/quotes', (req, res) => {
//   quotesCollection.findOneAndUpdate(/* ... */)
//     .then(result => {
//       console.log(result)
//      })
//     .catch(error => console.error(error))
// })


//browsers perform a READ operation upon visitin a website
//app.get(endpoint,callback)
//  the endpoint value is what comes after the domain name
//  localhost:3000 is really localhost:3000/
//callback tells server what to do when endpoint matches value
//(request, respond) object
// app.get('/', (req, res) => {
//     //send is a callback
//     res.sendFile(__dirname + '/index.html')
//     //__dirname is current directory
// })

// app.post('/quotes', (req, res) => {
//     //console.log(req.body)
//     quotesCollection
//         .insertOne(req.body)
//         .then(result => {
//             console.log(result)
//         })
//         .catch(error => console.error(error))
// })