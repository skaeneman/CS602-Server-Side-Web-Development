const DB = require('../models/product.js');
const Product = DB.getProductModel();

// Get index of products
module.exports.displayProducts =
    (req, res, next) => {

        Product.find({}, (err, products) => {
            if (err)
                console.log("Error : %s ", err);

            let results = products.map((product) => {
                return {
                    productId: product.productId,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    quantity: product.quantity
                }
            });

            res.render('products/displayProducts',
                { title: "List of Products", data: results });
        });
    };
    
// render the new product form
module.exports.addProduct =
    (req, res, next) => {
        res.render('products/addProduct',
        { title: "Add a product" });
    };

// creates a new product
module.exports.saveProduct =
    (req, res, next) => {

        let product = new Product({
            productId: req.body.productId,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity
        });

        product.save((err) => {
            if (err)
                console.log("Error : %s ", err);
            res.redirect('/products');
        });

    };

