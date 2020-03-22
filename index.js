const express = require('express');

const PORT = process.env.PORT || 5000;
const environment = process.env.NODE_ENV || "dev";

const app = express();

// Set socket
const server = app.listen(PORT);
const io = require("socket.io")(server);
app.set("socketio", io);	// to access socket connection anywhere

// Use socket and routes
require('./socket')(app, io);
app.use(require('./routes'));

// Check if we are in development or production
if (environment === "dev") {
	console.log(
		"\x1b[31m",
		"ENVIRONMENT IS DEV - ENSURE THAT THIS IS NOT SHOWING WHEN DEPLOYED",
		"\x1b[0m"
	);
} else if (environment === "production") {
	console.log("\x1b[34m", "RUNNING IN PRODUCTION", "\x1b[0m");
	app.use(express.static("client/build")); // make sure express serves production assets
	// make sure express serves index.html if it doesn't know the route
	const path = require("path");
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}