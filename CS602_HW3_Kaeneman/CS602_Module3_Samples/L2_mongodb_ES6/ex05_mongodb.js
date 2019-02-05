const MongoClient = require('mongodb').MongoClient;
const credentials = require("./credentials.js");

const dbUrl = 'mongodb://' + credentials.username +
	':' + credentials.password + '@' + credentials.host + ':' + credentials.port + '/' + credentials.database;

MongoClient.connect(dbUrl,  (err, client) => {
	if (err) throw err;
	console.log('Successfully connected');
	
	let collection = client.db(credentials.database).collection('people');
	
	collection.find({lastName: 'Smith'}).toArray(
		 (err, docs) => {
			console.log("Search by lastName:\n", docs);
	});
	
	collection.find({firstName: 'John'}).toArray(
		 (err, docs) => {
			console.log("Search by firstName:\n", docs);
	});
	
	collection.find({firstName: 'John', lastName: 'Smith'}).toArray(
		 (err, docs) => {
			console.log("Search by first and last Name:\n", docs);
			client.close();
	});
});
