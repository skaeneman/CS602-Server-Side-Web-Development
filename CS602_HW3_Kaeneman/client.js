/*****************************************************************
 *  Connects to a MongoDB database, uses the Mongooseschema,
 *  and creates and saves the data for three employees.
 *****************************************************************/

const mongoose = require('mongoose');
const credentials = require("./credentials.js");

const dbUrl = 'mongodb://' + credentials.username +
	':' + credentials.password + '@' + credentials.host + ':' + credentials.port + '/' + credentials.database;

const connection = mongoose.createConnection(dbUrl);

const EmployeeDb = require('./routes/dbConnection.js');
const Employee = EmployeeDb.getModel(connection);

connection.on("open", () => {
	
	// create and save document objects
	let employee;

	employee = new Employee({
		firstName: 'John',
		lastName: 'Smith'
	}); 
	employee.save();

	employee = new Employee({
		firstName: 'Jane',
		lastName: 'Smith'
	}); 
	employee.save();
  
	employee = new Employee({
		firstName: 'John',
		lastName: 'Doe'
	}); 
	employee.save((err) => {
		connection.close();
		if (err) throw err;
		console.log("Success!");
	});
	
});










