const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

mongoose.connect('mongodb://localhost/employee-space');

app.use(express.static('public'));
app.use('/bower_components', express.static('bower_components'));

app.use(bodyParser.json());
app.use(session({secret: 'thisisahighlyclassifiedsupersecret', resave: false, saveUninitialized: true}));
require('./app/routes')(app);

app.listen(4000);
console.log('app is running on PORT 4000');