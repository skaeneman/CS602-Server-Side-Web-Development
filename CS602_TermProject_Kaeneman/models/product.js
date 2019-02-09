const mongoose = require('mongoose');
const credentials = require("../credentials.js");

const dbUrl = 'mongodb://' + credentials.username +
    ':' + credentials.password + '@' + credentials.host + ':' + credentials.port + '/' +
    credentials.database;

let connection = null;
let model = null;

const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const productSchema = new Schema({
    productId: { type: Number, unique: true, required: true},
    name: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    price: { type: Number, trim: true, required: true },
    quantity: { type: Number, trim: true, required: true } 
});

module.exports.getProductModel =
    () => {
        if (connection == null) {
            console.log("Creating connection and product model...");
            connection = mongoose.createConnection(dbUrl, { useNewUrlParser: true });
            model = connection.model("ProductModel", productSchema);
        };
        return model;
    };























