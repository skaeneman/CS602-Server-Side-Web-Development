const orderDb = require('../models/order');
const Order = orderDb.getOrderModel();
const Cart = require("../models/cart");

// render the order form
module.exports.orderForm =
    (req, res, next) => {
        res.render('orders/orderForm',
            { title: "Orders" });
    };


// save an order to the database
module.exports.saveOrder = (req, res, next) => {
    
    // console.log(req.user.id);
    // console.log(req.session.cart);

    // if there is a current user logged in
    if (req.user) {

        let order = new Order({
            // get the shopping cart from the session
            shoppingCart: req.session.cart, 
            // get the user id from passport
            userId: req.user.id,
            firstName: 
            lastName
        });
    // else no logged in user
    } else {
        // redirect user and send login message
        req.flash('errorMessage', 'Please login first!');
        res.redirect('/login');
    }

}