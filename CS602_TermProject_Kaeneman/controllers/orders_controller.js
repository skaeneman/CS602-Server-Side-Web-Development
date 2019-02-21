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
module.exports.saveOrder = (req, res, next) => {
    
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
        var cart;
        
        // find a users orders
        Order.find({userId: req.user.id}, (err, productOrders) => {
            if (err) {
                req.flash('errorMessage', 'Error retrieving user...');
                res.redirect('/orders');
            } else {
                // else loop through orders and push the carts into an array
                productOrders.forEach((order) => {
                    

                    // fix this...
                    cart = new Cart(order.shoppingCart);
                    order.products = cart.getProductList();
                    order.qty = cart.cartQuantity;
                    order.total = cart.cartTotal;


                    // cartProducts.push(order.shoppingCart);
                    // for (var cart in order.shoppingCart) {
                    //     console.log(cart);
                    // }
                    // cartProducts.push(order.shoppingCart);
                });
                res.render('orders/showOrders', { title: "Order History", productOrders: productOrders });
            }
            // console.log(cartProducts);
        });
        // console.log(cartProducts);
        // render the view and pass the array of orders to it
    };