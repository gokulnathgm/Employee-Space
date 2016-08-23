angular.module('forgotPasswordController', [])
.controller('ForgotPasswordCtrl', [
  '$scope',
  '$state', 
  'employeeResetService',  
  function ($scope, $state, employeeResetService) {
    $scope.reset = function() {
      employeeResetService.passwordReset($scope.email, function(response) {
        if(response) {
          $state.go('/');
        }
      })
    }    
  }
  ]);