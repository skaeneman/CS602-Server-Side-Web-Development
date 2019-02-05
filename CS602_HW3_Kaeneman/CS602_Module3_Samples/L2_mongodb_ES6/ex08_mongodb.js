const MongoClient = require('mongodb').MongoClient;
const credentials = require("./credentials.js");

const dbUrl = 'mongodb://' + credentials.username +
	':' + credentials.password + '@' + credentials.host + ':' + credentials.port + '/' + credentials.database;

MongoClient.connect(dbUrl, (err, client) => {
	if (err) throw err;
	console.log('Successfully connected');
	
	let collection = client.db(credentials.database).collection('people');
	
	collection.remove({lastName: 'Smith'}, 
		 (err, results) => {
			console.log(results.result);
			client.close();
	});	
});
