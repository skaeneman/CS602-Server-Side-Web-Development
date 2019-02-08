const mongoose = require('mongoose');
const credentials = require("../credentials.js");

const dbUrl = 'mongodb://' + credentials.username +
	':' + credentials.password + '@' + credentials.host + ':' + credentials.port + '/' + credentials.database;

let connection = null;
let model = null;

const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const employeeSchema = new Schema({
	firstName: String,
	lastName: String,
});

// custom schema method
// employeeSchema.methods.getDeveloperNames = 
// 		function() {
// 			return this.courseDevelopers.map(
// 							 (elem) => {
// 								return elem.firstName + ' ' + 
// 											 elem.lastName;
// 							}).join(',');
// 		};

module.exports.getModel = 
	() => {
		if (connection == null) {
			console.log("Creating connection and employee model...");
			connection = mongoose.createConnection(dbUrl);
			model = connection.model("EmployeeModel", employeeSchema);
		};
		return model;
	};

























