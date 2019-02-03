
const net = require('net');
const colors = require('colors');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// loop to read user input and write to server
const readMessage = (client) => {
    rl.question("Enter Command: ", (line) => {
        // send user input to the server
        client.write(line);
        // if user types 'bye' end connection
        if (line == "bye")
            client.end();
        else {
            setTimeout(() => {
                readMessage(client);
            }, 5000);
        };
    });
};

// connect to server 
const client = net.connect({ port: 3000 },
    () => {
        console.log("Connected to server");
        readMessage(client);
    });

client.on('end', () => {
    console.log("Client disconnected...");
    return;
});

// process the data coming from the server
client.on('data', (data) => {
    console.log(colors.blue(data.toString()));	
});























