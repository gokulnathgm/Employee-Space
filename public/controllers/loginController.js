angular.module('loginController', [])
.controller('LoginCtrl', ['$scope', '$state', '$http', 'authService', 'ngToast', 
	function ($scope, $state, $http, authService, ngToast) {

		console.log('Login controller ready!');

		$scope.login = function() {
			console.log('Login called!');
			console.log($scope.user);
			$http.post('/employee/login', $scope.user).success(function(response) {
				if (response != null) {
					console.log('Successfully logged in!');
					console.log(response);
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
				else{
					console.log('Invalid credentials!');
					ngToast.create({
						className: 'danger',
						content: 'Invalid credentials!',
					});
				}

			});
		};

		$scope.signup = function() {
			console.log('Signup called!');
			console.log($scope.user);
			if ($scope.user == null || $scope.user.email == "" || $scope.user.password == "" || $scope.user.email == null || $scope.user.password == null) {
				ngToast.create({
					className: 'warning',
					content: 'Either of the fields can\'t be empty!'
				});
			}
			else {
				$http.post('/employee/signup', $scope.user).success(function(response) {
					console.log(response);
					if (response.status == 'invalid'){
						ngToast.create({
							className: 'warning',
							content: 'Employee already exists!'
						});
					}
					else {
						console.log('Successfully created new employee!');
						$state.go('profile');
						ngToast.create({
							className: 'success',
							content: 'Successfully created new employee!'
						});
					} 
				});
			}
		};
	}]);  