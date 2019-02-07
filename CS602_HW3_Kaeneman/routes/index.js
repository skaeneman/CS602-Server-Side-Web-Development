const express = require('express');
const router = express.Router();

// other modules

const employeeModule = require("./employeeModule");

const displayCourses = employeeModule.displayCourses;
const addCourse = employeeModule.addCourse;
const saveCourse = employeeModule.saveCourse;
const editCourse = employeeModule.editCourse;
const saveAfterEdit = employeeModule.saveAfterEdit;
const deleteCourse 		= employeeModule.deleteCourse;

// router specs
router.get('/', (req, res, next) => {
  res.redirect('/courses');
});

router.get('/courses', 				displayCourses);

router.get('/courses/add', 			addCourse);
router.post('/courses/add', 		saveCourse);

router.get('/courses/edit/:id', 	editCourse);
router.post('/courses/edit/:id', 	saveAfterEdit);

router.get('/courses/delete/:id', deleteCourse);

module.exports = router;
