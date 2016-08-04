const router = require('express').Router();
const employeeController = require('../controllers/employee.controller');

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
  console.log(req.session.user.email);
  employeeController.update(req, function(err, docs) {
    if (err) {
      throw err;
    }
    console.log(docs);
    res.json(docs);
  });
});

router.post('/logout', function(req, res) {
  req.session.destroy(function(err) {
    if (err) {
      throw err;
    }
    console.log('Session destroyed!');
    res.json({"status": "logged-out"});
  });
});

router.get('/checkAuthentication', function(req, res) {
  console.log(req.session);
    if(req.session.user || req.session.admin) {
      res.json(req.session);
    }
    else {
      res.json({"status": "not authenticated"});
    }
});

module.exports = router;