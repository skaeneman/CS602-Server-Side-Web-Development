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

	let newData = {city: 'Oklahoma City', temperature: 50};

	connection.query("Insert into Weather SET ?", newData,
		(error, result) => {
			if (error) {
				console.error(error);
				return;
			}
			console.log(result);

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

});
















