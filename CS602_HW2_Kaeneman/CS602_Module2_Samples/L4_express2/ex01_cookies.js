var express = require('express');
var app = express();

// setup handlebars view engine
var handlebars = require('express-handlebars');
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

// for signed cookies
var credentials = require('./credentials.js');

var cookieParser = require('cookie-parser');
app.use(cookieParser(credentials.cookieSecret));

// unsigned cookies
app.get('/add', function(req, res) {
	var name = req.query.name;
	var value = req.query.value;
	if (name) {
		res.cookie(name, value);
	}
	res.redirect("/");
});

// signed cookies
app.get('/secure', function(req, res) {
	var name = req.query.name;
	var value = req.query.value;
	if (name) {
		res.cookie(name, value, 
					{signed: true, 
						maxAge: 24*60*60*1000});
	}
	res.redirect("/");
});

// show all cookies
app.get('/', function(req, res) {
	var result = [];
	for (var key in req.cookies) {
		result.push({name: key, 
				value: req.cookies[key]});
	};
	for (var key in req.signedCookies) {
		result.push({name: key, 
				value: req.signedCookies[key]});
	};
	res.render('showCookies', {cookies: result});
});


app.use(function(req, res) {
	res.type('text/html');
	res.status(404);
	res.send("<b>404 - Not Found</b>");
});


app.listen(3000, function(){
  console.log('http://localhost:3000');
});









