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
const productModel = require('../controllers/products_controller');

const addProduct = productModel.addProduct;
const saveProduct = productModel.saveProduct;
const displayProducts = productModel.displayProducts;

// GET product index
router.get('/products', displayProducts);
// GET the 'new product' form 
router.get('/products/add', addProduct);
// POST to create a new product
router.post('/products/add', saveProduct);




module.exports = router;
