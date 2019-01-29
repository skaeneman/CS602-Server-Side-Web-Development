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
	res.render('ex03_home');
});

app.post('/lookup', function (req, res) { 
	  let result;
		result = "Results for " +  req.body.lastname;
		res.send(result); 
	});


app.use((req, res) => {
	res.type('text/html');
	res.status(404);
	res.send("<b>404 - Not Found</b>");
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});

