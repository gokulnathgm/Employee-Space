var spaceApp = angular.module('spaceApp', ['ui.router']);

spaceApp.config(function($stateProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise('/home');

	$stateProvider
		.state('/home', {
			url: '/home',
			templateUrl: '../views/home.html'
		})
		.state('profile', {
			url: '/profile',
			templateUrl: '../views/profile.html'
		});
});

/*spaceApp.controller('AppCtrl', function ($scope) {

	console.log("Controller ready!");
});
*/
