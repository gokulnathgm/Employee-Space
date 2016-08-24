angular.module('forgotPasswordController', [])
.controller('ForgotPasswordCtrl', [
  '$scope',
  '$rootScope', 
  '$state',
  'ngToast', 
  'usSpinnerService', 
  'employeeResetService',   
  function ($scope, $rootScope, $state, ngToast, usSpinnerService, employeeResetService) {
    $scope.reset = function() {
      if (!$scope.spinneractive) {
        usSpinnerService.spin('spinner-1');
      }

      employeeResetService.passwordReset($scope.email, function(response) {
        if ($scope.spinneractive) {
          usSpinnerService.stop('spinner-1');
        }
        $scope.spinneractive = false;

        if(response.status === 'pending verification') {
          ngToast.create({
            className: 'info',
            content: 'This user is not verified, please verify!', 
            timeout: 3000
          });
        }
        else if(response.status === 'invalid user') {
          ngToast.create({
            className: 'danger',
            content: 'This user doesn\'t exist!'
          });
        }
        else if(response.message) {
          ngToast.create({
            className: 'success',
            content: 'Password reset link has been sent to your email!', 
            timeout: 3000
          });
          $state.go('/');
        }
      });
    }    
    $rootScope.$on('us-spinner:spin', function(event, key) {
      $scope.spinneractive = true;
    });

    $rootScope.$on('us-spinner:stop', function(event, key) {
      $scope.spinneractive = false;
    });
  }
  ]);