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
            res.send(prodXml);
        }
        // // handle error if format is not JSON or XML
        // else {
        //     req.flash('errorMessage', "oops...that format type is not available");
        //     res.render('products/displayProducts');
        // }

    });
};  

