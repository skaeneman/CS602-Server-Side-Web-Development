const DB = require('../models/product.js');
const Product = DB.getProductModel();


// render the new product form
module.exports.addProduct =
    (req, res, next) => {
        res.render('products/addProduct',
        { title: "Add a product" });
    };

// create a new product
module.exports.saveProduct =
    (req, res, next) => {

        let product = new Product({
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity
        });

        product.save((err) => {
            if (err)
                console.log("Error : %s ", err);
            res.redirect('/');
        });

    };

