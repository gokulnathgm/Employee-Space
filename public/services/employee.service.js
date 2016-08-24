const employeeService = angular.module('employeeService', []);

employeeService.service('employeeLoginService', function($http) {
  this.employeeLogin = function(user, cb) {
    $http.post('/employee/login', user).success(function(response) {
      return cb(response);
    });
  }
});

employeeService.service('employeeSignupService', function($http) {
  this.employeeSignup = function(user, cb) {
    $http.post('/employee/signup', user).success(function(response) {
      return cb(response);
    });
  }
});

employeeService.service('employeeUpdateService', function($http) {
  this.employeeUpdate = function(user, cb) {
    $http.put('/employee/update', user).success(function(response) {
      return cb(response);
    });
  }
});

employeeService.service('employeeLogoutService' , function($http) {
  this.employeeLogout = function(cb) {
    $http.post('/employee/logout').success(function(response) {
      return cb(response);
    });
  }
});

employeeService.service('employeeResetService', function($http) {
  this.passwordReset = function(email, cb) {
    const emailObj = {email: email};
    $http.post('/employee/password', emailObj).success(function(response) {
      return cb(response);
    });
  }
});