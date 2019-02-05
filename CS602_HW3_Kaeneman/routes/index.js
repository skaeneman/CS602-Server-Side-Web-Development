const express = require('express');
const router = express.Router();

// other modules

const courseModule = require("./courseModule");

const displayCourses 	= courseModule.displayCourses;
const addCourse 		= courseModule.addCourse;
const saveCourse 		= courseModule.saveCourse;
const editCourse 		= courseModule.editCourse;
const saveAfterEdit 	= courseModule.saveAfterEdit;
const deleteCourse 		= courseModule.deleteCourse;

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
