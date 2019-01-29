var colors = require('colors/safe');
const net = require('net');

// create socket to read from and write to client
const server = net.createServer(socket => {
    console.log("Client connected!...");

    // closes the socket to end the clients connection
    socket.on('end',() => {
        console.log(colors.red("Client disconnected..."));
    });

    // // get data from client
    // socket.on('data')
});

// listen for incoming cliet connections on port 3000
server.listen(3000, () => {
    console.log("Listening for connections...");
});

