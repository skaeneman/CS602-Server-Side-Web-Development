
// array of user objects
var data = [
    { id:1, firstName:'John', lastName:'Smith' },
    { id:2, firstName:'Jane', lastName:'Smith' },
    { id:3, firstName:'John', lastName:'Doe' }
];

module.exports = {
    /*****************************************************************************
    * Finds a user by searching for their id in an array.
    * Argument: takes an integer id.
    * Returns: first name, last name, and id of a user in the array, or undefined.
    ******************************************************************************/
    lookupById: (user_id) => {
        for (var i in data) {
            if (data[i].id == user_id) {
                return data[i]; 
            }
        } 
    },
    /*****************************************************************************
    * Finds one or more users by searching for matching last names in an array.
    * Argument: takes a name as a String.
    * Returns: first name, last name, and id of users in the array, or an empty array.
    ******************************************************************************/
    lookupByLastName: (user_lastName) => {
        user_array = []; // creates an empty array
        for (var x in data) {
            if (data[x].lastName == user_lastName) {
                // populates array if a user is found
                user_array.push(data[x]);
            }
        }
        return user_array;
    },    
    /*****************************************************************************
    * Adds a new employee into the data array.
    * Argument: takes a users first and last name as a String.
    * Returns: a message that the user has been added to the data array.
    ******************************************************************************/
    addEmployee: (emp_firstName, emp_lastName) => {
        employee_array = [];  // create an empty array to hold id's
        for (var i in data) {
            // populate the array with the current employee id's
            employee_array.push(data[i].id);
        }
        // find the max id in the array using the Spread operator
        max_id = Math.max(...employee_array);  
        // create a new id one greater than the current max_id
        new_employee_id = max_id + 1;  
        // push the new employee object into the data array
        data.push({ id: new_employee_id, firstName: emp_firstName, lastName: emp_lastName });
        // output the new employee using string interpolation
        return `Adding employee ${emp_firstName} ${emp_lastName}`;
    }    
};


