angular.module('adminController', [])
.controller('AdminCtrl', ['$scope', '$http', '$state', 'ngToast', 
  function($scope, $http, $state, ngToast) {
    $scope.adminLogin = function() {
      if ($scope.admin.email == 'admin' && $scope.admin.password == 'admin123'){
        $http.post('/admin/adminLogin', $scope.admin).success(function(response) {
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