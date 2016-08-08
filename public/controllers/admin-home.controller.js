angular.module('adminHomeController', [])
.controller('AdminHomeCtrl', [
  '$scope', 
  '$state', 
  'ngToast', 
  'adminLogoutService', 
  'getEmployeesService', 
  'fetchEmployeeService',  
  function ($scope, $state, ngToast, adminLogoutService, 
    getEmployeesService, fetchEmployeeService) {
    
    $scope.showProfile = false;
    $scope.changed = function() {
      if(!$scope.search.length) {
        $scope.showProfile = false;
      }
    }

    getEmployeesService.getEmployees(function(response) {
     $scope.employees = response;
   });

    $scope.fetchProfile = function(email) {
     $scope.showProfile = true;
     fetchEmployeeService.fetchEmployee(email, function(response) {
      $scope.profile = response;
    });
   };

   $scope.logoutAdmin = function() {
     adminLogoutService.adminLogout(function(response) {
     });
     $state.go('admin');
     ngToast.create({
      className: 'info',
      content: 'Admin logged out!'
    });
   }
 }]);