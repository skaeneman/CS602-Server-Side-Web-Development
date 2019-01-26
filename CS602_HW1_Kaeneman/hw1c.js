var EmployeeEmitter = require('./employeeEmitter').EmployeeEmitter;
var colors = require('colors/safe');

var data = [
    { id: 1, firstName: 'John', lastName: 'Smith' },
    { id: 2, firstName: 'Jane', lastName: 'Smith' },
    { id: 3, firstName: 'John', lastName: 'Doe' }
];

// create the EmployeeEmitter object using the array data as its argument.
const emitter = new EmployeeEmitter(data);

// Subscribe to lookupByLastName event handler
emitter.on('lookupByLastName', (emp_lastName) => {
    console.log(colors.blue(`Event lookupByLastName raised! ${emp_lastName}`));
});

// Subscribe to addEmployee event handler
emitter.on('addEmployee', (emp_firstName, emp_lastName) => {
    console.log(colors.blue(`Event addEmployee raised! ${emp_firstName} ${emp_lastName}`));
});

// Subscribe to lookupById event handler
emitter.on('lookupById', (emp_id) => {
    console.log(colors.blue(`Event lookupById raised! ${emp_id}`));
});

// Emit lookupByLastName
console.log('');
console.log(colors.magenta('Lookup by last name (Smith)'));
console.log(emitter.lookupByLastName('Smith'));
console.log('');

// Emit addEmployee
console.log(emitter.addEmployee('William', 'Smith'));
console.log('');

// Emit lookupByLastName
console.log(colors.magenta('Lookup by last name (Smith)'));
console.log(emitter.lookupByLastName('Smith'));
console.log('');

// Emit lookupById 
console.log(colors.magenta('Lookup by id (2)'));
console.log(emitter.lookupById(2));
console.log('');