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

        // get the shopping cart from the session and store in a variable
        var productsInCart = req.session.cart;

        // if there are products in the cart show them in the cart page
        if (productsInCart) {
            var cart = new Cart(productsInCart);  // create new cart object with existing products
            var cartProducts = cart.getProductList();  // get the array of products in the session cart
            var prodQty = cart.cartQuantity; // number of products in the cart
            var cartTotal = cart.cartTotal; // total price of products in the cart    

            // res.render('carts/showCart', { products: cartProducts, cartQuantity: prodQty, cartTotal: cartTotal });

            res.render('orders/orderForm', { title: "Order Total", products: cartProducts, cartQuantity: prodQty, cartTotal: cartTotal });            
        }
        // res.render('orders/orderForm',
        //     { title: "Order Total" });
    };



function updateQty(sessionCart) {
    return new Promise((resolve, reject) => {


        var cart = new Cart(sessionCart);
         
        // get the products from the session cart
        var products = cart.products;

        console.log('2');

        // loop through the products in the cart
        for (var id in products) {
            // quantity the user selected for the product in their session cart
            prodSessionCartQty = Number(products[id].quantity);

            console.log('3');

            // get the product model quantity and subtract
            Product.findById(id, (err, prod) => {
                
                console.log('3.5');

                if (err)
                    console.log("Error Selecting product: %s ", err);
                if (!prod)
                    return res.render('404');
                    
                    // the number of products in the product database collection
                    var productDbQty = Number(prod.quantity);

                    console.log('4');

                    // if their are enough products in the database
                    if (productDbQty >= prodSessionCartQty) {
                        // subtract the product session cart quantity 
                        productDbQty = productDbQty - prodSessionCartQty;
                        prod.quantity = productDbQty;  // store the new quantity

                        // update array of quantity count in product collection
                        var qty = prod.quantity;
                        var getQtyArr = ProductDb.getProductCount(qty);
                        prod.qtyCount = getQtyArr;       
                                    
                        console.log('5');

                        // get the products in the shopping cart
                        var cartProducts = cart.products;

                        // array to hold the products of an order
                        var productsArray = [];
                        
                        // loop through the products in the cart
                        for (var i in cartProducts) {

                            console.log('6');

                            // update quantities for prods in order collection
                            cartProducts[i].prod.quantity = productDbQty;
                            cartProducts[i].prod.qtyCount = getQtyArr;

                            console.log('cartProducts[i].prod.quantity', cartProducts[i].prod.quantity);

                            // push the products into an array
                            productsArray.push(cartProducts[i]);
                        };
                        // store the updated prod quantities back in the cart object
                        cart.products = productsArray;

                        console.log('cart', cart);
                        console.log('7');

                        // save the new updated quantity to the database
                        prod.save((err, updatedProd) => {

                            console.log('8');

                            console.log(err, updatedProd);
                            if (err) {
                                res.status(500).send('save failed');
                                return;
                            }
                            
                            return cart;
                        });

                    }//if
            }); // Product   
        } //for

        // return cart;

    });// end promise
}








// save an order to the database
module.exports.saveOrder = async function
    (req, res, next) {
    
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

        console.log('1');

        // console.log('order', order);
        var sessionCart = req.session.cart;
        req.session.cart = await updateQty(sessionCart);
        console.log("req.session.cart.......", req.session.cart);


        // get the shopping cart object from the session
        // var cart = req.session.cart;
        // var cart = new Cart(req.session.cart);
         
        // // get the products from the session cart
        // var products = cart.products;

        // console.log('2');

        // // loop through the products in the cart
        // for (var id in products) {
        //     // quantity the user selected for the product in their session cart
        //     prodSessionCartQty = Number(products[id].quantity);

        //     console.log('3');

        //     // get the product model quantity and subtract
        //     Product.findById(id, (err, prod) => {
                
        //         console.log('3.5');

        //         if (err)
        //             console.log("Error Selecting product: %s ", err);
        //         if (!prod)
        //             return res.render('404');
                    
        //             // the number of products in the product database collection
        //             var productDbQty = Number(prod.quantity);

        //             console.log('4');

        //             // if their are enough products in the database
        //             if (productDbQty >= prodSessionCartQty) {
        //                 // subtract the product session cart quantity 
        //                 productDbQty = productDbQty - prodSessionCartQty;
        //                 prod.quantity = productDbQty;  // store the new quantity

        //                 // update array of quantity count in product collection
        //                 var qty = prod.quantity;
        //                 var getQtyArr = ProductDb.getProductCount(qty);
        //                 prod.qtyCount = getQtyArr;       
                                    
        //                 console.log('5');

        //                 // get the products in the shopping cart
        //                 var cartProducts = cart.products;

        //                 // array to hold the products of an order
        //                 var productsArray = [];
                        
        //                 // loop through the products in the cart
        //                 for (var i in cartProducts) {

        //                     console.log('6');

        //                     // update quantities for prods in order collection
        //                     cartProducts[i].prod.quantity = productDbQty;
        //                     cartProducts[i].prod.qtyCount = getQtyArr;

        //                     console.log('cartProducts[i].prod.quantity', cartProducts[i].prod.quantity);

        //                     // push the products into an array
        //                     productsArray.push(cartProducts[i]);
        //                 };
        //                 // store the updated prod quantities back in the cart object
        //                 cart.products = productsArray;
        //                 req.session.cart = cart;

        //                 console.log('cart', cart);
        //                 console.log('7');

        //                 // save the new updated quantity to the database
        //                 prod.save((err, updatedProd) => {

        //                     console.log('8');

        //                     console.log(err, updatedProd);
        //                     if (err) {
        //                         res.status(500).send('save failed');
        //                         return;
        //                     }
        //                 });

        //             }//if
        //     }); // Product   
        // } //for

        console.log('9');

        order.save((err, resultCallback) => {
            console.log('10');

            // if an error occurs during checkout
            if (err) {
                console.log("Error Selecting : %s ", err);
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