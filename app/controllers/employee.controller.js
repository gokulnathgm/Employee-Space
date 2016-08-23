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

function verify(user, cb) {
  employeeService.verifyUser(user, function(err, res) {
    if (err) {
      throw err;
    }
    else {
      return cb(null, res);
    }
  });
}

function password(user, cb) {
  employeeService.resetPassword(user, function(err, res) {
    if (err) {
      throw err;
    }
    else {
      return cb(null, res);
    }
  });
}

function newpassword(user, cb) {
  employeeService.changePassword(user, function(err, res) {
    if (err) {
      throw err;
    }
    else {
      return cb(null, res);
    }
  });
}

module.exports = {
  login: login,
  signup: signup,
  update: update,
  verify: verify,
  password: password,
  newpassword: newpassword
};