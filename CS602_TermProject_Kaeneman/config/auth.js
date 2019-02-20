// make sure users are authenticated before visting certain pages
module.exports = {
    ensureAuthenticated: function (req, res, next) {
        // isAuthenticated comes from passport
        if (req.isAuthenticated) {
            return next();
        }
        req.flash('errorMessage', 'Please login first!');
        res.redirect('/login');
    }
}

