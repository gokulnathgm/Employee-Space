const router = require('express').Router();
const employeeController = require('../controllers/employee.controller');

router.post('/adminLogin', function(req, res) {
	req.session.admin = req.body;
	res.json(req.session);
});

router.post('/adminLogout', function(req, res) {
	if(req.session.admin) {
		req.session.destroy(function(err) {
			if (err) {
				throw err;
			}
			res.json({"status": "admin logged out"});
		});
	}
});

router.get('/getEmployees', function(req, res) {
	employeeController.getEmployees(req, function(err, docs) {
		if (err) {
			throw err;
		}
		res.json(docs);
	});
});

router.get('/getEmployee/:email', function(req, res) {
	employeeController.getEmployee(req, function(err, user) {
		if (err) {
			throw err;
		}
		else {
			res.json(user);
		}
	});
});

module.exports = router;