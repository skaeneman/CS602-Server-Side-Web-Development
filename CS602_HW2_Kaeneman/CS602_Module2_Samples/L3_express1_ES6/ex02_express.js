const express = require('express');
const app = express();

// GET request to the homepage
app.get('/', (req, res) => {
	res.type('text/plain');
  	res.send('Welcome to CS602!');
});

app.get('/about', (req, res) => {
	res.type('text/html');
  	res.send('<b>Course description of CS602...</b>');
});

app.use((req, res) => {
	res.type('text/html');
	res.status(404);
	res.send("<b>404 - Not Found</b>");
});

app.listen(3000, function(){
  console.log('http://localhost:3000');
});

