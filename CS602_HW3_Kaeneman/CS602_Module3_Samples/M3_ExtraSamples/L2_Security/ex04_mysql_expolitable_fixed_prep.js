const mysql = require('mysql');
const express = require('express');
const credentials = require("./credentials.js");


const connection = mysql.createConnection({
    "host": credentials.host, "port": 3306,
    "user": credentials.username,
    "password": credentials.password,
    "database": credentials.database,
    multipleStatements: true 
});


connection.connect();

const app = express();

app.get('/',  (req, res) => {
    res.send('ok');
});

app.get('/:name', (req, res, next) => {
    
    // Prepared statements


     connection.query('SELECT * FROM accounts WHERE name= ?', [req.params.name],
   
        (err, rows, fields) => {
            if (err) {
                console.log(err);
                res.status(404);
                return;
            }
            res.send(JSON.stringify(rows));
        });
});

app.use((req, res) => {
    res.status(404);
    
});


app.listen(3000, () => {
  console.log('http://localhost:3000');
});


/*

http://localhost:3000/karl
http://localhost:3000/joe
http://localhost:3000/%22;SELECT%20*%20FROM%20accounts%20WHERE%20%221%22=%221
http://localhost:3000/%22;DROP%20TABLE%20accounts;

*/
