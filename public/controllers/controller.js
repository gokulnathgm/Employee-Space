var spaceApp = angular.module('spaceApp', ['ui.router']);

spaceApp.config(function($stateProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('/', {
			url: '/',
			templateUrl: '../views/home.html',
			controller: 'AppCtrl'
		})
		.state('profile', {
			url: '/profile',
			templateUrl: '../views/profile.html',
			controller: 'AppCtrl'
		});
});

spaceApp.controller('AppCtrl', function ($scope, $http, $state, user) {
	console.log('Controller ready!');
	$scope.user = user;
	$scope.login = function() {
		console.log('Login called!');
		console.log($scope.user);

		$http.post('/login', $scope.user).success(function(response) {
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

				$state.go('profile');
			}

		});
	};

	$scope.signup = function() {
		console.log('Signup called!');
		console.log($scope.user);

		$http.post('/signup', $scope.user).success(function(response) {
			console.log(response);

			if (response != null) {
				console.log('Successfully created new employee!');
				$state.go('profile');
			}
		});
	};

	$scope.update = function () {
		console.log('Update called!');
		console.log($scope.user);
		$http.put('/update/' + $scope.user.email, $scope.user);

	};

});

spaceApp.service('user', function() {
	return {};
});

