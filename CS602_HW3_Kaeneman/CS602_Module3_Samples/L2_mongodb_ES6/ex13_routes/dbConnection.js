const mongoose = require('mongoose');
const credentials = require("../credentials.js");

const dbUrl = 'mongodb://' + credentials.username +
	':' + credentials.password + '@' + credentials.host + ':' + credentials.port + '/' + credentials.database;

let connection = null;
let model = null;

const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const courseSchema = new Schema({
	courseNumber: String,
	courseName: String,
	courseDevelopers: [
		{firstName: String, lastName: String}
	]
});
// custom schema method
courseSchema.methods.getDeveloperNames = 
		function() {
			return this.courseDevelopers.map(
							 (elem) => {
								return elem.firstName + ' ' + 
											 elem.lastName;
							}).join(',');
		};

module.exports.getModel = 
	() => {
		if (connection == null) {
			console.log("Creating connection and model...");
			connection = mongoose.createConnection(dbUrl);
			model = connection.model("CourseModel", 
								courseSchema);
		};
		return model;
	};

























