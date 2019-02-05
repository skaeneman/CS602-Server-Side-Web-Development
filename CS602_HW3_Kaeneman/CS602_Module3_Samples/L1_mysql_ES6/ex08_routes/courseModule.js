const connection = 
	require('./dbConnection.js').dbConnect();

module.exports.addCourse = 
	(req , res , next) => {
	  
	  	res.render('addCourseView', 
	  		{title:"Add a Course"});
	};


module.exports.deleteCourse = 
	(req , res , next) => {

	    let id = req.params.id;
	    connection.query("DELETE FROM met_courses WHERE id = ? ",
	      [id], 
	      (err, rows) => 
	      {
	  		  if(err)
	              console.log("Error deleting : %s ", err );
	        res.redirect('/courses');
	      });
  };

module.exports.displayCourses = 
	(req , res , next) => {

      connection.query('select * from met_courses',
    	(err , rows) => {
	        if(err)
	            console.log("Error Selecting : %s ",err);
	        res.render('displayCoursesView',
	        	{title:"List of Courses", data:rows});
    	});
	};

module.exports.editCourse = 
	(req , res , next) => {

        let id = req.params.id;
        connection.query('SELECT * FROM met_courses WHERE id = ?',
          [id],
        	(err,rows) => {
        		if(err)
            	   console.log("Error Selecting : %s ", err);      	
        		res.render('editCourseView',
        			{title:"Edit Course", data:rows[0]});
    		});
    };

module.exports.saveCourse = 
	(req , res , next) => {

	    let inputFromForm = {
	      course_number  : req.body.cnumber,
	      course_name    : req.body.cname
	    };
	    connection.query("INSERT INTO met_courses set ? ",
	      inputFromForm, 
	      (err, rows) => 
	      {
	        if (err)
	          console.log("Error inserting : %s ",err );
	        res.redirect('/courses');
	      });
  };


module.exports.saveAfterEdit = 
	(req , res , next) => {

	    let id = req.params.id;
	    let inputFromForm = {
	      course_number  : req.body.cnumber,
	      course_name    : req.body.cname
	    };
	    
	    connection.query("UPDATE met_courses set ? WHERE id=?",
	      [inputFromForm, id], 
	      (err, rows) => {
	        if (err)
	            console.log("Error inserting : %s ",err );
	        res.redirect('/courses');
	    });
  };

