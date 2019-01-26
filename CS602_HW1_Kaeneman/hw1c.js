var EmployeeEmitter = require('./employeeEmitter').EmployeeEmitter;
var colors = require('colors/safe');

var data = [
    { id: 1, firstName: 'John', lastName: 'Smith' },
    { id: 2, firstName: 'Jane', lastName: 'Smith' },
    { id: 3, firstName: 'John', lastName: 'Doe' }
];

// create the EmployeeEmitter object using the array data as its argument.
const emitter = new EmployeeEmitter(data);

// Subscribe lookupById event handler
emitter.on('lookupById', function (emp_id) {
    console.log(colors.blue(`Event lookupById raised! ${emp_id}`));
});

// Emit lookupById 
console.log(colors.magenta('Lookup by id (2)'));
console.log(emitter.lookupById(2));

