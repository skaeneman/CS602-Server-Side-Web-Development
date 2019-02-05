const mysql = require("mysql");
const credentials = require("./credentials.js");

const connection = mysql.createConnection({
	"host": credentials.host, "port": 3306,
	"user": credentials.username,
	"password": credentials.password,
	"database": credentials.database
});

connection.connect((error) => {
	if (error) {
		console.error(error);
		return;
	}
	// Connection successfully established
	console.log("Connected...");
});

// Do database operations

let newData = ['Oklahoma City'];

connection.query(
	"Delete from Weather Where city = ?", 
	newData,
	(error, result) => {
		if (error) {
			console.error(error);
			return;
		}
		console.log(result);
	});

connection.end((error) => {
	if (error) {
		console.error(error);
		return;
	}
	// Connection successfully closed
	console.log("Closed...");
});















