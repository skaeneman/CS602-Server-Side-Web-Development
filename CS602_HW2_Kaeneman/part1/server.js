var employees = require('./employeeModule');
var _ = require('underscore');
var colors = require('colors/safe');
const net = require('net');

// create socket to read from and write to the client
const server = net.createServer(socket => {
    console.log(colors.red("Client connection..."));

    // TESTING
    // socket.write("\nHello from the server...\n");

    // closes the socket to end the clients connection
    socket.on('end',() => {
        console.log(colors.red("Client disconnected..."));
    });

    // process the data from the client
    socket.on('data', (data) => {
        // console.log(typeof data);
        // convert from an Object to a String
        var strData = data.toString();

        console.log(strData);

        // split the function name from it's parameter
        var input = strData.split(" ");
        input = input.toString();
        console.log(typeof input);
        console.log(input);

        // if (strData == 'a') {
        //     // output = JSON.stringify(input[0]);
        //     socket.write('send to client....working');
        //     // console.log("working console")
        // }else {
        //     socket.write('nope');
        // }


        // switch (strData[0]) {
        //     case 'x':
        //         // console.log(colors.blue("...Received " + input));           
        //         socket.write('x');
        //         break;
        //     case 'y':
        //         console.log(colors.blue("...Received " + input));
        //         break;
        //     default:
        //     // code block
        // } 



    });

}); // ends createServer

// listen for incoming client connections on port 3000
server.listen(3000, () => {
    console.log(colors.green("Listening for connections..."));
});

