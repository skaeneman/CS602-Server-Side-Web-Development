const mongoose = require('mongoose');
const credentials = require("../credentials.js");

const dbUrl = 'mongodb://' + credentials.username +
    ':' + credentials.password + '@' + credentials.host + ':' + credentials.port + '/' +
    credentials.database;

let connection = null;
let model = null;

const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

// create the database schema
const cartSchema = new Schema({
    quantity: { type: Number, trim: true, required: true },
    totalAmount: { type: Number, trim: true, required: true },
    // create an array to store multiple products in a cart
    // TODO: Link product _id from product schema
    products: [ { name: String, trim: true, required: true } ]
});

// return all the products
cartSchema.methods.getProducts =
    function () {
        return this.products.map(
            (elem) => {
                return elem.name;
            }).join(',');
    };

module.exports.getCartModel =
    () => {
        if (connection == null) {
            console.log("Creating cart model connection...");
            connection = mongoose.createConnection(dbUrl, { useNewUrlParser: true });
            model = connection.model("CartModel", cartSchema);
        };
        return model;
    };























