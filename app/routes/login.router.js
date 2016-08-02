const router = require('express').Router();
const employeeController = require('../controllers/employee.controller');

router.post('/', function(req, res) {
	employeeController.login(req, function(err, user) {
		if (err) {
			throw err;
		}
		req.session.user = user;
		res.json(user);
	});
});

module.exports = router;