const DB = require('./models/products_controller.js');
const Product = DB.getProductModel();

// module.exports.saveProduct =
//     (req, res, next) => {

//         let employee = new Product({
//             firstName: req.body.firstName,
//             lastName: req.body.lastName
//         });

//         employee.save((err) => {
//             if (err)
//                 console.log("Error : %s ", err);
//             res.redirect('/employees');
//         });

//     };

