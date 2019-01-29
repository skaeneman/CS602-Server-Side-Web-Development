const net = require('net');

const server = net.createServer(
	socket => {
		console.log("Client connection...");

		socket.on('end', () => {
				console.log("Client disconnected...");
			});

		// process data from client
		socket.on('data', data => {
				console.log(" Received:", data.toString());
			});

		// send data to client
		socket.write("Hello from server");
	});

// listen for client connections
server.listen(3000, () => {
	console.log("Listening for connections");
});
