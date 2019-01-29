const net = require('net');
const readline = require('readline');

const clientId = "Client " + 
			Math.floor(1000*Math.random());

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const readMessage = (client) => {
	rl.question("Enter Message: ",  (line) => {
			client.write("From " + clientId + ": " + line);
			if (line == "bye")
				client.end();
			else
				readMessage(client);
	});
};

const client = net.connect({port:3000},
	() => {
		console.log("Connected to server");
		readMessage(client);
	});

client.on('end', () => {
	console.log("Client disconnected...");
	return;
});

client.on('data', (data) => {
	console.log("\n Received:", data.toString());	
});





















	