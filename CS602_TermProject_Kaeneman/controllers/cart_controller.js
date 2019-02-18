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
// module.exports.showCart =
//     (req, res, next) => {

//         Product.find({}, (err, products) => {
//             if (err)
//                 console.log("Error : %s ", err);

//             let results = products.map((product) => {
//                 return {
//                     id: product._id,
//                     name: product.name,
//                     description: product.description,
//                     price: product.price,
//                     quantity: product.quantity
//                 }
//             });

//             res.render('carts/showCart',
//                 { title: "List of Products in your Cart", data: results });
//         });
//     };        

