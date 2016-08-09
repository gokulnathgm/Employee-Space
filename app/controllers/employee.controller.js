const employeeService = require('../services/employee.service');

function login(user, cb) {
  employeeService.findOne(user, function(err ,res) {
    return cb(null, res);
  });
}

function signup(user, cb) {
  employeeService.checkAndRegister(user, function(err, res) {
    if (err) {
      throw err;
    }
    return cb(null, res);
  });
}

function update(user, cb) {
  employeeService.updateProfile(user, function(err, res) {
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