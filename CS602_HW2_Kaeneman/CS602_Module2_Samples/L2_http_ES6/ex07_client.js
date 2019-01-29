const http = require('http');

const url = 
 	"http://people.bu.edu/kalathur" + 
 	"/current_courses.html";

const req = http.get(url, (response) => {
	let buffer = '';

	response.on('data', (chunk) => {
		buffer += chunk;
	});

	response.on('end', () => {
		console.log(buffer);
	});
});

req.on('error',  (err) => {
	console.log(err);
})
