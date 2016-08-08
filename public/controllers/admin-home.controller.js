angular.module('adminHomeController', [])
.controller('AdminHomeCtrl', ['$scope', '$http', '$state', 'ngToast', 
  function ($scope, $http, $state, ngToast) {
    $scope.showProfile = false;
    
    $scope.changed = function() {
      if(!$scope.search.length) {
        $scope.showProfile = false;
      }
    }

    $http.get('/admin/getEmployees').success(function(response) {
     $scope.employees = response;
   });

    $scope.fetchProfile = function(email) {
     $scope.showProfile = true;
     $http.get('/admin/getEmployee/' + email).success(function (response) {
      $scope.profile = response;
    });
   };

   $scope.logoutAdmin = function() {
     $http.post('/admin/adminLogout').success(function(response) {
     });
     $state.go('admin');
     ngToast.create({
      className: 'info',
      content: 'Admin logged out!'
    });
   }
 }]);