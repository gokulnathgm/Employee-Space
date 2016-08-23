const Employee = require('../models/employee.model');
const nodemailer = require('nodemailer');

function findOne(user, cb) {
  Employee.findOne(user, function(err, res) {
    if (err) {
      throw err;
    }
    else {
      if (res.verified == false) {
        res = {"status": "pending verification"};
        return cb(null, res);
      }
      return cb(null, res);
    }
  });
}

function checkAndRegister(user, cb) {
  const email = user.email;
  const password = user.password;
  const newUrl = user.url;
  Employee.find({email: email}, function(err, user) {
    if (user.length) {
      return cb(null, null);
    }
    else {
      const newEmployee = Employee({email: email, password: password});
      newEmployee.save(function(error, res) {
        if (error) {
          throw error;
        }
        else {

          const smtpTransport = nodemailer.createTransport('SMTP', {
            service: 'Gmail',
            auth: {
              user: 'employee.handler@gmail.com',
              pass: 'adminemployeespace'
            }
          });

          const mailOptions = {
            to: email,
            subject: 'Employee Space signup confirmation',
            text: 'Please confirm your identity!',
            html:  '<b><a href=' + newUrl + '>Click here to verify your account</a></b>'
          }

          smtpTransport.sendMail(mailOptions, function(error, response) {
            if (error) {
              throw error
            }
            else {
              return cb(null, res);
            }
          });  
        }
      });
    }
  });
}

function updateProfile(user, cb) {
  const email = user.email;
  const profile = user.profile;
  Employee.update({email: email}, {$set: profile}, function(err, res) {
    if (err) {
      throw err;
    }
    return cb(null, res);
  });
}

function verifyUser(user, cb) {
  const email = user.email;
  Employee.update({email: email}, {verified: true} , function(err, res) {
    if (err) {
      throw err;
    }
    else {
      return cb(null, res);
    }
  });
}

module.exports = {
  findOne: findOne,
  checkAndRegister: checkAndRegister,
  updateProfile: updateProfile,
  verifyUser: verifyUser
};