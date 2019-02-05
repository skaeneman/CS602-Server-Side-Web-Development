// Simulate withdrawal with a delay
// Test in two browser windows at the same time

const mongoose = require('mongoose');
const credentials = require("./credentials.js");

const dbUrl = 'mongodb://' + credentials.username +
    ':' + credentials.password + '@' + credentials.host + ':' + credentials.port + '/' + credentials.database;
console.log(dbUrl);

// Connect to mongoose db
mongoose.connect(dbUrl);

mongoose.connection.on('error',  (err) => {
    console.error('connection error:' + err);
    process.exit();
});

// Define wallet model
const walletSchema = new mongoose.Schema({
    name:  { type: String, required: true, index: { unique: true } },
    amount: { type: Number, required: true}
});
const Wallet = mongoose.model('Wallet', walletSchema);

Wallet.remove().exec(); // Delete all previous Wallets.

const bodyParser = require('body-parser');
const express = require('express');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.get('/:name', function(req, res, next){
    // Query the account based on url parameters
    Wallet.findOne({name: req.params.name}, (err, wallet) => {
        if (err) {
            next(err);
            return;
        }
        // Send information and withdrawal form
        res.send(
            '<p> You have: ' + wallet.amount + '.<br/>' +
            'How much do you want to withdraw?</p>' +
            '<form method="POST">' +
            '<input type="number" name="amount" />' +
            '<input type="submit" value="submit" />' +
            '</form>');
    });
});


// Our processing function
const processCall = (cb) => {
    // Add delay of 5 seconds here - imitating processing of the request
    setTimeout(cb, 5000);
}

app.post('/:name', (req, res, next) => {
    let amount = Math.abs(req.body.amount);

    Wallet.findOne({name: req.params.name},  (err, wallet) => {
        if (err) { // Something went wrong with the query
            next(err);
            return;
        }
        if(!wallet) {
            res.send(404, 'Not found');
            return;
        }
        if(wallet.amount < amount) {
            res.send(400, 'Insufficient funds');
            return;
        }
        processCall( () => {
            wallet.amount -= amount;
            wallet.save( (rErr, updatedW) => {
                if(rErr) {
                    res.send(500, 'Withdrawal failed');
                    return;
                }
                res.redirect('/' + req.params.name);
            });
        });
    });
});

// Fill database
Wallet.create([
    { name: 'carl', amount: 1000},
    { name: 'mike', amount: 1000 }
],  (err) => {
    if(err) {
        console.error(err);
        process.exit(1);
    }
    app.listen(3000, () => {
        console.log('http://localhost:3000');
    });
});
