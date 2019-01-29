const express = require('express');
const app = express();

// setup handlebars view engine
const handlebars = require('express-handlebars');

app.engine('handlebars', 
	handlebars({defaultLayout: 'main_logo'}));

app.set('view engine', 'handlebars');

// static resources
app.use(express.static(__dirname + '/public'));

// Use the quotes module
const quotes = require('./ex04_quotes.js');

// GET request to the homepage
app.get('/', (req, res) => {
	res.render('home');
});

app.get('/about', (req, res) => {
	res.render('about_quote', 
		{quote: quotes.getRandomQuote(), 
		 quotes: quotes.getAllQuotes()});
});

app.use((req, res) => {
	res.status(404);
	res.render('404');
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});











