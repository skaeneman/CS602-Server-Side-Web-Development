var employees = require('./employeeModule');
var _ = require('underscore');
var colors = require('colors/safe');
const net = require('net');

// create socket to read from and write to the client
const server = net.createServer(socket => {
    console.log(colors.red("Client connection..."));
    socket.write("Connected to server\n");
    socket.write("Enter command: ");

    // closes the socket to end the clients connection
    socket.on('end',() => {
        console.log(colors.red("Client disconnected..."));
    });

    // process the data from the client
    socket.on('data', (data) => {
        // convert client input from an object to a string
        var strData = data.toString();

        // split the input into an array of strings
        input = strData.split(" ");

        console.log(input.length);
        console.log(input[0]);
        console.log(input[1]);

        // check if the user entered all required params, exit if not.
        if (input.length == 1) {
            socket.write("Please enter all parameters.  Goodbye.\n");
            socket.end();
        }else{
            // execute the function that the client called
            switch (input[0]) {
                case 'lookupById':
                    console.log(colors.blue("...Received lookupById " + input[1]));
                    socket.write("...Received\n");
                    var emp_id = parseInt(input[1]); // convert to integer
                    var output = JSON.stringify(employees.lookupById(emp_id));
                    socket.write(output);
                    break;
                case 'y':
                    console.log(colors.blue("...Received " + input));
                    break;
                default:
                // code block
            } 


        } // ends else

    }); // ends data
}); // ends createServer

// listen for incoming client connections on port 3000
server.listen(3000, () => {
    console.log(colors.green("Listening for connections..."));
});

