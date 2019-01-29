const express = require('express');
const app = express();

// to parse request body
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// static resources
app.use(express.static(__dirname + '/public'));

// setup handlebars view engine
const handlebars = require('express-handlebars');
app.engine('handlebars', 
	handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.get('/', (req, res) => {
	res.render('ex01_home');
});

app.post('/calc', function (req, res) { 
	  let result;
		eval('result = ' + req.body.formula);
		res.send('The result is: ' + result); 
	});


app.use((req, res) => {
	res.type('text/html');
	res.status(404);
	res.send("<b>404 - Not Found</b>");
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});

