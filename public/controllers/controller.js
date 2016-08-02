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




spaceApp.controller('LoginCtrl', function ($scope, $http, $state, user, ngToast) {
	console.log('Login controller ready!');
	$scope.user = user;
	console.log($scope.user);

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
		if ($scope.user.email == "" || $scope.user.password == "" || $scope.user.email == null || $scope.user.password == null) {
			ngToast.create({
				className: 'warning',
				content: 'Either of the fields can\'t be empty!'
			});
		}

		else {
			$http.post('/signup', $scope.user).success(function(response) {
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
});





spaceApp.controller('ProfileCtrl' ,function($scope, $http, user, $state, ngToast, clearFields, authService) {
	$scope.user = user;
	authService.isAuthenticated()
	.then(function(response) {
		console.log(response);
		if (response.status != "not authenticated") {
			$scope.user.name = response.user.name;
			$scope.user.age = response.user.age;
			$scope.user.skills = response.user.skills;
			$scope.user.specialisation = response.user.specialisation;
			$scope.user.experience = response.user.experience;
			$scope.user.grade = response.user.grade;
			$scope.user.joinDate = new Date(response.user.joinDate);
			$scope.user.gender = response.user.gender;
		}
	});

	console.log('Profile controller ready!');

	$scope.update = function () {
		console.log('Update called!');
		console.log($scope.user);
		$http.put('/update/' + $scope.user.email, $scope.user).success(function(response) {
			console.log(response);
			if(response.status == 'unauthorised'){
				$state.go('/');
				ngToast.create({
					className: 'warning',
					content: 'You should log in first!'
				});
			}
			else{
				ngToast.create({
					className: 'info',
					content: 'Successfully updated!'
				});
			}
		});
	};

	$scope.logout = function () {
		$http.post('logout').success(function(response) {
			console.log(response.status);
			if(response.status == 'logged-out'){
				ngToast.create({
					className: 'info',
					content: 'Logged out!'
				});
				$scope.user = clearFields.clearAll($scope.user);
				$state.go('/');
			}
		});
	};
});




spaceApp.controller('AdminCtrl', function($scope, $http, user, $state, ngToast) {
	console.log('Admin controller ready!');
	$scope.adminLogin = function() {
		console.log($scope.admin);
		if ($scope.admin.email == 'admin' && $scope.admin.password == 'admin123'){
			console.log('Admin successfully logged in!');
			$http.post('/adminLogin', $scope.admin).success(function(response) {
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
});




spaceApp.controller('AdminHomeCtrl', function ($scope, $http, $state, user, ngToast) {
	console.log('Admin Home controller ready!');
	$scope.showProfile = false;
	$http.get('/employees').success(function(response) {
		console.log(response);
		$scope.employees = response;
	});

	$scope.fetchProfile = function(email) {
		$scope.showProfile = true;
		console.log(email);
		const obj = {"email": email};
		$http.post('/employee', obj).success(function (response) {
			console.log(response);
			$scope.profile = response;
		});
	};

	$scope.logoutAdmin = function() {
		$http.post('/adminLogout').success(function(response) {
			console.log(response);
		});
		$state.go('admin');
		ngToast.create({
			className: 'info',
			content: 'Admin logged out!'
		});
	}
});




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




spaceApp.service('authService', function($http, $q) {
	this.isAuthenticated = function() {
		var deferred = $q.defer();
		$http.get('/checkAuthentication').success(function(response) {
			console.log(response);
			deferred.resolve(response);
		})
		.error(function(response) {
			deferred.reject(response);
		});
		return deferred.promise;
	}
});




spaceApp.service('user', function() {
	return {};
});




spaceApp.service('clearFields', function() {
	this.clearAll = function(user) {
		user.email = "";
		user.password = "";
		return user;
	}
});