angular.module('adminHomeController', [])
.controller('AdminHomeCtrl', ['$scope', '$http', '$state', 'user', 'ngToast', function ($scope, $http, $state, user, ngToast) {
  console.log('Admin Home controller ready!');
  $scope.showProfile = false;
  $http.get('/admin/employees').success(function(response) {
    console.log(response);
    $scope.employees = response;
  });

  $scope.fetchProfile = function(email) {
    $scope.showProfile = true;
    console.log(email);
    $http.get('/admin/employee/' + email).success(function (response) {
      console.log(response);
      $scope.profile = response;
    });
  };

  $scope.logoutAdmin = function() {
    $http.post('/admin/adminLogout').success(function(response) {
      console.log(response);
    });
    $state.go('admin');
    ngToast.create({
      className: 'info',
      content: 'Admin logged out!'
    });
  }
}]);