var connections = [];
var connectionNumber = 0;
var lobby = {
	players: []
};
var games = [];
var serverScope;
var serverStart = function(scope) {
	serverScope = scope;
	window.serverPeer = new Peer('server', {key: window.peerjsApiKey});
	serverScope.serverMessage = 'You are hosting a sever';
	serverPeer.on('error', function(err) {
		serverScope.serverMessage = err.type;
	});
	serverPeer.on('connection', function(conn) {
		conn.dead = true; //assume we won't get a successful connection until we do
		connections.push(conn);
		conn.location = 'lobby';
		conn.on('data', function(data){
			conn.dead = false;
			monolog("Server received data: " + JSON.stringify(data));
			dealWithServerData(conn, data);
		});
		conn.on('close', function(){
			monolog("Peer (" + conn.connectionNumber + ") closed the connection.");
			conn.dead = true;
			broadcast(conn_stants.player_disconnected + conn.connectionNumber, conn.location);
			var loc = lobby;
			if (conn.location.indexOf('game') === 0)
				loc = games[parseInt(conn.location.substring(4))];
			removeClient(loc, conn.connectionNumber);
			conn.close();
		});
	});
}

var dealWithServerData = function(conn, data) {
	if (data.indexOf(conn_stants.player_join_server) === 0) {
		monolog("Server: adding new player (" + connectionNumber + ") to lobby");
		conn.send(conn_stants.player_assign_id + connectionNumber);
		conn.send(conn_stants.match_lobby + JSON.stringify(lobby));
		addClient(lobby, "" + connectionNumber)
		//give the new client their unique connection number
		conn.connectionNumber = connectionNumber;
		broadcast(conn_stants.player_join_client + connectionNumber, conn.location);
		connectionNumber++;
	} else {
		broadcast(data, conn.location);
	}
}

var broadcast = function(data, filter) {
	_.forEach(connections, function(conn) {
		if (!conn.dead && (!filter || filter === conn.location)) {
			conn.send(data);
		}
	});
}