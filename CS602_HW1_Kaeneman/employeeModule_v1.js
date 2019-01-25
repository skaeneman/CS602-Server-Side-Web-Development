// array of javascript objects
var data = [
    { id:1, firstName:'John', lastName:'Smith' },
    { id:2, firstName:'Jane', lastName:'Smith' },
    { id:3, firstName:'John', lastName:'Doe' },
];

module.exports = {
    lookupById: () => {
        return data.id;
        //TODO: add undefined 
    },
    addEmployee: (firstName, lastName) => {
        data.firstName = firstName;
        data.lastName = lastName;
        //calculate id
    }    
};


