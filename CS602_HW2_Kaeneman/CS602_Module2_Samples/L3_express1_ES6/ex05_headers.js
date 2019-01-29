const express = require('express');
const app = express();

// GET request to the homepage
app.get('/', (req, res) => {
	res.type('text/html');
	let result = '<table border=1>';
	let item = '';
	for (let header in req.headers) {
		item = '<tr><th>' + header + '</th>' +
		        '<td>' + req.headers[header] + '</td></tr>\n';
		result += item;
	}
	result += '</table>'
  res.send(result);
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});

