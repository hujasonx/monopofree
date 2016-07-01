var client = {};
client.location = 'disconnected';
var clientScope;

var clientStart = function(scope) {
	clientScope = scope;
	clientScope.thisClient = client;
	client.scope = scope;
	clientScope.clientMessage = 'Connecting...';
	if (window.peer) {
		monolog("Attempt to establish connection when it is already established", loglevel.warning);
		return false;
	}
	monolog("Established connection");
	window.peer = new Peer({key: window.peerjsApiKey});
	
	window.connection = window.peer.connect('server');
	var thisClient = client;
	window.connection.on('open', function(){
		window.connection.send(conn_stants.player_join_server);
		window.connection.isConnected = true;
		thisClient.scope.showConnectButtons = false
		thisClient.scope.clientMessage = 'You are connected';
		thisClient.scope.isClientConnected = true;
		thisClient.scope.clientLocation = 'lobby';
		thisClient.location = 'lobby';
		
		thisClient.scope.$apply();
	});
	window.connection.on('data', function(data){
		monolog("Client received data: " + JSON.stringify(data));
		dealWithClientData(data);
		thisClient.scope.$apply();
	});
	return true;
}

var sendData = function(info) {
	window.connection.send(info);
}

var dealWithClientData = function(data) {
	if (data.indexOf(conn_stants.player_assign_id) === 0) {
		info = restOf(data, conn_stants.player_assign_id);
		window.clientID = parseInt(info);
		clientScope.clientID = parseInt(info);
	} else if (data.indexOf(conn_stants.player_join_client) === 0) {
		info = restOf(data, conn_stants.player_join_client);
		addClient(window.game, info)
		monolog("Client: adding new player (" + info + ")");
	} else if (data.indexOf(conn_stants.player_disconnected) === 0) {
		info = restOf(data, conn_stants.player_disconnected);
		removeClient(window.game, info)
		monolog("Client: removing player (" + info + ")");
	} else if (data.indexOf(conn_stants.player_change_details) === 0) {
		info = restOf(data, conn_stants.player_change_details);
		getPlayer(window.game, parseInt(info.split("|")[0])).details = JSON.parse(info.split("|")[1]);
		monolog("Client: player changed details (" + info + ")");
	} else if (data.indexOf(conn_stants.match_lobby) === 0) {
		info = restOf(data, conn_stants.match_lobby);
		window.game = JSON.parse(info);
		monolog("Client: matching lobby to "+info);
	} 
}

var addClient = function(wgame, info) {
	wgame.players.push({ id: parseInt(info), details: window.clientDefaults});
}


var removeClient = function(wgame, info) {
	_.forEach(wgame.players, function(player) {
		if (player.id ===  parseInt(info))
			wgame.players.remove(player);
	}); 
}

var getPlayer = function(wgame, id) {
	var tplayer;
	_.forEach(wgame.players, function(player) {
		if (player.id ===  id)
			tplayer = player;
	}); 
	return tplayer;
}