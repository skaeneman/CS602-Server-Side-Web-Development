const http = require('http');

const server = http.createServer(
	 (request, response) => {
	    // process the request headers
	    var headers = request.headers;
	    console.log(headers);
	    // send the response
	    response.write(headers['user-agent']);
	    response.end();

	});

server.listen(3000);
console.log('Server running at http://localhost:3000/');

