const mongoose = require('mongoose');
const credentials = require("../credentials.js");

const dbUrl = 'mongodb://' + credentials.username +
    ':' + credentials.password + '@' + credentials.host + ':' + credentials.port + '/' +
    credentials.database;

let connection = null;
let model = null;

const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const productSchema = new Schema({
    name: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    price: { type: Number, trim: true, required: true },
    quantity: { type: Number, trim: true, required: true },
    qtyCount: [String] 
});

// id: { type: mongoose.Types.ObjectId },

// function to get an array of the quantity
module.exports.getProductCount = (qty) => {
    var productCountArr = [];  
    for (var i=0; i <= qty; i++) {
        productCountArr.push(i);
    };
    return productCountArr;
};

// returns all products in an array
module.exports.getProducts = () => {
    var productsArray = [];  // create empty array to hold products 

    Product.find({}, (err, products) => {
        if (err)
            console.log("Error : %s ", err);

        for (var prodId in products) {
            // push each product into the array
            productsArray.push(this.products[prodId]);
        };            
    });
    return productsArray;
};

// returns products in xml format
module.exports.getXmlProducts = (products) => {
    var prodXml = '<?xml version="1.0"?>\n';
    var root = 'products'; // set root node
    prodXml = `<${root}>`; // set opening element

    for (var i in products) {
        prodXml +=
            ' <product>\n'
            + ' <id>' + products[i]._id + '</id>\n'
            + ' <name>' + products[i].name + '</name>\n'
            + ' <description>' + products[i].description + '</description>\n'
            + ' <price>' + products[i].price + '</price>\n'
            + ' <quantity>' + products[i].quantity + '</quantity>\n'  
            + ' <qtyCount>' + products[i].qtyCount + '</qtyCount>\n'  
            + '</product>\n';          
    }
    prodXml += `</${root}>`; // closing element
    return prodXml;
}


// updates product quantities in the database when an admin is deleting products from a users cart
module.exports.removeProductsFromOrder = async (productId, currentProdQty, currentProdPrice, newProdQty) => {

    // subtract the number of products to be removed from the order
    currentProdQty = currentProdQty - newProdQty;
    // order.orderQuantity = currentProdQty;

    const Product = mongoose.model("ProductModel", productSchema);

    // find the product to add the quantity deleted back to the product collection
    Product.findById(productId, (err, product) => {
        if (err)
            console.log("Error Selecting : %s ", err);
        if (!product)
            return res.render('404');

        // if passed in qty is <= product qty in database
        if (newProdQty <= product.quantity) {
            console.log('<= product.quantity', product.quantity, "newProdQty", newProdQty);

            // add deleted items back to product table
            product.quantity = product.quantity + currentProdQty;

            // subtract deleted items from shopping cart prod object in order table
            orderProd.quantity -= currentProdQty;

            // price of the number of products remaining multiplied by the new quantity
            currentProdPrice = newProdQty * currentProdPrice;

            product.save((err) => {
                console.log('product save...')
                if (err)
                    console.log("Error updating : %s ", err);
            });
        }
        else {
            console.log("Error updating 1: %s ", err);
        }
    });
}

module.exports.addProductsToOrder = async function (productId, currentProdQty, currentProdPrice, newProdQty) {
    const Product = mongoose.model("ProductModel", productSchema);

    console.log("greater than...");
    
    // add the new product quantity to the order
    var additionalItems = newProdQty - currentProdQty;

    console.log("additional items", additionalItems);

    // find the product to subtract the quantity from the product table
    Product.findById(productId, (err, product) => {
        if (err)
            console.log("Error Selecting : %s ", err);
        if (!product)
            return res.render('404');

        // if passed in qty is <= product qty in database
        if (additionalItems <= product.quantity) {
            // subtract new order items from the product table
            product.quantity = product.quantity - additionalItems;

            console.log("subtracting new order items", product.quantity);


            // add items to shopping cart prod object in order table
            orderProd.quantity += additionalItems;

            console.log('added items to cart', orderProd.quantity);

            // price of the number of products remaining multiplied by the new quantity
            currentProdPrice = newProdQty * currentProdPrice;

            console.log('new prod price', currentProdPrice);

            product.save((err) => {
                if (err)
                    console.log("Error updating : %s ", err);
            });

        }
        else {
            console.log("Error updating 2: %s ", err);
        }
    });
}

module.exports.getProductModel =
    () => {
        if (connection == null) {
            console.log("Creating product model connection...");
            connection = mongoose.createConnection(dbUrl, { useNewUrlParser: true });
            model = connection.model("ProductModel", productSchema);
        };
        return model;
    };



















