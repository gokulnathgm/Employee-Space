angular.module('clearFieldsService', [])
.service('clearFields', function() {
  this.clearAll = function(user) {
    user.email = "";
    user.password = "";
    return user;
  }
});