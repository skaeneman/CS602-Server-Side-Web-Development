const Cart = require("../models/cart");

// Post data to the cart
module.exports.saveProductToCart = 
    (req, res, next) => {
        let prodId = req.params.id;
        var shoppingCart = new Cart()
    };

