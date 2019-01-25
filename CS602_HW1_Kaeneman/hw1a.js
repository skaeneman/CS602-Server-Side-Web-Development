
var foo = require('./employeeModule_v1');

// Lookup by last name, Smith, and print the results
console.log("Lookup by last name (Smith)");
console.log(foo.lookupByLastName('Smith'));
console.log('');

// Add a new employee with first name, William, and last name, Smith.
console.log(foo.addEmployee('William', 'Smith'));
console.log('');

// Lookup by last name, Smith, and print the results.
console.log("Lookup by last name (Smith)");
console.log(foo.lookupByLastName('Smith'));
console.log('');

// Lookup by id, 2, and assign the value to a variable.
console.log("Lookup by id (2)");
var id_variable = foo.lookupById(2);
// Print the variable
console.log(id_variable);
console.log('');

// Using the above variable, change the first name to Mary
console.log("Changing first name...");
id_variable.firstName = 'Mary'
console.log('');

// Lookup again by id, 2, and print the result.
console.log("Lookup by id (2)");
var id_variable2 = foo.lookupById(2);
console.log(id_variable2);
console.log('');

// Lookup by last name, Smith, and print the results.
console.log("Lookup by last name (Smith)");
console.log(foo.lookupByLastName('Smith'));
console.log('');