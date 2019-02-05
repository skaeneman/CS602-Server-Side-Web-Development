const MongoClient = require('mongodb').MongoClient;
const credentials = require("./credentials.js");

const dbUrl = 'mongodb://' + credentials.username +
	':' + credentials.password + '@' + credentials.host + ':' + credentials.port + '/' + credentials.database;
console.log(dbUrl);

let newData = [
   { item: "journal", qty: 25, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
   { item: "notebook", qty: 50, size: { h: 8.5, w: 11, uom: "in" }, status: "A" },
   { item: "paper", qty: 100, size: { h: 8.5, w: 11, uom: "in" }, status: "D" },
   { item: "planner", qty: 75, size: { h: 22.85, w: 30, uom: "cm" }, status: "D" },
   { item: "postcard", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, status: "A" }
];

MongoClient.connect(dbUrl,  (err, client) => {
	if (err) throw err;
	console.log('Successfully connected');
	
	let collection = client.db(credentials.database).collection('inventory');
	
	collection.remove({});
	
	collection.insert(newData,  (err, docs) => {
		console.log('Inserted Count:', docs.insertedCount);
		console.log('Inserted Ids:', docs.insertedIds);
		
		test1(collection, client);
	});
});

const test1 =  (collection, client) => {
	console.log("\n**test1** - Match an Embedded/Nested Document");
	collection.find({ size: { h: 14, w: 21, uom: "cm" } } ).toArray( (err, docs) => {
		console.log(docs);
		test2(collection, client);
	});
}

const test2 =  (collection, client) => {
	console.log("\n**test2** - Specify Equality Match on a Nested Field");
	collection.find({ "size.uom": "in" } ).toArray( (err, docs) => {
		console.log(docs);
		test3(collection, client);
	});
}

const test3 =  (collection, client) => {
	console.log("\n**test3** - Specify Match using Query Operator");
	collection.find({ "size.h": { $lt: 15 } }).toArray( (err, docs) => {
		console.log(docs);
		test4(collection, client);
	});
}

const test4 =  (collection, client) => {
	console.log("\n**test4** - Specify AND Condition");
	collection.find({ "size.h": { $lt: 15 }, "size.uom": "in", status: "D" } ).toArray( (err, docs) => {
		console.log(docs);
		client.close();
	});
}



