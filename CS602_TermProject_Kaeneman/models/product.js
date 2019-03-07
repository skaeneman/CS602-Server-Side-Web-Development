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



module.exports.getProductModel =
    () => {
        if (connection == null) {
            console.log("Creating product model connection...");
            connection = mongoose.createConnection(dbUrl, { useNewUrlParser: true });
            model = connection.model("ProductModel", productSchema);
        };
        return model;
    };



















