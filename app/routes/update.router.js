const Employee = require('../models/employee');
const router = require('express').Router();
const employeeController = require('../controllers/employee.controller');

router.put('/', function(req, res) {
   const status = employeeController.update(req);
   console.log(status);
   if (status == 'logged in') {
    const email = req.body.email;
    const profile = req.body;
    Employee.update(
     {email: email},
     {$set: profile}, function(err, docs) {
      if (err) {
        throw err;
      }
      console.log(docs);
      res.json(docs);
     });
   }
   else {
    res.json({'status':'unauthorised'});
   }
});

module.exports = router;