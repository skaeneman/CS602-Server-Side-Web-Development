
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
        this.emit('lookupByLastName', employee_lastName);
        var emp_lastName = _.where(this.data, { lastName: employee_lastName });
        return emp_lastName;
    }

    /****************************************************************
     * Adds a new employee to the data array using 'pluck' and 'max'
     * Parameters: employee_firstName, employee_lastName <String>
     * Returns: a string stating the new employee is in the data array
     *****************************************************************/
    addEmployee (employee_firstName, employee_lastName) {
        this.emit('addEmployee', employee_firstName, employee_lastName);
        // gets an array of id's
        var emp_ids = _.pluck(this.data, 'id');
        // if emp_ids is empty set new_emp_id to 1, else get the current max id and add 1 to it 
        const new_emp_id = _.isEmpty(emp_ids) ? 1 : _.max(emp_ids, function (employee_id) { return employee_id; }) + 1;
        // pushes the new employee into the data array
        this.data.push({ id: new_emp_id, firstName: employee_firstName, lastName: employee_lastName });
    } 
} // ends EmployeeEmitter class

module.exports.EmployeeEmitter = EmployeeEmitter;

