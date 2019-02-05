const mysql = require("mysql");
const credentials = require("./credentials.js");

const pool = mysql.createPool({
	"host": credentials.host, "port": 3306,
	"user": credentials.username,
	"password": credentials.password,
	"database": credentials.database
});

pool.getConnection((error, connection) => {
	if (error) {
		console.error(error);
		return;
	}
	// Connection successfully established
	console.log("Connection from pool...");
  
  // Do database operations

  connection.query("Select * from Weather",
	(error, rows) => {
		if (error) {
			console.error(error);
			return;
		}
		for (let row of rows) {
			console.log(row.city, "-", 
						row.temperature + " degrees");
		}
	});

  // Release the connection to the pool
	connection.release();

	

});



















