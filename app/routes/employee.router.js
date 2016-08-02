const router = require('express').Router();
const employeeController = require('../controllers/employee.controller');

router.post('/', function(req, res) {
	console.log('email: ' + req.body.email);
	employeeController.employee(req, function(err, user) {
		if (err) {
			throw err;
		}
		else {
			console.log(user);
			res.json(user);
		}
	});
});

module.exports = router;