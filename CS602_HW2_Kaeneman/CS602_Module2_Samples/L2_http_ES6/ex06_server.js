const http = require('http');
const fs   = require('fs');
const qs   = require('querystring');

const server = http.createServer(
	 (request, response) => {
    // process the request
    console.log("Request URL:", request.url);
    if (request.method == 'POST')  {
      let data = '';
      
      request.on('data', (chunk) => {
        data += chunk;
      });
      
      request.on('end', () => {
        const postData = qs.parse(data);
        //send the response
        response.writeHead(200, 
          { 'content-type': 'application/json' });
        response.write(JSON.stringify(postData));
      });    	
    } else {
      // send the form
    	const fileName = './public/form.html';
      const rs = fs.createReadStream(fileName);
      rs.pipe(response);
    }    
	});

server.listen(3000);
console.log('Server running at http://localhost:3000/');

