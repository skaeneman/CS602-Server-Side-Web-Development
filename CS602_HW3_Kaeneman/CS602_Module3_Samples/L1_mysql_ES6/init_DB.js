const mysql = require("mysql");
const credentials = require("./credentials.js");
const fs = require("fs");

const connection = mysql.createConnection({
	"host": credentials.host, "port": 3306,
	"user": credentials.username,
	"password": credentials.password,
	"database": credentials.database,
	multipleStatements: true 
});

connection.connect((error) => {
	if (error) {
		console.error(error);
		return;
	}
	// Connection successfully established
	console.log("Connected...");

	fs.readFile('createdb.sql', (err, data) => {
		if (err) throw err;
		let sql = data.toString();
		console.log(sql);

		connection.query(sql, (error, result) => {
			if (error) {
				console.error(error);
				return;
			}
			console.log(result);
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

});
















