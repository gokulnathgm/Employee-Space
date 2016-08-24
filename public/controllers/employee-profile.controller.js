angular.module('profileController', [])
.controller('ProfileCtrl', [
  '$scope', 
  '$state',  
  'authService', 
  'ngToast', 
  'employeeUpdateService', 
  'employeeLogoutService', 
  function($scope, $state, authService, ngToast, 
    employeeUpdateService, employeeLogoutService) {

    $scope.property = true;
    $scope.user = {};
    authService.isAuthenticated()
    .then(function(response) {
      if (response.status != "not authenticated") {
        $scope.user.name = response.user.name;
        $scope.user.age = response.user.age;
        $scope.user.skills = response.user.skills;
        $scope.user.specialisation = response.user.specialisation;
        $scope.user.experience = response.user.experience;
        $scope.user.grade = response.user.grade;
        $scope.user.joinDate = new Date(response.user.joinDate);
        $scope.user.gender = response.user.gender;
      }
    });
    
    $scope.update = function () {
      if ($scope.newPassword != $scope.newPasswordConfirm) {
        ngToast.create({
          className: 'danger',
          content: 'Passwords missmatch!'
        });
      }
      else {
        $scope.user.password = $scope.newPassword;
        employeeUpdateService.employeeUpdate($scope.user, function(response) {
          if(response.status == 'unauthorised'){
            $state.go('/');
            ngToast.create({
              className: 'warning',
              content: 'You should log in first!'
            });
          }
          else{
            ngToast.create({
              className: 'info',
              content: 'Successfully updated!'
            });
          }
        });
      }
    };

    $scope.logout = function () {
      employeeLogoutService.employeeLogout(function(response) {
        if(response.status == 'logged-out'){
          ngToast.create({
            className: 'info',
            content: 'Logged out!'
          });
          $state.go('/');
        }
      });
    };
  }]);