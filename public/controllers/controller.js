
var spaceApp = angular.module('spaceApp', ['ngRoute']);

spaceApp.config(function($routeProvider) {
	$routeProvider

		.when('/', {
			templateUrl: '../views/home.html',
			controller: 'AppCtrl'
		})
		.otherwise({redirectTo: '/'});
});

spaceApp.controller('AppCtrl', function ($scope) {

	console.log("Controller ready!");

	/*$scope.login = function(id) {
		console.log($scope.user);

		$http.post('/login',$scope.user).success(function(response) {
			console.log(response);
		});
	};*/

});

/*function AppCtrl($scope, $http) {
	console.log("Controller ready!");

	$scope.login = function(id) {
		console.log($scope.user);

		$http.post('/login',$scope.user).success(function(response) {
			console.log(response);
		});
	};
}*/