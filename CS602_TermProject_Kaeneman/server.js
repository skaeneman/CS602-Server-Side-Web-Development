const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
// const session = require('express-session');
// const flash = require('express-flash');

const app = express();


// setup handlebars
const hbs = handlebars.create({
    defaultLayout: 'main_logo',

    // create custom handlebars helpers to be used in views
    helpers : {
        // truncate text helper
        truncate: function(str) {
            var out = str.substring(0, 80);
            out = out + "...";
            return out;
        }
    }
});

// setup handlebars view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// static resources
app.use(express.static(__dirname + '/public'));

// setup sessions so we can use flash messages
// app.use(session({ secret: 'secret_pass', resave: true, saveUninitialized: true }));
// app.use(flash());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


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

