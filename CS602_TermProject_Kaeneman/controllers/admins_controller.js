const mongoose = require('mongoose');
const DB = require('../models/product.js');
const Product = DB.getProductModel();

// Get index of admin products
module.exports.adminDisplayProducts =
    (req, res, next) => {

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

            res.render('admins/adminDisplayProducts',
                { title: "List of Products", data: results });
        });
    };

// render the new admin product form
module.exports.adminAddProduct =
    (req, res, next) => {
        res.render('admins/adminAddProduct',
            { title: "Add a product" });
    };

// creates a new admin product
module.exports.adminSaveProduct =
    (req, res, next) => {

        let product = new Product({
            // productId: req.body.productId,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity
        });

        product.save((err) => {
            if (err) {
                console.log("Error : %s ", err);
            }
            res.redirect('/admin/products');
        });

    };

// render the edit product form
module.exports.adminEditProduct = 
	(req , res , next) => {

	    let id = req.params.id;
        console.log(req.params);
        console.log(id);

	    Product.findById(id, (err, prod) => {
	      if(err)
	        console.log("Error Selecting : %s ", err); 
            if (!prod)
	        return res.render('404');

            res.render('admins/adminEditProduct',
	          {title:"Edit prod", 
                  data: { id: prod._id,
                        name: prod.name,
                        description: prod.description,
                        price: prod.price,
                        quantity: prod.quantity
                    }
	          });                
	    });
	};


// POST the data in the adminEditProduct form
module.exports.saveAfterEdit =
    (req, res, next) => {

        let id = req.params.id;

        Product.findById(id, (err, product) => {
            if (err)
                console.log("Error Selecting : %s ", err);
            if (!product)
                return res.render('404');

            product.name = req.body.name
            product.description = req.body.description;

            product.save((err) => {
                if (err)
                    console.log("Error updating : %s ", err);
                res.redirect('/admin/products');
            });
        });
    };


module.exports.adminDeleteProduct =
    (req, res, next) => {

        let id = req.params.id;

        Product.findById(id, (err, product) => {
            if (err)
                console.log("Error Selecting : %s ", err);
            if (!product)
                return res.render('404');

            product.remove((err) => {
                if (err)
                    console.log("Error deleting : %s ", err);
                res.redirect('/admin/products');
            });
        });
    };