'use strict';

angular.module('monopofree.game', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/game', {
    templateUrl: 'view/Game/game.html',
    controller: 'GameCtrl'
  });
}])

.controller('GameCtrl', [function() {

}]);