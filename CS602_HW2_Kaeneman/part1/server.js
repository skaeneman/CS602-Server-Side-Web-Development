
var colors = require('colors/safe');
const net = require('net');

// create socket to read from and write to the client
const server = net.createServer(socket => {
    console.log(colors.green("Client connected!..."));

    // closes the socket to end the clients connection
    socket.on('end',() => {
        console.log(colors.red("Client disconnected..."));
    });

    // process the data from the client
    socket.on('data', (data) => {
        console.log(colors.blue("Server received data: " + data));
    });

}); // ends createServer

// listen for incoming client connections on port 3000
server.listen(3000, () => {
    console.log(colors.green("Listening for connections..."));
});

