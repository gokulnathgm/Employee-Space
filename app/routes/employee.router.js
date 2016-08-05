const router = require('express').Router();
const employeeController = require('../controllers/employee.controller');
const Employee = require('../models/employee');

router.post('/login', function(req, res) {
	employeeController.login(req, function(err, user) {
		if (err) {
			throw err;
		}
		req.session.user = user;
		res.json(user);
	});
});

router.put('/update', function(req, res) {
	employeeController.update(req, function(err, docs) {
		if (err) {
			throw err;
		}
		req.session.user = req.body;
		res.json(docs);
	});
});

router.post('/logout', function(req, res) {
	req.session.destroy(function(err) {
		if (err) {
			throw err;
		}
		res.json({"status": "logged-out"});
	});
});

router.get('/checkAuthentication', function(req, res) {
	if(req.session.user || req.session.admin) {
		res.json(req.session);
	}
	else {
		res.json({"status": "not authenticated"});
	}
});

router.post('/signup', function(req, res) {
	employeeController.signup(req, function(err, docs) {
		if (err) {
			throw err;
		}
		if (docs) {
			req.session.user = docs;
			res.json(docs);
		}
		else {
			res.json({"status": "invalid"});
		}
	});
});

module.exports = router;