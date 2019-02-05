const mongoose = require('mongoose');
const credentials = require("./credentials.js");

const dbUrl = 'mongodb://' + credentials.username +
	':' + credentials.password + '@' + credentials.host + ':' + credentials.port + '/' + credentials.database;

const connection = mongoose.createConnection(dbUrl);

const CourseDb = require('./coursesDb.js');
const Course = CourseDb.getModel(connection);

connection.on("open", () => {
	
	/*  // Delete documents
	Course.remove({courseNumber: 'cs602'}, 
		(err, result) => {
			connection.close();
			if (err) throw err;
			console.log("\Delete...");
			console.log("Affected docs:", result);
	});
  */
	Course.remove({courseName: 
				{ "$regex": "Web", "$options": "i" }}, 
		(err, result) => {
			connection.close();
			if (err) throw err;
			console.log("\Delete...");
			console.log("Affected docs:", result);
	});

});















































