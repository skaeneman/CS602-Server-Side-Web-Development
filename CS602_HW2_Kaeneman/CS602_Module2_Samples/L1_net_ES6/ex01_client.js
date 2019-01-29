const net = require('net');

const client = net.connect({port:3000},
	() => {
		console.log("Connected to server");
		var msg = "Hello from client " + 
						Math.floor(1000*Math.random());
			console.log("Sending: " + msg);
			// send data to server
			client.write(msg);		
	});

client.on('end', () => {
	console.log("Client disconnected...");
});

client.on('data', data => {
	console.log(" Received:", data.toString());
	client.end();
});



	