const DB = require('../models/product.js');
const Product = DB.getProductModel();

// regex used for fuzzy searching product names and descriptions
 fuzzySearchRegex = (searchQuery) => {
    return searchQuery.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

// Get index of products (with search capability)
module.exports.displayProducts =
    (req, res, next) => {

        // if there was a search query entered
        if (req.query.search) {
            
            var queryMsg;  // variable to hold output message passed to view 

            // attempt to find the product by name or description
            const productRegex = new RegExp(fuzzySearchRegex(req.query.search), 'gi');
            Product.find({ $or: [{ name: productRegex }, { description: productRegex}] }, (err, products) => {
                if (err)
                    console.log("Error : %s ", err);

                // set error message if no product was found
                if (products.length < 1) {
                    queryMsg = "Sorry, that product is not in our inventory";
                }
                // setup product fields that will be passed to the view
                let results = products.map((product) => {
                    return {
                        id: product._id,
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        quantity: product.quantity
                    }
                });
                res.render('products/displayProducts',
                    { title: "List of Products", data: results, queryMsg: queryMsg });
            });
        } else {
            // no search query was entered so get all products from the database
            Product.find({}, (err, products) => {
                if (err)
                    console.log("Error : %s ", err);

                let results = products.map((product) => {
                    return {
                        id: product._id,
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        quantity: product.quantity
                    }
                });
                res.render('products/displayProducts',
                    { title: "List of Products", data: results });
            });
        }
    };    

// GET a product by id and render show page
module.exports.showProduct =
    (req, res, next) => {

        let id = req.params.id;
        
        Product.findById(id, (err, prod) => {
            if (err)
                console.log("Error Selecting : %s ", err);
            if (!prod)
                return res.render('404');       
                
            var prodCountArray = []; // array to hold product index
            var prodCount = Number(prod.quantity); // get the product count

            // loop to push the item count for the product into an array, used for dropdown 
            for (var i=1; i <= prodCount; i++) {                
                prodCountArray.push(i);
            }

            res.render('products/showProduct',
                {
                    title: "Show product",
                    data: {
                        id: prod._id,
                        name: prod.name,
                        description: prod.description,
                        price: prod.price,
                        quantity: prod.quantity,
                        prodCountArray: prodCountArray
                    }
                });
        });
    };

    
    
