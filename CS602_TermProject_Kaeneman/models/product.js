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
    name: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    price: { type: Number, trim: true, required: true },
    quantity: { type: Number, trim: true, required: true }
});

// // function to get an array of the quantity
// module.exports.getProductCount = (qty) => {
//     var productCountArr = [];  
//     for (var i=0; i <= qty; i++) {
//         productCountArr.push(i);
//     };
//     return productCountArr;
// };

module.exports.getProductModel =
    () => {
        if (connection == null) {
            console.log("Creating product model connection...");
            connection = mongoose.createConnection(dbUrl, { useNewUrlParser: true });
            model = connection.model("ProductModel", productSchema);
        };
        return model;
    };



















