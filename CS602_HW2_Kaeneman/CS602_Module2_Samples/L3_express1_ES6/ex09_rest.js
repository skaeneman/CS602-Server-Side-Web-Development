const express = require('express');
const app = express();

const courses = require('./ex08_courses');

app.get('/api/courses', (req, res) => {
	
	res.format({

		'application/json': () => {
			res.json(courses.getAllCourses());
		},

		'application/xml': () => {
			let coursesXml = 
				'<?xml version="1.0"?>\n<courses>\n' +
					courses.getAllCourses().map(function(c){
						return ' <course id="' + c.id + '">' + 
							c.name + '</course>';
					}).join('\n') + '\n</courses>\n';
			
			res.type('application/xml');
			res.send(coursesXml);
		},

		'text/html': () => {
			let coursesHtml = '<ul>\n' +
				courses.getAllCourses().map(function(c){
					return ' <li>' + c.id + ' - ' + 
					            c.name + '</li>';
				}).join('\n') + '\n</ul>\n';

			res.type('text/html');
			res.send(coursesHtml);
		},

		'text/plain': () => {
			let coursesText = 
				courses.getAllCourses().map(function(c){
					return c.id + ': ' + c.name;
				}).join('\n') + '\n';

			res.type('text/plain');
			res.send(coursesText);
		},

		'default': () => {
			res.status(404);
			res.send("<b>404 - Not Found</b>");
		}
	});
});

app.use((req, res) => {
	res.type('text/html');
	res.status(404);
	res.send("<b>404 - Not Found</b>");
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});

/*
curl -X GET "http://localhost:3000/api/courses"

curl -X GET -H "Accept:application/xml"  \
  "http://localhost:3000/api/courses"

curl -X GET -H "Accept:text/html"  \
  "http://localhost:3000/api/courses"

curl -X GET -H "Accept:text/plain"  \
  "http://localhost:3000/api/courses"

*/
