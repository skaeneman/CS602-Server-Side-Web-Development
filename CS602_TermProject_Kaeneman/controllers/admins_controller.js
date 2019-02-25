const ProductDb = require('../models/product.js');
const Product = ProductDb.getProductModel();

const UserDb = require('../models/user.js');
const User = UserDb.getUserModel();

const orderDb = require('../models/order');
const Order = orderDb.getOrderModel();

/******************************************************
 *  product functions
 ******************************************************/

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
module.exports.adminSaveAfterEdit =
    (req, res, next) => {

        let id = req.params.id;

        Product.findById(id, (err, product) => {
            if (err)
                console.log("Error Selecting : %s ", err);
            if (!product)
                return res.render('404');

            product.name = req.body.name
            product.description = req.body.description,
            product.price = req.body.price,
            product.quantity = req.body.quantity            

            product.save((err) => {
                if (err)
                    console.log("Error updating : %s ", err);
                res.redirect('/admin/products');
            });
        });
    };

// deletes a product
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

/******************************************************
 *  User functions
 ******************************************************/

// GET index of users
module.exports.adminDisplayUsers =
    (req, res, next) => {

        User.find({}, (err, users) => {
            if (err)
                console.log("Error : %s ", err);

            let results = users.map((user) => {
                return {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                }
            });

            res.render('admins/adminDisplayUsers',
                { title: "List of Users", userData: results });
        });
    };      

    
/******************************************************
 *  Order functions
 ******************************************************/

// GET an index of a users orders
module.exports.adminDisplayOrders =
    (req, res, next) => {

        // get a users id from the url params
        var userParamsId = req.params.id; 

        // find a users orders from the url params by passing their user id 
        Order.find({ userId: userParamsId}, (err, userOrders) => {
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
                res.render('admins/adminDisplayOrders', { title: "Order History", userOrders: userOrders });
            }
        });
    };    



// deletes an order
module.exports.adminDeleteOrder =
    (req, res, next) => {
        // get id from the url params
        let id = req.params.id;

        Order.findById(id, (err, order) => {
            if (err)
                console.log("Error Selecting : %s ", err);
            if (!order)
                return res.render('404');

            order.remove((err) => {
                if (err)
                    console.log("Error deleting : %s ", err);

                req.flash('successMessage', `Order id ${order.id} successfully deleted`);
                res.redirect(`/admin/orders/user/${order.userId}`);
            });
        });
    };
