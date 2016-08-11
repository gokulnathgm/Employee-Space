const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const config = require('./config/config');
const app = express();

mongoose.connect(config.url);

app.use(express.static('public'));
app.use('/bower_components', express.static('bower_components'));

app.use(bodyParser.json());
app.use(session({secret: 'thisisahighlyclassifiedsupersecret', resave: false, saveUninitialized: true}));
require('./app/routes')(app);

app.listen(process.env.PORT || 4000);
console.log('app is running on PORT 4000');