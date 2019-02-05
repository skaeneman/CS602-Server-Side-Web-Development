const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema
const personSchema = new Schema({
	firstName: 'string',
	lastName: 'string'
});

// Optionally, add custom methods
personSchema.methods.printMe = 
	function ()  {
		console.log(this);
		console.log("I am", this.firstName + 
			' ' + this.lastName);
	};

// Create a Model
const Person = mongoose.model('PersonModel', 
			personSchema);

// create an instance
let john = new Person({
	firstName: 'John', lastName: 'Smith'
});
console.log(john);
// invoke custom method
john.printMe();


