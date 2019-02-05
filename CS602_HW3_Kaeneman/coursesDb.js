const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const courseSchema = new Schema({
	courseNumber: String,
	courseName: String,
	courseDevelopers: [
		{firstName: String, lastName: String}
	]
});

module.exports = {
	getModel: (connection) => {
		return connection.model("CourseModel", 
							courseSchema);
	}
}
