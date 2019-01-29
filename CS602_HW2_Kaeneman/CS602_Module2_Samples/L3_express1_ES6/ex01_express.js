const express = require('express');
const app = express();

// GET request to the homepage
app.get('/', (req, res) => {
	res.type('text/plain');
  	res.send('Welcome to CS602!');
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});

