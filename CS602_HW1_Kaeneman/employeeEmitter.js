const EventEmitter = require('events').EventEmitter;
const _ = require('underscore');

// creates the class
class EmployeeEmitter extends EventEmitter {
    
    // create a constructor 
    constructor(args) {
        super();
        this.data = args;
    }

    /*******************************************************
     * Looks up an employee in an array using 'findWhere'
     * Parameter: employee_id <String>
     * Returns: An employee if one exists, or undefined
     *******************************************************/
    lookupById (employee_id) {
        this.emit('lookupById', employee_id);
        var employee = _.findWhere(this.data, { id: employee_id });
        return employee;
    }

    /*******************************************************
     * Looks up employee's in an array using 'where'
     * Parameter: employee_lastName <String>
     * Returns: employee's if one or more exist, or []
     *******************************************************/
    lookupByLastName (employee_lastName) {
        this.emmit('lookupByLastName', employee_lastName);
        var emp_lastName = _.where(this.data, { lastName: employee_lastName });
        return emp_lastName;
    }

    /****************************************************************
     * Adds a new employee to the data array using 'pluck' and 'max'
     * Parameters: employee_firstName, employee_lastName <String>
     * Returns: a string stating the new employee is in the data array
     *****************************************************************/
    addEmployee (employee_firstName, employee_lastName) {
        this.emmit('addEmployee', employee_firstName, employee_lastName);
        // gets an array of id's
        var emp_ids = _.pluck(this.data, 'id');
        // finds the maximum id in the array
        var max_id = _.max(emp_ids, function (employee_id) { return employee_id; });
        // increment id by 1
        var new_emp_id = max_id + 1;
        // pushes the new employee into the data array
        data.push({ id: new_emp_id, firstName: employee_firstName, lastName: employee_lastName });
        return `Adding employee ${employee_firstName} ${employee_lastName}`;
    } 
} // ends EmployeeEmitter class

module.exports.EmployeeEmitter = EmployeeEmitter;