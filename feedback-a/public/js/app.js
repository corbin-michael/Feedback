var app = angular.module('app', ['ngRoute', 'firebase', 'app.home', 'app.client']);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
   $locationProvider.hashPrefix('');

   $routeProvider
      .when('/', {
         templateUrl: 'templates/home.html',
         controller: 'HomeCtrl'
      })
      .when('/client/:clientId', {
         templateUrl: 'templates/client.html',
         controller: 'ClientCtrl'
      })
      .otherwise({
         templateUrl: 'templates/404.html'
      });
}]);
