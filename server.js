let express = require('express');
let app = express();
let port = process.env.PORT || 8080;
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser')
let session = require('express-session')
let configDB = require('./config/database.js')
let passport = require('passport');
require('./config/passport')(passport)

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize())
app.use(passport.session())
app.use(session({ secret: 'reallygoodsecret' }))

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

app.get('/signup', function(req, res){
  res.render('signup')
})

app.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup'
}))

app.get('/logout', function(req, res){
  req.logout()
  res.redirect('/')
})

app.listen(port);
console.log('The magic happens on port ' + port);

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}

module.exports = app
