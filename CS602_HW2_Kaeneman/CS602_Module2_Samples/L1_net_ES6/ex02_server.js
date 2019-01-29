const net = require('net');
// Keep track of client connections
const clients = [];

const server = net.createServer(
	(socket) => {
		console.log("Client connection...");
		clients.push(socket);

		socket.on('end', () => {
			console.log("Client disconnected...");
			// remove socket from list of clients
			let index = clients.indexOf(socket);
			console.log("index ", index);
			if (index != -1) {
				clients.splice(index, 1);
				console.log("# Clients after remove: ", clients.length);
			}
		});

		socket.on('data', (data) => {
			console.log(" Received: ", data.toString());
			// Broadcast to other clients
			console.log("# Clients: ", clients.length);
			for (let i = 0; i < clients.length; i++) {
				if (clients[i] != socket) {
					clients[i].write(data);
				}
			}
		});

		socket.write("Hello from server");
	});

server.listen(3000, function() {
	console.log("Listening for connections");
});


















