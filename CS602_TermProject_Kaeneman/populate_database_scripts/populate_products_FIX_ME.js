/*****************************************************************
 *  Connects to a MongoDB database, uses the Mongooseschema,
 *  and creates and saves the data for three products.
 *****************************************************************/

const mongoose = require('mongoose');
const credentials = require("../credentials.js");

const dbUrl = 'mongodb://' + credentials.username +
    ':' + credentials.password + '@' + credentials.host + ':' + credentials.port + '/' + credentials.database;

const connection = mongoose.createConnection(dbUrl, { useNewUrlParser: true });

const ProductDb = require('../models/product.js');
const Product = ProductDb.getProductModel(connection);

connection.on("open", () => {

    // create and save document objects
    let product;

    product = new Product({
        id: 1,
        name: 'Guitar',
        description: 'This is a description of a guitar',
        price: 1000000,
        quantity: 666
    });
    product.save();

    product = new Product({
        id: 2,
        name: 'Drum kit',
        description: 'This is a description of a drum kit',
        price: 1000000,
        quantity: 667
    });
    product.save();

    product = new Product({
        id: 3,
        name: 'Piano',
        description: 'This is a description of a piano',
        price: 1000000,
        quantity: 668
    });
    product.save((err) => {
        connection.close();
        if (err) throw err;
        console.log("Successfully saved products!");
    });

});










