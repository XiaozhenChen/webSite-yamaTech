



const express = require('express');
const bodyParser= require('body-parser')

const app = express();

const MongoClient = require('mongodb').MongoClient

const dbURI = "mongodb://Xiaozhen:List0415@ds149134.mlab.com:49134/yama" // account password, not include《》
var db

app.use(bodyParser.urlencoded({extended: true}))


//防止源码显示
/*
var ejs = require('ejs');  //我是新引入的ejs插件
app.engine('html', ejs.__express);
app.set('view engine', 'html');

app.use(express.static('public'));


app.use(express.static('public'));*/

//const express = require('express')
const path = require('path')
//const app = express()

app.use(express.static(path.join(__dirname, 'public')))



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
  // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
})

app.post('/quotes', (req, res) => {
	 console.log(req.body)
 
   db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})


//{useNewUrlParser: true }
MongoClient.connect(dbURI,{useNewUrlParser: true },(err, client) => {
  // ... start the server
   if (err) return console.log(err)
  db = client.db('yama') // whatever your database name is
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

