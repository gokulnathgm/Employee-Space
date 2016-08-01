var express = require('express');
var Employee = require('./models/employee');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

mongoose.connect('mongodb://localhost/employee-space');

app.use(express.static(__dirname + '/public/'));
/*app.use(express.static(__dirname + '/app/public'));
app.use(express.static(__dirname + '/app/public/styles'));
app.use(express.static(__dirname + '/app/public/views'));
app.use(express.static(__dirname + '/app/public/controllers'));*/

app.use(bodyParser.json());
app.use(session({secret: 'thisisahighlyclassifiedsupersecret', resave: false, saveUninitialized: true}));


/*********************************************************
Index template to be served template to be served
*********************************************************/
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/views/index.html');
	//res.sendFile(__dirname + '/app/public/views/index.html');
	console.log("Received GET request");
});


/*********************************************************
/login API checks for the existence of a user, if exists
set the user session and returns the user object to the 
controller
*********************************************************/
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


/*********************************************************
/signup API creates a new user, if the user doesn't exist,
sets the user session and and returns the user object to 
the controller
*********************************************************/
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


/*********************************************************
/update API updates the document of an already existing
user and returns the modified user object to the controller
*********************************************************/
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


/*********************************************************
/logout API destroys the existing session 
*********************************************************/
app.post('/logout', function(req, res) {
	req.session.destroy(function(err) {
		if (err) throw err;

		console.log(req.sesssion);
		res.json({"status": "logged-out"});
	});
});


/*********************************************************
/employees API fetches the entire list of employees from
the mongo DB and returns the entire list of objects to
the controller
*********************************************************/
app.get('/employees', function(req, res) {
	console.log('Fetching employee list...');
	Employee.find({}, function(err, docs) {
		if (err) throw err;
		console.log(docs);
		res.json(docs);
	});
});


/*********************************************************
/employee/email API fetches the entire document regarding 
a particular employee and returns the result to the 
controller
*********************************************************/
app.get('/employee/:email', function(req, res) {
	console.log(req.params.email);
	var email = req.params.email;
	Employee.findOne({email: email}, function(err, user) {
		if (err) throw err;

		console.log(user);
		res.json(user);
	});
});


/*********************************************************
/adminLogin API creates an admin session and returns the 
session object to the controller
*********************************************************/
app.post('/adminLogin', function(req, res) {
	console.log('Setting admin session...');
	var admin = req.body;
	req.session.admin = admin;
	console.log(req.session);
	res.json(req.session);
});


/*********************************************************
/adminLogout API destroys the session and returns the 
status to the controller
*********************************************************/
app.post('/adminLogout', function(req, res) {
	console.log('Destroying admin session...');
	if (req.session.admin)
		req.session.destroy(function(err) {
			if (err) throw err;
			console.log(req.session);
			res.json({"status": "admin logged out"});
		});
});


/*********************************************************
/checkAuthentication API checks whether a user session or
admin session is present and returns the session details
if present, to the controller
	*********************************************************/
app.get('/checkAuthentication', function(req, res) {
	console.log(req.session);
	if(req.session.user || req.session.admin) 
		res.json(req.session);
	else
		res.json({"status": "not authenticated"});
});




app.listen(4000);
console.log('app is running on PORT 4000');