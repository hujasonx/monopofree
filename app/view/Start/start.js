'use strict';

angular.module('monopofree.start', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/start', {
    templateUrl: 'view/Start/start.html',
    controller: 'StartCtrl'
  });
}])

.controller('StartCtrl', ['$scope', function($scope) {
	$scope.text = "abc";
}]);