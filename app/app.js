'use strict';

// Declare app level module which depends on views, and components
angular.module('monopofree', [
  'ngRoute',
  'monopofree.start',
  'monopofree.connect',
  'monopofree.game',
  'monopofree.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/start'});
}]);
