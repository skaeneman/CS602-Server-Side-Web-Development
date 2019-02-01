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


app.listen(3000, () => {
    console.log('http://localhost:3000');
});

