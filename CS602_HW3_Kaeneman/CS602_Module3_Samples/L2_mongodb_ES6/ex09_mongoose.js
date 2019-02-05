const mongoose = require('mongoose');
const credentials = require("./credentials.js");

const dbUrl = 'mongodb://' + credentials.username +
	':' + credentials.password + '@' + credentials.host + ':' + credentials.port + '/' + credentials.database;

const connection = mongoose.createConnection(dbUrl);

const CourseDb = require('./coursesDb.js');
const Course = CourseDb.getModel(connection);

connection.on("open", () => {
	
	// create and save document objects
	let course;

	course = new Course({
		courseNumber: 'cs601',
		courseName: 'Web Application Development',
		courseDevelopers: [
			{ firstName: 'Eric',lastName: 'Bishop'}
		]
	}); 
	course.save();

	course = new Course({
		courseNumber: 'cs602',
		courseName: 'Server Side Web Development',
		courseDevelopers: [
			{ firstName: 'Eric', lastName: 'Bishop'},
			{ firstName: 'Suresh',lastName: 'Kalathur'}
		]
	}); 
	course.save();
  

	course = new Course({
		courseNumber: 'cs701',
		courseName: 'RIA',
		courseDevelopers: [
			{ firstName: 'Suresh',lastName: 'Kalathur'}
		]
	}); 
	course.save((err) => {
		connection.close();
		if (err) throw err;
		console.log("Success!");
	});
	
});










