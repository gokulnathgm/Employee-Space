const Employee = require('../models/employee');


function login(req, cb) {
	const email = req.body.email;
	const password = req.body.password;
	return Employee.findOne({email: email, password: password}, cb);
}

function signup(req, cb) {
	const email = req.body.email;
	return Employee.find({email: email}, cb);
}

function update(req, cb) {
	console.log(req.params);
	const email = req.params.email;
	const profile = req.body;
	if (req.session.user) {
		return Employee.update({email: email}, {$set: profile}, cb);
	}
}

function employees(req, cb) {
	return Employee.find({}, cb);
}

function employee(req, cb) {
	return Employee.findOne({email: req.body.email}, cb);
}

module.exports = {
	login: login,
	signup: signup,
	update: update,
	employees: employees,
	employee: employee
};