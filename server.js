var express = require('express');
var Employee = require('./models/employee');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

mongoose.connect('mongodb://localhost/employee-space');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(session({secret: 'thisisahighlyclassifiedsupersecret', resave: false, saveUninitialized: true}));

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

		if(user)
			req.session.user = user;

		console.log(user);
		console.log(req.session);
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
			res.json({'status': 'invalid'});
		}
		else {
			newEmployee.save(function(err, docs) {
				if (err) throw err;

				req.session.user = docs;
				console.log('User created!');
				res.json(docs);
			});
		}
	});
});

app.put('/update/:email', function(req, res) {

	if(req.session.user){
		console.log('Already logged in!');
		
		console.log(req.params.email);
		console.log(req.body);
		var email = req.params.email;
		var profile = req.body;

		Employee.update(
			{email: email},
			{$set: profile}, function(err, docs) {
				if (err) throw err;

				res.json(docs);
				console.log(docs);
			});
	}
	else{
		console.log('Not logged in!');
		res.json({'status':'unauthorised'});
	}
});

app.post('/logout', function(req, res) {
	req.session.destroy(function(err) {
		if (err) throw err;

		console.log(req.sesssion);
		res.json({"status": "logged-out"});
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
});

app.get('/checkAuthentication', function(req, res) {
	console.log(req.session);
	if(req.session.user || req.session.admin) 
		res.json(req.session);
	else
		res.json({"status": "not authenticated"});
});

app.post('/adminLogin', function(req, res) {
	console.log('Setting admin session...');
	var admin = req.body;
	req.session.admin = admin;
	console.log(req.session);
	res.json(req.session);
});

app.post('/adminLogout', function(req, res) {
	console.log('Destroying admin session...');
	if (req.session.admin)
		req.session.destroy(function(err) {
			if (err) throw err;
			console.log(req.session);
			res.json({"status": "admin logged out"});
		});
});

app.listen(4000);
console.log('app is running on PORT 4000');