const ProductDb = require('../models/product.js');
const Product = ProductDb.getProductModel();

const UserDb = require('../models/user.js');
const User = UserDb.getUserModel();

const orderDb = require('../models/order');
const Order = orderDb.getOrderModel();

const Cart = require("../models/cart");

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

            var shoppingCart = order.shoppingCart;

            var cartProds = shoppingCart.products;

            // loop through products in cart to get quantity and prod id's
            for (var productId in cartProds) {
                // console.log(cartProds[productId].quantity);
                // console.log(productId);

                // the quantity deleted from the order needs to be added back to Product table
                var deletedProdQty = cartProds[productId].quantity

                // find the product to add the quantity back that was deleted
                Product.findById(productId, (err, product) => {
                    if (err)
                        console.log("Error Selecting : %s ", err);
                    if (!product)
                        return res.render('404');

                    // add back what was in the deleted order
                    product.quantity = product.quantity + deletedProdQty;

                    product.save((err) => {
                        if (err)
                            console.log("Error updating : %s ", err);
                    });
                });
            }// for           
            // delete the order
            order.remove((err) => {
                if (err)
                    console.log("Error deleting : %s ", err);

                req.flash('successMessage', `Order id ${order.id} successfully deleted`);
                res.redirect(`/admin/orders/user/${order.userId}`);
            });
        });
    };


// render the edit order form
module.exports.adminEditOrder = 
	(req , res , next) => {

	    let id = req.params.id;

        Order.findById(id, (err, order) => {
            if (err)
                console.log("Error Selecting : %s ", err);
            if (!order)
                return res.render('404');

            var shoppingCart = order.shoppingCart;

            var cartProds = shoppingCart.products;

            // loop through products in cart to get quantity and prod id's
            // for (var productId in cartProds) {
            //     // console.log(cartProds[productId].quantity);
            //     // console.log(productId);

            //     // the quantity deleted from the order needs to be added back to Product table
            //     var deletedProdQty = cartProds[productId].quantity

            //     // find the product to add the quantity back that was deleted
            //     Product.findById(productId, (err, product) => {
            //         if (err)
            //             console.log("Error Selecting : %s ", err);
            //         if (!product)
            //             return res.render('404');

            //         // add back what was in the deleted order
            //         product.quantity = product.quantity + deletedProdQty;

            //         product.save((err) => {
            //             if (err)
            //                 console.log("Error updating : %s ", err);
            //         });
            //     });
            // }// for   

            res.render('admins/adminEditOrder',
                {
                    title: "Edit Order",
                    data: {
                        id: order._id,
                        products: order.shoppingCart.products
                        // orderTotal: order.orderTotal,
                        // orderQuantity: order.orderQuantity,
                        // createdAt: order.createdAt
                    }
                });  

        });
	};


// POST the data in the adminEditOrder form
module.exports.adminSaveAfterEditOrder =
    (req, res, next) => {

        let orderId = req.params.id;

        let formProdQty = [];  // array to hold quantities passed in from the form
        let formProdId = [];  // array to hold product id's

        formProdQty = req.body.quantity;
        formProdId = req.body.prodId;     

        // find the order
        Order.findById(orderId, (err, order) => {
            if (err)
                console.log("Error Selecting : %s ", err);
            if (!order)
                return res.render('404');
            
            // get the cart object from the order in the database
            var shoppingCart = order.shoppingCart;
            // get the products from cart object
            var cartProds = shoppingCart.products;

            // loop through products in database cart object to get quantity and prod id's
            for (var productId in cartProds) {                
                // console.log("product id...", cartProds[productId].prod._id);

                // get the current quantity for the product
                var currentProdQty = Number(cartProds[productId].quantity);
                // get current price of the product
                var currentProdPrice = cartProds[productId].price;
                // get the prod object in the database
                var orderProd = cartProds[productId].prod;

                var prodIdQtyArray = [];
                // check if the user is editing an order with multiple products or just one product
                if (Array.isArray(formProdQty) && Array.isArray(formProdId)) {
                    // an array was passed in so there is more than one product in the order
                    // take the 2 arrays from user input form and combine them into a key\value pair
                    prodIdQtyArray = formProdQty.map(function (x, i) {
                        return { "newQuantity": x, "id": formProdId[i] }
                    }.bind(this));  
                } else {
                    // there is only one product to edit in the order
                    prodIdQtyArray.push({ "newQuantity": formProdQty, "id": formProdId });
                }

                // loop through array to get each id and quantity passed in from the user
                prodIdQtyArray.forEach(prodIdQty => {                    
                    // store the quantity from prodIdQtyArray
                    var newProdQty = Number(prodIdQty.newQuantity);

                    // if the poduct id from user form matches product id from database
                    if (productId == prodIdQty.id) {
                        // console.log('productId == prodIdQty.id', productId, " ", prodIdQty.id);

                        // new quantity is less than current quantity, so user is deleting products
                        if (newProdQty < currentProdQty) {  
                            console.log("less than...");
                            // subtract the number of products to be removed from the order
                            currentProdQty = currentProdQty - newProdQty;
                            // order.orderQuantity = currentProdQty;

                            // find the product to add the quantity deleted back to the product table
                            Product.findById(productId, (err, product) => {
                                if (err)
                                    console.log("Error Selecting : %s ", err);
                                if (!product)
                                    return res.render('404');

                                // add deleted items back to product table
                                product.quantity = product.quantity + currentProdQty;
                                // subtract deleted items from shopping cart prod object in order table
                                orderProd.quantity -= currentProdQty;

                                // price of the number of products remaining multiplied by the new quantity
                                currentProdPrice = newProdQty * currentProdPrice;  

                                product.save((err) => {
                                    if (err)
                                        console.log("Error updating : %s ", err);
                                });
                            });
                        }//if

                        // new quantity is greater than current quantity, so user is adding products
                        else if (newProdQty > currentProdQty) {
                            console.log("less than...");
                            // subtract the number of products to be removed from the order
                            currentProdQty = currentProdQty - newProdQty;
                            // order.orderQuantity = currentProdQty;

                            // find the product to add the quantity deleted back to the product table
                            Product.findById(productId, (err, product) => {
                                if (err)
                                    console.log("Error Selecting : %s ", err);
                                if (!product)
                                    return res.render('404');

                                console.log("old product table qty", product.quantity);

                                // add deleted items back to product table
                                product.quantity = product.quantity + currentProdQty;
                                // subtract deleted items from shopping cart prod object in order table
                                orderProd.quantity -= currentProdQty;

                                console.log("new product table qty", product.quantity);
                                console.log('currentProdPrice original', currentProdPrice);
                                console.log('orderProd.quantity', orderProd.quantity);

                                // price of the number of products remaining multiplied by the new quantity
                                currentProdPrice = newProdQty * currentProdPrice;

                                console.log('currentProdPrice', currentProdPrice);

                                product.save((err) => {
                                    if (err)
                                        console.log("Error updating : %s ", err);
                                });
                            });
                        }//elseif

                        // get a new shopping cart object and pass in the current value in the database
                        var cart = new Cart(shoppingCart);
                        var cartProducts = cart.getProductList();  // get an array of products
                        for (var i in cartProducts) {
                            var prodId = cartProducts[i].prod._id;

                            // console.log("product qty...", cartProducts[i].quantity);
                            // console.log("product id...", cartProducts[i].prod._id);

                            // if the current product matches the product the user selected to update
                            if (prodId == productId) {
                                // set the new product quantity
                                cartProducts[i].quantity = newProdQty;
                                // save the updated product quantity back to the shopping cart object
                                order.shoppingCart = cart;
                            }
                        }

                        }//if productId
                    }); //prodIdQtyArray
                
                }// for      

            // save the order to update it
            order.save((err) => {
                if (err)
                    console.log("Error deleting : %s ", err);

                req.flash('successMessage', `Order id ${order.id} successfully updated`);
                res.redirect(`/admin/orders/user/${order.userId}`);
            });
        });
    };    