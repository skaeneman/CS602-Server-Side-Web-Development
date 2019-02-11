
const DB = require('../models/user.js');
const User = DB.getUserModel();

// GET index of users
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
                { title: "List of Users", userData: results });
        });
    };    

// GET user sign up form
module.exports.addUser = 
    (req, res, next) => {
        res.render('users/addUser', { title: 'Sign Up' });
    };

// POST user data
module.exports.saveUser =
    (req, res, next) => {

        let user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
        });

        user.save((err) => {
            if (err) {
                console.log("Error : %s ", err);
            }
            res.redirect('/users');
        });

    };    