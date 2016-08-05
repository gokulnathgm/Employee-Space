const adminService = require('../services/admin.service');

function getEmployees(req, cb) {
  adminService.findAllEmployees(req, function(err, res) {
    if (err) {
      throw err;
    }
    return cb(null, res);
  });
}

function getEmployee(req, cb) {
  adminService.findEmployee(req, function(err, res) {
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