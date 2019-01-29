const http = require('http');
const cheerio = require('cheerio');

const url = 
	"http://people.bu.edu/kalathur" + 
	"/current_courses.html";

const req = http.get(url, (response) => {
	let data = '';

	response.on('data', (chunk) => {
		data += chunk;
	});

	response.on('end', () => {
		const $ = cheerio.load(data);
		const linkURLs = [];
	  	$('a').map((index, elem) => {
	  		let href = $(elem).attr('href');
	  		let text = $(elem).html().trim();
	  		if (href.indexOf('http:') == 0) {
	  			linkURLs.push({'link': href, 
	    						'data': text});
	  		}	
	  	});
	  	console.log(linkURLs);
	});
});

req.on('error', (err) => {
	console.log(err);
})
