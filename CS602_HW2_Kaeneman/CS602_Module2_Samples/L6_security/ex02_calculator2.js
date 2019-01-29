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
	  
	  var formula = req.body.formula;
	  formula = formula.trim();

	  if (formula.length < 1) {
	  	res.status(400).send('Invalid input');
			return; 
	  }

	  // Check if there is anything else besides 0-9 - * + / 
	  
	  if(formula.match(/[^0-9\-\/\*\+\(\) ]/)) {
			res.status(400).send('Invalid input');
			return; 
		}

	  let result;
	  try {
			eval('result = ' + req.body.formula);
		} catch (e) {
			res.status(400).send('Invalid Result ' + e.message);
			return; 
		}
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

