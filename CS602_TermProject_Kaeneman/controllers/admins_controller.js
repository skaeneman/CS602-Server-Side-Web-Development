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

        var qty = req.body.quantity;
        var price = req.body.price;
        var getQtyCount = ProductDb.getProductCount(qty);

        // input verification, check if Not A Number (NaN) or less than 0
        if (qty < 0 || isNaN(qty) == true || price < 0 || isNaN(price) == true) {
            req.flash('errorMessage', 'Invaid input - please enter a postive integer');
            return res.redirect(`/admin/products/add`);
        }
        // input passes verification now it can be used
        else {
            let product = new Product({
                // productId: req.body.productId,
                name: req.body.name,
                description: req.body.description,
                price: price,
                quantity: qty,
                qtyCount: getQtyCount
            });

            product.save((err) => {
                if (err) {
                    console.log("Error : %s ", err);
                }
                res.redirect('/admin/products');
            });
        }            
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
                        quantity: prod.quantity,
                        qtyCount: prod.qtyCount
                    }
	          });                
	    });
	};


// POST the data in the adminEditProduct form
module.exports.adminSaveAfterEdit =
    (req, res, next) => {

        let id = req.params.id;
        var qty = req.body.quantity;
        var price = req.body.price;

        // input verification, check if Not A Number (NaN) or less than 0
        if (qty < 0 || isNaN(qty) == true || price < 0 || isNaN(price) == true) {
            req.flash('errorMessage', 'Invaid input - please enter a postive integer');
            return res.redirect(`/admin/products/edit/${id}`);
        }
        // input passes verification now it can be used
        else {        

            Product.findById(id, (err, product) => {
                if (err)
                    console.log("Error Selecting : %s ", err);
                if (!product)
                    return res.render('404');

                product.name = req.body.name
                product.description = req.body.description,
                product.price = price,
                product.quantity = qty           

                product.save((err) => {
                    if (err)
                        console.log("Error updating : %s ", err);
                    res.redirect('/admin/products');
                });
            });
        }//else
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
                    // // update array of quantity count
                    // var qty = product.quantity;
                    // var getQtyArr = ProductDb.getProductCount(qty);                    
                    // product.qtyCount = getQtyArr;

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

            // allow admin to select up to 10 items for product quantity
            var dropdownArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];                

            res.render('admins/adminEditOrder',
                {
                    title: "Edit Order",
                    data: {
                        id: order._id,
                        products: order.shoppingCart.products,
                        dropdownArr: dropdownArr
                        // orderTotal: order.orderTotal,
                        // orderQuantity: order.orderQuantity,
                        // createdAt: order.createdAt
                    }
                });  

        });
	};




// POST the data in the adminEditOrder form
module.exports.adminSaveAfterEditOrder = async function(req, res, next) {

        let orderId = req.params.id;

        let formProdQty = [];  // array to hold quantities passed in from the form
        let formProdId = [];  // array to hold product id's

        formProdQty = req.body.quantity;
        formProdId = req.body.prodId;     

        let prodCount = 0;

        var prodIdQtyArray = [];
        if (Array.isArray(formProdQty) && Array.isArray(formProdId)) {
            // an array was passed in so there is more than one product in the order
            // take the 2 arrays from user input form and combine them into a key\value pair
            prodIdQtyArray = formProdQty.map(function (x, i) {
                return { "newQuantity": x, "id": formProdId[i] }
            }.bind(this));  

            prodIdQtyArray.forEach(prod => {
                var formProdId2 = prod.id;
                var formProdQty2 = prod.newQuantity;

                // console.log('formProdId2', formProdId2);
                // console.log('formProdQty2', formProdQty2);
                prodCount += 1;
                updateUserOrder(formProdId2, formProdQty2, orderId, req, res, prodCount);
            });

        } else {
            // there is only one product to edit in the order
            // prodIdQtyArray.push({ "newQuantity": formProdQty, "id": formProdId });
            prodCount = -1;
            updateUserOrder(formProdId, formProdQty, orderId, req, res, prodCount);
        }
    };    



    /*****************************************************************************************
     * function update quantities in product & order collections when user adds\removes items
     *****************************************************************************************/
    updateUserOrder = async (formProdId, formProdQty, orderId, req, res, prodCount) => {

        // input verification, check if Not A Number (NaN) or less than 0
        if (formProdQty < 0 || isNaN(formProdQty) == true) {
            req.flash('errorMessage', 'Invaid input - please enter a postive integer');
            return res.redirect(`/admin/orders/edit/${orderId}`);
        }
        // input passes verification now it can be used
        else {

            /******************************************************************************
            * find the order that the user wants to edit
            *******************************************************************************/
            Order.findById(orderId, (err, order) => {
                if (err)
                    console.log("Error Selecting : %s ", err);
                if (!order)
                    return res.render('404');

                // get the cart object from the order in the database
                var shoppingCart = order.shoppingCart;

                // find the current product and return the quantity
                Product.findById(formProdId, (err, product) => {
                    if (err)
                        console.log("Error Selecting : %s ", err);
                    if (!product)
                        return res.render('404');

                        var currentProdQty = product.quantity;

                        /******************************************************************************
                        * create a new shoppingCart object and initialize with values from the database
                        *******************************************************************************/
                        var cart = new Cart(shoppingCart);
                        var cartProducts = cart.getProductList();  // get an array of products

                        for (var i in cartProducts) {

                            var prodId = cartProducts[i].prod._id;
                            var prodOrderQty = cartProducts[i].quantity;

                            if (prodId == formProdId) {

                                /**********************************************************
                                * user is adding items to order
                                * ********************************************************/
                                if (formProdQty > prodOrderQty) {
                                    // console.log('adding...')
                                    // find how many items are trying to be added to the order
                                    var additionalItems = formProdQty - prodOrderQty;

                                    // check if the new value is <= product collection quantity
                                    if (additionalItems <= product.quantity) {

                                        // set the new product quantity in the order collection
                                        cartProducts[i].quantity = cartProducts[i].quantity + additionalItems;
                                        cartProducts[i].prod.quantity = formProdQty;
                                        cartProducts[i].price += cartProducts[i].prod.price * additionalItems;

                                        // update shoppingCart quantity and total in order collection
                                        cart.cartQuantity += additionalItems;
                                        cart.cartTotal += cartProducts[i].prod.price * additionalItems;

                                        // save the updated product quantity back to the shopping cart object
                                        order.shoppingCart = cart;

                                        // remove items from the product collection
                                        product.quantity = product.quantity - additionalItems;

                                        // price of the number of products remaining multiplied by the new quantity
                                        var currentProdPrice = product.price;
                                        currentProdPrice = formProdQty * currentProdPrice;

                                        // save the product
                                        product.save((err) => {
                                            if (err)
                                                console.log("Error updating : %s ", err);
                                        });

                                        // update order quantity and total
                                        order.orderQuantity += additionalItems
                                        order.orderTotal += cartProducts[i].prod.price * additionalItems;

                                        // save the order back to the database to update it
                                        order.save((err) => {
                                            if (err)
                                                console.log("Error deleting : %s ", err);

                                            // just one product in order so redirect     
                                            if (prodCount === -1) {
                                                req.flash('successMessage', `Order id ${order.id} successfully updated`);
                                                return res.redirect(`/admin/orders/user/${order.userId}`);
                                            } else {
                                                // more than one product in the order
                                                req.flash('successMessage', `Order id ${order.id} successfully updated`);
                                                return res.redirect(`/admin/orders/user/${order.userId}`);

                                            }
                                        });
                                    }
                                    else {
                                        
                                        return res.redirect(`/admin/orders/user/${order.userId}`);

                                    }

                                }//if formProdQty > currentProdQty

                                /**********************************************************
                                * user is deleting items from order
                                * ********************************************************/
                                else if (formProdQty < prodOrderQty) {
                                    // console.log('deleteing items...')
                                    // find how many items are trying to be removed from the order
                                    var itemsToRemove = prodOrderQty - formProdQty;
                                    // check if the new value is >= 0
                                    if (itemsToRemove >= 0) {

                                        // set the new product quantity in the order collection
                                        cartProducts[i].quantity = cartProducts[i].quantity - itemsToRemove;
                                        cartProducts[i].prod.quantity = formProdQty;
                                        cartProducts[i].price -= cartProducts[i].prod.price * itemsToRemove;

                                        // update shoppingCart object quantity and total in order collection
                                        cart.cartQuantity -= itemsToRemove;
                                        cart.cartTotal -= cartProducts[i].prod.price * itemsToRemove;

                                        // save the updated product quantity back to the shopping cart object
                                        order.shoppingCart = cart;

                                        // add items to the product collection
                                        product.quantity = product.quantity + itemsToRemove;

                                        // price of the number of products remaining multiplied by the new quantity
                                        var currentProdPrice = product.price;
                                        currentProdPrice = formProdQty * currentProdPrice;

                                        // save the product
                                        product.save((err) => {
                                            if (err)
                                                console.log("Error updating : %s ", err);
                                        });

                                        // update order quantity and total
                                        order.orderQuantity -= itemsToRemove
                                        order.orderTotal -= cartProducts[i].prod.price * itemsToRemove;


                                        // save the order back to the database to update it
                                        order.save((err) => {
                                            if (err)
                                                console.log("Error deleting : %s ", err);

                                            // just one product in order so redirect     
                                            if (prodCount === -1) {
                                                req.flash('successMessage', `Order id ${order.id} successfully updated`);
                                                return res.redirect(`/admin/orders/user/${order.userId}`);
                                            } else {
                                                // more than one product in the order
                                                req.flash('successMessage', `Order id ${order.id} successfully updated`);
                                                return res.redirect(`/admin/orders/user/${order.userId}`);
                                            }
                                        });
                                    }
                                    else {
                                        // return res.redirect(`/admin/orders/user/${order.userId}`);      
                                        // req.flash('errorMessage', 'Could not update order');
                                    }

                                }//if formProdQty < currentProdQty

                                else {
                                    // the product quantity did not change 
                                    if (prodCount === -1) {
                                        return res.redirect(`/admin/orders/user/${order.userId}`);
                                    } else {
                                        // more than one product in the order
                                        // req.flash('errorMessage', 'Could not update order');
                                    }                                     
                                }


                            }//if prodId == formProdId
                        }//for

                    // }//if

                });//findById

            });
        }//input verification

    }//end updateUserOrder function
