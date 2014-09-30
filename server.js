//Require Module Dependencies
var hapi = require('hapi'),
	mongoose = require('mongoose');
//Require Imports
var routes = require('./app/routes'),
	configDB = require('./config/database.js');

mongoose.connect(configDB.url);
mongoose.connection.on('disconnected', function() { console.log("disconnected from db...");});
var server = hapi.createServer('localhost', 3000);
routes(server);
server.start(function() {
	console.log('Server started on port 3000');
});


