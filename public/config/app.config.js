const spaceApp = angular.module('spaceApp', [
  'ui.router', 
  'angularUtils.directives.dirPagination', 
  'ngAnimate', 
  'ngSanitize', 
  'ngToast', 
  'angularSpinner', 
  'loginController', 
  'profileController', 
  'adminController', 
  'adminHomeController',
  'forgotPasswordController',  
  'authenticationService', 
  'employeeService',
  'adminService'
  ]);

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
    templateUrl: '../views/admin-login.html',
    controller: 'AdminCtrl',
    authenticate: false
  })
  .state('adminHome', {
    url: '/adminHome',
    templateUrl: '../views/admin-home.html',
    controller: 'AdminHomeCtrl',
    authenticate: true
  })
  .state('forgotPassword', {
    url: '/forgotPassword', 
    templateUrl: '../views/forgot-password.html', 
    controller: 'ForgotPasswordCtrl',
    authenticate: false
  })
});

spaceApp.config(['ngToastProvider', function(ngToast) {
  ngToast.configure({
    verticalPosition: 'bottom',
    horizontalPosition: 'center',
    maxNumber: 1,
    timeout: 2000,
    dismissButton: true, 
    animation: 'slide'
  });
}]);

spaceApp.config(['usSpinnerConfigProvider', function (usSpinnerConfigProvider) {
    usSpinnerConfigProvider.setDefaults({color: '#3385ff'});
}]);

spaceApp.run(function($rootScope, $state, authService) {
  $rootScope.$on("$stateChangeStart", 
    function(event, toState, toParams, fromState, fromParams) {
      if (toState.url == "/adminHome") {    
        authService.isAuthenticated().
        then(function(response) {
          if(toState.authenticate && !response.admin) {
            $state.transitionTo('admin');
            event.preventDefault();
          }
        });
      }
      else {
        authService.isAuthenticated().
        then(function(response) {
          if(toState.authenticate && !response.user) {
            $state.transitionTo('/');
            event.preventDefault();
          }
        });
      }
    });
});