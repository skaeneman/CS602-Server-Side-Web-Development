const express = require('express');
const app = express();

// GET request to the homepage
app.get('/', (req, res) => {
	
	const userAgent = req.headers['user-agent'];
	// redirect based on browser
	if (userAgent.indexOf("Firefox") > 0)
		res.redirect("http://www.mozilla.org");
	else if (userAgent.indexOf("Chrome") > 0)
		res.redirect("http://www.google.com");
	else
		res.redirect("http://www.microsoft.com");
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});

