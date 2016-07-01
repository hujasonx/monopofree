window.game = {
	players: [],
};
window.monoLogData = [];
window.peerjsApiKey = "96cxgr03bqgmbo6r";
window.clientDefaults = {name: "No name", color: "black"};
window.clientID = -1;
window.conn_stants = {
	player_join_server: '_JOIN', //
	player_assign_id: '_assignUniqueID:',//id
	player_disconnected: '_playerDisconnected:',//id
	player_join_client: '_JOIN:',//id
	match_lobby: '_matchLobby:',//lobbyjson
	player_change_details: "_playerChangeDetails:"//id, detailsjson
};

window.loglevel = {verbose: 5, data: 4, warning: 3, error: 2, critical: 1};
window.logleveldescription = ["", "CRITICAL", "E", "W", "D", "V"];
window.displayLogLevel = loglevel.verbose;
window.displayStack = false;

window.monolog = function(data, level) {
	var aLevel = level || loglevel.verbose;
	window.monoLogData.push({time: new Date(), data: data, level: aLevel, stack: new Error().stack});
	return data;
}


window.printLog = function(number) {
	var index = 0;
	_.each(window.monoLogData, function(info) {
		if ((!number || index >= window.monoLogData.length - number) && info.level <= window.displayLogLevel) {
			if (!window.displayStack)
				console.log(info.time.toLocaleTimeString() + " | " + window.logleveldescription[info.level] + " | ", info.data);
			else	
				console.log(info.time.toLocaleTimeString() + " | " + window.logleveldescription[info.level] + " | ", info.data, " | ", info.stack);
		}
		index++;
	})
}

window.setDisplayLogLevel = function(level) {
	window.displayLogLevel = level;
}

window.setDisplayLogStack = function(stack) {
	window.displayStack = stack;
}

window.restOf = function(string1, stringcutout) {
	return string1.substring(stringcutout.length);
}

Array.prototype.remove = function(obj) {
	var index = this.indexOf(obj);
	if (index > -1)
		this.splice(index, 1);
}