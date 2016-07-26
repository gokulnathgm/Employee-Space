var express = require('express');
var Employee = require('./models/employee');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

mongoose.connect('mongodb://localhost/employee-space');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/views/index.html');
	console.log("Received GET request");
});

app.post('/login', function(req, res) {
	console.log(req.body);
	var email = req.body.email;
	var password = req.body.password;

	Employee.findOne({email: email, password: password}, function(err, user) {
		if (err) throw err;

		console.log(user);
		res.json(user);
	});
});

app.post('/signup', function(req, res) {
	console.log(req.body);

	var email = req.body.email;
	var password = req.body.password;

	var newEmployee = Employee({
		email: email,
		password: password
	});

	newEmployee.save(function(err, docs) {
		if (err) throw err;

		console.log('User created!');

		res.json(docs);
	});
});

app.listen(4000);
console.log('app is running on PORT 4000');