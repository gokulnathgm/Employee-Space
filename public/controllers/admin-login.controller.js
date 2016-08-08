angular.module('adminController', [])
.controller('AdminCtrl', [
  '$scope', 
  '$state', 
  'ngToast', 
  'adminLoginService',  
  function($scope, $state, ngToast, adminLoginService) {
    $scope.adminLogin = function() {
      if ($scope.admin.email == 'admin' && $scope.admin.password == 'admin123'){
        adminLoginService.adminLogin($scope.admin, function(response) {
        });
        ngToast.create({
          className: 'success',
          content: 'Admin successfully logged in!'
        });
        $state.go('adminHome');
      }
      else{
        ngToast.create({
          className: 'danger',
          content: 'Invalid credentials!'
        });
      }

    };
  }]);