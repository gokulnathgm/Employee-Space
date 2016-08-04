const router = require('express').Router();
const employeeController = require('../controllers/employee.controller');

router.post('/adminLogin', function(req, res) {
	console.log('Creating admin session...');
	console.log(req.body);
	req.session.admin = req.body;
	res.json(req.session);
});

router.post('/adminLogout', function(req, res) {
	console.log('Destroying admin session...');
	if(req.session.admin) {
		req.session.destroy(function(err) {
			if (err) {
				throw err;
			}
			console.log(req.session);
			res.json({"status": "admin logged out"});
		});
	}
});

router.get('/getEmployees', function(req, res) {
	employeeController.getEmployees(req, function(err, docs) {
		if (err) {
			throw err;
		}
		console.log('Employees: ' + docs);
		res.json(docs);
	});
});

router.get('/getEmployee/:email', function(req, res) {
	console.log('email: ' + req.params.email);
	employeeController.getEmployee(req, function(err, user) {
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