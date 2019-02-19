const Cart = require("../models/cart");
const productDb = require('../models/product.js');
const Product = productDb.getProductModel();

// Post data to the cart
module.exports.saveProductToCart = 
    (req, res, next) => {
        let prodId = req.params.id;  // get product id from url

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
            // pass product from findById callback into addProductToCart function
            cart.addProductToCart(product); 

            req.session.cart = cart;  // store cart with products in the session
            // req.session.message = "product successfully added to cart"
            console.log(req.session.cart);         
            res.redirect(`/product/${prodId}`);  // redirect to current product page
        });
    };


// Get index of products in cart
module.exports.showCart =
    (req, res, next) => {
        // get the shopping cart from the session and store in a variable
        var productsInCart = req.session.cart;

        // if there are products in the cart show them in the cart page
        if (productsInCart) {
            var cart = new Cart(productsInCart);  // create new cart object with existing products
            var cartProducts = cart.getProductList();  // get the array of products in the session cart
            var prodQty = cart.cartQuantity; // number of products in the cart
            var cartTotal = cart.cartTotal; // total price of products in the cart        

            res.render('carts/showCart', { products: cartProducts, cartQuantity: prodQty, cartTotal: cartTotal });
        }
        else {
            // there are no products in the cart so pass null values to the view to avoid errors
            res.render('carts/showCart', { products: null, cartQuantity: null, cartTotal: null })
        }
    };        

