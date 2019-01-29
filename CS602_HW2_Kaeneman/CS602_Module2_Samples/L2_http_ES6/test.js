const http = require('http');

const server = http.createServer();

server.on('request',
	 (request, response) => {
	    // process the request
	    console.log("Request URL:", request.url);

	    // send the response
	    response.write('Hello! It is ' +  new Date());
	    response.end();

	});

server.listen(3000);
console.log('Server running at http://localhost:3000/');

