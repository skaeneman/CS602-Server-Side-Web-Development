
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
    addEmployee: (firstName, lastName) => {
        data.firstName = firstName;
        data.lastName = lastName;
        //calculate id
    }    
};


