const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const validator = require('express-validator');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

const app = express();

// passport configuration.  pass in passport object
require('./config/passport')(passport);

// setup handlebars
const hbs = handlebars.create({
    defaultLayout: 'main_logo',

    // create custom handlebars helpers to be used in views
    helpers : {
        // truncate text helper
        truncate: function(str) {
            var charLimit = 80;
            if (str.length > charLimit) {
                var out = str.substring(0, charLimit);
                out = out + "...";
                return out;
            }
            else {
                return str;
            }
        },
        // helper function to convert number to currency
        convertToCurrency: function(num) {
            var currency = num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            return '$' + currency;
        }
    }
});

// setup handlebars view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// static resources
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// setup the express validator
app.use(validator());

// cookies
app.use(cookieParser());

// setup sessions
app.use(session({ secret: 'secret_pass', resave: false, saveUninitialized: false }));

// passport authentication
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// global variables
app.use(function(req, res, next) {
    // allow session variable to be used in any template
    res.locals.session = req.session;
    // setup flash global messages to be used in templates
    res.locals.successMessage = req.flash('successMessage');
    res.locals.errorMessage = req.flash('errorMessage');    
    next();
});


// flash messages
// app.use(require('connect-flash')());
// app.use(function (req, res, next) {
//     res.locals.messages = require('express-messages')(req, res);
//     next();
// });


// Routing
var routes = require('./routes/index');
app.use('/', routes);

app.use((req, res) => {
    res.status(404);
    res.render('404');
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});

