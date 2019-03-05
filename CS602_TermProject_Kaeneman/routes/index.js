const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../config/auth');


/*******************************************************************
 * product routes
 *******************************************************************/
const productController = require('../controllers/products_controller');

const displayProducts = productController.displayProducts;
const showProduct = productController.showProduct;

// redirect root path to products path
router.get('/', (req, res, next) => {
  res.redirect('/products');
});

// GET product index
router.get('/products', displayProducts);
// GET show product route
router.get('/product/:id', showProduct);

/*******************************************************************
 * admin routes
 *******************************************************************/
const adminController = require('../controllers/admins_controller');

// GET admin view
router.get('/admin', (req, res) => {
  res.render('admins/admin', { title: "Admin" });
});

// products
const adminAddProduct = adminController.adminAddProduct;
const adminSaveProduct = adminController.adminSaveProduct;
const adminDisplayProducts = adminController.adminDisplayProducts;
const adminEditProduct = adminController.adminEditProduct;
const adminSaveAfterEdit = adminController.adminSaveAfterEdit;
const adminDeleteProduct = adminController.adminDeleteProduct;
// orders
const adminDisplayOrders = adminController.adminDisplayOrders;
const adminDeleteOrder = adminController.adminDeleteOrder;
const adminEditOrder = adminController.adminEditOrder;
const adminSaveAfterEditOrder = adminController.adminSaveAfterEditOrder;

// users
const adminDisplayUsers = adminController.adminDisplayUsers;

// GET product index
router.get('/admin/products', adminDisplayProducts);
// GET the 'new product' form 
router.get('/admin/products/add', adminAddProduct);
// POST to create a new product
router.post('/admin/products/add', adminSaveProduct);
// GET the edit admin product form
router.get('/admin/products/edit/:id', adminEditProduct);
// POST to save the edits for existing products 
router.post('/admin/products/edit/:id', adminSaveAfterEdit);
// GET product by id to delete
router.get('/admin/products/delete/:id', adminDeleteProduct);

// index to display all users
router.get('/admin/users', adminDisplayUsers);

// GET an order history for a user
router.get('/admin/orders/user/:id', adminDisplayOrders);
// GET order by id to delete
router.get('/admin/orders/delete/:id', adminDeleteOrder);
// GET order edit form
router.get('/admin/orders/edit/:id', adminEditOrder);
// POST to save order form
router.post('/admin/orders/edit/:id', adminSaveAfterEditOrder);


/*******************************************************************
 * user routes
 *******************************************************************/

const usersController = require('../controllers/users_controller');

const addUser = usersController.addUser;
const saveUser = usersController.saveUser;
const showUser = usersController.showUser;
const loginUser = usersController.loginUser; 
const showUserLoginForm = usersController.showUserLoginForm;
const logoutUser = usersController.logoutUser;

// render addUser form
router.get('/signup', addUser);
// POST to save the user data
router.post('/users/add', saveUser);
// GET user profile page
router.get('/user/profile/:id', showUser);
// GET form for user login
router.get('/login', showUserLoginForm);
// Post login
router.post('/login', loginUser);
// GET logout user
router.get('/logout', logoutUser);

/*******************************************************************
 * cart routes
 *******************************************************************/
const cartController = require("../controllers/carts_controller");
const saveProductToCart = cartController.saveProductToCart;
const showCart = cartController.showCart;
const emptyCart = cartController.emptyCart;

// post to cart
router.post('/cart/add/:id', saveProductToCart);
// Get cart 
router.get('/cart', showCart);
// get cart to empty it
router.get('/emptyCart', emptyCart); 

/*******************************************************************
 * order routes
 *******************************************************************/
const orderController = require('../controllers/orders_controller');
const saveOrder = orderController.saveOrder;
const orderForm = orderController.orderForm;
const showOrders = orderController.showOrders;

// GET the order form
router.get('/orders/checkout', orderForm);
// POST to save order to checkout
router.post('/orders/checkout', saveOrder);
// GET orders for a user
router.get('/orders', showOrders);


/*******************************************************************
 * REST routes
 *******************************************************************/
const restController = require('../controllers/rest_controller');
const getProducts = restController.getProducts; 
const getProductByName = restController.getProductByName; 
const getProductByPriceRange = restController.getProductByPriceRange; 

// GET products and return XML or JSON
router.get('/rest/:formatType/products', getProducts);
// GET a product by name and return XML or JSON
router.get('/rest/:formatType/products/:name', getProductByName);
// GET products that fall within a price range
router.get('/rest/:formatType/products/:minimum/:maximum', getProductByPriceRange);

/*******************************************************************
 *******************************************************************/

module.exports = router;
