const router = require('express').Router();
const employeeController = require('../controllers/employee.controller');

router.get('/', function(req, res) {
   employeeController.employees(req, function(err, docs) {
    if (err) {
      throw err;
    }
    console.log('Employees: ' + docs);
    res.json(docs);
  });
});

module.exports = router;