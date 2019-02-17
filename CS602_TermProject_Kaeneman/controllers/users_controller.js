
const DB = require('../models/user.js');
const User = DB.getUserModel();


// GET user sign up form
module.exports.addUser = 
    (req, res, next) => {
        res.render('users/addUser', { title: 'Sign Up', success: req.session.success, errors: req.session.errors });
        req.session.errors = null;  // after rendering an error reset to null
        req.session.success = null; 
    };

// POST user data
module.exports.saveUser =
    (req, res, next) => {

        let user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        });

        // check that user signup data is valid
        req.check('email', 'Please enter a valid email address').isEmail(); 
        // check that password equals password confirmation
        req.check('password', "Passwords do not match").isLength({min: 6}).equals(req.body.passwordConfirmation);

        // console.log(req.body);

        var errors = req.validationErrors();  // save any error messages

        // check if there are any errors
        if (errors) {
            req.session.errors = errors; // save error message in session
            req.session.success = false;
            return res.redirect('/users/add'); // redirect to same page to show error messages
        } else {
            req.session.success = true;
        }
        // save the user
        user.save((err) => {
            if (err) {
                console.log("Error : %s ", err);
                return res.redirect('/users/add'); // redirect to same page to show error messages
            }
            // set the session messages back to null and redirect
            req.session.success = null;    
            req.session.errors = null;                    
            res.redirect('/');
        });
    };    