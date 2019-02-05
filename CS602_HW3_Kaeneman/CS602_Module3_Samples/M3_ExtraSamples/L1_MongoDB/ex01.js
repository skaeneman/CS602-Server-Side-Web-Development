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

// SELECT * FROM inventory

const test1 =  (collection, client) => {
	console.log("\n**test1** - Select All Documents in a Collection");
	collection.find({}).toArray( (err, docs) => {
		console.log(docs);
		test2(collection, client);
	});
}

// SELECT * FROM inventory WHERE status = "D"

const test2 =  (collection, client) => {
	console.log("\n**test2** - Specify Equality Condition");
	collection.find({ status: "D"}).toArray( (err, docs) => {
		console.log(docs);
		test3(collection, client);
	});
}

// SELECT * FROM inventory WHERE status in ("A", "D")

const test3 =  (collection, client) => {
	console.log("\n**test3**");
	collection.find({ status: { $in: [ "A", "D" ] } }).toArray( (err, docs) => {
		console.log(docs);
		test4(collection, client);
	});
}

// SELECT * FROM inventory WHERE status = "A" AND qty < 30

const test4 =  (collection, client) => {
	console.log("\n**test4** - Specify AND Conditions");
	collection.find( { status: "A", qty: { $lt: 30 } }).toArray( (err, docs) => {
		console.log(docs);
		test5(collection, client);
	});
}

// SELECT * FROM inventory WHERE status = "A" OR qty < 30

const test5 =  (collection, client) => {
	console.log("\n**test5** - Specify OR Conditions");
	collection.find( { $or: [ { status: "A" }, { qty: { $lt: 30 } } ] }).toArray( (err, docs) => {
		console.log(docs);
		test6(collection, client);
	});
}

// SELECT * FROM inventory WHERE status = "A" AND ( qty < 30 OR item LIKE "p%")

const test6 =  (collection, client) => {
	console.log("\n**test6** - Specify AND as well as OR Conditions");
	collection.find( {
     status: "A",
     $or: [ { qty: { $lt: 30 } }, { item: /^p/ } ]
		} ).toArray( (err, docs) => {
		console.log(docs);
		client.close();
	});
}


