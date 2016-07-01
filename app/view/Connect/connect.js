'use strict';

angular.module('monopofree.connect', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/connect', {
    templateUrl: 'view/Connect/connect.html',
    controller: 'ConnectCtrl'
  });
}])

.controller('ConnectCtrl', ['$scope', '$window' , function($scope, $window) {
	$scope.showConnectButtons = true;
	$scope.status = 'Monopofree pre-pre-alpha version 0.1';
	$scope.isClientConnected = false;
	$scope.clientID = -1;
	$scope.thisClient = {};
	$scope.window = window;
	$scope.establishConnection = function() {
		clientStart($scope);
		
	}
	
	$scope.hostServer = function() {
		monolog("Starting Server");
		serverStart($scope);
	}
	
	$scope.clientTask = function(task) {
		if (task === 'setInfo') {
			sendData(conn_stants.player_change_details + window.clientID + "|" + JSON.stringify({color:$(".input_color").val(), name: $(".input_name").val()}));	
		}
	}
}]);