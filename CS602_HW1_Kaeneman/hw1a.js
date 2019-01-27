
var foo = require('./employeeModule_v1');
var colors = require('colors/safe');

// Lookup by last name, Smith, and print the results
console.log('');
console.log(colors.red("Lookup by last name (Smith)"));
console.log(foo.lookupByLastName('Smith'));
console.log('');

// Add a new employee with first name, William, and last name, Smith.
console.log(colors.red('Adding employee William Smith'));
foo.addEmployee('William', 'Smith');
console.log('');

// Lookup by last name, Smith, and print the results.
console.log(colors.red("Lookup by last name (Smith)"));
console.log(foo.lookupByLastName('Smith'));
console.log('');

// Lookup by id, 2, and assign the value to a variable.
console.log(colors.red("Lookup by id (2)"));
var id_variable = foo.lookupById(2);
// Print the variable
console.log(id_variable);
console.log('');

// Using the above variable, change the first name to Mary
console.log(colors.red("Changing first name..."));
// check to ensure id_variable exists before changing name
if (id_variable === undefined || id_variable === null) {
    console.log(colors.magenta('first name is null...can\'t be changed!'));
} else {
    id_variable.firstName = 'Mary';
}
console.log('');

// Lookup again by id, 2, and print the result.
console.log(colors.red("Lookup by id (2)"));
var id_variable2 = foo.lookupById(2);
console.log(id_variable2);
console.log('');

// Lookup by last name, Smith, and print the results.
console.log(colors.red("Lookup by last name (Smith)"));
console.log(foo.lookupByLastName('Smith'));
console.log('');