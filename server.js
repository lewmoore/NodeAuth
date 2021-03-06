let express  = require('express');
let app      = express();
let port     = process.env.PORT || 8080;
let mongoose = require('mongoose');
let passport = require('passport');
let flash    = require('connect-flash');

let morgan       = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser   = require('body-parser');
let session      = require('express-session');

if (process.env.NODE_ENV === 'test') {
  mongoose.connect("mongodb://localhost:27017/NodeAuthTest")
} else {
  mongoose.connect("mongodb://localhost:27017/NodeAuth")
}


require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');


app.use(session({
  secret: 'thisisasecret',
  resave: true,
  saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/routes.js')(app, passport);

app.listen(port);
console.log('The magic happens on port ' + port);

module.exports = app
