const Cart = require("../models/cart");
const productDb = require('../models/product.js');
const Product = productDb.getProductModel();

// Post data to the cart
module.exports.saveProductToCart = 
    (req, res, next) => {
        let prodId = req.params.id;  // get product id from url
        let prodQty = req.body.prodQty;  // get product quantity from user input
        prodQty = Number(prodQty);  // convert the input to an integer

        // if there are no more items the dropdown will pass in NaN value for prodQty so handle it
        var nan = isNaN(parseFloat(prodQty))
        if (nan) {
            req.flash('errorMessage', "Oops...there are no more products in stock.");
            res.redirect(`/product/${prodId}`);  // redirect to current product page   
            return;               
        }

        // create a variable to hold the new cart
        var cart;
        // if a cart already exists with products in it then pass in the old carts products
        if(req.session.cart) {
            cart = new Cart(req.session.cart);
        }else {
            // there are no existing products so create an empty cart
            cart = new Cart({});
        };

        // find the product in the database that the user selected
        Product.findById(prodId, (err, product) => {
            if (err) {
                return res.redirect('/products');
            }

            // get the product id that was found
            var id = product.id;
            
            // get product and store in variable
            var productInCart = cart.products[id];            

            var alreadyAddedQty = false;

            // check if the product the user added is already in the cart
            if (!productInCart) {
                // if the product is not already in the cart then add the product
                cart.products[id] = { prod: product, 
                                      price: 0, 
                                      quantity: prodQty }
                productInCart = cart.products[id];  // store the new product in variable 
                req.session.cart = cart;  // store back to session
                // console.log('req.session.cart', cart.products[id].quantity);
                alreadyAddedQty = true;
            }

            // check the quantity passed in  
            // this will be used to see if we allow items to be aded to the actual cart
            var productInCartQtyCheck = cart.products[id].quantity;
            if (alreadyAddedQty != true) {
                productInCartQtyCheck += prodQty;
            }
            // console.log('productInCartQtyCheck', productInCartQtyCheck);

            // if the user adds less <= the number of items in the database for that product
            if (productInCartQtyCheck <= product.quantity) {

                // if the new quantity hasn't already been added to existing cart quantity 
                if (alreadyAddedQty != true) {
                    // increment the product quantity to be whatever was passed in
                    productInCart.quantity += prodQty;
                    req.session.cart = cart;  // store back to session
                    // console.log('increment', productInCart.quantity);
                }

                // price of the product added multiplied by the quantity in cart
                productInCart.price = productInCart.prod.price * productInCart.quantity;
                // console.log(productInCart.price);

                // increment the cart quantity by adding onto whatever quantity is aleady there
                cart.cartQuantity += Number(prodQty);
                // console.log(cart.cartQuantity);

                // add product price to cartTotal.  multiply products in cart price by quantity
                cart.cartTotal += productInCart.prod.price * prodQty;
                // console.log(cart.cartTotal);

                req.session.cart = cart;  // store cart with products in the session

                req.flash('successMessage', `${product.name} - successfully added to cart`);
                res.redirect(`/product/${prodId}`);  // redirect to current product page
            } else {
                // user tried to add more products to their cart than whats in the database 
                req.flash('errorMessage', `Sorry can't add product. Your cart has ${productInCart.quantity}
                                           items and we only have ${product.quantity} in stock`);
                res.redirect(`/product/${prodId}`);  // redirect to current product page                
            }
        });
    };


// Get index of products in cart
module.exports.showCart =
    (req, res, next) => {
        // get the shopping cart from the session and store in a variable
        var productsInCart = req.session.cart;
        // console.log(productsInCart);
        // if there are products in the cart show them in the cart page
        if (productsInCart) {
            var cart = new Cart(productsInCart);  // create new cart object with existing products
            var cartProducts = cart.getProductList();  // get the array of products in the session cart
            var prodQty = cart.cartQuantity; // number of products in the cart
            var cartTotal = cart.cartTotal; // total price of products in the cart    

            // set cartItems to true to show checkout button
            res.render('carts/showCart', { products: cartProducts, cartQuantity: prodQty, cartTotal: cartTotal, cartItems: true});
        }
        else {
            // there are no products in the cart so pass null values to the view to avoid errors and hide buttons
            // req.flash('errorMessage', "nothing in cart");
            res.render('carts/showCart', { products: null, cartQuantity: null, cartTotal: null, cartItems: null })
        }
    };        

// empty the shopping cart
module.exports.emptyCart =
    (req, res, next) => {
        delete req.session.cart;
        req.flash('successMessage', 'Your cart has been emptied!');
        res.redirect('/cart');
    };