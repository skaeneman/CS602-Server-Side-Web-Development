var employees = require('./employeeModule');
var _ = require('underscore');
var colors = require('colors/safe');
const net = require('net');

// stores client connections in array
const clients = [];

// create socket to read from and write to the client
const server = net.createServer(socket => {
    console.log(colors.red("Client connection..."));
    // populate clients array with the connection
    clients.push(socket);

    // closes the socket to end the clients connection
    socket.on('end', () => {
        console.log(colors.red("Client disconnected..."));

        // remove socket from list of clients
        let index = clients.indexOf(socket);
        console.log("index ", index);
        if (index != -1) {
            clients.splice(index, 1);
            console.log("# Clients after remove: ", clients.length);
        }
    });    

    // process the data from the client
    socket.on('data', (data) => {
        // convert client input from an object to a string
        var strData = data.toString();

        // split the input into an array of strings
        input = strData.split(" ");

            // execute the function that the client called
            switch (input[0]) {
                case 'lookupById':
                    console.log(colors.blue("...Received lookupById " + input[1]));
                    socket.write(colors.blue("\n...Received"));
                    var emp_id = parseInt(input[1]); // convert to integer
                    var output = JSON.stringify(employees.lookupById(emp_id));
                    socket.write(output);
                    break;
                case 'lookupByLastName':
                    console.log(colors.blue("...Received lookupByLastName " + input[1]));
                    socket.write(colors.blue("\n...Received"));
                    var output = JSON.stringify(employees.lookupByLastName(input[1]));
                    socket.write(output);
                    break;
                case 'addEmployee':
                    console.log(colors.blue("...Received addEmployee " + input[1] + " " + input[2]));
                    socket.write(colors.blue("\n...Received"));
                    var output = JSON.stringify(employees.addEmployee(input[1], input[2]));
                    socket.write(output);
                    break;                    
                default:
                    socket.write("Invalid request");
            } 
    }); // ends data
}); // ends createServer

// listen for incoming client connections on port 3000
server.listen(3000, () => {
    console.log(colors.green("Listening for connections..."));
});

