const orderDb = require('../models/order');
const Order = orderDb.getOrderModel();
const Cart = require("../models/cart");
const UserDb = require('../models/user.js');
const User = UserDb.getUserModel();

// render the order form
module.exports.orderForm =
    (req, res, next) => {
        res.render('orders/orderForm',
            { title: "Orders" });
    };


// save an order to the database
module.exports.saveOrder = 
    (req, res, next) => {
    
    // console.log(req.user.id);
    // console.log(req.session.cart);

    // if there is a current user logged in
    if (req.user) {
        // create a new order
        let order = new Order({
            // get the shopping cart from the session
            shoppingCart: req.session.cart, 
            // get the user id from passport
            userId: req.user.id
        });

        order.save((err, resultCallback) => {
            // if an error occurs during checkout
            if (err) {
                req.flash('errorMessage', 'Error: checkout failed!')
                res.redirect('/orders/checkout');
            }
            // else no error while checking out
            else {
                // set cart back to null so a new order can be made
                req.session.cart = null;
                req.flash('successMessage', 'Your order has been placed')
                res.redirect('/products');                
            }
        });

    // else no logged in user
    } else {
        // redirect user and send login message
        req.flash('errorMessage', 'Please login first!');
        res.redirect('/login');
    }
};

// show a users orders
module.exports.showOrders = 
    (req, res, next) => {

        // console.log(req.user.id);

        // find the current users orders
        Order.find({userId: req.user.id}, (err, userOrders) => {
            if (err) {
                req.flash('errorMessage', 'Error retrieving user...');
                res.redirect('/orders');
            } else {
                // else no err so loop through the user's order history
                userOrders.forEach((order) => {
                    // console.log(order.createdAt);

                    // array to hold the products of an order
                    var productsArray = [];

                    // get the shopping cart object from the order
                    var cartOrder = order.shoppingCart;

                    // assign cartOrder variables to be used in views
                    order.qty = cartOrder.cartQuantity;  // total of each order
                    order.total = cartOrder.cartTotal;  // quantity of each order

                    // get the products in the shopping cart
                    var cartProducts = cartOrder.products;

                    // loop through the products in the cart
                    for (var prodId in cartProducts) {
                        // push the product id's into an array
                        productsArray.push(cartProducts[prodId]);
                    };
                    // assign the array to be used in the view
                    order.products = productsArray;
                });
                // render the view and pass the orders to it
                res.render('orders/showOrders', { title: "Order History", userOrders: userOrders });
            }
        });
    };