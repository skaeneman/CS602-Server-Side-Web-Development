const express = require('express');
const app = express();

// to parse request body
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let counter = 0;

app.use(function (req, res, next) {
  console.log('Time :', new Date().toUTCString());
  next(); // nex handler
})

app.all('/data', (req, res, next) => {
	counter++;
	console.log("Access #", counter);
	next(); // next handler
} );


// Request query data
app.get('/data', (req, res) => {
	const queryData  = JSON.stringify(req.query);
	res.send("Query Data " +  queryData);
});

// Request params data and query data
app.get('/data/:id1/:id2', (req, res) => {
	const paramsData = JSON.stringify(req.params);
	const queryData  = JSON.stringify(req.query);
	res.send("Params Data " + paramsData + "<br/>" +
					 " Query Data " +  queryData);
});

app.get('/', (req, res) => {
	const html = 
	 '<form method="POST" action="/data">' + 
	   'FirstName: <input name="firstName" value=""><br/>' + 
	   'LastName: <input name="lastName" value=""><br/>' +
	   '<input type="Submit"></form>'
	res.send(html);
});

// request body data
app.post('/data', (req, res) => {
	const bodyData  = JSON.stringify(req.body);
	res.send("Body Data " +  bodyData);
})


app.use((req, res) => {
	res.type('text/html');
	res.status(404);
	res.send("<b>404 - Not Found</b>");
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});










