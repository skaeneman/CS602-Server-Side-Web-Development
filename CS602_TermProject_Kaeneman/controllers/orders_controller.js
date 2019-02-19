const orderDb = require('../models/order');
const Order = orderDb.getOrderModel();

module.exports.saveOrder = (req, res, next) => {
    console.log(req.session.auth);
    let order = new Order({
        // user: session
    });
}