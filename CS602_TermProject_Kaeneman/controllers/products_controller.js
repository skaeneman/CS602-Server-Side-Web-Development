const DB = require('../models/product.js');
const Product = DB.getProductModel();

// Get index of products
module.exports.displayProducts =
    (req, res, next) => {

        // if there was a search query entered
        if (req.query.search) {

            var foundProducts = "test";

            Product.find({name: req.query.search}, (err, products) => {
                if (err)
                    console.log("Error : %s ", err);

                let results = products.map((product) => {
                    return {
                        id: product._id,
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        quantity: product.quantity
                    }
                });
                res.render('products/displayProducts',
                    { title: "List of Products", data: results, foundProducts: foundProducts });
            });

    
            // Product.find({ $or: [{ name: req.query.productSearch }, 
            //                      { description: req.query.productSearch }] 
            //                     }).toArray((err, docs) => {
            //                     console.log(docs);
            // });
            



        } else {
            // no search query so get all products from the database
            Product.find({}, (err, products) => {
                if (err)
                    console.log("Error : %s ", err);

                let results = products.map((product) => {
                    return {
                        id: product._id,
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        quantity: product.quantity
                    }
                });
                res.render('products/displayProducts',
                    { title: "List of Products", data: results });
            });
        }
    };    

// GET a product by id and render show page
module.exports.showProduct =
    (req, res, next) => {

        let id = req.params.id;

        Product.findById(id, (err, prod) => {
            if (err)
                console.log("Error Selecting : %s ", err);
            if (!prod)
                return res.render('404');

            res.render('products/showProduct',
                {
                    title: "Show product",
                    data: {
                        id: prod._id,
                        name: prod.name,
                        description: prod.description,
                        price: prod.price,
                        quantity: prod.quantity
                    }
                });
        });
    };

    
    
// // render the new product form
// module.exports.addProduct =
//     (req, res, next) => {
//         res.render('products/addProduct',
//         { title: "Add a product" });
//     };

// // creates a new product
// module.exports.saveProduct =
//     (req, res, next) => {

//         let product = new Product({
//             productId: req.body.productId,
//             name: req.body.name,
//             description: req.body.description,
//             price: req.body.price,
//             quantity: req.body.quantity
//         });

//         product.save((err) => {
//             if (err)
//                 console.log("Error : %s ", err);
//             res.redirect('/products');
//         });

//     };

