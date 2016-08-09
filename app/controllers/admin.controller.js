const adminService = require('../services/admin.service');

function getEmployees(cb) {
  adminService.findAllEmployees(function(err, res) {
    if (err) {
      throw err;
    }
    return cb(null, res);
  });
}

function getEmployee(email, cb) {
  adminService.findEmployee(email, function(err, res) {
    if (err) {
      throw err;
    }
    return cb(null, res);
  });
}

module.exports = {
  getEmployee: getEmployee,
  getEmployees: getEmployees
};