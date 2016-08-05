const Employee = require('../models/employee.model');

function findAllEmployees(req, cb) {
  Employee.find({}, function(err, docs) {
    if (err) {
      throw err;
    }
    else {
      return cb(null, docs)
    }
  });
}

function findEmployee(req, cb) {
  const email = req.params.email;
  Employee.findOne({email: email}, function(err, res) {
    if (err) {
      throw err;
    }
    return cb(null, res);
  });
}

module.exports = {
  findAllEmployees: findAllEmployees,
  findEmployee: findEmployee
};