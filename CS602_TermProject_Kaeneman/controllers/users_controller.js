
const DB = require('../models/user.js');
const User = DB.getUserModel();


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