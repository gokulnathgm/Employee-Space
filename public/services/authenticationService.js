angular.module('authenticationService', [])
.service('authService', function($http, $q) {
	this.isAuthenticated = function() {
		var deferred = $q.defer();
		$http.get('/employee/checkAuthentication').success(function(response) {
			deferred.resolve(response);
		})
		.error(function(response) {
			deferred.reject(response);
		});
		return deferred.promise;
	}
});