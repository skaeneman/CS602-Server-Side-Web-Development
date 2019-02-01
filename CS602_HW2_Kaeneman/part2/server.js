const express = require('express');
const app = express();

// handlebars view engine
const handlebars = require('express-handlebars');
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

// GET request to the homepage
app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3000, () => {
    console.log('http://localhost:3000');
});

