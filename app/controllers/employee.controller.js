const employeeService = require('../services/employee.service');

function login(req, cb) {
  employeeService.findOne(req, function(err ,res) {
    return cb(null, res);
  });
}

function signup(req, cb) {
  employeeService.checkAndRegister(req, function(err, res) {
    if (err) {
      throw err;
    }
    return cb(null, res);
  });
}

function update(req, cb) {
  employeeService.updateProfile(req, function(err, res) {
    if (err) {
      throw err;
    }
    return cb(null, res);
  });
}

module.exports = {
	login: login,
	signup: signup,
	update: update
};