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