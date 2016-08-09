const Employee = require('../models/employee.model');

function findOne(user, cb) {
  Employee.findOne(user, function(err, res) {
    if (err) {
      throw err;
    }
    else {
      return cb(null, res);
    }
  });
}

function checkAndRegister(user, cb) {
  const email = user.email;
  const password = user.password;
  Employee.find({email: email}, function(err, user) {
    if (user.length) {
      return cb(null, null);
    }
    else {
      const newEmployee = Employee({email: email, password: password});
      newEmployee.save(function(error, res) {
        if (error) {
          throw error;
        }
        else {
          return cb(null, res);
        }
      });
    }
  });
}

function updateProfile(user, cb) {
  const email = user.email;
  const profile = user.profile;
  Employee.update({email: email}, {$set: profile}, function(err, res) {
    if (err) {
      throw err;
    }
    return cb(null, res);
  });
}

module.exports = {
  findOne: findOne,
  checkAndRegister: checkAndRegister,
  updateProfile: updateProfile
};