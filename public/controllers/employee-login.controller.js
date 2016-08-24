angular.module('loginController', [])
.controller('LoginCtrl', [
  '$rootScope', 
  '$scope', 
  '$state', 
  'authService', 
  'ngToast',
  'usSpinnerService', 
  'employeeLoginService', 
  'employeeSignupService', 
  function ($rootScope, $scope, $state, authService, ngToast, usSpinnerService,  
    employeeLoginService, employeeSignupService) {

    $scope.login = function() {
      employeeLoginService.employeeLogin($scope.user, function(response) {
        if (response != null) {
          if(response.status == 'pending verification') {
            ngToast.create({
              className: 'info',
              timeout: 3000, 
              content: 'Please verify your account! The verification link has already been e-mailed.',
            });
          }

          else {
            $scope.user.name = response.name;
            $scope.user.age = response.age;
            $scope.user.skills = response.skills;
            $scope.user.specialisation = response.specialisation;
            $scope.user.experience = response.experience;
            $scope.user.grade = response.grade;
            $scope.user.joinDate = new Date(response.joinDate);
            $scope.user.gender = response.gender;

            $state.go('profile');
            ngToast.create({
              className: 'success',
              content: 'Successfully logged in!'
            });
          }
        }
        else{
          ngToast.create({
            className: 'danger',
            content: 'Invalid credentials!',
          });
        }
      });
    };

    $scope.signup = function() {



      if ($scope.user == null || $scope.user.email == "" || $scope.user.password == "" || $scope.user.email == null || $scope.user.password == null) {
        ngToast.create({
          className: 'warning',
          content: 'Either of the fields can\'t be empty!'
        });
      }
      else {
        if (!$scope.spinneractive) {
          usSpinnerService.spin('spinner-1');
        }
        employeeSignupService.employeeSignup($scope.user, function(response) {
          if ($scope.spinneractive) {
            usSpinnerService.stop('spinner-1');
          }
          $scope.spinneractive = false;

          if (response.status == 'invalid') {
            ngToast.create({
              className: 'warning',
              content: 'Employee already exists!'
            });
          }
          if (response.status == 'pending verification') {
            ngToast.create({
              className: 'info',
              timeout: 3000, 
              content: 'Please verify your new account! A verification link has been e-mailed.'
            });
          }
        });
      }
    };
    $rootScope.$on('us-spinner:spin', function(event, key) {
      $scope.spinneractive = true;
    });

    $rootScope.$on('us-spinner:stop', function(event, key) {
      $scope.spinneractive = false;
    });
  }]);  