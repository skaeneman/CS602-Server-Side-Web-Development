const DB = require('./dbConnection.js');
const Employee = DB.getModel();

module.exports.addEmployee = 
	(req , res , next) => {

	  	res.render('addEmployeeView', 
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

	      res.render('displayEmployeesView',
	      	{title:"List of Employees", data:results});
	    });
	};

module.exports.editEmployee = 
	(req , res , next) => {

	    let id = req.params.id;

	    Employee.findById(id, (err, employee) => {
	      if(err)
	        console.log("Error Selecting : %s ", err); 
				if (!employee)
	        return res.render('404');

	      res.render('editEmployeeView',
	          {title:"Edit Employee", 
	           data: { id: employee._id,
							 			firstName: employee.firstName,
	                  lastName: employee.lastName }
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

	    Employee.findById(id, (err, employee) => {
	      if(err)
	        console.log("Error Selecting : %s ", err); 
				if (!employee)
	        return res.render('404');
	      
					employee.firstName = req.body.firstName
					employee.lastName = req.body.lastName;
	        
					employee.save((err) => {
	          if (err)
	            console.log("Error updating : %s ",err );
	          res.redirect('/employees');
	        });
	    });
	  };



  