angular.module('spaceApp', [])
.controller('ProfileCtrl', ['$scope', '$http', 'user', '$state', 'ngToast', 'authService', 'clearFields', function($scope, $http, user, $state, ngToast, clearFields, authService) {
  $scope.user = user;
  authService.isAuthenticated()
  .then(function(response) {
    console.log(response);
    if (response != "not authenticated") {
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

  $scope.update = function () {
    console.log('Update called!');
    console.log($scope.user);
    $http.put('/update/' + $scope.user.email, $scope.user).success(function(response) {
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
    $http.post('logout').success(function(response) {
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