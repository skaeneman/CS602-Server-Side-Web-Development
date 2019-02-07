const express = require('express');
const router = express.Router();

// other modules

const employeeModule = require("./employeeModule");

const displayEmployees = employeeModule.displayEmployees;
const addEmployee = employeeModule.addEmployee;
const saveEmployee = employeeModule.saveEmployee;
const editCourse = employeeModule.editCourse;
const saveAfterEdit = employeeModule.saveAfterEdit;
const deleteCourse 		= employeeModule.deleteCourse;

// router specs
router.get('/', (req, res, next) => {
  res.redirect('/employees');
});

router.get('/employees', displayEmployees);

router.get('/employees/add', 	addEmployee);
router.post('/employees/add', saveEmployee);

router.get('/courses/edit/:id', 	editCourse);
router.post('/courses/edit/:id', 	saveAfterEdit);

router.get('/courses/delete/:id', deleteCourse);

module.exports = router;
