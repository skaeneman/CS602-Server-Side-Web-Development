const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userDb = require('../models/user.js');
const User = userDb.getUserModel();

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
            // find a user 
            User.findOne({ email: email }) 
                .then(user => {
                    if (!user) {
                        return done(null, false, {message: 'That email address was not found!'});
                    }
                    // verify the pass entered in the form with the users salted pass in the database
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;
                        
                        // if a match was found
                        if (isMatch) {
                            return done(null, user);
                        }else {
                            // if no match found
                            return done(null, false, {message: 'Password incorrect!'})
                        }
                    });                    
                })
                .catch(err => console.log(err));
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });    
}


