const adminService = angular.module('adminService', []);

adminService.service('adminLoginService', function($http) {
  this.adminLogin = function(admin, cb) {
    $http.post('/admin/adminLogin', admin).success(function(response) {
      return cb(response);
    });
  }
});

adminService.service('adminLogoutService', function($http) {
  this.adminLogout = function(cb) {
    $http.post('/admin/adminLogout').success(function(response) {
      return cb(response);
    });
  }
});

adminService.service('getEmployeesService', function($http) {
  this.getEmployees = function(cb) {
    $http.get('/admin/getEmployees').success(function(response) {
      return cb(response);
    });
  }
});

adminService.service('fetchEmployeeService', function($http) {
  this.fetchEmployee = function(email, cb) {
    $http.get('/admin/getEmployee/' + email).success(function(response) {
      return cb(response);
    });
  }
});