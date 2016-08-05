angular.module('adminController', [])
.controller('AdminCtrl', ['$scope', '$http', '$state', 'ngToast', 
	function($scope, $http, $state, ngToast) {
		console.log('Admin controller ready!');
		$scope.adminLogin = function() {
			console.log($scope.admin);
			if ($scope.admin.email == 'admin' && $scope.admin.password == 'admin123'){
				console.log('Admin successfully logged in!');
				$http.post('/admin/adminLogin', $scope.admin).success(function(response) {
					console.log(response);
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