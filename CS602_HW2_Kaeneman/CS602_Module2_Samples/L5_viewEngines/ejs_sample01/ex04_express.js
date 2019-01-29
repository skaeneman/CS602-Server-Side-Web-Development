const express = require('express');
const http = require("http");
const path = require("path");

const app = express();

// setup ejs view engine


app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

// static resources
app.use(express.static(__dirname + '/public'));

// Use the quotes module
const quotes = require('./ex04_quotes.js');

// GET request to the homepage
app.get('/', (req, res) => {
	res.render('home', {message: 'Welcome to CS602'});
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











