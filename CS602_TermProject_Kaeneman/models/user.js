const mongoose = require('mongoose');
const credentials = require("../credentials.js");

const dbUrl = 'mongodb://' + credentials.username +
    ':' + credentials.password + '@' + credentials.host + ':' + credentials.port + '/' +
    credentials.database;

let connection = null;
let model = null;

const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

// used to set email address to lowercase
function toLowerCase(email) {
    return email.toLowerCase();
}

const userSchema = new Schema({
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true, set: toLowerCase, index: { unique: true } },
    password: { type: String, required: true }
});

module.exports.test = () => {
    console.log("this worked");
}

module.exports.getUserModel =
    () => {
        if (connection == null) {
            console.log("Creating user model connection...");
            connection = mongoose.createConnection(dbUrl, { useNewUrlParser: true });
            model = connection.model("UserModel", userSchema);
        };
        return model;
    };























