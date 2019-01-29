const express = require('express');
const app = express();

// setup handlebars view engine
const handlebars = require('express-handlebars');
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

// for signed cookies
const credentials = require('./credentials.js');

const cookieParser = require('cookie-parser');
app.use(cookieParser(credentials.cookieSecret));

// unsigned cookies
app.get('/add', (req, res) => {
	let name = req.query.name;
	let value = req.query.value;
	if (name) {
		res.cookie(name, value);
	}
	res.redirect("/");
});

// signed cookies
app.get('/secure', (req, res) => {
	let name = req.query.name;
	let value = req.query.value;
	if (name) {
		res.cookie(name, value, 
					{signed: true, 
						maxAge: 24*60*60*1000});
	}
	res.redirect("/");
});

// show all cookies
app.get('/', (req, res) => {
	const result = [];
	for (let key in req.cookies) {
		result.push({name: key, 
				value: req.cookies[key]});
	};
	for (let key in req.signedCookies) {
		result.push({name: key, 
				value: req.signedCookies[key]});
	};
	res.render('showCookies', {cookies: result});
});


app.use((req, res) => {
	res.type('text/html');
	res.status(404);
	res.send("<b>404 - Not Found</b>");
});


app.listen(3000, () => {
  console.log('http://localhost:3000');
});









