const express = require('express');
const router = express.Router();

// other modules

const musicStoreModule = require("./musicStoreModule");

const displayEmployees = musicStoreModule.displayEmployees;
const addEmployee = musicStoreModule.addEmployee;
const saveEmployee = musicStoreModule.saveEmployee;
const editEmployee = musicStoreModule.editEmployee;
const saveAfterEdit = musicStoreModule.saveAfterEdit;
const deleteEmployee = musicStoreModule.deleteEmployee;

// router specs
router.get('/', (req, res, next) => {
  res.redirect('/employees');
});

// get employee index
router.get('/employees', displayEmployees);
// get new employee form
router.get('/employees/add', 	addEmployee);
// post to create the new employee
router.post('/employees/add', saveEmployee);
// get the edit employee form for existing employee
router.get('/employees/edit/:id', editEmployee);
// post to save the edits for existing employee 
router.post('/employees/edit/:id', 	saveAfterEdit);
// get the employee by id to delete 
router.get('/employees/delete/:id', deleteEmployee);

/*******************************************************************
 * product routes
 *******************************************************************/
const productController = require('../controllers/products_controller');

const displayProducts = productController.displayProducts;

// GET product index
router.get('/products', displayProducts);

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
const adminEditProduct = adminController.adminEditProduct
const adminSaveAfterEdit = adminController.adminSaveAfterEdit;
const adminDeleteProduct = adminController.adminDeleteProduct;

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

/*******************************************************************
 * user routes
 *******************************************************************/

const usersController = require('../controllers/users_controller');

const addUser = usersController.addUser;
const saveUser = usersController.saveUser;

// render addUser form
router.get('/users/add', addUser);
// POST to save the user data
router.post('/users/add', saveUser);


module.exports = router;
