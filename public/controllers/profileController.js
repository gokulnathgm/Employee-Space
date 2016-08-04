angular.module('profileController', [])
.controller('ProfileCtrl', ['$scope', '$state', '$http', 'authService', 'clearFields', 'user', 'ngToast', 
  function($scope, $state, $http, authService, clearFields, user, ngToast) {
    console.log(user);
    $scope.user = user;
    authService.isAuthenticated()
    .then(function(response) {
      console.log(response);
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
    console.log('Profile controller ready!');
    $scope.edit = true;
    
    $scope.update = function () {
      console.log('Update called!');
      console.log($scope.user);
      $http.put('/employee/update', $scope.user).success(function(response) {
        console.log(response);
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
    };

    $scope.logout = function () {
      $http.post('/employee/logout').success(function(response) {
        console.log(response.status);
        if(response.status == 'logged-out'){
          ngToast.create({
            className: 'info',
            content: 'Logged out!'
          });
          $scope.user = clearFields.clearAll($scope.user);
          $state.go('/');
        }
      });
    };
  }]);