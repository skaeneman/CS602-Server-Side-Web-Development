var employees = require('./employeeModule');
var _ = require('underscore');
var colors = require('colors/safe');
const net = require('net');

// create socket to read from and write to the client
const server = net.createServer(socket => {
    console.log(colors.red("Client connection..."));

    // closes the socket to end the clients connection
    socket.on('end',() => {
        console.log(colors.red("Client disconnected..."));
    });

    // process the data from the client
    socket.on('data', (data) => {
        // console.log(typeof data);
        // convert from an Object to a String
        var strData = data.toString();

        // split the function name from it's parameter
        var input = strData.split(" ");

        // console.log("0: " + input[0]);
        // console.log("1: " + input[1]);

        switch(input[0]) {
            case "lookupById": 
                socket.write(colors.blue("...Received " + input));
                break;
            default:
                socket.write("Error, please enter a valid command...");    
        };

    });

}); // ends createServer

// listen for incoming client connections on port 3000
server.listen(3000, () => {
    console.log(colors.green("Listening for connections..."));
});

