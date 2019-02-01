const express = require('express');
const app = express();
const employees = require('./employeeModule_v2');

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
                employee: employees.lookupById(emp_id)
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

// GET employee /lastName/:lastName
app.get('/lastName/:lastName', (req, res) => {

    res.format({
        // render as JSON
        'application/json': () => {
            res.json(employees.lookupByLastName(req.params.lastName));
        },
        // render as HTML
        'text/html': () => {
            var empLastName = req.params.lastName;
            // capitalizes first letter in params 
            var capitalizedLastName = empLastName[0].toUpperCase() + empLastName.slice(1);
            res.render('employeeList', {
                employees: employees.lookupByLastName(capitalizedLastName),
                lastName: capitalizedLastName,
                css: ['style.css', 'employeeList.css']
            });
        },
        // render as XML
        'application/xml': () => {
            let empXml = '<?xml version="1.0"?>\n<employees>\n' +
                employees.lookupByLastName(req.params.lastName).map(function (emp) {
                    return '  <employee id="' + emp.id + '">\n' +
                        '    <firstName>' + emp.firstName + '</firstName>\n' +
                        '    <lastName>' + emp.lastName + '</lastName>';
                }).join('\n') + '\n</employees>\n';

            res.type('application/xml');
            res.send(empXml);
        },

    });
}); 


app.listen(3000, () => {
    console.log('http://localhost:3000');
});

