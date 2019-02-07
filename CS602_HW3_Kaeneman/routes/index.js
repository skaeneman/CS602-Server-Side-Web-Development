const express = require('express');
const router = express.Router();

// other modules

const employeeModule = require("./employeeModule");

const displayEmployees = employeeModule.displayEmployees;
const addEmployee = employeeModule.addEmployee;
const saveEmployee = employeeModule.saveEmployee;
const editCourse = employeeModule.editCourse;
const saveAfterEdit = employeeModule.saveAfterEdit;
const deleteEmployee 		= employeeModule.deleteEmployee;

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
router.get('/courses/edit/:id', 	editCourse);
// post to save the edits for existing employee 
router.post('/courses/edit/:id', 	saveAfterEdit);
// get the employee by id to delete 
router.get('/employees/delete/:id', deleteEmployee);

module.exports = router;
