const express = require('express');
const app = express();

// setup handlebars view engine
const handlebars = require('express-handlebars');
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

// to parse request body
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// for signed cookies
const credentials = require('./credentials.js');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

// cookie-parser first
app.use(cookieParser());
app.use(expressSession(
	{secret: credentials.cookieSecret, resave: false, saveUninitialized: false}));

// show session data
app.get('/', (req, res) => {
	if (req.session.taskList === undefined) {
		req.session.taskList = [];
	}
  res.render('showSession', 
  	{data: req.session.taskList});
});

// handle form submission
app.post('/', (req, res) => {
	req.session.taskList.push(req.body.task);
  res.redirect('/');
});


app.use((req, res) => {
	res.type('text/html');
	res.status(404);
	res.send("<b>404 - Not Found</b>");
});


app.listen(3000, () => {
  console.log('http://localhost:3000');
});









