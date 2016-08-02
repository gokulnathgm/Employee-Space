const Employee = require('../models/employee');
const router = require('express').Router();
const employeeController = require('../controllers/employee.controller');

router.post('/', function(req, res) {
	employeeController.signup(req, function(err, docs) {
		if (err) {
			throw err;
		}
		console.log('Response: ' + docs);
		if(docs.length){
			console.log('Employee already exists!');
			res.json({'status': 'invalid'});
		}
		else {
			const newEmployee = Employee({email: req.body.email, password: req.body.email});
			console.log('newEmployee: ' + newEmployee);
			newEmployee.save(function(err, doc) {
				if (err) {
					throw err;
				}
				req.session.user = doc;
				console.log('User created!');
				res.json(doc);
			});
		}
	});
});

module.exports = router;