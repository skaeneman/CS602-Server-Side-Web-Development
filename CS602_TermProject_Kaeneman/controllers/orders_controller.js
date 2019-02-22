const orderDb = require('../models/order');
const Order = orderDb.getOrderModel();
const Cart = require("../models/cart");
const UserDb = require('../models/user.js');
const User = UserDb.getUserModel();
const ProductDb = require('../models/product.js');
const Product = ProductDb.getProductModel();


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
            userId: req.user.id,
            orderTotal: Number(req.session.cart.cartTotal),
            orderQuantity: Number(req.session.cart.cartQuantity)
        });


        // get the shopping cart object from the session
        var cart = req.session.cart;
        // get the products from the session cart
        var products = cart.products;
        // loop through the products in the cart
        for (var id in products) {
            // // the product guid
            // console.log(id);
            // // the quantity from the Product model object
            // console.log(products[id].prod.quantity);             
            // // quantity the user has in their cart
            // console.log(products[id].quantity);

            // quantity the user selected for the product in their session cart
            prodSessionCartQty = Number(products[id].quantity);

            // get the product model quantity and subtract
            Product.findById(id, (err, prod) => {
                if (err)
                    console.log("Error Selecting : %s ", err);
                if (!prod)
                    return res.render('404');
                    
                    // the number of products in the product database collection
                    var productDbQty = Number(prod.quantity);

                    // console.log(productDbQty, 'db');
                    // console.log(prodSessionCartQty, 'session')

                    // if their are enough products in the database then save the order
                    if (productDbQty >= prodSessionCartQty) {
                        // subtract the product session cart quantity 
                        productDbQty = productDbQty - prodSessionCartQty;
                        prod.quantity = productDbQty;  // store the new quantity

                        // save the new updated quantity to the database
                        prod.save((err, updatedProd) => {
                            console.log(err, updatedProd);
                            if (err) {
                                res.status(500).send('save failed');
                                return;
                            }
                        });

                    }//if
            }); // Product   
        } //for


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