
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

    addEmployee: (firstName, lastName) => {
        data.firstName = firstName;
        data.lastName = lastName;
        //calculate id
    }    
};


