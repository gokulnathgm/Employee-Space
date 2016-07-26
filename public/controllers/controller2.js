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

spaceApp.controller('AppCtrl', function ($scope, $http, $state) {
	console.log("Controller ready!");

	$scope.login = function(id) {
		console.log($scope.user);

		$http.post('/login',$scope.user).success(function(response) {
			if (response != null){
				console.log("Successfully logged in!");
				console.log(response);
				$state.go('profile');
			}

		});
	};

});

