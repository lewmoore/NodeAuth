let express = require('express');
let app = express();
let port = process.env.PORT || 8080;
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let configDB = require('./config/database.js')
let passport = require('passport');

app.set("view engine", "ejs")

mongoose.connect(configDB.url);

app.get('/', function(req, res){
  res.render('index')
})

app.get('/login', function(req, res){
  res.render('login')
})

app.get('/profile', function(req, res){
  res.render('profile')
})

app.listen(port);
console.log('The magic happens on port ' + port);

module.exports = app
