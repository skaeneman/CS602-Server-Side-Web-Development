const DB = require('../models/product.js');
const Product = DB.getProductModel();



// Get products and return JSON or XML
module.exports.getProducts =
    (req, res, next) => {

    var formatType = req.params.formatType;
    formatType = formatType.toLowerCase();
        
    // get all products from the database
    Product.find({}, (err, products) => {
        if (err)
            console.log("Error : %s ", err);

        // return JSON
        if (formatType == 'json') {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ products }, null, '\t'));            
        }
        // return XML
        if (formatType == 'xml') {
            // call function in product model to get xml
            var prodXml = DB.getXmlProducts(products);
            res.type('application/xml');
            res.end(prodXml);
        }
        // handle error if format is not JSON or XML
        else {
            res.end("<br /><div class='container'><div class='row'><div class='col-sm-12'><div><h3>404 - Not Found</h3><br><img src='/images/404_error.jpg' alt='404 error'></div></div></div></div>");
        }

    });
};  

// Get products and return JSON or XML
module.exports.getProductByName =
    (req, res, next) => {

    var formatType = req.params.formatType;
    var name = req.params.name;
    
    formatType = formatType.toLowerCase();
    name = name.toLowerCase();
        
    // get all products from the database
    Product.find({name: name}, (err, products) => {
        if (err)
            console.log("Error : %s ", err);

        // return JSON
        if (formatType == 'json') {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ products }, null, '\t'));            
        }
        // return XML
        if (formatType == 'xml') {
            // call function in product model to get xml
            var prodXml = DB.getXmlProducts(products);
            res.type('application/xml');
            res.end(prodXml);
        }
        // handle error if format is not JSON or XML
        else {
            res.end("<br /><div class='container'><div class='row'><div class='col-sm-12'><div><h3>404 - Not Found</h3><br><img src='/images/404_error.jpg' alt='404 error'></div></div></div></div>");
        }

    });
};  