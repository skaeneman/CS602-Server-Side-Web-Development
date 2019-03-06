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
        var getQtyCount = ProductDb.getProductCount(qty);
        
        let product = new Product({
            // productId: req.body.productId,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
            qtyCount: getQtyCount
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

            // get the products from cart object
            var cartProds = shoppingCart.products;

            // TESTING

            console.log('formProdQty', formProdQty);
            console.log('formProdId', formProdId);

            // see if it's 1 or more products in the order being edited
            var productsArray = [];
            for (var p in cartProds) {
                productsArray.push(p);
            }

            var deletingProd = null;

            // find the current product and return the quantity
            Product.findById(formProdId, (err, product) => {
                if (err)
                    console.log("Error Selecting : %s ", err);
                if (!product)
                    return res.render('404');

                var qty = product.quantity;



                // an order with only 1 product is being edited
                if (productsArray.length == 1) {



                    console.log('order with 1 product...');
                    
                    var currentProdQty = qty; 

                    console.log('currentProdQty', currentProdQty);

                    /******************************************************************************
                    * new quantity is less than current quantity, so user is deleting products
                    *******************************************************************************/                        
                    if (formProdQty < currentProdQty) {  
                        deletingProd = true; // user is deleteing products
                        ProductDb.removeProductsFromOrder(formProdId, formProdQty);
                    }

                    /***************************************************************************
                    * new quantity is greater than current quantity, so user is adding products
                    // ****************************************************************************/                        
                    // if (formProdQty > currentProdQty) {
                    //     deletingProd = false; // user is not deleting products
                    //     ProductDb.addProductsToOrder(formProdId, formProdQty);
                    //     console.log('adding...')
                    // }

                    /******************************************************************************
                    * create a new shoppingCart object and initialize with values from the database
                    *******************************************************************************/


                    // THE BELOW ONLY WORKS FOR AN ORDER WITH 1 PRODUCT NOT MULTIPLE PRODUCTS...

                    var cart = new Cart(shoppingCart);
                    var cartProducts = cart.getProductList();  // get an array of products

                    for (var i in cartProducts) {

                        var prodId = cartProducts[i].prod._id;
                        // console.log("product qty...", cartProducts[i].quantity);

                        // console.log('prodId', prodId);
                        // console.log('formProdId', formProdId);

                        if (prodId == formProdId) {

                            console.log('cartProducts[i].quantity', cartProducts[i].quantity);
                            console.log('product.quantity', product.quantity);

                            // user is adding items to order
                            if (formProdQty > currentProdQty) {
                                // find how many items are trying to be added to the order
                                var additionalItems = formProdQty - currentProdQty;

                                // check if the new value is <= product collection quantity
                                if (additionalItems <= product.quantity) {


                                    // set the new product quantity in the order collection
                                    cartProducts[i].quantity = cartProducts[i].quantity + additionalItems;
                                    cartProducts[i].prod.quantity = formProdQty;

                                    // update shoppingCart quantity and total in order collection
                                    cart.cartQuantity += additionalItems;
                                    cart.cartTotal += cartProducts[i].prod.price * additionalItems;

                                    // save the updated product quantity back to the shopping cart object
                                    order.shoppingCart = cart;

                                    // remove items from teh product collection
                                    product.quantity = product.quantity - additionalItems;

                                    // price of the number of products remaining multiplied by the new quantity
                                    var currentProdPrice = product.price;
                                    currentProdPrice = formProdQty * currentProdPrice;
                                 


                                    console.log('new prod price', currentProdPrice);

                                    product.save((err) => {
                                        if (err)
                                            console.log("Error updating : %s ", err);
                                    });










                                    /**************************************************************
                                    *  save the order back to the database to update it
                                    ***************************************************************/
                                    order.save((err) => {
                                        if (err)
                                            console.log("Error deleting : %s ", err);

                                        // req.flash('successMessage', `Order id ${order.id} successfully updated`);
                                        return res.redirect(`/admin/orders/user/${order.userId}`);
                                    });
                                }
                                else {
                                    req.flash('errorMessage', 'Could not update order');
                                    console.log("Error updating order, quantity is more than what's in stock");
                                    res.redirect(`/admin/orders/user/${order.userId}`);
                                    return;
                                }

                            }//if formProdQty > currentProdQty
                        }//if prodId == formProdId
                    }//for






                        }//if

                    });//findById
                   
            






          
            // // an order with only 1 product is being edited
            // if (productsArray.length == 1) {
            //     console.log('order with 1 product...');
                
            //     var currentProdQty = productsArray; //.quantity;

            //     console.log('currentProdQty', currentProdQty);

            //     /******************************************************************************
            //     * new quantity is less than current quantity, so user is deleting products
            //     *******************************************************************************/                        
            //     if (formProdQty < currentProdQty) {  
            //         ProductDb.removeProductsFromOrder(formProdId, formProdQty);
            //     }

            //     /***************************************************************************
            //     * new quantity is greater than current quantity, so user is adding products
            //     ****************************************************************************/                        
            //     if (formProdQty > currentProdQty) {
            //         ProductDb.addProductsToOrder(formProdId, formProdQty);
            //         console.log('adding...')
            //     }

            //     /******************************************************************************
            //     * create a new shoppingCart object and initialize with values from the database
            //     *******************************************************************************/


            //     // THE BELOW ONLY WORKS FOR AN ORDER WITH 1 PRODUCT NOT MULTIPLE PRODUCTS...

            //     var cart = new Cart(shoppingCart);
            //     var cartProducts = cart.getProductList();  // get an array of products

            //     for (var i in cartProducts) {

            //         var prodId = cartProducts[i].prod._id;
            //         console.log("product qty...", cartProducts[i].quantity);

            //         // if the cart product matches the product the user selected to update
            //         Product.findById(formProdId, (err, product) => {
            //             if (err)
            //                 console.log("Error Selecting : %s ", err);
            //             if (!product)
            //                 return res.render('404');

            //             if (prodId == product.id) {
            //                 // check if the new value is <= product collection quantity
            //                 if (formProdQty <= product.quantity) {
            //                     // set the new product quantity
            //                     cartProducts[i].quantity = formProdQty;
            //                     // save the updated product quantity back to the shopping cart object
            //                     order.shoppingCart = cart;

            //                     /**************************************************************
            //                     *  save the order back to the database to update it
            //                     ***************************************************************/
            //                     order.save((err) => {
            //                         if (err)
            //                             console.log("Error deleting : %s ", err);

            //                         // req.flash('successMessage', `Order id ${order.id} successfully updated`);
            //                         return res.redirect(`/admin/orders/user/${order.userId}`);
            //                     });
            //                 }
            //                 else {
            //                     req.flash('errorMessage', 'Could not update order');
            //                     console.log("Error updating order, quantity is more than what's in stock");
            //                     res.redirect(`/admin/orders/user/${order.userId}`);                                        
            //                     return;
            //                 }
            //             }

            //         });
            //     }






            // }// if
            
            // order with more than 1 product
            // else {
            //     console.log('an array was passed in....')
            // }

            // END TESTING


    
            /******************************************************************************
            * loop through products in database cart object to get quantity and prod id's
            *******************************************************************************/
            // for (var productId in cartProds) {                
            //     // console.log("product id...", cartProds[productId].prod._id);

            //     // get the current quantity for the product
            //     var currentProdQty = Number(cartProds[productId].quantity);
            //     // get current price of the product
            //     var currentProdPrice = cartProds[productId].price;
            //     // get the prod object in the database
            //     var orderProd = cartProds[productId].prod;

            //     /*********************************************************************************
            //     * check if the user is editing an order with multiple products or just one product
            //     **********************************************************************************/
            //     var prodIdQtyArray = [];
            //     // console.log(formProdQty);
            //     if (Array.isArray(formProdQty) && Array.isArray(formProdId)) {
            //         // an array was passed in so there is more than one product in the order
            //         // take the 2 arrays from user input form and combine them into a key\value pair
            //         prodIdQtyArray = formProdQty.map(function (x, i) {
            //             return { "newQuantity": x, "id": formProdId[i] }
            //         }.bind(this));  
            //     } else {
            //         // there is only one product to edit in the order, add it to the array
            //         prodIdQtyArray.push({ "newQuantity": formProdQty, "id": formProdId });
            //     }

                /*********************************************************************************
                * loop through prodIdQtyArray to get each id and quantity passed in from the user
                **********************************************************************************/                
                // prodIdQtyArray.forEach(prodIdQty => {              
                          
                //     // store the quantity from prodIdQtyArray
                //     var newProdQty = Number(prodIdQty.newQuantity);

                //     // if the poduct id from user form matches product id from database
                //     if (productId == prodIdQty.id) {



                        
                        // console.log('productId == prodIdQty.id', productId, " ", prodIdQty.id);
                        
                        // /******************************************************************************
                        // * new quantity is less than current quantity, so user is deleting products
                        // *******************************************************************************/                        
                        // if (newProdQty < currentProdQty) {  
                        //    ProductDb.removeProductsFromOrder(productId, currentProdQty, currentProdPrice, newProdQty);
                        // }

                        // /***************************************************************************
                        // * new quantity is greater than current quantity, so user is adding products
                        // ****************************************************************************/                        
                        // if (newProdQty > currentProdQty) {
                        //      ProductDb.addProductsToOrder(productId, currentProdQty, currentProdPrice, newProdQty);
                        // }

                        // /******************************************************************************
                        // * create a new shoppingCart object and initialize with values from the database
                        // *******************************************************************************/
       

                        // // THE BELOW ONLY WORKS FOR AN ORDER WITH 1 PRODUCT NOT MULTIPLE PRODUCTS...

                        // var cart = new Cart(shoppingCart);
                        // var cartProducts = cart.getProductList();  // get an array of products

                        // for (var i in cartProducts) {

                        //     var prodId = cartProducts[i].prod._id;
                        //     console.log("product qty...", cartProducts[i].quantity);

                        //     // if the cart product matches the product the user selected to update
                        //     Product.findById(productId, (err, product) => {
                        //         if (err)
                        //             console.log("Error Selecting : %s ", err);
                        //         if (!product)
                        //             return res.render('404');

                        //         if (prodId == product.id) {
                        //             // check if the new value is <= product collection quantity
                        //             if (newProdQty <= product.quantity) {
                        //                 // set the new product quantity
                        //                 cartProducts[i].quantity = newProdQty;
                        //                 // save the updated product quantity back to the shopping cart object
                        //                 order.shoppingCart = cart;

                        //                 /**************************************************************
                        //                 *  save the order back to the database to update it
                        //                 ***************************************************************/
                        //                 order.save((err) => {
                        //                     if (err)
                        //                         console.log("Error deleting : %s ", err);

                        //                     // req.flash('successMessage', `Order id ${order.id} successfully updated`);
                        //                     return res.redirect(`/admin/orders/user/${order.userId}`);
                        //                 });
                        //             }
                        //             else {
                        //                 req.flash('errorMessage', 'Could not update order');
                        //                 console.log("Error updating order, quantity is more than what's in stock");
                        //                 res.redirect(`/admin/orders/user/${order.userId}`);                                        
                        //                 return;
                        //             }
                        //         }

                        //     });
                        // }









                //         }//if productId

                //     }); //prodIdQtyArray
                
                // }// for      
        
            /******************************************************************************
            *  save the order back to the database to update it
            *******************************************************************************/
            // order.save((err) => {
            //     if (err)
            //         console.log("Error deleting : %s ", err);

            //     // req.flash('successMessage', `Order id ${order.id} successfully updated`);
            //     return res.redirect(`/admin/orders/user/${order.userId}`);
            // });


        });
    };    