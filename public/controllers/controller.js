var spaceApp = angular.module('spaceApp', ['ui.router', 'angularUtils.directives.dirPagination', 'ngToast']);

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
		})
		.state('admin', {
			url: '/admin',
			templateUrl: '../views/adminLogin.html',
			controller: 'AppCtrl'
		})
		.state('adminHome', {
			url: '/adminHome',
			templateUrl: '../views/adminHome.html',
			controller: 'AdminCtrl'
		});
});

spaceApp.config(['ngToastProvider', function(ngToast) {
    ngToast.configure({
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      maxNumber: 3
    });
  }]);

spaceApp.controller('AppCtrl', function ($scope, $http, $state, user, ngToast) {
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
				ngToast.create('Successfully logged in!');
			}

			else{
				console.log('Invalid credentials!');
				ngToast.create({
  			className: 'danger',
  			content: 'Invalid credentials!',
  			timeout: 100000
				});
			}

		});
	};

	$scope.signup = function() {
		console.log('Signup called!');
		console.log($scope.user);

		$http.post('/signup', $scope.user).success(function(response) {
			console.log(response);
			if (response.status == 'invalid'){
				ngToast.create({
  			className: 'info',
  			content: 'Invalid credentials!',
  			//timeout: 100000
				});
			}

			else {
				console.log('Successfully created new employee!');
				$state.go('profile');
			}	
		});
	};

	$scope.update = function () {
		console.log('Update called!');
		console.log($scope.user);
		$http.put('/update/' + $scope.user.email, $scope.user).success(function(response) {
			console.log(response);

			if(response.status == 'unauthorised')
				$state.go('/');
			else{
				ngToast.create({
  			className: 'info',
  			content: 'Successfully updated!',
  			//timeout: 100000
				});
			}
		});
	};

	$scope.logout = function () {
		$http.post('logout');
	}

	$scope.adminLogin = function() {
		console.log($scope.admin);
		if ($scope.admin.email == 'admin' && $scope.admin.password == 'admin'){
			console.log('Admin successfully logged in!');

			/*$http.get('/employees').success(function(response) {
				console.log(response);
				$scope.employees = response;
			});*/

			$state.go('adminHome');
		}
	};

});

spaceApp.controller('AdminCtrl', function ($scope, $http, $state, user) {
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
});

spaceApp.service('user', function() {
	return {};
});



