const Employee = require('../models/employee.model');

function findOne(req, cb) {
  const email = req.body.email;
  const password = req.body.password;
  Employee.findOne({email: email, password: password}, function(err, res) {
    if (err) {
      throw err;
    }
    else {
      return cb(null, res);
    }
  });
}

function checkAndRegister(req, cb) {
  const email = req.body.email;
  const password = req.body.password;
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

function updateProfile(req, cb) {
  const email = req.session.user.email;
  const profile = req.body;
  if (req.session.user) {
    Employee.update({email: email}, {$set: profile}, function(err, res) {
      if (err) {
        throw err;
      }
      return cb(null, res);
    });
  }
}

module.exports = {
  findOne: findOne,
  checkAndRegister: checkAndRegister,
  updateProfile: updateProfile
};