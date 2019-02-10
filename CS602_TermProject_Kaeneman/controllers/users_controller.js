
const DB = require('../models/user.js');
const User = DB.getUserModel();

// Get index of users
module.exports.displayUsers =
    (req, res, next) => {

        User.find({}, (err, users) => {
            if (err)
                console.log("Error : %s ", err);

            let results = users.map((user) => {
                return {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email 
                }
            });

            res.render('users/displayUsers',
                { title: "List of Users", data: results });
        });
    };    