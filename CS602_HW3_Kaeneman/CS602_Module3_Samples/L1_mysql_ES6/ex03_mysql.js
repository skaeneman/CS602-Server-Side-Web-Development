const mysql = require("mysql");
const credentials = require("./credentials.js");

const connection = mysql.createConnection({
	"host": credentials.host, "port": 3306,
	"user": credentials.username,
	"password": credentials.password,
	"database": credentials.database
});

console.log("Connecting...");

connection.connect((error) => {
	if (error) {
		console.error(error);
		return;
	}
	// Connection successfully established
	console.log("Connected...");

	// Do database operations

	connection.query("Select * from Weather",
		(error, rows) => {
			if (error) {
				console.error(error);
				return;
			}
			/*
			for (var i = 0; i < rows.length; i++) {
				console.log(rows[i].city, "-", 
							rows[i].temperature + " degrees");
			}
			*/
			for (let row of rows) {
				console.log(row.city, "-", 
							row.temperature + " degrees");
			}
			
		});

		// Close
		connection.end((error) => {
			if (error) {
				console.error(error);
				return;
			}
			// Connection successfully closed
			console.log("Closed...");
		});


});


















