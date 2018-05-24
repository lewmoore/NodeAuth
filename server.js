let express = require('express');
let app = express();
let port = process.env.PORT || 8080;
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser')

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs")

mongoose.connect("mongodb://localhost:27017/NodeAuth");

app.get('/', function(req, res){
  res.render('index')
})

app.listen(port);
console.log('The magic happens on port ' + port);

module.exports = app
