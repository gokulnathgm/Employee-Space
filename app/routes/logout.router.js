const router = require('express').Router();
const employeeController = require('../controllers/employee.controller');

router.post('/', function(req, res) {
  req.session.destroy(function(err) {
    if (err) {
      throw err;
    }
    console.log('Session destroyed!');
    res.json({"status": "logged-out"});
  });
});

module.exports = router;