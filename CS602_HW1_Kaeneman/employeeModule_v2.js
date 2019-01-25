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
        var emp_lastName = _.pluck(data, { lastName: employee_lastName });
        return emp_lastName;
    },
    /****************************************************************
     * Adds a new employee to the data array using 'pluck' and 'max'
     * Parameters: employee_firstName, employee_lastName <String>
     * Returns: a string stating the new employee is in the data array
     *****************************************************************/
    addEmployee: (employee_firstName, employee_lastName) => {
        // gets an array of id's
        var emp_ids = _.pluck(data, 'id');
        // finds the maximum id in the array
        var max_id = _.max(emp_ids, function (employee_id) { return employee_id; });
        // increment id by 1
        var new_emp_id = max_id + 1;  
        // pushes the new employee onto the data array
        data.push({id: new_emp_id, firstName: employee_firstName, lastName: employee_lastName});
        return `Adding employee ${employee_firstName} ${employee_lastName}`;
    } 
};