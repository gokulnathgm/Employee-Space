var express = require('express');
var Employee = require('./models/employee');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var nodemon = require('nodemon');

var app = express();

mongoose.connect('mongodb://localhost/employee-space');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/views/index.html');
	console.log("Received GET request");

	/*var newEmployee = Employee({
		email: "gokulnath@qburst.com",
		password: "user"
	});
	newEmployee.save(function(err) {
		if (err) throw err;
	});*/

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

	Employee.find({email: email}, function(err, docs) {
		if (docs.length) {
			console.log('Employee already exists!');
		}
		else {
			newEmployee.save(function(err, docs) {
				if (err) throw err;

				console.log('User created!');
				res.json(docs);
			});
		}
	});
});

app.put('/update/:email', function(req, res) {
	console.log(req.params.email);
	console.log(req.body);
	var email = req.params.email;
	var profile = req.body;

	Employee.update(
		{email: email},
		{$set: profile}, function(err, docs) {
			if (err) throw err;
			console.log(docs);
		});
});

app.get('/employees', function(req, res) {
	console.log('Fetching employee list...');
	Employee.find({}, function(err, docs) {
		if (err) throw err;
		console.log(docs);
		res.json(docs);
	});
});

app.get('/employee/:email', function(req, res) {
	console.log(req.params.email);
	var email = req.params.email;
	Employee.findOne({email: email}, function(err, user) {
		if (err) throw err;

		console.log(user);
		res.json(user);
	});

})

app.listen(4000);
console.log('app is running on PORT 4000');