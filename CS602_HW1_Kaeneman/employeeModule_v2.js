// the below functions utilize the "underscore" module https://underscorejs.org
var _ = require('underscore');

// array of user objects
var data = [
    { id: 1, firstName: 'John', lastName: 'Smith' },
    { id: 2, firstName: 'Jane', lastName: 'Smith' },
    { id: 3, firstName: 'John', lastName: 'Doe' }
];

module.exports = {
    /*******************************************************
     * Looks up an employee in an array using 'findWhere'
     * Parameter: employee_id <String>
     * Returns: An employee if one exists, or undefined
     *******************************************************/
    lookupById: (employee_id) => {
        var employee = _.findWhere(data, { id: employee_id });
        return employee;
    },
    /*******************************************************
     * Looks up employee's in an array using 'where'
     * Parameter: employee_lastName <String>
     * Returns: employee's if one or more exist, or []
     *******************************************************/
    lookupByLastname: (employee_lastName) => {
        var emp_lastName = _.where(data, { lastName: employee_lastName });
        return emp_lastName;
    }
    .
};