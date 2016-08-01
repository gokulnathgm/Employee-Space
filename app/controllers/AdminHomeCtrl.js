spaceApp.controller('AdminHomeCtrl', function ($scope, $http, $state, user, ngToast) {
  console.log('Admin Home controller ready!');
  $scope.showProfile = false;
  $http.get('/employees').success(function(response) {
    console.log(response);
    $scope.employees = response;
  });

  $scope.fetchProfile = function(email) {
    $scope.showProfile = true;
    console.log(email);
    $http.get('/employee/' + email).success(function (response) {
      console.log(response);
      $scope.profile = response;
    });
  };

  $scope.logoutAdmin = function() {

    $http.post('/adminLogout').success(function(response) {
      console.log(response);
    })
    
    $state.go('admin');
    ngToast.create({
      className: 'info',
      content: 'Admin logged out!'
    });
  }
});