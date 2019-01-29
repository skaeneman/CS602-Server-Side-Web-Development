const express = require('express');
const app = express();

// GET request to the homepage
app.get('/', (req, res) => {
	res.set('Refresh', 5);
	res.send(new Date().toString());
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});

