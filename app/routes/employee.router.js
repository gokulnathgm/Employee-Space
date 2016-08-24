const path = require('path');
const router = require('express').Router();
const employeeController = require('../controllers/employee.controller');

const randomNumber = Math.round(Math.random()*10000);
const email = "";
router.post('/login', function(req, res) {
  const user = {email: req.body.email, password: req.body.password};
  employeeController.login(user, function(err, user) {
    if (err) {
      throw err;
    }
    if(user.status != 'pending verification') {
      req.session.user = user;
    }  
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
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  const newUrl = fullUrl + '/verify?random=' + randomNumber;
  const user = {email: req.body.email, password: req.body.password, url: newUrl};
  employeeController.signup(user, function(err, docs) {
    if (err) {
      throw err;
    }
    if (docs) {
      req.session.user = docs;
      res.json({"status": "pending verification"});
    }
    else {
      res.json({"status": "invalid"});
    }
  });
});

router.get('/signup/verify', function(req, res) {
  const query = req._parsedUrl.query;
  const split = query.split('=');
  const num = split[1];
  if(num == randomNumber) {
    employeeController.verify(req.session.user, function(err, docs) {
      if(err) {
        throw err;
      }
      else {
        res.end('Verified');
      }
    });
  }
});

router.post('/password', function(req, res) {
  const email = req.body.email;
  global.email = email;

  const userdata = {email: email};
  employeeController.checkUser(userdata, function(error, response) {
    if (error) {
      throw error;
    }
    else {
      if(response.status === 'pending verification' || response.status == 'invalid user') {
        res.json(response);
      }
      else {
        const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        const newUrl = fullUrl + '/reset';
        const user = {email: email, url: newUrl};
        employeeController.password(user, function(err, docs) {
          if(err) {
            throw err;
          }
          else {
            res.json(docs);
          }
        });
      }
    }
  });
});

router.get('/password/reset', function(req, res) {
  res.sendFile(path.join(__dirname, '../../public/views', 'reset-password.html'));
});

router.post('/newpassword', function(req, res) {
  const password1 = req.body.password1;
  const password2 = req.body.password2;
  if (password1 != password2) {
    res.end('Password missmatch');
  }
  else {
    const email = global.email;
    user = {password: password1, email: email};
    employeeController.newpassword(user, function(err, docs) {
      if (err) {
        throw err;
      }
      else {
        res.end('Password changed');
      }
    });
  }
});

module.exports = router;