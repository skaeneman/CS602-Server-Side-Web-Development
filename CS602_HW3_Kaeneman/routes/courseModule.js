const DB = require('./dbConnection.js');
const Course = DB.getModel();

module.exports.addCourse = 
	(req , res , next) => {

	  	res.render('addCourseView', 
	  		{title:"Add a Course"});
	};


module.exports.deleteCourse = 
	(req , res , next) => {
	    
	    let id = req.params.id;
	    
	    Course.findById(id,  (err, course) => {
	      if(err)
	        console.log("Error Selecting : %s ", err); 
	      if (!course)
	        return res.render('404');
	      
	      course.remove( (err) => {
	        if (err)
	          console.log("Error deleting : %s ",err );
	        res.redirect('/courses');
	      });        
	    });
  	};

module.exports.displayCourses = 
	(req , res , next) => {

	    Course.find({}, (err , courses) => {
	      if(err)
	          console.log("Error : %s ",err);

	      let results = courses.map( (course) => {
	      	return {
	      		id: course._id,
	          	courseName: course.courseName,
	          	courseNumber: course.courseNumber,
	          	developers:  course.getDeveloperNames()
	      	}
	      });

	      res.render('displayCoursesView',
	      	{title:"List of Courses", data:results});
	    });
	};

module.exports.editCourse = 
	(req , res , next) => {

	    let id = req.params.id;

	    Course.findById(id, (err, course) => {
	      if(err)
	        console.log("Error Selecting : %s ", err); 
	      if (!course)
	        return res.render('404');

	      res.render('editCourseView',
	          {title:"Edit Course", 
	           data: {id: course._id,
	                  courseNumber: course.courseNumber,
	                  courseName: course.courseName,
	                  developers:  course.getDeveloperNames()}
	          });                
	    });
	};

module.exports.saveCourse = 
	(req , res , next) => {
 
	    let developers = req.body.cdev;
	    // create an array of objects
	    if (developers.length > 0) {
	      developers = 
	        developers.split(',').map((elem) => {
	          let names = elem.trim().split(' ');
	          return {firstName: names[0], 
	                  lastName: names[1]};
	        });
	    } else
	      developers = [];

	    let course = new Course({
	      courseNumber:     req.body.cnumber,
	      courseName:       req.body.cname,
	      courseDevelopers: developers
	    }); 
	 
	    course.save((err) => {
	      if(err)
	        console.log("Error : %s ",err);
	      res.redirect('/courses');
	    });

	  };


module.exports.saveAfterEdit = 
	(req , res , next) => {

	    let id = req.params.id;

	    Course.findById(id, (err, course) => {
	      if(err)
	        console.log("Error Selecting : %s ", err); 
	      if (!course)
	        return res.render('404');
	      
	        course.courseNumber = req.body.cnumber
	        course.courseName = req.body.cname;
	        let developers = req.body.cdev;
	        if (developers.length > 0) {
	          developers = 
	            developers.split(',').map((elem) => {
	              let names = elem.trim().split(' ');
	              return {firstName: names[0], 
	                      lastName: names[1]};
	            });
	          course.courseDevelopers = developers;
	        }
	        
	        course.save((err) => {
	          if (err)
	            console.log("Error updating : %s ",err );
	          res.redirect('/courses');
	        });
	    });
	  };



  