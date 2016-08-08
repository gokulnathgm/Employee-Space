const router = require('express').Router();
const adminController = require('../controllers/admin.controller');

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
  adminController.getEmployees(req, function(err, docs) {
    if (err) {
      throw err;
    }
    res.json(docs);
  });
});

router.get('/getEmployee/:email', function(req, res) {
  adminController.getEmployee(req, function(err, user) {
    if (err) {
      throw err;
    }
    else {
      res.json(user);
    }
  });
});

module.exports = router;