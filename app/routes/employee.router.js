const router = require('express').Router();
const employeeController = require('../controllers/employee.controller');

router.post('/login', function(req, res) {
  const user = {email: req.body.email, password: req.body.password};
  employeeController.login(user, function(err, user) {
    if (err) {
      throw err;
    }
    req.session.user = user;
    res.json(user);
  });
});

router.put('/update', function(req, res) {
  const user = {email: req.session.user.email, profile: req.body};
  employeeController.update(user, function(err, docs) {
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
  const user = {email: req.body.email, password: req.body.password};
  employeeController.signup(user, function(err, docs) {
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