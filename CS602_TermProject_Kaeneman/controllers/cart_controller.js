const cartModel = require("../models/cart");
const Cart = cartModel.getCartModel();

// Post data to the cart
module.exports.saveProductToCart = 
    (req, res, next) => {
        let id = req.params.id;
    };