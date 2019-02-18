const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const validator = require('express-validator');
const session = require('express-session');
const flash = require('express-flash');

const app = express();


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

// setup sessions
app.use(session({ secret: 'secret_pass', resave: false, saveUninitialized: false }));
app.use(flash());

// allow sessions to be used in any template
app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});

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

