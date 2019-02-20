const mongoose = require('mongoose');
const credentials = require("../credentials.js");

const dbUrl = 'mongodb://' + credentials.username +
    ':' + credentials.password + '@' + credentials.host + ':' + credentials.port + '/' +
    credentials.database;

let connection = null;
let model = null;

const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const orderSchema = new Schema({  
    // store a user id and reference the User model to get it
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    // store the cart object with all products
    shoppingCart: {type: Object, required: true} 
});

module.exports.getOrderModel =
    () => {
        if (connection == null) {
            console.log("Creating order model connection...");
            connection = mongoose.createConnection(dbUrl, { useNewUrlParser: true });
            model = connection.model("OrderModel", orderSchema);
        };
        return model;
    };























