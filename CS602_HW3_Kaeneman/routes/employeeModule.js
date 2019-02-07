const DB = require('./dbConnection.js');
const Employee = DB.getModel();

module.exports.addEmployee = 
	(req , res , next) => {

	  	res.render('addCourseView', 
	  		{title:"Add an Employee"});
	};


module.exports.deleteEmployee = 
	(req , res , next) => {
	    
	    let id = req.params.id;
	    
	    Employee.findById(id,  (err, employee) => {
	      if(err)
	        console.log("Error Selecting : %s ", err); 
				if (!employee)
	        return res.render('404');
	      
				employee.remove( (err) => {
	        if (err)
	          console.log("Error deleting : %s ",err );
	        res.redirect('/employees');
	      });        
	    });
  	};

module.exports.displayEmployees = 
	(req , res , next) => {

	    Employee.find({}, (err , employees) => {
	      if(err)
	          console.log("Error : %s ",err);

				let results = employees.map((employee) => {
	      	return {
						id: employee._id,
						firstName: employee.firstName,
						lastName: employee.lastName
	      	}
	      });

	      res.render('displayCoursesView',
	      	{title:"List of Employees", data:results});
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

module.exports.saveEmployee = 
	(req , res , next) => {

	    let employee = new Employee({
				firstName: req.body.firstName,
				lastName: req.body.lastName
	    }); 
	 
		  employee.save((err) => {
	      if(err)
	        console.log("Error : %s ",err);
	      res.redirect('/employees');
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



  