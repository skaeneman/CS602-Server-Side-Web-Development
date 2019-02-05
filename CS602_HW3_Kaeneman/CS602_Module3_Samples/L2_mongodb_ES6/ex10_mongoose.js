const mongoose = require('mongoose');
const credentials = require("./credentials.js");

const dbUrl = 'mongodb://' + credentials.username +
	':' + credentials.password + '@' + credentials.host + ':' + credentials.port + '/' + credentials.database;

const connection = mongoose.createConnection(dbUrl);

const CourseDb = require('./coursesDb.js');
const Course = CourseDb.getModel(connection);

connection.on("open", () => {
	
	// Find all courses
	Course.find({}, 'courseName courseNumber', 
		(err, results) => {
			if (err) throw err;
			console.log("\nFind all courses");
			console.log(results);
		});

	
	Course.find({courseNumber: 'cs602'}, 
		(err, results) => {
			if (err) throw err;
			console.log("\nFind cs602");
			console.log(results);
		});

	Course.find({courseDevelopers: {$not: {$size: 1}}}, 
		(err, results) => {
			connection.close();
			if (err) throw err;
			console.log("\nCourses with multiple develeopers");
			console.log(results);
	});
	
});

























