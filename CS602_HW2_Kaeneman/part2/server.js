const express = require('express');
const app = express();
const employees = require('./employeeModule_v2');
const _ = require('underscore');

// to parse request body
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// static resources
app.use(express.static(__dirname + '/public'));

// handlebars view engine
const handlebars = require('express-handlebars');
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// GET homepage
app.get('/', (req, res) => {
    res.render('home');
});

// GET employee /id/:id
app.get('/id/:id', (req, res) => {
    // convert params to an integer
    var emp_id = parseInt(req.params.id);

    res.format({
        // render as JSON
        'application/json': () => {
            res.json(employees.lookupById(emp_id));
        },
        // render as HTML
        'text/html': () => {
            res.render('employee', {
                employee: employees.lookupById(emp_id),
                id: emp_id
            });
        },
        // render as XML
        'application/xml': () => {
            let employee = employees.lookupById(emp_id);
            let employeeXml = 
                '<?xml version="1.0"?>\n<employee>\n' +
                '<employee id="' + employee.id + '">\n' + 
                ' <firstName>"' + employee.firstName + '"</firstName>\n' +
                ' <lastName>"' + employee.lastName + '"</lastName>\n' +
                '</employee>\n';

            res.type('application/xml');
            res.send(employeeXml);
        }
                    
    });
}); 

// GET employee /lastName/:name
app.get('/lastName/:name', (req, res) => {

    res.format({
        // render as JSON
        'application/json': () => {
            res.json(employees.lookupByLastName(req.params.name));
        },
        // render as HTML
        'text/html': () => {
            var empLastName = req.params.name;
            // capitalizes first letter in params 
            var capitalizedLastName = employees.capitalizeName(empLastName);
            res.render('employeeList', {
                employees: employees.lookupByLastName(capitalizedLastName),
                name: capitalizedLastName,
                css: ['style.css', 'employeeList.css']
            });
        },
        // render as XML
        'application/xml': () => {
            let empXml = '<?xml version="1.0"?>\n<employees>\n' +
                employees.lookupByLastName(req.params.name).map(function (emp) {
                    return '  <employee id="' + emp.id + '">\n' +
                        '    <firstName>' + emp.firstName + '</firstName>\n' +
                        '    <lastName>' + emp.lastName + '</lastName>';
                }).join('\n') + '\n</employees>\n';

            res.type('application/xml');
            res.send(empXml);
        },

    });
}); 

// render the new employee form view template
app.get('/addEmployee', (req, res) => {
    res.render('newEmployee');
});

// post the new employee to the data array
app.post('/addEmployee/', (req, res) => {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var firstNameMissing = false;
    var lastNameMissing = false;
   
    // ensure that both first and last names exist 
    // when length == 0 it means there's an empty string
    if (firstName.length == 0) {
        firstNameMissing = true;
    }
    if (lastName.length == 0) {
        lastNameMissing = true;
    }

    // if both first and last names were submitted process the params
    if (firstNameMissing == false && lastNameMissing == false) {
        // capitalizes the first and last names before saving to the array
        firstName = employees.capitalizeName(firstName);
        lastName = employees.capitalizeName(lastName)

        // push the employee into the data array
        employees.addEmployee(firstName, lastName);
        res.redirect(('/lastName/') + lastName);
    }
    else {
        //render the newEmployee template and display errors
        res.render('newEmployee', { error: true, firstMissing: firstNameMissing, 
            lastMissing: lastNameMissing,
            css: ['style.css', 'errors.css'] 
        }); 
    }
});

// renders a 404 error page if the request is invalid
app.use((req, res) => {
    res.type('text/html');
    res.status(404);
    res.send("<b>404 - Not Found</b>");
});

// listen on port 3000 for connections
app.listen(3000, () => {
    console.log('http://localhost:3000');
});

