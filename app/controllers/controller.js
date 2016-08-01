var spaceApp = angular.module('spaceApp', ['ui.router', 'angularUtils.directives.dirPagination', 'ngToast']);

spaceApp.config(function($stateProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state('/', {
		url: '/',
		templateUrl: '../views/home.html',
		controller: 'LoginCtrl',
		authenticate: false
	})
	.state('profile', {
		url: '/profile',
		templateUrl: '../views/profile.html',
		controller: 'ProfileCtrl',
		authenticate: true
	})
	.state('admin', {
		url: '/admin',
		templateUrl: '../views/adminLogin.html',
		controller: 'AdminCtrl',
		authenticate: false
	})
	.state('adminHome', {
		url: '/adminHome',
		templateUrl: '../views/adminHome.html',
		controller: 'AdminHomeCtrl',
		authenticate: true
	});
});

spaceApp.config(['ngToastProvider', function(ngToast) {
	ngToast.configure({
		verticalPosition: 'bottom',
		horizontalPosition: 'center',
		maxNumber: 3,
		timeout: 2000
	});
}]);

spaceApp.run(function($rootScope, $state, authService) {
	$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
		if (toState.url == "/adminHome") {		
			authService.isAuthenticated().
			then(function(response) {
				console.log(response);
				if(toState.authenticate && !response.admin) {
					console.log("Admin not authenticated!");
					$state.transitionTo('admin');
					event.preventDefault();
				}
			});
		}

		else {
			authService.isAuthenticated().
			then(function(response) {
				console.log(response);
				if(toState.authenticate && !response.user) {
					console.log("User not authenticated!");
					$state.transitionTo('/');
					event.preventDefault();
				}
			});
		}
	});
});