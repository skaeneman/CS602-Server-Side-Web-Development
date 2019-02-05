const MongoClient = require('mongodb').MongoClient;
const credentials = require("./credentials.js");

const dbUrl = 'mongodb://' + credentials.username +
	':' + credentials.password + '@' + credentials.host + ':' + credentials.port + '/' + credentials.database;

let newData = [
	{ firstName: 'Jane', lastName: 'Doe' },
	{ firstName: 'John', lastName: 'Smith' },
	{ firstName: 'Josh', lastName: 'Smith' }];

MongoClient.connect(dbUrl,  (err, client) => {
	if (err) throw err;
	console.log('Successfully connected');
	
	let collection = client.db(credentials.database).collection('people');
	
	collection.insert(newData,  (err, docs) => {
		console.log('Inserted Count:', docs.insertedCount);
		console.log('Inserted Ids:', docs.insertedIds);
		
		console.log('Data IDs:', newData);

		client.close();
	});
});
