const Employee = require('../models/employee');

function login(req, cb) {
  const email = req.body.email;
	const password = req.body.password;
	return Employee.findOne({email: email, password: password}, cb);
}

function signup(req, cb) {
  const email = req.body.email;
	const password = req.body.password;
	Employee.find({email: email}, function(err, user) {
		if (user.length) {
			return cb(null, null);
		}
		else {
			const newEmployee = Employee({
				email: email,
				password: password
			});
			newEmployee.save(function(error, response) {
				if (error) {
					throw error;
				}
				return cb(null, response);
			});
		}
	});
}

function update(req, cb) {
	const email = req.session.user.email;
	const profile = req.body;
	if (req.session.user) {
		return Employee.update({email: email}, {$set: profile}, cb);
	}
}

function getEmployees(req, cb) {
	return Employee.find({}, cb);
}

function getEmployee(req, cb) {
	return Employee.findOne({email: req.params.email}, cb);
}

module.exports = {
	login: login,
	signup: signup,
	update: update,
	getEmployees: getEmployees,
	getEmployee: getEmployee
};