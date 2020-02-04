var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');

require('./models/users');
require('./models/jobs');
require('./models/sections');
require('./models/attentions');

mongoose.connect('mongodb://localhost/guardia-test', {useNewUrlParser: true});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

app.use(require('./routes'));

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('funciona mongoose connection');
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.post('/login',function(req, res){
  res.send('login');
});