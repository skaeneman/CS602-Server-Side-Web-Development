const http = require('http');

const server = http.createServer(
	 (request, response) => {
        // process the request
        console.log("Request URL:", request.url);
        const parsed_data = 
        	require('url').parse(request.url, true);
        console.log(parsed_data);
        // send the response
        response.write('Hello! ' + 
        	parsed_data.query.name + 
        	' Your id is ' +  
        	parsed_data.query.id); 
        response.end();

	});

server.listen(3000);
console.log('Server running at http://localhost:3000/');

